import React from 'react'
import { Link } from 'react-router-dom'

export default function CartItem({ item, updateQuantity, removeItem }) {
    return (
        <div className="cart-item">
            <div className="item-image">
                {item.product.image ? (
                    <img
                        src={item.product.image}
                        alt={item.product.name}
                    />
                ) : (
                    <div className="image-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                    </div>
                )}
            </div>

            <div className="item-details">
                <div className="item-info">
                    <Link to={`/products/${item.product.id}`} className="item-name">
                        {item.product.name}
                    </Link>
                    {item.product.brand && (
                        <p className="item-brand">{item.product.brand}</p>
                    )}
                    <p className="item-price">${item.product.price}</p>
                </div>

                <div className="item-actions">
                    <div className="quantity-control">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="qty-btn"
                            disabled={item.quantity <= 1}
                        >
                            −
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="qty-btn"
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={() => removeItem(item.id)}
                        className="remove-btn"
                        title="Remove item"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>

                <div className="item-subtotal">
                    <span className="subtotal-label">Subtotal:</span>
                    <span className="subtotal-value">${item.subtotal.toFixed(2)}</span>
                </div>
            </div>

            <style jsx="true">{`
                .cart-item {
                    display: flex;
                    gap: var(--spacing-lg);
                    padding: var(--spacing-lg);
                    background: var(--bg-secondary);
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-sm);
                }
                
                .item-image {
                    flex-shrink: 0;
                    width: 120px;
                    height: 120px;
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    background: var(--bg-primary);
                }
                
                .item-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .image-placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-muted);
                }
                
                .item-details {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }
                
                .item-name {
                    font-size: var(--font-size-lg);
                    font-weight: 600;
                    color: var(--text-primary);
                    text-decoration: none;
                    transition: color var(--transition-fast);
                }
                
                .item-name:hover {
                    color: var(--primary);
                }
                
                .item-brand {
                    font-size: var(--font-size-sm);
                    color: var(--text-muted);
                }
                
                .item-price {
                    font-size: var(--font-size-base);
                    color: var(--text-secondary);
                    margin-top: var(--spacing-xs);
                }
                
                .item-actions {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                }
                
                .quantity-control {
                    display: flex;
                    align-items: center;
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-md);
                    overflow: hidden;
                }
                
                .qty-btn {
                    width: 36px;
                    height: 36px;
                    border: none;
                    background: var(--bg-secondary);
                    cursor: pointer;
                    font-size: var(--font-size-lg);
                    transition: background var(--transition-fast);
                }
                
                .qty-btn:hover:not(:disabled) {
                    background: var(--bg-primary);
                }
                
                .qty-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .qty-value {
                    min-width: 50px;
                    text-align: center;
                    font-weight: 600;
                }
                
                .remove-btn {
                    padding: var(--spacing-xs);
                    border: none;
                    background: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    transition: color var(--transition-fast);
                }
                
                .remove-btn:hover {
                    color: var(--error);
                }
                
                .item-subtotal {
                    display: flex;
                    justify-content: space-between;
                    margin-top: auto;
                    padding-top: var(--spacing-md);
                    border-top: 1px solid var(--border-light);
                }
                
                .subtotal-label {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }
                
                .subtotal-value {
                    font-size: var(--font-size-xl);
                    font-weight: 700;
                    color: var(--primary);
                }
                
                @media (max-width: 640px) {
                    .cart-item {
                        flex-direction: column;
                    }
                    
                    .item-image {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    )
}
