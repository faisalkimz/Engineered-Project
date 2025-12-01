import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
    const location = useLocation()
    const { getCartCount } = useCart()
    const { isAuthenticated, user } = useAuth()
    const cartCount = getCartCount()

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/')
    }

    return (
        <header className="header">
            <nav className="header-container">
                <div className="header-content">
                    <div className="header-left">
                        <Link to="/" className="logo">
                            <div className="logo-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </div>
                            <span className="logo-text">
                                Tech<span className="logo-accent">Mart</span>
                            </span>
                        </Link>

                        <div className="nav-links desktop-only">
                            <Link
                                to="/products"
                                className={`nav-link ${isActive('/products') ? 'active' : ''}`}
                            >
                                Products
                            </Link>
                            <Link
                                to="/products?category=phones"
                                className="nav-link"
                            >
                                Phones
                            </Link>
                            <Link
                                to="/products?category=laptops"
                                className="nav-link"
                            >
                                Laptops
                            </Link>
                            <Link
                                to="/products?category=accessories"
                                className="nav-link"
                            >
                                Accessories
                            </Link>
                        </div>
                    </div>

                    <div className="header-right">
                        <Link to="/cart" className="cart-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="nav-link">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    Profile
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/auth/login" className="btn btn-outline btn-sm">
                                    Sign in
                                </Link>
                                <Link to="/auth/register" className="btn btn-primary btn-sm">
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <style jsx="true">{`
                .header {
                    background: rgba(255, 255, 255, 0.98);
                    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(255, 107, 0, 0.1);
                }
                
                .header-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 var(--spacing-lg);
                }
                
                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: var(--spacing-xl);
                    padding: var(--spacing-md) 0;
                }
                
                .header-left,
                .header-right {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-lg);
                }
                
                .logo {
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    transition: transform var(--transition-fast);
                }
                
                .logo:hover {
                    transform: translateY(-2px);
                }
                
                .logo-icon {
                    width: 44px;
                    height: 44px;
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(255, 107, 0, 0.25);
                }
                
                .logo-icon svg {
                    color: white;
                }
                
                .logo-text {
                    font-family: var(--font-display);
                    font-size: var(--font-size-2xl);
                    font-weight: 800;
                    color: var(--text-primary);
                    letter-spacing: -0.5px;
                }
                
                .logo-accent {
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                .nav-links {
                    display: flex;
                    gap: var(--spacing-xs);
                }
                
                .nav-link {
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: var(--font-size-sm);
                    transition: all var(--transition-fast);
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    position: relative;
                }
                
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 2px;
                    background: linear-gradient(90deg, var(--primary), var(--secondary));
                    transition: width var(--transition-base);
                }
                
                .nav-link:hover {
                    color: var(--primary);
                    background: rgba(255, 107, 0, 0.05);
                }
                
                .nav-link:hover::after {
                    width: 80%;
                }
                
                .nav-link.active {
                    color: var(--primary);
                    background: linear-gradient(135deg, rgba(255, 107, 0, 0.1) 0%, rgba(155, 81, 224, 0.1) 100%);
                }
                
                .nav-link.active::after {
                    width: 80%;
                }
                
                .cart-button {
                    position: relative;
                    padding: var(--spacing-sm);
                    color: var(--text-primary);
                    border-radius: var(--radius-lg);
                    transition: all var(--transition-base);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-primary);
                    border: 2px solid transparent;
                }
                
                .cart-button:hover {
                    background: linear-gradient(135deg, rgba(255, 107, 0, 0.1) 0%, rgba(155, 81, 224, 0.1) 100%);
                    border-color: var(--primary);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255, 107, 0, 0.2);
                }
                
                .cart-badge {
                    position: absolute;
                    top: -6px;
                    right: -6px;
                    background: linear-gradient(135deg, var(--primary) 0%, var(--error) 100%);
                    color: white;
                    font-size: 0.7rem;
                    font-weight: 800;
                    min-width: 20px;
                    height: 20px;
                    border-radius: var(--radius-full);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 5px;
                    box-shadow: 0 2px 8px rgba(255, 107, 0, 0.4);
                    animation: pulse 2s ease-in-out infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                .desktop-only {
                    display: flex;
                }
                
                @media (max-width: 968px) {
                    .desktop-only {
                        display: none;
                    }
                    
                    .header-content {
                        gap: var(--spacing-sm);
                    }
                    
                    .header-left,
                    .header-right {
                        gap: var(--spacing-sm);
                    }
                    
                    .logo-text {
                        font-size: var(--font-size-xl);
                    }
                }
            `}</style>
        </header>
    )
}
