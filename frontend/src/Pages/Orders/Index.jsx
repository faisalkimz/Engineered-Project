import React, { useState, useEffect } from 'react'
import AppLayout from '../../Components/Layout/AppLayout'
import { Link } from 'react-router-dom'
import { ordersAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

export default function OrdersIndex() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await ordersAPI.getOrders()
                setOrders(data.orders)
            } catch (err) {
                console.error('Failed to fetch orders:', err)
                setError('Failed to load your orders. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        if (isAuthenticated) {
            fetchOrders()
        } else {
            setLoading(false)
        }
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return (
            <AppLayout>
                <div className="orders-page">
                    <div className="container">
                        <div className="empty-state">
                            <h2>Please Log In</h2>
                            <p>You need to be logged in to view your order history.</p>
                            <Link to="/login" className="btn btn-primary">Log In</Link>
                        </div>
                    </div>
                </div>
            </AppLayout>
        )
    }

    if (loading) {
        return (
            <AppLayout>
                <div className="orders-page">
                    <div className="container">
                        <div className="loading-state">Loading orders...</div>
                    </div>
                </div>
            </AppLayout>
        )
    }

    if (error) {
        return (
            <AppLayout>
                <div className="orders-page">
                    <div className="container">
                        <div className="error-state">{error}</div>
                    </div>
                </div>
            </AppLayout>
        )
    }

    return (
        <AppLayout>
            <div className="orders-page">
                <div className="container">
                    <h1 className="page-title">Order History</h1>

                    {orders.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📦</div>
                            <h2>No Orders Yet</h2>
                            <p>You haven't placed any orders yet.</p>
                            <Link to="/products" className="btn btn-primary">Start Shopping</Link>
                        </div>
                    ) : (
                        <div className="orders-list">
                            {orders.map(order => (
                                <div key={order.id} className="order-card">
                                    <div className="order-header">
                                        <div className="order-info">
                                            <h3>Order #{order.order_number}</h3>
                                            <span className="order-date">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="order-status">
                                            <span className={`status-badge ${order.status}`}>
                                                {order.status}
                                            </span>
                                            <span className="order-total">${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="order-items-preview">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="preview-item">
                                                <span className="item-qty">{item.quantity}x</span>
                                                <span className="item-name">{item.product_name}</span>
                                            </div>
                                        ))}
                                        {order.items_count > 3 && (
                                            <div className="more-items">
                                                +{order.items_count - 3} more items
                                            </div>
                                        )}
                                    </div>
                                    <div className="order-actions">
                                        <Link to={`/orders/${order.order_number}`} className="btn btn-outline btn-sm">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <style jsx="true">{`
                .orders-page {
                    padding: var(--spacing-2xl) 0 var(--spacing-3xl);
                    min-height: calc(100vh - 80px - 400px);
                    background: var(--bg-primary);
                }
                .page-title {
                    font-size: var(--font-size-3xl);
                    margin-bottom: var(--spacing-xl);
                }
                .empty-state {
                    text-align: center;
                    padding: var(--spacing-3xl);
                    background: var(--bg-secondary);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-sm);
                }
                .empty-icon {
                    font-size: 4rem;
                    margin-bottom: var(--spacing-md);
                }
                .empty-state h2 {
                    margin-bottom: var(--spacing-sm);
                }
                .empty-state p {
                    color: var(--text-secondary);
                    margin-bottom: var(--spacing-xl);
                }
                .orders-list {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                }
                .order-card {
                    background: var(--bg-secondary);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-xl);
                    box-shadow: var(--shadow-sm);
                    border: 1px solid var(--border-light);
                    transition: transform var(--transition-fast);
                }
                .order-card:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                }
                .order-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: var(--spacing-lg);
                    padding-bottom: var(--spacing-md);
                    border-bottom: 1px solid var(--border-light);
                }
                .order-info h3 {
                    font-size: var(--font-size-lg);
                    margin-bottom: var(--spacing-xs);
                }
                .order-date {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }
                .order-status {
                    text-align: right;
                }
                .status-badge {
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: var(--radius-full);
                    font-size: var(--font-size-xs);
                    font-weight: 600;
                    text-transform: uppercase;
                    margin-bottom: var(--spacing-xs);
                }
                .status-badge.pending { background: #fff7ed; color: #c2410c; }
                .status-badge.processing { background: #eff6ff; color: #1d4ed8; }
                .status-badge.shipped { background: #f0fdf4; color: #15803d; }
                .status-badge.delivered { background: #f0fdf4; color: #15803d; }
                .status-badge.cancelled { background: #fef2f2; color: #b91c1c; }
                
                .order-total {
                    display: block;
                    font-weight: 700;
                    font-size: var(--font-size-lg);
                }
                .order-items-preview {
                    margin-bottom: var(--spacing-lg);
                }
                .preview-item {
                    display: flex;
                    gap: var(--spacing-sm);
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                    margin-bottom: 4px;
                }
                .item-qty {
                    font-weight: 600;
                    color: var(--text-primary);
                }
                .more-items {
                    font-size: var(--font-size-xs);
                    color: var(--text-muted);
                    margin-top: var(--spacing-xs);
                }
                .order-actions {
                    display: flex;
                    justify-content: flex-end;
                }
                @media (max-width: 640px) {
                    .order-header {
                        flex-direction: column;
                        gap: var(--spacing-md);
                    }
                    .order-status {
                        text-align: left;
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        align-items: center;
                    }
                }
            `}</style>
        </AppLayout>
    )
}
