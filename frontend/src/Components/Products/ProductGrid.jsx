import React from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {
    if (!products || products.length === 0) {
        return (
            <div className="empty-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <h3>No products found</h3>
                <p>Try adjusting your filters or check back later</p>

                <style jsx="true">{`
                    .empty-state {
                        text-align: center;
                        padding: var(--spacing-3xl);
                        color: var(--text-secondary);
                    }
                    
                    .empty-state svg {
                        margin: 0 auto var(--spacing-lg);
                        color: var(--text-muted);
                    }
                    
                    .empty-state h3 {
                        font-size: var(--font-size-xl);
                        margin-bottom: var(--spacing-sm);
                        color: var(--text-primary);
                    }
                    
                    .empty-state p {
                        font-size: var(--font-size-base);
                    }
                `}</style>
            </div>
        )
    }

    return (
        <div className="product-grid">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}

            <style jsx="true">{`
                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: var(--spacing-xl);
                }
                
                @media (max-width: 640px) {
                    .product-grid {
                        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                        gap: var(--spacing-md);
                    }
                }
            `}</style>
        </div>
    )
}
