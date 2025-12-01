import React from 'react'
import AppLayout from '../../Components/Layout/AppLayout'
import { Link } from 'react-router-dom'

export default function OrdersIndex() {
    return (
        <AppLayout>
            <div className="orders-page">
                <div className="container">
                    <h1 className="page-title">Order History</h1>
                    <div className="coming-soon">
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <h2>Order History Coming Soon</h2>
                        <p>Track your orders and view past purchases</p>
                        <Link to="/products" className="btn btn-primary">Start Shopping</Link>
                    </div>
                </div>
            </div>
            <style jsx="true">{`
                .orders-page {
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
