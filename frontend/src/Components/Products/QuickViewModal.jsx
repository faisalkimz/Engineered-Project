import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuickView } from '../../context/QuickViewContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

export default function QuickViewModal() {
    const { isOpen, selectedProduct, closeQuickView } = useQuickView()
    const { addToCart } = useCart()
    const { addToWishlist, isInWishlist } = useWishlist()
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)

    if (!isOpen || !selectedProduct) return null

    const handleAddToCart = () => {
        addToCart(selectedProduct, quantity)
        closeQuickView()
    }

    // Handle click outside to close
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeQuickView()
        }
    }

    const discount = selectedProduct.compare_at_price
        ? Math.round(((selectedProduct.compare_at_price - selectedProduct.price) / selectedProduct.compare_at_price) * 100)
        : 0

    return (
        <div className="quickview-backdrop" onClick={handleBackdropClick}>
            <div className="quickview-modal animate-scaleIn">
                <button className="close-btn" onClick={closeQuickView}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="quickview-content">
                    {/* Image Section */}
                    <div className="product-images">
                        <div className="main-image">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                            />
                            {discount > 0 && (
                                <span className="discount-badge">-{discount}%</span>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="product-details">
                        <div className="product-header">
                            {selectedProduct.brand && (
                                <span className="product-brand">{selectedProduct.brand}</span>
                            )}
                            <h2 className="product-title">{selectedProduct.name}</h2>

                            <div className="product-rating">
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`star ${i < Math.round(selectedProduct.rating || 0) ? 'filled' : ''}`}>★</span>
                                    ))}
                                </div>
                                <span className="rating-count">({selectedProduct.review_count || 0} reviews)</span>
                            </div>
                        </div>

                        <div className="product-price-box">
                            <div className="current-price">${selectedProduct.price.toFixed(2)}</div>
                            {selectedProduct.compare_at_price && (
                                <div className="old-price">${selectedProduct.compare_at_price.toFixed(2)}</div>
                            )}
                        </div>

                        <p className="product-description">
                            {selectedProduct.description?.substring(0, 150)}...
                        </p>

                        <div className="product-actions">
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>

                            <button onClick={handleAddToCart} className="btn btn-primary btn-lg add-to-cart">
                                Add to Cart
                            </button>

                            <button
                                onClick={() => addToWishlist(selectedProduct)}
                                className={`btn-wishlist ${isInWishlist(selectedProduct.id) ? 'active' : ''}`}
                                title="Add to Wishlist"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill={isInWishlist(selectedProduct.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="view-full-details">
                            <Link to={`/products/${selectedProduct.slug}`} onClick={closeQuickView}>
                                View Full Details →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx="true">{`
                .quickview-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(4px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: var(--spacing-md);
                }

                .quickview-modal {
                    background: white;
                    border-radius: var(--radius-xl);
                    width: 100%;
                    max-width: 900px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: var(--shadow-2xl);
                }

                .close-btn {
                    position: absolute;
                    top: var(--spacing-md);
                    right: var(--spacing-md);
                    background: rgba(255, 255, 255, 0.9);
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    transition: all var(--transition-fast);
                }

                .close-btn:hover {
                    background: var(--bg-secondary);
                    transform: rotate(90deg);
                }

                .quickview-content {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    max-height: 90vh;
                    overflow-y: auto;
                }

                .product-images {
                    background: var(--bg-secondary);
                    padding: var(--spacing-2xl);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .main-image {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 1;
                }

                .main-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    mix-blend-mode: multiply;
                }

                .discount-badge {
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: var(--accent);
                    color: white;
                    padding: 4px 8px;
                    border-radius: var(--radius-sm);
                    font-weight: 700;
                    font-size: var(--font-size-sm);
                }

                .product-details {
                    padding: var(--spacing-2xl);
                    display: flex;
                    flex-direction: column;
                }

                .product-brand {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-weight: 600;
                }

                .product-title {
                    font-size: var(--font-size-2xl);
                    margin: var(--spacing-xs) 0 var(--spacing-sm);
                    line-height: 1.2;
                }

                .product-rating {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    margin-bottom: var(--spacing-lg);
                }

                .stars {
                    color: #fbbf24;
                    font-size: 1.1rem;
                }

                .rating-count {
                    color: var(--text-muted);
                    font-size: var(--font-size-sm);
                }

                .product-price-box {
                    display: flex;
                    align-items: baseline;
                    gap: var(--spacing-md);
                    margin-bottom: var(--spacing-lg);
                }

                .current-price {
                    font-size: var(--font-size-3xl);
                    font-weight: 700;
                    color: var(--primary);
                }

                .old-price {
                    font-size: var(--font-size-lg);
                    color: var(--text-muted);
                    text-decoration: line-through;
                }

                .product-description {
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin-bottom: var(--spacing-xl);
                }

                .product-actions {
                    display: flex;
                    gap: var(--spacing-md);
                    margin-bottom: var(--spacing-xl);
                }

                .quantity-selector {
                    display: flex;
                    align-items: center;
                    border: 2px solid var(--border-light);
                    border-radius: var(--radius-md);
                    height: 48px;
                }

                .quantity-selector button {
                    width: 40px;
                    height: 100%;
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    color: var(--text-secondary);
                }

                .quantity-selector button:hover {
                    background: var(--bg-secondary);
                    color: var(--primary);
                }

                .quantity-selector span {
                    width: 40px;
                    text-align: center;
                    font-weight: 600;
                }

                .add-to-cart {
                    flex: 1;
                }

                .btn-wishlist {
                    width: 48px;
                    height: 48px;
                    border: 2px solid var(--border-light);
                    border-radius: var(--radius-md);
                    background: white;
                    color: var(--text-secondary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                }

                .btn-wishlist:hover {
                    border-color: var(--accent);
                    color: var(--accent);
                }

                .btn-wishlist.active {
                    background: var(--accent);
                    border-color: var(--accent);
                    color: white;
                }

                .view-full-details {
                    margin-top: auto;
                    text-align: center;
                    padding-top: var(--spacing-lg);
                    border-top: 1px solid var(--border-light);
                }

                .view-full-details a {
                    color: var(--primary);
                    font-weight: 600;
                    text-decoration: none;
                }

                .view-full-details a:hover {
                    text-decoration: underline;
                }

                @media (max-width: 768px) {
                    .quickview-content {
                        grid-template-columns: 1fr;
                    }

                    .product-images {
                        padding: var(--spacing-lg);
                    }

                    .product-details {
                        padding: var(--spacing-lg);
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-scaleIn {
                    animation: scaleIn 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    )
}
