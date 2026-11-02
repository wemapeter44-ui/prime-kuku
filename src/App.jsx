import { useState } from 'react';
import { products, categories, optionLabel, formatPrice } from './data/products';
import './App.css';

const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '254712345678'; 

function orderLink(product, option) {
  const size = option?.label ? ` (${option.label})` : '';
  const text = encodeURIComponent(
    `Hello Prime Kuku, I'd like to order: ${product.name}${size}. Please confirm availability and price.`
  );
  return `https://wa.me/${WHATSAPP}?text=${text}`;
}

export default function App() {
  const [active, setActive] = useState('All');
  const visible = products.filter(
    (p) => p.available && (active === 'All' || p.category === active)
  );

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand">PRIME KUKU</a>
          <nav className="nav">
            <a href="#products">Products</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a className="btn btn-gold btn-small" href={`https://wa.me/${WHATSAPP}`}>Order</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="container hero-content">
          <p className="eyebrow">Farm-raised · Freshly dressed</p>
          <h1>Fresh From Our Farm.<br />Quality On Your Table.</h1>
          <p className="lede">
            Whole farm-raised chickens, properly raised, cleaned and dressed.
            Order in under a minute on WhatsApp.
          </p>
          <div className="hero-actions">
            <a className="btn btn-gold btn-large" href="#products">View our chickens</a>
            <a className="btn btn-ghost" href={`https://wa.me/${WHATSAPP}`}>Order on WhatsApp</a>
          </div>
          <ul className="trust">
            <li>Farm-raised</li>
            <li>Freshly dressed</li>
            <li>Reliable delivery</li>
            <li>Easy WhatsApp ordering</li>
          </ul>
        </div>
      </section>

      <section id="products" className="section section-white">
        <div className="container">
          <div className="section-header">
            <h2>Our premium chickens</h2>
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
                    <div className="card-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No Image</div>
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
                        <a className="btn btn-whatsapp" href={orderLink(p, o)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                          Order
                        </a>
                      </div>
                    ))}
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
              Prime Kuku is a farm-based poultry business selling whole chickens for meat.
              Every bird is raised on our farm, cleaned, dressed and prepared fresh —
              never frozen, never rushed.
            </p>
            <p>
              We keep it simple: whole birds, clear sizes, fair prices, and a WhatsApp
              order that takes a minute.
            </p>
          </div>
          <div className="facts">
            <div><strong>Whole birds</strong><span>Cleaned & dressed</span></div>
            <div><strong>Farm-raised</strong><span>Raised on our farm</span></div>
            <div><strong>WhatsApp</strong><span>Order in a minute</span></div>
          </div>
        </div>
      </section>

      <section id="contact" className="section section-white">
        <div className="container contact">
          <div>
            <h2>Order or ask a question</h2>
            <p>Message us on WhatsApp — we reply during working hours.</p>
            <a className="btn btn-whatsapp" href={`https://wa.me/${WHATSAPP}`}>Chat on WhatsApp</a>
          </div>
          <div className="contact-details">
            <p><strong>Business:</strong> Prime Kuku</p>
            <p><strong>Products:</strong> Whole farm-raised chicken</p>
            <p><strong>WhatsApp:</strong> +{WHATSAPP}</p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Prime Kuku. All rights reserved.</span>
          <span>Fresh From Our Farm. Quality On Your Table.</span>
        </div>
      </footer>
    </>
  );
}