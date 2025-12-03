import React from 'react'
import AppLayout from '../../Components/Layout/AppLayout'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import ProductCard from '../../Components/Products/ProductCard'

export default function WishlistIndex() {
    const { wishlist } = useWishlist()

    return (
        <AppLayout>
            <div className="wishlist-page">
                <div className="container">
                    <h1 className="page-title">My Wishlist ({wishlist.length})</h1>

                    {wishlist.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">❤️</div>
                            <h2>Your Wishlist is Empty</h2>
                            <p>Save items you love to your wishlist and review them here.</p>
                            <Link to="/products" className="btn btn-primary">Start Shopping</Link>
                        </div>
                    ) : (
                        <div className="product-grid">
                            {wishlist.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <style jsx="true">{`
                .wishlist-page {
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
                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: var(--spacing-lg);
                }
            `}</style>
        </AppLayout>
    )
}
