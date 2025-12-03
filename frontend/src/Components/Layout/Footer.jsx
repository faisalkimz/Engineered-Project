import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="footer">
            {/* Main Footer */}
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        {/* Need Help Section */}
                        <div className="footer-column">
                            <h4 className="footer-title">NEED HELP?</h4>
                            <ul className="footer-links">
                                <li><Link to="/help/chat">Chat with us</Link></li>
                                <li><Link to="/help">Help Center</Link></li>
                                <li><Link to="/help/contact">Contact Us</Link></li>
                                <li><Link to="/help/orders">Track My Order</Link></li>
                            </ul>
                        </div>

                        {/* Useful Links */}
                        <div className="footer-column">
                            <h4 className="footer-title">USEFUL LINKS</h4>
                            <ul className="footer-links">
                                <li><Link to="/how-to-order">How to shop on TechMart</Link></li>
                                <li><Link to="/delivery">Delivery options and timelines</Link></li>
                                <li><Link to="/payment">Payment options</Link></li>
                                <li><Link to="/returns">How to return a product</Link></li>
                                <li><Link to="/express">Express Delivery</Link></li>
                                <li><Link to="/corporate">Corporate and bulk purchases</Link></li>
                                <li><Link to="/disputes">Report a Product</Link></li>
                            </ul>
                        </div>

                        {/* About TechMart */}
                        <div className="footer-column">
                            <h4 className="footer-title">ABOUT TECHMART</h4>
                            <ul className="footer-links">
                                <li><Link to="/about">About us</Link></li>
                                <li><Link to="/careers">Careers</Link></li>
                                <li><Link to="/terms">Terms and Conditions</Link></li>
                                <li><Link to="/privacy">Privacy Notice</Link></li>
                                <li><Link to="/cookies">Cookies Notice</Link></li>
                                <li><Link to="/affiliates">Affiliate Program</Link></li>
                                <li><Link to="/blog">Blog</Link></li>
                            </ul>
                        </div>

                        {/* Make Money */}
                        <div className="footer-column">
                            <h4 className="footer-title">MAKE MONEY WITH US</h4>
                            <ul className="footer-links">
                                <li><Link to="/sell">Sell on TechMart</Link></li>
                                <li><Link to="/vendor">Become a Vendor</Link></li>
                                <li><Link to="/logistics">Become a Logistics Partner</Link></li>
                                <li><Link to="/sales-consultant">Join Our Sales Consultant Program</Link></li>
                            </ul>
                        </div>

                        {/* Join Us */}
                        <div className="footer-column">
                            <h4 className="footer-title">JOIN US ON</h4>
                            <div className="social-links">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="TikTok">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                    </svg>
                                </a>
                            </div>

                            <h4 className="footer-title payment-title">PAYMENT METHODS & DELIVERY</h4>
                            <div className="payment-methods">
                                <div className="payment-icon">💳</div>
                                <div className="payment-icon">🏦</div>
                                <div className="payment-icon">💰</div>
                                <div className="payment-icon">🚚</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <div className="footer-apps">
                            <span className="footer-bottom-label">DOWNLOAD OUR APP:</span>
                            <a href="#" className="app-badge">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                App Store
                            </a>
                            <a href="#" className="app-badge">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                                </svg>
                                Google Play
                            </a>
                        </div>

                        <div className="footer-copyright">
                            <p>&copy; {new Date().getFullYear()} TechMart. All rights reserved.</p>
                        </div>

                        <div className="footer-links-inline">
                            <Link to="/privacy">Privacy Policy</Link>
                            <span className="separator">•</span>
                            <Link to="/terms">Terms of Use</Link>
                            <span className="separator">•</span>
                            <Link to="/sitemap">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx="true">{`
                .footer {
                    background: var(--jumia-dark);
                    color: rgba(255, 255, 255, 0.8);
                    margin-top: auto;
                }

                .footer-main {
                    padding: var(--spacing-5xl) 0 var(--spacing-3xl);
                }

                .footer-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: var(--spacing-3xl);
                }

                .footer-column {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                }

                .footer-title {
                    color: white;
                    font-size: var(--font-size-sm);
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    margin-bottom: var(--spacing-sm);
                }

                .payment-title {
                    margin-top: var(--spacing-2xl);
                }

                .footer-links {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }

                .footer-links a {
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    font-size: var(--font-size-sm);
                    transition: color var(--transition-fast);
                    display: inline-block;
                }

                .footer-links a:hover {
                    color: var(--primary);
                    transform: translateX(4px);
                }

                .social-links {
                    display: flex;
                    gap: var(--spacing-md);
                    flex-wrap: wrap;
                }

                .social-link {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    transition: all var(--transition-base);
                }

                .social-link:hover {
                    background: var(--primary);
                    transform: translateY(-4px);
                }

                .payment-methods {
                    display: flex;
                    gap: var(--spacing-md);
                    flex-wrap: wrap;
                }

                .payment-icon {
                    width: 50px;
                    height: 36px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: var(--radius-sm);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                    transition: all var(--transition-base);
                }

                .payment-icon:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: scale(1.05);
                }

                .footer-bottom {
                    background: rgba(0, 0, 0, 0.3);
                    padding: var(--spacing-2xl) 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                .footer-bottom-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: var(--spacing-xl);
                }

                .footer-apps {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    flex-wrap: wrap;
                }

                .footer-bottom-label {
                    font-size: var(--font-size-xs);
                    font-weight: 700;
                    letter-spacing: 0.5px;
                }

                .app-badge {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    padding: 0.5rem 1rem;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: var(--radius-md);
                    color: white;
                    text-decoration: none;
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    transition: all var(--transition-base);
                }

                .app-badge:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                }

                .footer-copyright {
                    text-align: center;
                    flex: 1;
                }

                .footer-copyright p {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: var(--font-size-sm);
                }

                .footer-links-inline {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    flex-wrap: wrap;
                }

                .footer-links-inline a {
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    font-size: var(--font-size-sm);
                    transition: color var(--transition-fast);
                }

                .footer-links-inline a:hover {
                    color: var(--primary);
                }

                .separator {
                    color: rgba(255, 255, 255, 0.4);
                }

                @media (max-width: 768px) {
                    .footer-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .footer-bottom-content {
                        flex-direction: column;
                        text-align: center;
                    }

                    .footer-apps {
                        justify-content: center;
                        width: 100%;
                    }

                    .footer-links-inline {
                        justify-content: center;
                    }
                }

                @media (max-width: 480px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </footer>
    )
}
