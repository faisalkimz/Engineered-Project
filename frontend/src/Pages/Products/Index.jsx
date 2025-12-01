import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AppLayout from '../../Components/Layout/AppLayout'
import ProductGrid from '../../Components/Products/ProductGrid'
import ProductFilter from '../../Components/Products/ProductFilter'

// Mock products data
const mockProducts = [
    {
        id: 1,
        name: 'iPhone 15 Pro Max',
        brand: 'Apple',
        price: 1199,
        oldPrice: 1299,
        discount: 8,
        image: 'https://images.unsplash.com/photo-1696446702463-69e2e6498430?w=500',
        rating: 5,
        reviews: 234,
        category: 'phones'
    },
    {
        id: 2,
        name: 'Samsung Galaxy S24 Ultra',
        brand: 'Samsung',
        price: 1099,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
        rating: 5,
        reviews: 189,
        category: 'phones'
    },
    {
        id: 3,
        name: 'MacBook Pro 16" M3',
        brand: 'Apple',
        price: 2499,
        oldPrice: 2699,
        discount: 7,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        rating: 5,
        reviews: 456,
        category: 'laptops'
    },
    {
        id: 4,
        name: 'Dell XPS 15',
        brand: 'Dell',
        price: 1799,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
        rating: 4,
        reviews: 321,
        category: 'laptops'
    },
    {
        id: 5,
        name: 'AirPods Pro (2nd Gen)',
        brand: 'Apple',
        price: 249,
        image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500',
        rating: 5,
        reviews: 789,
        category: 'accessories'
    },
    {
        id: 6,
        name: 'Sony WH-1000XM5',
        brand: 'Sony',
        price: 399,
        oldPrice: 449,
        discount: 11,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcf?w=500',
        rating: 5,
        reviews: 543,
        category: 'accessories'
    },
    {
        id: 7,
        name: 'Google Pixel 8 Pro',
        brand: 'Google',
        price: 999,
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
        rating: 4,
        reviews: 267,
        category: 'phones'
    },
    {
        id: 8,
        name: 'iPad Pro 12.9"',
        brand: 'Apple',
        price: 1099,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        rating: 5,
        reviews: 412,
        category: 'accessories'
    }
]

const categories = [
    { id: 'all', name: 'All Products', count: mockProducts.length },
    { id: 'phones', name: 'Smartphones', count: mockProducts.filter(p => p.category === 'phones').length },
    { id: 'laptops', name: 'Laptops', count: mockProducts.filter(p => p.category === 'laptops').length },
    { id: 'accessories', name: 'Accessories', count: mockProducts.filter(p => p.category === 'accessories').length }
]

export default function ProductsIndex() {
    const [searchParams] = useSearchParams()
    const categoryParam = searchParams.get('category') || 'all'

    const filteredProducts = categoryParam === 'all'
        ? mockProducts
        : mockProducts.filter(p => p.category === categoryParam)

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
                                categories={categories}
                                currentCategory={categoryParam}
                            />
                        </aside>

                        <div className="products-content">
                            <div className="products-header">
                                <p className="products-count">
                                    {filteredProducts.length} products found
                                </p>
                                <select className="sort-select">
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>

                            <ProductGrid products={filteredProducts} />
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
                }
                
                .sort-select {
                    padding: var(--spacing-xs) var(--spacing-md);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-sm);
                    color: var(--text-primary);
                    background: var(--bg-secondary);
                    cursor: pointer;
                    transition: border-color var(--transition-fast);
                }
                
                .sort-select:focus {
                    outline: none;
                    border-color: var(--primary);
                }
                
                @media (max-width: 1024px) {
                    .products-layout {
                        grid-template-columns: 1fr;
                    }
                    
                    .filters-sidebar {
                        position: static;
                    }
                }
            `}</style>
        </AppLayout>
    )
}
