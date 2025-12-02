import React from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../Components/Layout/AppLayout'
import ProductGrid from '../Components/Products/ProductGrid'
import { useFeaturedProducts, useCategories } from '../hooks/useAPI'

export default function Home() {
    const { data: featuredData, isLoading: featuredLoading } = useFeaturedProducts()
    const { data: categoriesData, isLoading: categoriesLoading } = useCategories()

    const featuredProducts = featuredData?.products || []
    const categories = categoriesData?.categories || []

    return (
        <AppLayout>
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Welcome to <span className="brand-gradient">TechMart</span>
                    </h1>
                    <p className="hero-subtitle">
                        Your premium destination for cutting-edge tech and lifestyle products
                    </p>
                    <div className="hero-actions">
                        <Link to="/products" className="btn btn-primary btn-lg">
                            <span>Shop Now</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link to="/products" className="btn btn-secondary btn-lg">
                            Browse Collection
                        </Link>
                    </div>
                </div>

                <div className="hero-stats">
                    <div className="stat">
                        <div className="stat-value">500+</div>
                        <div className="stat-label">Products</div>
                    </div>
                    <div className="stat">
                        <div className="stat-value">50K+</div>
                        <div className="stat-label">Happy Customers</div>
                    </div>
                    <div className="stat">
                        <div className="stat-value">4.9★</div>
                        <div className="stat-label">Average Rating</div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <h2 className="section-title">Shop by Category</h2>

                    {categoriesLoading ? (
                        <div className="categories-loading">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div className="categories-grid">
                            {categories.slice(0, 6).map((cat) => (
                                <Link
                                    key={cat.id}
                                    to={`/products?category=${cat.slug}`}
                                    className="category-card"
                                >
                                    <div className="category-icon">
                                        {cat.slug === 'smartphones' && '📱'}
                                        {cat.slug === 'laptops' && '💻'}
                                        {cat.slug === 'tablets' && '📱'}
                                        {cat.slug === 'smartwatches' && '⌚'}
                                        {cat.slug === 'headphones' && '🎧'}
                                        {cat.slug === 'cameras' && '📷'}
                                    </div>
                                    <h3>{cat.name}</h3>
                                    <p>{cat.product_count} products</p>
                                    <div className="category-arrow">→</div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <h2 className="section-title">Featured Products</h2>
                            <p className="section-subtitle">Hand-picked premium products just for you</p>
                        </div>
                        <Link to="/products" className="btn btn-outline">
                            View All
                        </Link>
                    </div>

                    {featuredLoading ? (
                        <div className="products-loading">
                            <div className="spinner"></div>
                            <p>Loading featured products...</p>
                        </div>
                    ) : featuredProducts.length > 0 ? (
                        <ProductGrid products={featuredProducts.slice(0, 8)} />
                    ) : (
                        <div className="no-products">
                            <p>No featured products available</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🚚</div>
                            <h3>Free Shipping</h3>
                            <p>On orders over $50</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure Payment</h3>
                            <p>100% secure transactions</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">↩️</div>
                            <h3>Easy Returns</h3>
                            <p>30-day return policy</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎧</div>
                            <h3>24/7 Support</h3>
                            <p>Always here to help</p>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx="true">{`
                .hero-section {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: var(--spacing-4xl) var(--spacing-xl);
                    border-radius: var(--radius-xl);
                    margin: var(--spacing-xl) auto;
                    max-width: 1200px;
                    color: white;
                }

                .hero-content {
                    text-align: center;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .hero-title {
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-weight: 800;
                    margin-bottom: var(--spacing-md);
                    line-height: 1.2;
                }

                .brand-gradient {
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hero-subtitle {
                    font-size: var(--font-size-xl);
                    margin-bottom: var(--spacing-2xl);
                    opacity: 0.95;
                }

                .hero-actions {
                    display: flex;
                    gap: var(--spacing-md);
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .btn-lg {
                    padding: var(--spacing-md) var(--spacing-2xl);
                    font-size: var(--font-size-lg);
                    display: inline-flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                }

                .hero-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: var(--spacing-xl);
                    margin-top: var(--spacing-3xl);
                    padding-top: var(--spacing-2xl);
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                }

                .stat {
                    text-align: center;
                }

                .stat-value {
                    font-size: var(--font-size-3xl);
                    font-weight: 700;
                    margin-bottom: var(--spacing-xs);
                }

                .stat-label {
                    font-size: var(--font-size-sm);
                    opacity: 0.8;
                }

                .categories-section, .featured-section {
                    padding: var(--spacing-3xl) 0;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--spacing-2xl);
                }

                .section-title {
                    font-size: var(--font-size-3xl);
                    font-weight: 700;
                    margin-bottom: var(--spacing-xs);
                }

                .section-subtitle {
                    color: var(--text-secondary);
                    font-size: var(--font-size-lg);
                }

                .categories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: var(--spacing-lg);
                }

                .category-card {
                    background: var(--bg-secondary);
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-lg);
                    text-align: center;
                    transition: all var(--transition-base);
                    border: 1px solid var(--border-light);
                    position: relative;
                    overflow: hidden;
                    text-decoration: none;
                    color: var(--text-primary);
                }

                .category-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-lg);
                    border-color: var(--primary);
                }

                .category-icon {
                    font-size: 3rem;
                    margin-bottom: var(--spacing-md);
                }

                .category-card h3 {
                    font-size: var(--font-size-lg);
                    margin-bottom: var(--spacing-xs);
                }

                .category-card p {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }

                .category-arrow {
                    position: absolute;
                    top: var(--spacing-md);
                    right: var(--spacing-md);
                    font-size: var(--font-size-xl);
                    opacity: 0;
                    transform: translateX(-10px);
                    transition: all var(--transition-base);
                }

                .category-card:hover .category-arrow {
                    opacity: 1;
                    transform: translateX(0);
                }

                .features-section {
                    background: var(--bg-secondary);
                    padding: var(--spacing-3xl) 0;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: var(--spacing-xl);
                }

                .feature-card {
                    text-align: center;
                    padding: var(--spacing-xl);
                }

                .feature-icon {
                    font-size: 3rem;
                    margin-bottom: var(--spacing-md);
                }

                .feature-card h3 {
                    font-size: var(--font-size-lg);
                    margin-bottom: var(--spacing-xs);
                }

                .feature-card p {
                    color: var(--text-secondary);
                }

                .categories-loading, .products-loading {
                    text-align: center;
                    padding: var(--spacing-3xl);
                }

                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid var(--border-light);
                    border-top-color: var(--primary);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto var(--spacing-md);
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .products-loading p {
                    color: var(--text-secondary);
                }

                @media (max-width: 768px) {
                    .hero-section {
                        padding: var(--spacing-2xl) var(--spacing-lg);
                    }

                    .section-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: var(--spacing-md);
                    }

                    .categories-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            `}</style>
        </AppLayout>
    )
}
