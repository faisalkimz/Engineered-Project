import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const { isAuthenticated, user, logout } = useAuth()

    const toggleMenu = () => setIsOpen(!isOpen)
    const closeMenu = () => setIsOpen(false)

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

    const menuCategories = [
        { name: 'Smartphones', slug: 'smartphones', icon: '📱' },
        { name: 'Laptops', slug: 'laptops', icon: '💻' },
        { name: 'Tablets', slug: 'tablets', icon: '📱' },
        { name: 'Smartwatches', slug: 'smartwatches', icon: '⌚' },
        { name: 'Headphones', slug: 'headphones', icon: '🎧' },
        { name: 'Cameras', slug: 'cameras', icon: '📷' },
    ]

    return (
        <>
            {/* Hamburger Button */}
            <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Toggle menu">
                <div className={`hamburger ${isOpen ? 'active' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            {/* Overlay */}
            {isOpen && <div className="menu-overlay" onClick={closeMenu} />}

            {/* Menu Drawer */}
            <div className={`mobile-menu-drawer ${isOpen ? 'open' : ''}`}>
                <div className="menu-header">
                    <div className="menu-user-info">
                        <div className="user-avatar">
                            {isAuthenticated ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            )}
                        </div>
                        <div className="user-details">
                            {isAuthenticated ? (
                                <>
                                    <h4>Welcome back!</h4>
                                    <p>{user?.username || user?.email}</p>
                                </>
                            ) : (
                                <>
                                    <h4>Hello!</h4>
                                    <p>Sign in to your account</p>
                                </>
                            )}
                        </div>
                    </div>
                    <button className="close-button" onClick={closeMenu} aria-label="Close menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <nav className="menu-nav">
                    {/* Main Links */}
                    <div className="menu-section">
                        <Link
                            to="/"
                            className={`menu-item ${isActive('/') && !isActive('/products') ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className={`menu-item ${isActive('/products') ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                            All Products
                        </Link>
                    </div>

                    {/* Categories */}
                    <div className="menu-section">
                        <h5 className="menu-section-title">CATEGORIES</h5>
                        {menuCategories.map((category) => (
                            <Link
                                key={category.slug}
                                to={`/products?category=${category.slug}`}
                                className="menu-item category-item"
                                onClick={closeMenu}
                            >
                                <span className="category-icon">{category.icon}</span>
                                {category.name}
                            </Link>
                        ))}
                    </div>

                    {/* User Menu */}
                    {isAuthenticated ? (
                        <div className="menu-section">
                            <h5 className="menu-section-title">MY ACCOUNT</h5>
                            <Link to="/profile" className="menu-item" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                My Profile
                            </Link>
                            <Link to="/orders" className="menu-item" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                                My Orders
                            </Link>
                            <Link to="/wishlist" className="menu-item" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                Saved Items
                            </Link>
                            <button className="menu-item logout-btn" onClick={() => { logout(); closeMenu(); }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="menu-section">
                            <Link to="/auth/login" className="btn btn-primary btn-block" onClick={closeMenu}>
                                Sign In
                            </Link>
                            <Link to="/auth/register" className="btn btn-outline btn-block" onClick={closeMenu}>
                                Create Account
                            </Link>
                        </div>
                    )}

                    {/* Help & Support */}
                    <div className="menu-section">
                        <h5 className="menu-section-title">HELP & SUPPORT</h5>
                        <Link to="/help" className="menu-item" onClick={closeMenu}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            Help Center
                        </Link>
                        <Link to="/help/contact" className="menu-item" onClick={closeMenu}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            Contact Us
                        </Link>
                        <Link to="/sell" className="menu-item" onClick={closeMenu}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            </svg>
                            Sell on TechMart
                        </Link>
                    </div>
                </nav>
            </div>

            <style jsx="true">{`
                .mobile-menu-button {
                    display: none;
                    width: 40px;
                    height: 40px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 8px;
                }

                .hamburger {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 24px;
                    height: 20px;
                    position: relative;
                }

                .hamburger span {
                    display: block;
                    height: 2px;
                    width: 100%;
                    background: var(--text-primary);
                    border-radius: 2px;
                    transition: all var(--transition-base);
                }

                .hamburger.active span:nth-child(1) {
                    transform: rotate(45deg) translateY(9px);
                }

                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }

                .hamburger.active span:nth-child(3) {
                    transform: rotate(-45deg) translateY(-9px);
                }

                .menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1998;
                    animation: fadeIn 0.3s ease-out;
                }

                .mobile-menu-drawer {
                    position: fixed;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    width: 320px;
                    max-width: 85vw;
                    background: var(--bg-secondary);
                    box-shadow: var(--shadow-2xl);
                    transform: translateX(-100%);
                    transition: transform var(--transition-slow);
                    z-index: 1999;
                    display: flex;
                    flex-direction: column;
                    overflow-y: auto;
                }

                .mobile-menu-drawer.open {
                    transform: translateX(0);
                }

                .menu-header {
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                    padding: var(--spacing-2xl) var(--spacing-lg);
                    display: flex;
                    justify-content: space-between;
                    align-items: start;
                    color: white;
                }

                .menu-user-info {
                    display: flex;
                    gap: var(--spacing-md);
                    align-items: center;
                }

                .user-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .user-details h4 {
                    font-size: var(--font-size-lg);
                    margin-bottom: 0.25rem;
                    color: white;
                }

                .user-details p {
                    font-size: var(--font-size-sm);
                    opacity: 0.9;
                }

                .close-button {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: white;
                    transition: background var(--transition-base);
                }

                .close-button:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .menu-nav {
                    flex: 1;
                    overflow-y: auto;
                    padding-bottom: var(--spacing-2xl);
                }

                .menu-section {
                    padding: var(--spacing-lg);
                    border-bottom: 1px solid var(--border-light);
                }

                .menu-section:last-child {
                    border-bottom: none;
                }

                .menu-section-title {
                    font-size: var(--font-size-xs);
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    color: var(--text-muted);
                    margin-bottom: var(--spacing-md);
                }

                .menu-item {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    padding: var(--spacing-md);
                    color: var(--text-primary);
                    text-decoration: none;
                    font-size: var(--font-size-base);
                    font-weight: 500;
                    border-radius: var(--radius-md);
                    transition: all var(--transition-fast);
                    margin-bottom: var(--spacing-xs);
                    background: none;
                    border: none;
                    width: 100%;
                    text-align: left;
                    cursor: pointer;
                    font-family: var(--font-sans);
                }

                .menu-item:hover {
                    background: var(--bg-hover);
                    color: var(--primary);
                }

                .menu-item.active {
                    background: linear-gradient(135deg, rgba(246, 139, 30, 0.1) 0%, rgba(255, 107, 0, 0.1) 100%);
                    color: var(--primary);
                    font-weight: 600;
                }

                .category-item {
                    font-size: var(--font-size-sm);
                }

                .category-icon {
                    font-size: 1.25rem;
                }

                .logout-btn {
                    color: var(--error);
                }

                .logout-btn:hover {
                    background: rgba(239, 68, 68, 0.1);
                }

                .btn-block {
                    width: 100%;
                    margin-bottom: var(--spacing-sm);
                }

                @media (max-width: 968px) {
                    .mobile-menu-button {
                        display: block;
                    }
                }
            `}</style>
        </>
    )
}
