import React from 'react'
import { Link } from 'react-router-dom'

export default function CartSummary({ total }) {
    const shipping = 0 // Free shipping
    const tax = (total * 0.1).toFixed(2) // 10% tax
    const finalTotal = (parseFloat(total) + parseFloat(tax)).toFixed(2)

    return (
        <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <dl className="summary-list">
                <div className="summary-row">
                    <dt>Subtotal</dt>
                    <dd>${total.toFixed(2)}</dd>
                </div>
                <div className="summary-row">
                    <dt>Shipping</dt>
                    <dd className="free-badge">FREE</dd>
                </div>
                <div className="summary-row">
                    <dt>Estimated Tax</dt>
                    <dd>${tax}</dd>
                </div>
                <div className="summary-row total-row">
                    <dt>Order Total</dt>
                    <dd>${finalTotal}</dd>
                </div>
            </dl>

            <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: 'var(--spacing-md)' }}>
                Proceed to Checkout
            </Link>

            <Link to="/products" className="btn btn-outline" style={{ width: '100%' }}>
                Continue Shopping
            </Link>

            <div className="benefits">
                <div className="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Free shipping on all orders</span>
                </div>
                <div className="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>30-day return guarantee</span>
                </div>
                <div className="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Secure checkout</span>
                </div>
            </div>

            <style jsx="true">{`
                .cart-summary {
                    background: var(--bg-secondary);
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-lg);
                    position: sticky;
                    top: 100px;
                }
                
                .summary-title {
                    font-size: var(--font-size-xl);
                    margin-bottom: var(--spacing-lg);
                    padding-bottom: var(--spacing-md);
                    border-bottom: 2px solid var(--border-light);
                }
                
                .summary-list {
                    display: flex;
                    flex-direction: column;
                    gap: var (--spacing-md);
                    margin-bottom: var(--spacing-xl);
                }
                
                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--spacing-sm) 0;
                }
                
                .summary-row dt {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }
                
                .summary-row dd {
                    font-weight: 600;
                    color: var(--text-primary);
                }
                
                .total-row {
                    margin-top: var(--spacing-md);
                    padding-top: var(--spacing-lg);
                    border-top: 2px solid var(--border-light);
                }
                
                .total-row dt {
                    font-size: var(--font-size-base);
                    font-weight: 700;
                    color: var(--text-primary);
                }
                
                .total-row dd {
                    font-size: var(--font-size-2xl);
                    font-weight: 800;
                    color: var(--primary);
                }
                
                .free-badge {
                    background: var(--success);
                    color: white;
                    padding: 2px 8px;
                    border-radius: var(--radius-full);
                    font-size: var(--font-size-xs);
                    font-weight: 700;
                }
                
                .benefits {
                    margin-top: var(--spacing-xl);
                    padding-top: var(--spacing-lg);
                    border-top: 1px solid var(--border-light);
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-sm);
                }
                
                .benefit-item {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                }
                
                .benefit-item svg {
                    color: var(--success);
                    flex-shrink: 0;
                }
            `}</style>
        </div>
    )
}
