import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AppLayout from '../../Components/Layout/AppLayout'

export default function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [processing, setProcessing] = useState(false)
    const [generalError, setGeneralError] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' })
        }
        setGeneralError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        setErrors({})
        setGeneralError('')

        const result = await login(formData)

        if (result.success) {
            navigate('/')
        } else {
            setGeneralError(result.error)
        }
        setProcessing(false)
    }

    return (
        <AppLayout>
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Welcome Back</h1>
                        <p className="auth-subtitle">
                            Sign in to access your account
                        </p>
                    </div>

                    {generalError && (
                        <div className="error-alert">
                            {generalError}
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="form-input"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="form-input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-primary"
                                style={{ width: '100%' }}
                            >
                                {processing ? 'Signing in...' : 'Sign In'}
                            </button>
                        </div>

                        <div className="auth-footer">
                            <p>
                                Don't have an account?{' '}
                                <Link to="/auth/register" className="auth-link">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx="true">{`
                .auth-container {
                    min-height: calc(100vh - 80px - 400px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: var(--spacing-2xl) var(--spacing-lg);
                    background: linear-gradient(135deg, 
                        hsl(220, 20%, 97%) 0%, 
                        hsl(24, 100%, 98%) 100%);
                }
                
                .auth-card {
                    width: 100%;
                    max-width: 440px;
                    background: var(--bg-secondary);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-xl);
                    padding: var(--spacing-2xl);
                    animation: fadeInUp 0.6s ease-out;
                }
                
                .auth-header {
                    text-align: center;
                    margin-bottom: var(--spacing-2xl);
                }
                
                .auth-title {
                    font-size: var(--font-size-3xl);
                    margin-bottom: var(--spacing-sm);
                }
                
                .auth-subtitle {
                    color: var(--text-secondary);
                    font-size: var(--font-size-base);
                }
                
                .error-alert {
                    background: rgba(239, 68, 68, 0.1);
                    color: var(--error);
                    padding: var(--spacing-md);
                    border-radius: var(--radius-md);
                    margin-bottom: var(--spacing-lg);
                    font-size: var(--font-size-sm);
                    text-align: center;
                    border: 1px solid rgba(239, 68, 68, 0.2);
                }
                
                .auth-form {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                }
                
                .form-actions {
                    margin-top: var(--spacing-md);
                }
                
                .auth-footer {
                    text-align: center;
                    padding-top: var(--spacing-lg);
                    border-top: 1px solid var(--border-light);
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }
                
                .auth-link {
                    color: var(--primary);
                    font-weight: 600;
                    text-decoration: none;
                    transition: color var(--transition-fast);
                }
                
                .auth-link:hover {
                    color: var(--primary-dark);
                }
            `}</style>
        </AppLayout>
    )
}
