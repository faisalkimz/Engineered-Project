import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import MobileMenu from './MobileMenu'

export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const { getCartCount } = useCart()
    const { isAuthenticated, user, logout } = useAuth()
    const cartCount = getCartCount()

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showHelpMenu, setShowHelpMenu] = useState(false)
    const accountMenuRef = useRef(null)
    const helpMenuRef = useRef(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
                setShowAccountMenu(false)
            }
            if (helpMenuRef.current && !helpMenuRef.current.contains(event.target)) {
                setShowHelpMenu(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            const params = new URLSearchParams()
            params.set('q', searchQuery)
            if (selectedCategory !== 'all') {
                params.set('category', selectedCategory)
            }
            navigate(`/products?${params.toString()}`)
        }
    }

    const handleLogout = () => {
        logout()
        setShowAccountMenu(false)
        navigate('/')
    }

    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'smartphones', label: 'Smartphones' },
        { value: 'laptops', label: 'Laptops' },
        { value: 'tablets', label: 'Tablets' },
        { value: 'smartwatches', label: 'Smartwatches' },
        { value: 'headphones', label: 'Headphones' },
        { value: 'cameras', label: 'Cameras' },
    ]

    return (
        <>
            {/* Mobile Menu */}
            <MobileMenu />

            {/* Top Bar */}
            <div className="topbar">
                <div className="container">
                    <div className="topbar-content">
                        <div className="topbar-left">
                            <Link to="/sell" className="topbar-link">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                                    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                                    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                </svg>
                                Sell on TechMart
                            </Link>
                        </div>
                        <div className="topbar-right">
                            <div className="topbar-item" ref={helpMenuRef}>
                                <button
                                    className="topbar-link"
                                    onClick={() => setShowHelpMenu(!showHelpMenu)}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                    </svg>
                                    Help
                                    <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor" className={`dropdown-arrow ${showHelpMenu ? 'active' : ''}`}>
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {showHelpMenu && (
                                    <div className="dropdown-menu">
                                        <Link to="/help/orders" className="dropdown-item">Track My Order</Link>
                                        <Link to="/help/returns" className="dropdown-item">Returns & Refunds</Link>
                                        <Link to="/help/payment" className="dropdown-item">Payment Options</Link>
                                        <Link to="/help/shipping" className="dropdown-item">Shipping Info</Link>
                                        <Link to="/help/contact" className="dropdown-item">Contact Us</Link>
                                    </div>
                                )}
                            </div>
                            <div className="topbar-item" ref={accountMenuRef}>
                                <button
                                    className="topbar-link"
                                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    {isAuthenticated ? user?.username || 'My Account' : 'Account'}
                                    <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor" className={`dropdown-arrow ${showAccountMenu ? 'active' : ''}`}>
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {showAccountMenu && (
                                    <div className="dropdown-menu">
                                        {isAuthenticated ? (
                                            <>
                                                <Link to="/profile" className="dropdown-item">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                        <circle cx="12" cy="7" r="4"></circle>
                                                    </svg>
                                                    My Account
                                                </Link>
                                                <Link to="/orders" className="dropdown-item">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                                        <line x1="3" y1="6" x2="21" y2="6"></line>
                                                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                                                    </svg>
                                                    Orders
                                                </Link>
                                                <Link to="/wishlist" className="dropdown-item">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                    </svg>
                                                    Saved Items
                                                </Link>
                                                <div className="dropdown-divider"></div>
                                                <button onClick={handleLogout} className="dropdown-item">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                        <polyline points="16 17 21 12 16 7"></polyline>
                                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                                    </svg>
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link to="/auth/login" className="dropdown-item">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                                        <polyline points="10 17 15 12 10 7"></polyline>
                                                        <line x1="15" y1="12" x2="3" y2="12"></line>
                                                    </svg>
                                                    Sign In
                                                </Link>
                                                <Link to="/auth/register" className="dropdown-item">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                        <circle cx="8.5" cy="7" r="4"></circle>
                                                        <line x1="20" y1="8" x2="20" y2="14"></line>
                                                        <line x1="23" y1="11" x2="17" y2="11"></line>
                                                    </svg>
                                                    Create Account
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        {/* Logo */}
                        <Link to="/" className="logo">
                            <div className="logo-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </div>
                            <span className="logo-text">
                                Tech<span className="logo-accent">Mart</span>
                            </span>
                        </Link>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="search-bar">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="search-category"
                            >
                                {categories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                            <div className="search-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Search products, brands and categories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                                <button type="submit" className="search-button">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.35-4.35"></path>
                                    </svg>
                                    <span className="search-button-text">SEARCH</span>
                                </button>
                            </div>
                        </form>

                        {/* Cart Button */}
                        <Link to="/cart" className="cart-button">
                            <div className="cart-icon-wrapper">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                {cartCount > 0 && (
                                    <span className="cart-badge">{cartCount > 9 ? '9+' : cartCount}</span>
                                )}
                            </div>
                            <div className="cart-text">
                                <span className="cart-label">Cart</span>
                                {cartCount > 0 && (
                                    <span className="cart-count-text">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            <style jsx="true">{`
                /* Topbar Styles */
                .topbar {
                    background: var(--jumia-dark);
                    color: var(--text-light);
                    font-size: var(--font-size-xs);
                    height: var(--topbar-height);
                }

                .topbar-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 100%;
                }

                .topbar-left,
                .topbar-right {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xl);
                }

                .topbar-item {
                    position: relative;
                }

                .topbar-link {
                    display: flex;
                    align-items: center;
                    gap: 0.375rem;
                    color: rgba(255, 255, 255, 0.9);
                    text-decoration: none;
                    transition: color var(--transition-fast);
                    font-size: var(--font-size-xs);
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-family: var(--font-sans);
                }

                .topbar-link:hover {
                    color: var(--primary);
                }

                .topbar-link svg {
                    flex-shrink: 0;
                }

                .dropdown-arrow {
                    transition: transform var(--transition-base);
                }

                .dropdown-arrow.active {
                    transform: rotate(180deg);
                }

                .dropdown-menu {
                    position: absolute;
                    top: calc(100% + 0.5rem);
                    right: 0;
                    background: var(--bg-secondary);
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-xl);
                    min-width: 180px;
                    z-index: 1000;
                    animation: fadeInDown 0.2s ease-out;
                    overflow: hidden;
                }

                .dropdown-item {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    padding: 0.625rem 0.875rem;
                    color: var(--text-primary);
                    text-decoration: none;
                    font-size: var(--font-size-sm);
                    transition: background var(--transition-fast);
                    background: none;
                    border: none;
                    width: 100%;
                    text-align: left;
                    cursor: pointer;
                    font-family: var(--font-sans);
                }

                .dropdown-item:hover {
                    background: var(--bg-hover);
                    color: var(--primary);
                }

                .dropdown-divider {
                    height: 1px;
                    background: var(--border-light);
                    margin: 0.25rem 0;
                }

                /* Header Styles */
                .header {
                    background: var(--bg-secondary);
                    box-shadow: var(--shadow-sm);
                    position: sticky;
                    top: 0;
                    z-index: 999;
                    border-bottom: 1px solid var(--border-light);
                }

                .header-content {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xl);
                    padding: var(--spacing-md) 0;
                }

                /* Logo */
                .logo {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    text-decoration: none;
                    flex-shrink: 0;
                    transition: transform var(--transition-fast);
                }

                .logo:hover {
                    transform: scale(1.02);
                }

                .logo-icon {
                    width: 42px;
                    height: 42px;
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(246, 139, 30, 0.3);
                }

                .logo-icon svg {
                    color: white;
                }

                .logo-text {
                    font-family: var(--font-display);
                    font-size: var(--font-size-3xl);
                    font-weight: 800;
                    color: var(--text-primary);
                    letter-spacing: -0.5px;
                }

                .logo-accent {
                    color: var(--primary);
                }

                /* Search Bar */
                .search-bar {
                    flex: 1;
                    max-width: 800px;
                    display: flex;
                    background: var(--bg-primary);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                }

                .search-category {
                    padding: 0 var(--spacing-md);
                    border: none;
                    background: var(--bg-secondary);
                    color: var(--text-primary);
                    font-size: var(--font-size-sm);
                    font-weight: 500;
                    cursor: pointer;
                    border-right: 1px solid var(--border-light);
                    min-width: 140px;
                    outline: none;
                }

                .search-input-wrapper {
                    flex: 1;
                    display: flex;
                    background: var(--bg-secondary);
                }

                .search-input {
                    flex: 1;
                    padding: 0.75rem var(--spacing-lg);
                    border: none;
                    background: transparent;
                    color: var(--text-primary);
                    font-size: var(--font-size-base);
                    outline: none;
                }

                .search-input::placeholder {
                    color: var(--text-muted);
                }

                .search-button {
                    padding: 0 1.5rem;
                    background: var(--primary);
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: var(--font-size-sm);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    transition: background var(--transition-base);
                    letter-spacing: 0.5px;
                }

                .search-button:hover {
                    background: var(--primary-dark);
                }

                .search-button-text {
                    display: none;
                }

                /* Cart Button */
                .cart-button {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    padding: var(--spacing-sm) var(--spacing-lg);
                    background: var(--bg-primary);
                    border-radius: var(--radius-lg);
                    text-decoration: none;
                    transition: all var(--transition-base);
                    flex-shrink: 0;
                }

                .cart-button:hover {
                    background: var(--bg-hover);
                    transform: translateY(-1px);
                    box-shadow: var(--shadow-md);
                }

                .cart-icon-wrapper {
                    position: relative;
                    color: var(--text-primary);
                }

                .cart-badge {
                    position: absolute;
                    top: -6px;
                    right: -8px;
                    background: var(--error);
                    color: white;
                    font-size: 0.625rem;
                    font-weight: 700;
                    min-width: 18px;
                    height: 18px;
                    border-radius: var(--radius-full);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 4px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                .cart-text {
                    display: flex;
                    flex-direction: column;
                    gap: 0.125rem;
                }

                .cart-label {
                    color: var(--text-primary);
                    font-weight: 600;
                    font-size: var(--font-size-sm);
                }

                .cart-count-text {
                    color: var(--text-muted);
                    font-size: var(--font-size-xs);
                }

                /* Responsive */
                @media (min-width: 769px) {
                    .search-button-text {
                        display: inline;
                    }
                }

                @media (max-width: 968px) {
                    .topbar {
                        display: none;
                    }

                    .search-bar {
                        order: 3;
                        flex-basis: 100%;
                        max-width: 100%;
                    }

                    .header-content {
                        flex-wrap: wrap;
                    }

                    .cart-text {
                        display: none;
                    }
                }

                @media (max-width: 640px) {
                    .search-category {
                        min-width: 100px;
                        font-size: var(--font-size-xs);
                        padding: 0 var(--spacing-sm);
                    }

                    .logo-text {
                        font-size: var(--font-size-xl);
                    }

                    .logo-icon {
                        width: 36px;
                        height: 36px;
                    }

                    .logo-icon svg {
                        width: 22px;
                        height: 22px;
                    }
                }
            `}</style>
        </>
    )
}
