import { useState } from 'react';
import { products, categories, optionLabel, formatPrice } from './data/products';
import './App.css';

const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '254712345678';
const API_URL = 'https://prime-kuku.onrender.com/api/stkpush';

function orderLink(product, option) {
  const size = option?.label ? ` (${option.label})` : '';
  const text = encodeURIComponent(
    `Hello Prime Kuku, I'd like to order: ${product.name}${size}. Please confirm availability and price.`
  );
  return `https://wa.me/${WHATSAPP}?text=${text}`;
}

export default function App() {
  const [active, setActive] = useState('All');

  const [showMpesa, setShowMpesa] = useState(false);
  const [phone, setPhone] = useState('254');
  const [mpesaAmount, setMpesaAmount] = useState(0);
  const [mpesaLoading, setMpesaLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const visible = products.filter(
    (p) => p.available && (active === 'All' || p.category === active)
  );

  const showNotify = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 5000);
  };

  const handleMpesa = async (e) => {
    e.preventDefault();
    setMpesaLoading(true);

    let formattedPhone = phone.trim();
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.slice(1);
    }

    if (formattedPhone.length !== 12) {
      showNotify('Please enter a valid Safaricom number.', 'error');
      setMpesaLoading(false);
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formattedPhone, amount: mpesaAmount }),
      });

      const data = await res.json();

      if (res.ok && data.CheckoutRequestID) {
        setShowMpesa(false);
        setShowSuccess(true);
        setPhone('254');
      } else {
        showNotify(data.error || 'Payment failed. Please try again.', 'error');
      }
    } catch (err) {
      showNotify('Network error. Please check your connection.', 'error');
    } finally {
      setMpesaLoading(false);
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand">
            <img src="/logo.jpg" alt="Prime Kuku Logo" className="brand-logo" />
            <span className="brand-name">PRIME KUKU</span>
          </a>
          <nav className="nav">
            <a href="#products">Products</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a className="btn btn-gold btn-small" href={`https://wa.me/${WHATSAPP}`}>
              Order Now
            </a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="container hero-content">
          <p className="eyebrow">Farm-raised · Freshly dressed</p>
          <h1>
            Fresh From Our Farm.
            <br />
            Quality On Your Table.
          </h1>
          <p className="lede">
            Whole farm-raised chickens, properly raised, cleaned and dressed. Order in under a
            minute via WhatsApp or M-Pesa.
          </p>
          <div className="hero-actions">
            <a className="btn btn-gold btn-large" href="#products">
              View our chickens
            </a>
            <a className="btn btn-ghost" href={`https://wa.me/${WHATSAPP}`}>
              Order on WhatsApp
            </a>
          </div>
          <ul className="trust">
            <li>Farm-raised</li>
            <li>Freshly dressed</li>
            <li>Reliable delivery</li>
            <li>M-Pesa & WhatsApp ordering</li>
          </ul>
        </div>
      </section>

      <section id="products" className="section section-white">
        <div className="container">
          <div className="section-header">
            <h2>Our Premium Chickens</h2>
            <p className="section-lede">Whole birds only — sold per bird, priced by size.</p>
          </div>

          <div className="filters">
            {['All', ...categories].map((c) => (
              <button
                key={c}
                className={active === c ? 'chip chip-on' : 'chip'}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid">
            {visible.map((p) => (
              <article key={p.id} className="card">
                <div className="card-image-wrap">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="card-img" />
                  ) : (
                    <div
                      className="card-img"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted)',
                      }}
                    >
                      No Image
                    </div>
                  )}
                </div>

                <div className="card-content">
                  <h3>{p.name}</h3>
                  <p className="desc">{p.description}</p>

                  <div className="card-options">
                    {p.options.map((o, i) => (
                      <div key={i} className="option-row">
                        <div className="option-info">
                          <span className="option-label">{optionLabel(o)}</span>
                          <span className="price">{formatPrice(o.price)}</span>
                        </div>
                        <div className="action-buttons">
                          <a className="btn btn-whatsapp btn-small" href={orderLink(p, o)}>
                            WhatsApp
                          </a>
                          <button
                            className="btn btn-mpesa btn-small"
                            onClick={() => {
                              setMpesaAmount(o.price);
                              setShowMpesa(true);
                            }}
                          >
                            Pay Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="secure-badge">
                    <span>🔒</span> Secure Payment via M-Pesa
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section section-cream">
        <div className="container about">
          <div>
            <h2>Properly raised. Honestly priced.</h2>
            <p>
              Prime Kuku is a farm-based poultry business selling whole chickens for meat. Every
              bird is raised on our farm, cleaned, dressed and prepared fresh — never frozen, never
              rushed.
            </p>
            <p>
              We keep it simple: whole birds, clear sizes, fair prices, and a WhatsApp or M-Pesa
              order that takes a minute.
            </p>
          </div>
          <div className="facts">
            <div>
              <strong>Whole birds</strong>
              <span>Cleaned & dressed</span>
            </div>
            <div>
              <strong>Farm-raised</strong>
              <span>Raised on our farm</span>
            </div>
            <div>
              <strong>M-Pesa</strong>
              <span>Instant secure payment</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section section-white">
        <div className="container contact">
          <div>
            <h2>Order or ask a question</h2>
            <p>Message us on WhatsApp — we reply during working hours.</p>
            <a className="btn btn-whatsapp" href={`https://wa.me/${WHATSAPP}`}>
              Chat on WhatsApp
            </a>
          </div>
          <div className="contact-details">
            <p>
              <strong>Business:</strong> Prime Kuku Poultry Farm
            </p>
            <p>
              <strong>Products:</strong> Whole farm-raised chicken
            </p>
            <p>
              <strong>WhatsApp:</strong> +{WHATSAPP}
            </p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Prime Kuku. All rights reserved.</span>
          <span>Fresh From Our Farm. Quality On Your Table.</span>
        </div>
      </footer>

      {/* M-Pesa Modal */}
      {showMpesa && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Checkout</h3>
            <p className="modal-amount">
              Total Amount: <strong>KSh {mpesaAmount}</strong>
            </p>
            <form onSubmit={handleMpesa}>
              <label className="mpesa-label">M-Pesa Phone Number</label>
              <input
                type="tel"
                placeholder="254712345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mpesa-input"
                required
                autoFocus
              />
              <button
                type="submit"
                className="btn btn-mpesa btn-full"
                disabled={mpesaLoading}
              >
                {mpesaLoading ? 'Processing...' : 'Pay Now'}
              </button>
              <button type="button" onClick={() => setShowMpesa(false)} className="btn-cancel">
                Cancel Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal-content success-modal">
            <div className="success-icon">✅</div>
            <h3 className="success-title">Order Placed!</h3>
            <p className="success-text">
              We've sent a payment request to your phone. Please enter your M-Pesa PIN to complete
              the order.
            </p>
            <button
              className="btn btn-whatsapp btn-full"
              onClick={() => setShowSuccess(false)}
            >
              Back to Shop
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {notification.show && (
        <div className={`toast-notification ${notification.type}`}>
          <div className="toast-icon">
            {notification.type === 'success' ? '✓' : '✕'}
          </div>
          <div className="toast-message">{notification.message}</div>
        </div>
      )}
    </>
  );
}