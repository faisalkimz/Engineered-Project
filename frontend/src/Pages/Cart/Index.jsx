import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import AppLayout from '../../Components/Layout/AppLayout'
import CartItem from '../../Components/Cart/CartItem'
import CartSummary from '../../Components/Cart/CartSummary'

export default function CartIndex() {
    const { cart, updateQuantity, removeFromCart } = useCart()

    return (
        <AppLayout>
            <div className="cart-page">
                <div className="container">
                    <h1 className="page-title">Shopping Cart</h1>

                    {cart.items.length > 0 ? (
                        <div className="cart-layout">
                            <div className="cart-items">
                                {cart.items.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        updateQuantity={updateQuantity}
                                        removeItem={removeFromCart}
                                    />
                                ))}
                            </div>

                            <CartSummary total={cart.total} />
                        </div>
                    ) : (
                        <div className="empty-cart">
                            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            <h2>Your cart is empty</h2>
                            <p>Looks like you haven't added anything yet</p>
                            <Link to="/products" className="btn btn-primary">
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <style jsx="true">{`
                .cart-page {
                    padding: var(--spacing-2xl) 0 var(--spacing-3xl);
                    min-height: calc(100vh - 80px - 400px);
                }
                
                .page-title {
                    font-size: var(--font-size-4xl);
                    margin-bottom: var(--spacing-2xl);
                }
                
                .cart-layout {
                    display: grid;
                    grid-template-columns: 1fr 380px;
                    gap: var(--spacing-2xl);
                    align-items: start;
                }
                
                .cart-items {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }
                
                .empty-cart {
                    text-align: center;
                    padding: var(--spacing-3xl);
                    background: var(--bg-secondary);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-md);
                }
                
                .empty-cart svg {
                    margin: 0 auto var(--spacing-lg);
                    color: var(--text-muted);
                }
                
                .empty-cart h2 {
                    font-size: var(--font-size-2xl);
                    margin-bottom: var(--spacing-sm);
                }
                
                .empty-cart p {
                    color: var(--text-secondary);
                    margin-bottom: var(--spacing-xl);
                }
                
                @media (max-width: 1024px) {
                    .cart-layout {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </AppLayout>
    )
}
