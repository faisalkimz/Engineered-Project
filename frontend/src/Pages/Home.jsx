import React from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../Components/Layout/AppLayout'

export default function Home() {
    return (
        <AppLayout>
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Welcome to <span className="brand-gradient">TechMart</span>
                    </h1>
                    <p className="hero-subtitle">
                        Your premium destination for cutting-edge phones and gadgets
                    </p>
                    <div className="hero-actions">
                        <Link to="/products" className="btn btn-primary">
                            Shop Now
                        </Link>
                        <Link to="/products" className="btn btn-secondary">
                            Browse Collection
                        </Link>
                    </div>
                </div>

                <div className="featured-categories">
                    <Link to="/products?category=phones" className="category-card">
                        <div className="category-icon">📱</div>
                        <h3>Smartphones</h3>
                        <p>Latest flagship devices</p>
                    </Link>
                    <Link to="/products?category=laptops" className="category-card">
                        <div className="category-icon">💻</div>
                        <h3>Laptops</h3>
                        <p>Powerful computing</p>
                    </Link>
                    <Link to="/products?category=accessories" className="category-card">
                        <div className="category-icon">🎧</div>
                        <h3>Accessories</h3>
                        <p>Premium add-ons</p>
                    </Link>
                </div>
            </div>
        </AppLayout>
    )
}
