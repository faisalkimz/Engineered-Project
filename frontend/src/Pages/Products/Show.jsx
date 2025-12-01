import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import AppLayout from '../../Components/Layout/AppLayout'

// Mock product detail data
const mockProductDetails = {
  1: {
    id: 1,
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 1199,
    oldPrice: 1299,
    description: 'The iPhone 15 Pro Max features a titanium design, powerful A17 Pro chip, advanced camera system with 5x optical zoom, and all-day battery life. Experience pro-level performance in the palm of your hand.',
    images: [
      'https://images.unsplash.com/photo-1696446702463-69e2e6498430?w=800',
      'https://images.unsplash.com/photo-1696446702459-675a7b0d6e6b?w=800',
      'https://images.unsplash.com/photo-1592286927505-c0d1f7c8c7f7?w=800',
    ],
    rating: 5,
    reviews: 234,
    inStock: true,
    specifications: {
      'Display': '6.7" Super Retina XDR',
      'Chip': 'A17 Pro',
      'Camera': '48MP Main | 12MP Ultra Wide | 12MP Telephoto',
      'Storage': '256GB',
      'Battery': 'Up to 29 hours video playback',
      'Weight': '221g',
      'Water Resistance': 'IP68'
    },
    variants: [
      { id: 1, name: '256GB', price: 1199 },
      { id: 2, name: '512GB', price: 1399 },
      { id: 3, name: '1TB', price: 1599 }
    ]
  },
  // Add more products as needed
}

export default function ProductShow() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showToast, setShowToast] = useState(false)

  const product = mockProductDetails[id] || mockProductDetails[1] // Fallback to first product

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <AppLayout>
      <div className="product-detail-page">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/products">Products</Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

          <div className="product-detail">
            {/* Image Gallery */}
            <div className="product-gallery">
              <div className="main-image">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                />
              </div>
              <div className="thumbnail-grid">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info-section">
              <div className="product-header">
                {product.brand && (
                  <p className="product-brand">{product.brand}</p>
                )}
                <h1 className="product-title">{product.name}</h1>

                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="rating-text">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="price-section">
                <span className="current-price">${product.price}</span>
                {product.oldPrice && (
                  <span className="old-price">${product.oldPrice}</span>
                )}
                {product.oldPrice && (
                  <span className="discount-badge">
                    Save ${product.oldPrice - product.price}
                  </span>
                )}
              </div>

              <p className="product-description">{product.description}</p>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="variants-section">
                  <h3 className="section-title">Storage</h3>
                  <div className="variant-buttons">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(index)}
                        className={`variant-btn ${selectedVariant === index ? 'active' : ''}`}
                      >
                        <span className="variant-name">{variant.name}</span>
                        <span className="variant-price">${variant.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="purchase-section">
                <div className="quantity-selector">
                  <label>Quantity</label>
                  <div className="quantity-controls">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="qty-btn"
                    >
                      −
                    </button>
                    <span className="qty-value">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="action-buttons">
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1 }}
                  >
                    Add to Cart
                  </button>
                  <button className="btn-wishlist">
                    ❤️
                  </button>
                </div>
              </div>

              {/* Stock Status */}
              <div className="stock-status">
                {product.inStock ? (
                  <span className="in-stock">✓ In Stock</span>
                ) : (
                  <span className="out-of-stock">Out of Stock</span>
                )}
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div className="specifications">
                  <h3 className="section-title">Specifications</h3>
                  <dl className="spec-list">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="spec-item">
                        <dt>{key}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="toast-notification">
            <div className="toast-content">
              <span className="toast-icon">✓</span>
              <span>Added to cart successfully!</span>
            </div>
          </div>
        )}
      </div>

      <style jsx="true">{`
                .product-detail-page {
                    padding: var(--spacing-2xl) 0 var(--spacing-3xl);
                    min-height: calc(100vh - 80px - 400px);
                    position: relative;
                }
                
                .breadcrumb {
                    display: flex;
                    gap: var(--spacing-sm);
                    align-items: center;
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                    margin-bottom: var(--spacing-xl);
                }
                
                .breadcrumb a {
                    color: var(--text-secondary);
                    transition: color var(--transition-fast);
                }
                
                .breadcrumb a:hover {
                    color: var(--primary);
                }
                
                .product-detail {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-3xl);
                    background: var(--bg-secondary);
                    padding: var(--spacing-2xl);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-lg);
                }
                
                .main-image {
                    width: 100%;
                    aspect-ratio: 1;
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    background: var(--bg-primary);
                    margin-bottom: var(--spacing-md);
                }
                
                .main-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .thumbnail-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                    gap: var(--spacing-sm);
                }
                
                .thumbnail {
                    aspect-ratio: 1;
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    border: 2px solid transparent;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    background: none;
                    padding: 0;
                }
                
                .thumbnail img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .thumbnail:hover {
                    border-color: var(--border-medium);
                }
                
                .thumbnail.active {
                    border-color: var(--primary);
                }
                
                .product-info-section {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xl);
                }
                
                .product-brand {
                    font-size: var(--font-size-sm);
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: var(--spacing-xs);
                }
                
                .product-title {
                    font-size: var(--font-size-3xl);
                    margin-bottom: var(--spacing-md);
                }
                
                .product-rating {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                }
                
                .stars {
                    display: flex;
                    gap: 2px;
                }
                
                .star {
                    color: var(--border-medium);
                    font-size: var(--font-size-lg);
                }
                
                .star.filled {
                    color: hsl(45, 100%, 51%);
                }
                
                .rating-text {
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                }
                
                .price-section {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    padding: var(--spacing-lg);
                    background: linear-gradient(135deg, rgba(255, 107, 0, 0.1) 0%, rgba(155, 81, 224, 0.1) 100%);
                    border-radius: var(--radius-lg);
                }
                
                .current-price {
                    font-size: var(--font-size-4xl);
                    font-weight: 800;
                    color: var(--primary);
                }
                
                .old-price {
                    font-size: var(--font-size-xl);
                    color: var(--text-muted);
                    text-decoration: line-through;
                }
                
                .discount-badge {
                    background: var(--success);
                    color: white;
                    padding: var(--spacing-xs) var(--spacing-sm);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                }
                
                .product-description {
                    color: var(--text-secondary);
                    line-height: 1.7;
                }
                
                .section-title {
                    font-size: var(--font-size-lg);
                    font-weight: 700;
                    margin-bottom: var(--spacing-md);
                }
                
                .variant-buttons {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    gap: var(--spacing-sm);
                }
                
                .variant-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: var(--spacing-md);
                    border: 2px solid var(--border-light);
                    border-radius: var(--radius-md);
                    background: var(--bg-secondary);
                    cursor: pointer;
                    transition: all var(--transition-fast);
                }
                
                .variant-btn:hover {
                    border-color: var(--primary);
                }
                
                .variant-btn.active {
                    border-color: var(--primary);
                    background: rgba(255, 107, 0, 0.05);
                }
                
                .variant-name {
                    font-weight: 600;
                    margin-bottom: var(--spacing-xs);
                }
                
                .variant-price {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }
                
                .quantity-selector {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-sm);
                }
                
                .quantity-selector label {
                    font-weight: 600;
                    font-size: var(--font-size-sm);
                }
                
                .quantity-controls {
                    display: flex;
                    align-items: center;
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    width: fit-content;
                }
                
                .qty-btn {
                    width: 40px;
                    height: 40px;
                    border: none;
                    background: var(--bg-primary);
                    cursor: pointer;
                    font-size: var(--font-size-xl);
                    transition: background var(--transition-fast);
                }
                
                .qty-btn:hover {
                    background: var(--border-light);
                }
                
                .qty-value {
                    min-width: 60px;
                    text-align: center;
                    font-weight: 600;
                }
                
                .action-buttons {
                    display: flex;
                    gap: var(--spacing-md);
                }
                
                .btn-wishlist {
                    width: 56px;
                    height: 56px;
                    border: 2px solid var(--border-light);
                    border-radius: var(--radius-lg);
                    background: var(--bg-secondary);
                    font-size: var(--font-size-xl);
                    cursor: pointer;
                    transition: all var(--transition-fast);
                }
                
                .btn-wishlist:hover {
                    border-color: var(--error);
                    background: rgba(239, 68, 68, 0.05);
                }
                
                .stock-status {
                    padding: var(--spacing-sm) 0;
                }
                
                .in-stock {
                    color: var(--success);
                    font-weight: 600;
                }
                
                .out-of-stock {
                    color: var(--error);
                    font-weight: 600;
                }
                
                .spec-list {
                    display: grid;
                    gap: var(--spacing-sm);
                }
                
                .spec-item {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: var(--spacing-md);
                    padding: var(--spacing-sm) 0;
                    border-bottom: 1px solid var(--border-light);
                }
                
                .spec-item:last-child {
                    border-bottom: none;
                }
                
                .spec-item dt {
                    font-weight: 600;
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }
                
                .spec-item dd {
                    color: var(--text-primary);
                    font-size: var(--font-size-sm);
                }
                
                .toast-notification {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    background: var(--bg-secondary);
                    border-left: 4px solid var(--success);
                    padding: var(--spacing-md) var(--spacing-lg);
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-lg);
                    animation: slideIn 0.3s ease-out;
                    z-index: 2000;
                }
                
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    font-weight: 600;
                    color: var(--text-primary);
                }
                
                .toast-icon {
                    color: var(--success);
                    font-weight: 800;
                }
                
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @media (max-width: 1024px) {
                    .product-detail {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
    </AppLayout>
  )
}
