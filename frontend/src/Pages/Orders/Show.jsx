import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import AppLayout from '../../Components/Layout/AppLayout'
import { ordersAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

export default function OrderShow() {
    const { orderNumber } = useParams()
    const { isAuthenticated } = useAuth()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await ordersAPI.getOrder(orderNumber)
                setOrder(data.order)
            } catch (err) {
                console.error('Failed to fetch order:', err)
                setError('Failed to load order details.')
            } finally {
                setLoading(false)
            }
        }

        if (isAuthenticated) {
            fetchOrder()
        }
    }, [orderNumber, isAuthenticated])

    if (loading) {
        return (
            <AppLayout>
                <div className="order-detail-page">
                    <div className="container">
                        <div className="loading-state">Loading order details...</div>
                    </div>
                </div>
            </AppLayout>
        )
    }

    if (error || !order) {
        return (
            <AppLayout>
                <div className="order-detail-page">
                    <div className="container">
                        <div className="error-state">
                            <h2>Order Not Found</h2>
                            <p>{error || "We couldn't find the order you're looking for."}</p>
                            <Link to="/orders" className="btn btn-primary">Back to Orders</Link>
                        </div>
                    </div>
                </div>
            </AppLayout>
        )
    }

    return (
        <AppLayout>
            <div className="order-detail-page">
                <div className="container">
                    <div className="page-header">
                        <Link to="/orders" className="back-link">← Back to Orders</Link>
                        <h1 className="page-title">Order #{order.order_number}</h1>
                        <span className={`status-badge ${order.status}`}>{order.status}</span>
                    </div>

                    <div className="order-grid">
                        <div className="order-main">
                            <div className="card order-items">
                                <h2>Items</h2>
                                <div className="items-list">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="order-item">
                                            <div className="item-info">
                                                <h3>{item.product_name}</h3>
                                                {item.variant_name && <p className="variant">{item.variant_name}</p>}
                                                <p className="sku">SKU: {item.product_sku}</p>
                                            </div>
                                            <div className="item-meta">
                                                <span className="qty">{item.quantity} x ${item.price.toFixed(2)}</span>
                                                <span className="total">${item.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="card order-timeline">
                                <h2>Order Timeline</h2>
                                <div className="timeline-item">
                                    <div className="timeline-dot active"></div>
                                    <div className="timeline-content">
                                        <h4>Order Placed</h4>
                                        <p>{new Date(order.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                {/* Add more timeline items based on status if available */}
                            </div>
                        </div>

                        <div className="order-sidebar">
                            <div className="card order-summary">
                                <h2>Order Summary</h2>
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>${order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span>${order.shipping_cost.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tax</span>
                                    <span>${order.tax.toFixed(2)}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>${order.total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="card shipping-details">
                                <h2>Shipping Address</h2>
                                <p><strong>{order.shipping_address.full_name}</strong></p>
                                <p>{order.shipping_address.address_line1}</p>
                                {order.shipping_address.address_line2 && <p>{order.shipping_address.address_line2}</p>}
                                <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
                                <p>{order.shipping_address.country}</p>
                                <p>{order.shipping_address.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx="true">{`
                .order-detail-page {
                    padding: var(--spacing-2xl) 0 var(--spacing-3xl);
                    background: var(--bg-primary);
                    min-height: calc(100vh - 80px - 400px);
                }
                .page-header {
                    margin-bottom: var(--spacing-xl);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    flex-wrap: wrap;
                }
                .back-link {
                    color: var(--text-secondary);
                    font-weight: 500;
                    margin-right: auto;
                }
                .page-title {
                    font-size: var(--font-size-3xl);
                    margin: 0;
                }
                .status-badge {
                    padding: 4px 12px;
                    border-radius: var(--radius-full);
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    text-transform: uppercase;
                }
                .status-badge.pending { background: #fff7ed; color: #c2410c; }
                .status-badge.processing { background: #eff6ff; color: #1d4ed8; }
                .status-badge.shipped { background: #f0fdf4; color: #15803d; }
                .status-badge.delivered { background: #f0fdf4; color: #15803d; }
                .status-badge.cancelled { background: #fef2f2; color: #b91c1c; }

                .order-grid {
                    display: grid;
                    grid-template-columns: 1fr 350px;
                    gap: var(--spacing-xl);
                }

                .card {
                    background: var(--bg-secondary);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-xl);
                    box-shadow: var(--shadow-sm);
                    border: 1px solid var(--border-light);
                    margin-bottom: var(--spacing-lg);
                }
                .card h2 {
                    font-size: var(--font-size-lg);
                    margin-bottom: var(--spacing-lg);
                    padding-bottom: var(--spacing-sm);
                    border-bottom: 1px solid var(--border-light);
                }

                .order-item {
                    display: flex;
                    justify-content: space-between;
                    padding: var(--spacing-md) 0;
                    border-bottom: 1px solid var(--border-light);
                }
                .order-item:last-child {
                    border-bottom: none;
                }
                .item-info h3 {
                    font-size: var(--font-size-base);
                    margin-bottom: 4px;
                }
                .variant, .sku {
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                    margin: 0;
                }
                .item-meta {
                    text-align: right;
                }
                .qty {
                    display: block;
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                    margin-bottom: 4px;
                }
                .total {
                    font-weight: 600;
                }

                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: var(--spacing-sm);
                    font-size: var(--font-size-sm);
                }
                .summary-row.total {
                    margin-top: var(--spacing-md);
                    padding-top: var(--spacing-md);
                    border-top: 1px solid var(--border-light);
                    font-weight: 700;
                    font-size: var(--font-size-lg);
                }

                .timeline-item {
                    display: flex;
                    gap: var(--spacing-md);
                }
                .timeline-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: var(--border-light);
                    margin-top: 6px;
                }
                .timeline-dot.active {
                    background: var(--success);
                }
                .timeline-content h4 {
                    font-size: var(--font-size-sm);
                    margin-bottom: 2px;
                }
                .timeline-content p {
                    font-size: var(--font-size-xs);
                    color: var(--text-secondary);
                }

                @media (max-width: 1024px) {
                    .order-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </AppLayout>
    )
}
