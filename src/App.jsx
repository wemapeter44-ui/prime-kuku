// PRIME KUKU - Phase 1 TEST PAGE (prototype only, replaced in Phase 2)
// Its only job: prove the catalogue, sample images, brand colours and
// WhatsApp links work.

import { siteConfig } from './data/siteConfig';
import { categories, products, optionLabel, formatPrice } from './data/products';
import {
  buildWhatsAppLink,
  buildProductMessage,
  buildGeneralMessage,
} from './lib/whatsapp';
import SampleImage from './components/SampleImage';

function App() {
  const availableProducts = products.filter((p) => p.available);

  return (
    <>
      <header className="test-header">
        <div className="container">
          <h1>{siteConfig.brandName}</h1>
          <p>{siteConfig.tagline}</p>
        </div>
      </header>

      <main className="container test-section">
        <div className="test-warning">
          Phase 1 test page (prototype only). The images are sample
          illustrations, not real photos. The real design comes in Phase 2.
        </div>

        {!siteConfig.whatsappNumber && (
          <div className="test-warning">
            No WhatsApp number found. Check that .env.local contains
            VITE_WHATSAPP_NUMBER, then stop and restart npm run dev.
          </div>
        )}

        <p style={{ marginBottom: '1.5rem' }}>
          <a
            className="btn btn-gold"
            href={buildWhatsAppLink(buildGeneralMessage())}
            target="_blank"
            rel="noreferrer"
          >
            Order on WhatsApp
          </a>
        </p>

        {categories.map((category) => (
          <section key={category}>
            <h2>{category}</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1rem',
              }}
            >
              {availableProducts
                .filter((p) => p.category === category)
                .map((product) => (
                  <div className="test-card" key={product.id}>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: 180,
                          objectFit: 'cover',
                          borderRadius: 14,
                          marginBottom: '0.9rem',
                        }}
                      />
                    ) : (
                      <SampleImage kind={product.sampleImage} />
                    )}
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="test-options">
                      {product.options.map((option) => (
                        <a
                          key={optionLabel(option)}
                          className="btn btn-whatsapp"
                          href={buildWhatsAppLink(
                            buildProductMessage(product, option)
                          )}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {optionLabel(option)}: {formatPrice(option.price)}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export default App;