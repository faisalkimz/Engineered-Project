import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AppLayout from '../../Components/Layout/AppLayout'
import ProductGrid from '../../Components/Products/ProductGrid'
import ProductFilter from '../../Components/Products/ProductFilter'
import { useProducts, useCategories } from '../../hooks/useAPI'

export default function ProductsIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [sortBy, setSortBy] = useState('featured')

    // Get filter params from URL
    const category = searchParams.get('category') || ''
    const search = searchParams.get('search') || ''
    const minPrice = searchParams.get('min_price') || ''
    const maxPrice = searchParams.get('max_price') || ''
    const brand = searchParams.get('brand') || ''

    // Fetch data
    const { data: productsData, isLoading, error } = useProducts({
        category,
        search,
        min_price: minPrice,
        max_price: maxPrice,
        brand,
        ordering: sortBy,
    })

    const { data: categoriesData } = useCategories()

    const handleSortChange = (e) => {
        setSortBy(e.target.value)
    }

    // Show loading state
    if (isLoading) {
        return (
            <AppLayout>
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading amazing products...</p>
                </div>

                <style jsx="true">{`
                    .loading-container {
                        min-height: 60vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: var(--spacing-md);
                    }

                    .spinner {
                        width: 50px;
                        height: 50px;
                        border: 4px solid var(--border-light);
                        border-top-color: var(--primary);
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    }

                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }

                    .loading-container p {
                        color: var(--text-secondary);
                        font-size: var(--font-size-lg);
                    }
                `}</style>
            </AppLayout>
        )
    }

    // Show error state
    if (error) {
        return (
            <AppLayout>
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h2>Oops! Something went wrong</h2>
                    <p>{error.message || 'Failed to load products'}</p>
                    <button className="btn btn-primary" onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                </div>

                <style jsx="true">{`
                    .error-container {
                        min-height: 60vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: var(--spacing-md);
                        text-align: center;
                    }

                    .error-icon {
                        font-size: 4rem;
                    }

                    .error-container h2 {
                        color: var(--text-primary);
                    }

                    .error-container p {
                        color: var(--text-secondary);
                    }
                `}</style>
            </AppLayout>
        )
    }

    const products = productsData?.results || []
    const totalCount = productsData?.count || 0

    return (
        <AppLayout>
            <div className="products-page">
                <div className="container">
                    <div className="page-header">
                        <h1 className="page-title">Discover Our Products</h1>
                        <p className="page-subtitle">
                            Premium tech products handpicked just for you
                        </p>
                    </div>

                    <div className="products-layout">
                        <aside className="filters-sidebar">
                            <ProductFilter
                                categories={categoriesData?.categories || []}
                                currentCategory={category}
                            />
                        </aside>

                        <div className="products-content">
                            <div className="products-header">
                                <p className="products-count">
                                    {totalCount} product{totalCount !== 1 ? 's' : ''} found
                                </p>
                                <select
                                    className="sort-select"
                                    value={sortBy}
                                    onChange={handleSortChange}
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price">Price: Low to High</option>
                                    <option value="-price">Price: High to Low</option>
                                    <option value="-average_rating">Highest Rated</option>
                                    <option value="-created_at">Newest First</option>
                                </select>
                            </div>

                            {products.length > 0 ? (
                                <ProductGrid products={products} />
                            ) : (
                                <div className="no-products">
                                    <div className="no-products-icon">🔍</div>
                                    <h3>No products found</h3>
                                    <p>Try adjusting your filters or search terms</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx="true">{`
                .products-page {
                    padding: var(--spacing-2xl) 0 var(--spacing-3xl);
                    min-height: calc(100vh - 80px - 400px);
                }
                
                .page-header {
                    text-align: center;
                    margin-bottom: var(--spacing-3xl);
                }
                
                .page-title {
                    font-size: var(--font-size-4xl);
                    margin-bottom: var(--spacing-sm);
                    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .page-subtitle {
                    font-size: var(--font-size-lg);
                    color: var(--text-secondary);
                }
                
                .products-layout {
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: var(--spacing-2xl);
                }
                
                .filters-sidebar {
                    position: sticky;
                    top: 100px;
                    height: fit-content;
                }
                
                .products-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--spacing-xl);
                    padding-bottom: var(--spacing-md);
                    border-bottom: 1px solid var(--border-light);
                }
                
                .products-count {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                    font-weight: 500;
                }
                
                .sort-select {
                    padding: var(--spacing-xs) var(--spacing-md);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-sm);
                    color: var(--text-primary);
                    background: var(--bg-secondary);
                    cursor: pointer;
                    transition: all var(--transition-fast);
                }
                
                .sort-select:hover {
                    border-color: var(--primary);
                }
                
                .sort-select:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }

                .no-products {
                    text-align: center;
                    padding: var(--spacing-3xl) var(--spacing-xl);
                }

                .no-products-icon {
                    font-size: 4rem;
                    margin-bottom: var(--spacing-md);
                }

                .no-products h3 {
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-sm);
                }

                .no-products p {
                    color: var(--text-secondary);
                }
                
                @media (max-width: 1024px) {
                    .products-layout {
                        grid-template-columns: 1fr;
                    }
                    
                    .filters-sidebar {
                        position: static;
                    }
                }

                @media (max-width: 768px) {
                    .page-title {
                        font-size: var(--font-size-3xl);
                    }

                    .products-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: var(--spacing-sm);
                    }

                    .sort-select {
                        width: 100%;
                    }
                }
            `}</style>
        </AppLayout>
    )
}
