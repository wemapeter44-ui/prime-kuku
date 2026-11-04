require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

// 1. MongoDB Connection with Render-specific fix
const client = new MongoClient(process.env.MONGODB_URI, {
    tls: true,
    autoSelectFamily: false // Hii inasaidia Render kuepuka SSL handshake errors
});

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('primekuku');
        console.log("✅ Connected to MongoDB successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
}

// 2. Get M-Pesa Token
const getToken = async () => {
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    const res = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: { Authorization: `Basic ${auth}` }
    });
    return res.data.access_token;
};

// 3. STK Push Endpoint
app.post('/api/stkpush', async (req, res) => {
    try {
        if (!db) {
            return res.status(500).json({ error: "Database is still connecting. Please try again in a moment." });
        }

        const { phone, amount } = req.body;
        const token = await getToken();
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
        const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
            BusinessShortCode: process.env.MPESA_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: amount,
            PartyA: phone,
            PartyB: process.env.MPESA_SHORTCODE,
            PhoneNumber: phone,
            CallBackURL: process.env.CALLBACK_URL,
            AccountReference: 'PrimeKuku',
            TransactionDesc: 'Chicken Order'
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const collection = db.collection('orders');
        await collection.insertOne({
            phone,
            amount,
            checkoutRequestID: response.data.CheckoutRequestID,
            status: 'Pending',
            createdAt: new Date()
        });

        res.json(response.data);
    } catch (error) {
        console.error("M-Pesa Error:", error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
});

// 4. Callback Endpoint
app.post('/api/callback', async (req, res) => {
    const { Body } = req.body;
    if (Body && Body.stkCallback) {
        const { ResultCode, ResultDesc, CheckoutRequestID } = Body.stkCallback;
        
        if (db) {
            const collection = db.collection('orders');
            await collection.updateOne(
                { checkoutRequestID: CheckoutRequestID },
                { $set: { status: ResultCode === 0 ? 'Success' : 'Failed', resultDesc: ResultDesc } }
            );
        }
    }
    res.json({ ResultCode: 0, ResultDesc: "Success" });
});

// 5. Start Server after DB connects
connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
});