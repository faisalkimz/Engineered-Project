import React from 'react'
import AppLayout from '../../Components/Layout/AppLayout'
import { Link } from 'react-router-dom'

export default function CheckoutSuccess() {
    return (
        <AppLayout>
            <div className="success-page">
                <div className="container">
                    <div className="success-card">
                        <div className="success-icon">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h1>Order Placed Successfully!</h1>
                        <p>Thank you for your purchase. Your order has been received and is being processed.</p>
                        <div className="actions">
                            <Link to="/orders" className="btn btn-primary">View Orders</Link>
                            <Link to="/products" className="btn btn-outline">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx="true">{`
                .success-page {
                    padding: var(--spacing-3xl) 0;
                    min-height: calc(100vh - 80px - 400px);
                }
                .success-card {
                    max-width: 600px;
                    margin: 0 auto;
                    text-align: center;
                    padding: var(--spacing-3xl);
                    background: var(--bg-secondary);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-xl);
                }
                .success-icon {
                    margin: 0 auto var(--spacing-xl);
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, var(--success) 0%, hsl(142, 76%, 46%) 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .success-icon svg {
                    color: white;
                }
                .success-card h1 {
                    font-size: var(--font-size-3xl);
                    margin-bottom: var(--spacing-md);
                }
                .success-card p {
                    color: var(--text-secondary);
                    font-size: var(--font-size-lg);
                    margin-bottom: var(--spacing-2xl);
                }
                .actions {
                    display: flex;
                    gap: var(--spacing-md);
                    justify-content: center;
                    flex-wrap: wrap;
                }
            `}</style>
        </AppLayout>
    )
}
