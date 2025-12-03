import React from 'react'
import AppLayout from '../../Components/Layout/AppLayout'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProfileIndex() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    if (!user) {
        return (
            <AppLayout>
                <div className="profile-page">
                    <div className="container">
                        <div className="empty-state">
                            <h2>Please Log In</h2>
                            <p>You need to be logged in to view your profile.</p>
                            <Link to="/auth/login" className="btn btn-primary">Log In</Link>
                        </div>
                    </div>
                </div>
            </AppLayout>
        )
    }

    return (
        <AppLayout>
            <div className="profile-page">
                <div className="container">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            <span>{user.username ? user.username.charAt(0).toUpperCase() : 'U'}</span>
                        </div>
                        <div className="profile-info">
                            <h1>{user.username}</h1>
                            <p>{user.email}</p>
                            <span className="join-date">Member</span>
                        </div>
                        <button onClick={handleLogout} className="btn btn-outline logout-btn">
                            Logout
                        </button>
                    </div>

                    <div className="profile-grid">
                        <Link to="/orders" className="dashboard-card">
                            <div className="card-icon">📦</div>
                            <h3>My Orders</h3>
                            <p>Track and view your order history</p>
                        </Link>

                        <div className="dashboard-card">
                            <div className="card-icon">❤️</div>
                            <h3>Wishlist</h3>
                            <p>View your saved products</p>
                            {/* Wishlist page isn't routed yet, but context exists. 
                                Ideally we'd have a /wishlist route. 
                                For now, this is a placeholder or we can add the route.
                            */}
                        </div>

                        <div className="dashboard-card">
                            <div className="card-icon">📍</div>
                            <h3>Addresses</h3>
                            <p>Manage your shipping addresses</p>
                        </div>

                        <div className="dashboard-card">
                            <div className="card-icon">⚙️</div>
                            <h3>Settings</h3>
                            <p>Update your account preferences</p>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx="true">{`
                .profile-page {
                    padding: var(--spacing-2xl) 0 var(--spacing-3xl);
                    min-height: calc(100vh - 80px - 400px);
                    background: var(--bg-primary);
                }
                
                .profile-header {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xl);
                    margin-bottom: var(--spacing-3xl);
                    padding: var(--spacing-xl);
                    background: var(--bg-secondary);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-md);
                    flex-wrap: wrap;
                }
                
                .profile-avatar {
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: var(--font-size-4xl);
                    font-weight: 800;
                    color: white;
                    box-shadow: var(--shadow-lg);
                }
                
                .profile-info {
                    flex: 1;
                }

                .profile-info h1 {
                    font-size: var(--font-size-3xl);
                    margin-bottom: var(--spacing-xs);
                }
                
                .profile-info p {
                    color: var(--text-secondary);
                    font-size: var(--font-size-lg);
                    margin-bottom: var(--spacing-sm);
                }
                
                .join-date {
                    font-size: var(--font-size-sm);
                    color: var(--text-muted);
                    background: rgba(0,0,0,0.05);
                    padding: 4px 12px;
                    border-radius: var(--radius-full);
                }

                .logout-btn {
                    border-color: var(--danger);
                    color: var(--danger);
                }
                .logout-btn:hover {
                    background: var(--danger);
                    color: white;
                }
                
                .profile-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: var(--spacing-xl);
                }

                .dashboard-card {
                    background: var(--bg-secondary);
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-sm);
                    text-decoration: none;
                    color: var(--text-primary);
                    transition: all var(--transition-base);
                    border: 1px solid var(--border-light);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                .dashboard-card:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-md);
                    border-color: var(--primary);
                }

                .card-icon {
                    font-size: 3rem;
                    margin-bottom: var(--spacing-md);
                }

                .dashboard-card h3 {
                    font-size: var(--font-size-lg);
                    margin-bottom: var(--spacing-xs);
                }

                .dashboard-card p {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }

                .empty-state {
                    text-align: center;
                    padding: var(--spacing-3xl);
                }
            `}</style>
        </AppLayout>
    )
}
