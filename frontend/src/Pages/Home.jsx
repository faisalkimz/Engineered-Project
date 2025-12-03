import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../Components/Layout/AppLayout'
import ProductGrid from '../Components/Products/ProductGrid'
import { useFeaturedProducts, useCategories } from '../hooks/useAPI'

export default function Home() {
    const { data: featuredData, isLoading: featuredLoading } = useFeaturedProducts()
    const { data: categoriesData, isLoading: categoriesLoading } = useCategories()

    const [currentSlide, setCurrentSlide] = useState(0)
    const [flashSaleTime, setFlashSaleTime] = useState({
        hours: 2,
        minutes: 30,
        seconds: 45
    })

    const featuredProducts = featuredData?.products || []
    const categories = categoriesData?.categories || []

    // Hero Slider
    const slides = [
        {
            id: 1,
            title: 'Holiday Super Sale',
            subtitle: 'Up to 60% Off Electronics',
            cta: 'Shop Now',
            bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            image: '🎉'
        },
        {
            id: 2,
            title: 'Smartphones Deals',
            subtitle: 'Latest Models at Best Prices',
            cta: 'Browse Phones',
            bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            image: '📱'
        },
        {
            id: 3,
            title: 'Laptop Clearance',
            subtitle: 'Premium Brands, Huge Discounts',
            cta: 'Explore Laptops',
            bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            image: '💻'
        }
    ]

    // Auto-advance slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [slides.length])

    // Flash sale countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setFlashSaleTime(prev => {
                let { hours, minutes, seconds } = prev
                if (seconds > 0) {
                    seconds--
                } else {
                    seconds = 59
                    if (minutes > 0) {
                        minutes--
                    } else {
                        minutes = 59
                        if (hours > 0) {
                            hours--
                        } else {
                            hours = 23
                        }
                    }
                }
                return { hours, minutes, seconds }
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const quickCategories = [
        { name: 'Phones', icon: '📱', link: '/products?category=smartphones', color: '#f68b1e' },
        { name: 'Laptops', icon: '💻', link: '/products?category=laptops', color: '#667eea' },
        { name: 'Tablets', icon: '📱', link: '/products?category=tablets', color: '#f093fb' },
        { name: 'Watches', icon: '⌚', link: '/products?category=smartwatches', color: '#4facfe' },
        { name: 'Headphones', icon: '🎧', link: '/products?category=headphones', color: '#43e97b' },
        { name: 'Cameras', icon: '📷', link: '/products?category=cameras', color: '#fa709a' },
    ]

    return (
        <AppLayout>
            {/* Hero Slider Section */}
            <section className="hero-slider-section">
                <div className="container">
                    <div className="hero-layout">
                        {/* Main Slider */}
                        <div className="hero-slider">
                            {slides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                                    style={{ background: slide.bg }}
                                >
                                    <div className="slide-content">
                                        <div className="slide-emoji">{slide.image}</div>
                                        <h1 className="slide-title">{slide.title}</h1>
                                        <p className="slide-subtitle">{slide.subtitle}</p>
                                        <Link to="/products" className="btn btn-lg hero-cta">
                                            {slide.cta}
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            {/* Slider Controls */}
                            <div className="slider-dots">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                                        onClick={() => setCurrentSlide(index)}
                                    />
                                ))}
                            </div>

                            <button className="slider-arrow prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button className="slider-arrow next" onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>

                        {/* Side Banners */}
                        <div className="side-banners">
                            <Link to="/products?deal=express" className="side-banner">
                                <div className="side-banner-icon">⚡</div>
                                <div>
                                    <h4>Express Delivery</h4>
                                    <p>Get it today!</p>
                                </div>
                            </Link>
                            <Link to="/help" className="side-banner">
                                <div className="side-banner-icon">🎯</div>
                                <div>
                                    <h4>Help Center</h4>
                                    <p>We're here 24/7</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Categories */}
            <section className="quick-categories">
                <div className="container">
                    <div className="categories-scroll">
                        {quickCategories.map((cat, index) => (
                            <Link key={index} to={cat.link} className="quick-category-card">
                                <div className="quick-cat-icon" style={{ background: cat.color }}>
                                    {cat.icon}
                                </div>
                                <span className="quick-cat-name">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Flash Sales */}
            <section className="flash-sales-section">
                <div className="container">
                    <div className="section-header-special">
                        <div className="flash-header">
                            <div className="flash-icon">⚡</div>
                            <h2 className="section-title-flash">Flash Sales</h2>
                        </div>
                        <div className="flash-timer">
                            <span className="timer-label">Time Left:</span>
                            <div className="timer-boxes">
                                <div className="timer-box">
                                    <span className="timer-value">{String(flashSaleTime.hours).padStart(2, '0')}</span>
                                    <span className="timer-unit">Hours</span>
                                </div>
                                <span className="timer-separator">:</span>
                                <div className="timer-box">
                                    <span className="timer-value">{String(flashSaleTime.minutes).padStart(2, '0')}</span>
                                    <span className="timer-unit">Min</span>
                                </div>
                                <span className="timer-separator">:</span>
                                <div className="timer-box">
                                    <span className="timer-value">{String(flashSaleTime.seconds).padStart(2, '0')}</span>
                                    <span className="timer-unit">Sec</span>
                                </div>
                            </div>
                        </div>
                        <Link to="/products?sale=flash" className="btn btn-primary">
                            See All
                        </Link>
                    </div>

                    {featuredLoading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading flash deals...</p>
                        </div>
                    ) : featuredProducts.length > 0 ? (
                        <ProductGrid products={featuredProducts.slice(0, 6)} />
                    ) : (
                        <div className="empty-state">
                            <p>No flash sales available</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Category Showcase */}
            <section className="categories-showcase">
                <div className="container">
                    <h2 className="section-title-main">Shop by Category</h2>
                    {categoriesLoading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div className="category-grid">
                            {categories.slice(0, 8).map((cat) => {
                                const icons = {
                                    'smartphones': '📱',
                                    'laptops': '💻',
                                    'tablets': '📱',
                                    'smartwatches': '⌚',
                                    'headphones': '🎧',
                                    'cameras': '📷'
                                }
                                return (
                                    <Link
                                        key={cat.id}
                                        to={`/products?category=${cat.slug}`}
                                        className="category-showcase-card"
                                    >
                                        <div className="category-showcase-icon">
                                            {icons[cat.slug] || '🛍️'}
                                        </div>
                                        <h3>{cat.name}</h3>
                                        <p>{cat.product_count || 0} products</p>
                                        <div className="category-showcase-arrow">→</div>
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Top Products */}
            <section className="top-products-section">
                <div className="container">
                    <div className="section-header-simple">
                        <div>
                            <h2 className="section-title-main">Top Selling Products</h2>
                            <p className="section-subtitle">Most popular items this week</p>
                        </div>
                        <Link to="/products" className="link-with-arrow">
                            View All Products
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>

                    {featuredLoading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                        </div>
                    ) : featuredProducts.length > 0 ? (
                        <ProductGrid products={featuredProducts.slice(0, 8)} />
                    ) : (
                        <div className="empty-state">
                            <p>No products available</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className="features-promo">
                <div className="container">
                    <div className="promo-grid">
                        <div className="promo-card">
                            <div className="promo-icon">🚚</div>
                            <h3>Free Delivery</h3>
                            <p>On eligible orders over $50</p>
                        </div>
                        <div className="promo-card">
                            <div className="promo-icon">🔒</div>
                            <h3>Secure Payment</h3>
                            <p>100% protected payments</p>
                        </div>
                        <div className="promo-card">
                            <div className="promo-icon">↩️</div>
                            <h3>Easy Returns</h3>
                            <p>30-day return guarantee</p>
                        </div>
                        <div className="promo-card">
                            <div className="promo-icon">💬</div>
                            <h3>24/7 Support</h3>
                            <p>Dedicated customer service</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter-section">
                <div className="container">
                    <div className="newsletter-card">
                        <div className="newsletter-content">
                            <div className="newsletter-icon">📧</div>
                            <div>
                                <h3>Subscribe to Our Newsletter</h3>
                                <p>Get the latest deals and offers in your inbox</p>
                            </div>
                        </div>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="newsletter-input"
                                required
                            />
                            <button type="submit" className="btn btn-primary">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <style jsx="true">{`
                /* Hero Slider */
                .hero-slider-section {
                    padding: var(--spacing-xl) 0 var(--spacing-3xl);
                }

                .hero-layout {
                    display: grid;
                    grid-template-columns: 1fr 280px;
                    gap: var(--spacing-xl);
                }

                .hero-slider {
                    position: relative;
                    border-radius: var(--radius-xl);
                    overflow: hidden;
                    height: 420px;
                    box-shadow: var(--shadow-lg);
                }

                .slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transition: opacity 0.6s ease-in-out;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .slide.active {
                    opacity: 1;
                    z-index: 1;
                }

                .slide-content {
                    text-align: center;
                    color: white;
                    padding: var(--spacing-3xl);
                    animation: fadeInUp 0.8s ease-out;
                }

                .slide-emoji {
                    font-size: 5rem;
                    margin-bottom: var(--spacing-lg);
                    animation: bounce 2s ease-in-out infinite;
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }

                .slide-title {
                    font-size: var(--font-size-5xl);
                    font-weight: 800;
                    margin-bottom: var(--spacing-md);
                    text-shadow: 0 2px 20px rgba(0,0,0,0.2);
                }

                .slide-subtitle {
                    font-size: var(--font-size-xl);
                    margin-bottom: var(--spacing-2xl);
                    opacity: 0.95;
                }

                .hero-cta {
                    background: white;
                    color: var(--text-primary);
                    font-weight: 700;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                }

                .hero-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
                }

                .slider-dots {
                    position: absolute;
                    bottom: var(--spacing-lg);
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: var(--spacing-sm);
                    z-index: 2;
                }

                .slider-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.5);
                    border: none;
                    cursor: pointer;
                    transition: all var(--transition-base);
                }

                .slider-dot.active {
                    width: 30px;
                    border-radius: var(--radius-full);
                    background: white;
                }

                .slider-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255,255,255,0.9);
                    border: none;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all var(--transition-base);
                    z-index: 2;
                }

                .slider-arrow:hover {
                    background: white;
                    box-shadow: var(--shadow-md);
                }

                .slider-arrow.prev { left: var(--spacing-lg); }
                .slider-arrow.next { right: var(--spacing-lg); }

                /* Side Banners */
                .side-banners {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xl);
                }

                .side-banner {
                    background: var(--bg-secondary);
                    padding: var(--spacing-2xl);
                    border-radius: var(--radius-xl);
                    text-decoration: none;
                    color: var(--text-primary);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-lg);
                    box-shadow: var(--shadow-md);
                    transition: all var(--transition-base);
                    flex: 1;
                }

                .side-banner:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-lg);
                }

                .side-banner-icon {
                    font-size: 3rem;
                }

                .side-banner h4 {
                    font-size: var(--font-size-lg);
                    margin-bottom: var(--spacing-xs);
                }

                .side-banner p {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }

                /* Quick Categories */
                .quick-categories {
                    padding: var(--spacing-2xl) 0;
                }

                .categories-scroll {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: var(--spacing-lg);
                }

                .quick-category-card {
                    background: var(--bg-secondary);
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-lg);
                    text-align: center;
                    text-decoration: none;
                    color: var(--text-primary);
                    transition: all var(--transition-base);
                    box-shadow: var(--shadow-sm);
                }

                .quick-category-card:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-md);
                }

                .quick-cat-icon {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    margin: 0 auto var(--spacing-md);
                }

                .quick-cat-name {
                    font-weight: 600;
                    font-size: var(--font-size-sm);
                }

                /* Flash Sales */
                .flash-sales-section {
                    padding: var(--spacing-3xl) 0;
                    background: linear-gradient(135deg, #fff5eb 0%, #ffe8d6 100%);
                }

                .section-header-special {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--spacing-2xl);
                    flex-wrap: wrap;
                    gap: var(--spacing-lg);
                }

                .flash-header {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                }

                .flash-icon {
                    font-size: 2.5rem;
                    animation: pulse 1.5s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .section-title-flash {
                    font-size: var(--font-size-4xl);
                    color: var(--primary);
                    margin: 0;
                }

                .flash-timer {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                }

                .timer-label {
                    font-weight: 600;
                    color: var(--text-secondary);
                }

                .timer-boxes {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                }

                .timer-box {
                    background: white;
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--radius-md);
                    text-align: center;
                    box-shadow: var(--shadow-sm);
                }

                .timer-value {
                    display: block;
                    font-size: var(--font-size-xl);
                    font-weight: 700;
                    color: var(--primary);
                }

                .timer-unit {
                    display: block;
                    font-size: var(--font-size-xs);
                    color: var(--text-muted);
                }

                .timer-separator {
                    font-size: var(--font-size-2xl);
                    font-weight: 700;
                    color: var(--primary);
                }

                /* Category Showcase */
                .categories-showcase {
                    padding: var(--spacing-3xl) 0;
                }

                .section-title-main {
                    font-size: var(--font-size-4xl);
                    margin-bottom: var(--spacing-2xl);
                }

                .category-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: var(--spacing-xl);
                }

                .category-showcase-card {
                    background: var(--bg-secondary);
                    padding: var(--spacing-2xl);
                    border-radius: var(--radius-xl);
                    text-align: center;
                    text-decoration: none;
                    color: var(--text-primary);
                    transition: all var(--transition-base);
                    box-shadow: var(--shadow-sm);
                    position: relative;
                    overflow: hidden;
                }

                .category-showcase-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, transparent 0%, rgba(246,139,30,0.05) 100%);
                    opacity: 0;
                    transition: opacity var(--transition-base);
                }

                .category-showcase-card:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-lg);
                }

                .category-showcase-card:hover::before {
                    opacity: 1;
                }

                .category-showcase-icon {
                    font-size: 4rem;
                    margin-bottom: var(--spacing-lg);
                }

                .category-showcase-card h3 {
                    font-size: var(--font-size-xl);
                    margin-bottom: var(--spacing-xs);
                }

                .category-showcase-card p {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }

                .category-showcase-arrow {
                    position: absolute;
                    top: var(--spacing-lg);
                    right: var(--spacing-lg);
                    font-size: var(--font-size-2xl);
                    color: var(--primary);
                    opacity: 0;
                    transform: translateX(-10px);
                    transition: all var(--transition-base);
                }

                .category-showcase-card:hover .category-showcase-arrow {
                    opacity: 1;
                    transform: translateX(0);
                }

                /* Top Products */
                .top-products-section {
                    padding: var(--spacing-3xl) 0;
                    background: var(--bg-secondary);
                }

                .section-header-simple {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--spacing-2xl);
                }

                .section-subtitle {
                    color: var(--text-secondary);
                    font-size: var(--font-size-lg);
                    margin-top: var(--spacing-xs);
                }

                .link-with-arrow {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    color: var(--primary);
                    font-weight: 600;
                    text-decoration: none;
                    transition: all var(--transition-base);
                }

                .link-with-arrow:hover {
                    gap: var(--spacing-sm);
                }

                /* Features Promo */
                .features-promo {
                    padding: var(--spacing-3xl) 0;
                }

                .promo-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: var(--spacing-2xl);
                }

                .promo-card {
                    text-align: center;
                    padding: var(--spacing-2xl);
                }

                .promo-icon {
                    font-size: 3.5rem;
                    margin-bottom: var(--spacing-lg);
                }

                .promo-card h3 {
                    font-size: var(--font-size-xl);
                    margin-bottom: var(--spacing-sm);
                }

                .promo-card p {
                    color: var(--text-secondary);
                }

                /* Newsletter */
                .newsletter-section {
                    padding: var(--spacing-3xl) 0;
                }

                .newsletter-card {
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                    padding: var(--spacing-3xl);
                    border-radius: var(--radius-2xl);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: var(--spacing-2xl);
                    box-shadow: var(--shadow-xl);
                }

                .newsletter-content {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xl);
                    color: white;
                }

                .newsletter-icon {
                    font-size: 4rem;
                }

                .newsletter-content h3 {
                    font-size: var(--font-size-3xl);
                    margin-bottom: var(--spacing-xs);
                    color: white;
                }

                .newsletter-content p {
                    font-size: var(--font-size-lg);
                    opacity: 0.9;
                }

                .newsletter-form {
                    display: flex;
                    gap: var(--spacing-md);
                    flex: 1;
                    max-width: 500px;
                }

                .newsletter-input {
                    flex: 1;
                    padding: 0.875rem 1.25rem;
                    border-radius: var(--radius-lg);
                    border: none;
                    font-size: var(--font-size-base);
                    outline: none;
                }

                .newsletter-form .btn {
                    background: var(--jumia-dark);
                    white-space: nowrap;
                }

                .newsletter-form .btn:hover {
                    background: var(--jumia-black);
                }

                /* Loading & Empty States */
                .loading-state,
                .empty-state {
                    text-align: center;
                    padding: var(--spacing-4xl) var(--spacing-xl);
                }

                .loading-state p {
                    margin-top: var(--spacing-lg);
                    color: var(--text-secondary);
                }

                .empty-state p {
                    color: var(--text-muted);
                }

                /* Responsive */
                @media (max-width: 968px) {
                    .hero-layout {
                        grid-template-columns: 1fr;
                    }

                    .side-banners {
                        flex-direction: row;
                    }

                    .newsletter-card {
                        flex-direction: column;
                        text-align: center;
                    }

                    .newsletter-content {
                        flex-direction: column;
                    }

                    .newsletter-form {
                        width: 100%;
                    }

                    .slider-arrow {
                        width: 36px;
                        height: 36px;
                    }
                }

                @media (max-width: 640px) {
                    .hero-slider {
                        height: 320px;
                    }

                    .slide-title {
                        font-size: var(--font-size-3xl);
                    }

                    .slide-subtitle {
                        font-size: var(--font-size-base);
                    }

                    .section-header-special {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .flash-timer {
                        width: 100%;
                    }

                    .timer-boxes {
                        flex: 1;
                    }

                    .newsletter-form {
                        flex-direction: column;
                    }

                    .section-header-simple {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: var(--spacing-md);
                    }
                }
            `}</style>
        </AppLayout>
    )
}
