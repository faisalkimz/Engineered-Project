import React from 'react'
import { Link } from 'react-router-dom'
import { useQuickView } from '../../context/QuickViewContext'
import { useWishlist } from '../../context/WishlistContext'

export default function ProductCard({ product }) {
    const { openQuickView } = useQuickView()
    const { addToWishlist, isInWishlist } = useWishlist()

    const handleQuickView = (e) => {
        e.preventDefault()
        openQuickView(product)
    }

    const handleWishlist = (e) => {
        e.preventDefault()
        addToWishlist(product)
    }

    return (
        <Link to={`/products/${product.slug || product.id}`} className="product-card group">
            <div className="product-image-container">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                    />
                ) : (
                    <div className="product-image-placeholder">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                    </div>
                )}

                {/* Overlay Buttons */}
                <div className="card-overlay">
                    <button
                        className="overlay-btn"
                        onClick={handleQuickView}
                        title="Quick View"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                    <button
                        className={`overlay-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                        onClick={handleWishlist}
                        title="Add to Wishlist"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>

                {(product.discount_percent > 0 || product.discount) && (
                    <div className="product-badge">-{product.discount_percent || product.discount}%</div>
                )}
            </div>
            <div className="product-info">
                {product.brand && (
                    <p className="product-brand">{product.brand}</p>
                )}
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                    <div className="stars">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(product.rating || 4) ? 'star filled' : 'star'}>
                                ★
                            </span>
                        ))}
                    </div>
                    <span className="rating-count">({product.review_count || product.reviews || 0})</span>
                </div>
                <div className="product-price">
                    <span className="price-current">${product.price.toFixed(2)}</span>
                    {(product.compare_at_price || product.oldPrice) && (
                        <span className="price-old">${(product.compare_at_price || product.oldPrice).toFixed(2)}</span>
                    )}
                </div>
            </div>

            <style jsx="true">{`
                .product-card {
                    display: block;
                    background: var(--bg-secondary);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    box-shadow: var(--shadow-sm);
                    transition: all var(--transition-base);
                    text-decoration: none;
                    color: var(--text-primary);
                    position: relative;
                }
                
                .product-card:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-lg);
                }
                
                .product-image-container {
                    position: relative;
                    width: 100%;
                    padding-top: 100%;
                    background: var(--bg-primary);
                    overflow: hidden;
                }
                
                .product-image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform var(--transition-base);
                    mix-blend-mode: multiply;
                }
                
                .product-card:hover .product-image {
                    transform: scale(1.05);
                }
                
                .card-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--spacing-sm);
                    opacity: 0;
                    transition: opacity var(--transition-base);
                }

                .product-card:hover .card-overlay {
                    opacity: 1;
                }

                .overlay-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: white;
                    border: none;
                    color: var(--text-secondary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transform: translateY(20px);
                    transition: all var(--transition-base);
                    box-shadow: var(--shadow-md);
                }

                .product-card:hover .overlay-btn {
                    transform: translateY(0);
                }

                .overlay-btn:hover {
                    background: var(--primary);
                    color: white;
                }

                .overlay-btn.active {
                    color: var(--accent);
                }
                
                .product-image-placeholder {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-muted);
                }
                
                .product-badge {
                    position: absolute;
                    top: var(--spacing-sm);
                    right: var(--spacing-sm);
                    background: var(--accent);
                    color: white;
                    padding: var(--spacing-xs) var(--spacing-sm);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-xs);
                    font-weight: 700;
                    z-index: 2;
                }
                
                .product-info {
                    padding: var(--spacing-md);
                }
                
                .product-brand {
                    font-size: var(--font-size-xs);
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: var(--spacing-xs);
                }
                
                .product-name {
                    font-size: var(--font-size-base);
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-sm);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    line-height: 1.4;
                    height: 2.8em;
                }
                
                .product-rating {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    margin-bottom: var(--spacing-sm);
                }
                
                .stars {
                    display: flex;
                    gap: 2px;
                }
                
                .star {
                    color: var(--border-medium);
                    font-size: var(--font-size-sm);
                }
                
                .star.filled {
                    color: #fbbf24;
                }
                
                .rating-count {
                    font-size: var(--font-size-xs);
                    color: var(--text-muted);
                }
                
                .product-price {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                }
                
                .price-current {
                    font-size: var(--font-size-xl);
                    font-weight: 700;
                    color: var(--primary);
                }
                
                .price-old {
                    font-size: var(--font-size-base);
                    color: var(--text-muted);
                    text-decoration: line-through;
                }
            `}</style>
        </Link>
    )
}
