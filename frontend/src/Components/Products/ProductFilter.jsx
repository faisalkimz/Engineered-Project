import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductFilter({ categories, currentCategory }) {
    return (
        <div className="filter-panel">
            <h3 className="filter-title">Categories</h3>
            <ul className="category-list">
                {categories.map(cat => (
                    <li key={cat.id}>
                        <Link
                            to={cat.id === 'all' ? '/products' : `/products?category=${cat.id}`}
                            className={`category-link ${currentCategory === cat.id ? 'active' : ''}`}
                        >
                            <span className="category-name">{cat.name}</span>
                            <span className="category-count">{cat.count}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <style jsx="true">{`
                .filter-panel {
                    background: var(--bg-secondary);
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-sm);
                }
                
                .filter-title {
                    font-size: var(--font-size-lg);
                    font-weight: 700;
                    margin-bottom: var(--spacing-lg);
                    color: var(--text-primary);
                }
                
                .category-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xs);
                }
                
                .category-link {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--radius-md);
                    text-decoration: none;
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                    transition: all var(--transition-fast);
                }
                
                .category-link:hover {
                    background: rgba(255, 107, 0, 0.05);
                    color: var(--primary);
                }
                
                .category-link.active {
                    background: linear-gradient(135deg, rgba(255, 107, 0, 0.1) 0%, rgba(155, 81, 224, 0.1) 100%);
                    color: var(--primary);
                    font-weight: 600;
                }
                
                .category-name {
                    flex: 1;
                }
                
                .category-count {
                    background: var(--bg-primary);
                    color: var(--text-muted);
                    padding: 2px 8px;
                    border-radius: var(--radius-full);
                    font-size: var(--font-size-xs);
                    font-weight: 600;
                }
                
                .category-link.active .category-count {
                    background: var(--primary);
                    color: white;
                }
            `}</style>
        </div>
    )
}
