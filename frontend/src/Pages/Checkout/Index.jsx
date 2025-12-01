import React from 'react'
import AppLayout from '../../Components/Layout/AppLayout'
import { Link } from 'react-router-dom'

export default function CheckoutIndex() {
    return (
        <AppLayout>
            <div className="checkout-page">
                <div className="container">
                    <h1 className="page-title">Checkout</h1>
                    <div className="coming-soon">
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <h2>Checkout Page Coming Soon</h2>
                        <p>We're working on bringing you a secure and seamless checkout experience</p>
                        <Link to="/" className="btn btn-primary">Return Home</Link>
                    </div>
                </div>
            </div>
            <style jsx="true">{`
                .checkout-page {
                    padding: var(--spacing-2xl) 0 var(--spacing-3xl);
                    min-height: calc(100vh - 80px - 400px);
                }
                .page-title {
                    font-size: var(--font-size-4xl);
                    margin-bottom: var(--spacing-2xl);
                    text-align: center;
                }
                .coming-soon {
                    text-align: center;
                    padding: var(--spacing-3xl);
                    background: var(--bg-secondary);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-lg);
                }
                .coming-soon svg {
                    margin: 0 auto var(--spacing-lg);
                    color: var(--primary);
                }
                .coming-soon h2 {
                    font-size: var(--font-size-2xl);
                    margin-bottom: var(--spacing-sm);
                }
                .coming-soon p {
                    color: var(--text-secondary);
                    margin-bottom: var(--spacing-xl);
                }
            `}</style>
        </AppLayout>
    )
}
