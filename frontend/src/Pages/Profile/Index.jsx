import React from 'react'
import AppLayout from '../../Components/Layout/AppLayout'
import { Link } from 'react-router-dom'

export default function ProfileIndex() {
    // Mock user data for now
    const user = {
        name: 'Demo User',
        email: 'demo@example.com',
        joined: 'December 2023'
    }

    return (
        <AppLayout>
            <div className="profile-page">
                <div className="container">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            <span>{user.name.charAt(0)}</span>
                        </div>
                        <div className="profile-info">
                            <h1>{user.name}</h1>
                            <p>{user.email}</p>
                            <span className="join-date">Member since {user.joined}</span>
                        </div>
                    </div>

                    <div className="profile-content">
                        <div className="coming-soon-card">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <h2>Account Dashboard</h2>
                            <p>We're building a comprehensive dashboard for you to manage your orders, addresses, and preferences.</p>
                            <Link to="/orders" className="btn btn-outline">View Orders</Link>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx="true">{`
                .profile-page {
                    padding: var(--spacing-2xl) 0 var(--spacing-3xl);
                    min-height: calc(100vh - 80px - 400px);
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
                
                .coming-soon-card {
                    text-align: center;
                    padding: var(--spacing-3xl);
                    border: 2px dashed var(--border-medium);
                    border-radius: var(--radius-xl);
                    background: rgba(255,255,255,0.5);
                }
                
                .coming-soon-card svg {
                    margin: 0 auto var(--spacing-lg);
                    color: var(--text-muted);
                }
                
                .coming-soon-card h2 {
                    font-size: var(--font-size-2xl);
                    margin-bottom: var(--spacing-sm);
                }
                
                .coming-soon-card p {
                    color: var(--text-secondary);
                    margin-bottom: var(--spacing-xl);
                    max-width: 500px;
                    margin-left: auto;
                    margin-right: auto;
                }
            `}</style>
        </AppLayout>
    )
}
