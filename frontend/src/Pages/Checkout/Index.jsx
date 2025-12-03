import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../Components/Layout/AppLayout'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

import { ordersAPI } from '../../services/api'
import { toast } from 'react-hot-toast'

export default function CheckoutIndex() {
    const navigate = useNavigate()
    const { cart, clearCart } = useCart()
    const { isAuthenticated, user } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Review
    const [shippingInfo, setShippingInfo] = useState({
        fullName: user?.username || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Nigeria'
    })

    const [paymentMethod, setPaymentMethod] = useState('card')
    const [saveInfo, setSaveInfo] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const cartItems = cart.items || []
    const subtotal = cart.total || 0
    const shipping = subtotal > 50 ? 0 : 10
    const tax = subtotal * 0.075 // 7.5% VAT
    const total = subtotal + shipping + tax

    const handleShippingSubmit = (e) => {
        e.preventDefault()
        setStep(2)
    }

    const handlePaymentSubmit = (e) => {
        e.preventDefault()
        setStep(3)
    }

    const handlePlaceOrder = async () => {
        setIsSubmitting(true)
        try {
            const orderData = {
                shipping_address: {
                    full_name: shippingInfo.fullName,
                    address_line1: shippingInfo.address,
                    city: shippingInfo.city,
                    state: shippingInfo.state,
                    postal_code: shippingInfo.zipCode,
                    country: shippingInfo.country,
                    phone: shippingInfo.phone,
                    email: shippingInfo.email
                },
                payment_method: paymentMethod
            }

            const response = await ordersAPI.createOrder(orderData)

            if (response.success) {
                clearCart()
                toast.success('Order placed successfully!')
                navigate('/checkout/success')
            }
        } catch (error) {
            console.error('Order creation failed:', error)
            toast.error(error.response?.data?.error || 'Failed to place order. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (cartItems.length === 0) {
        return (
            <AppLayout>
                <div className="empty-cart-page">
                    <div className="container">
                        <div className="empty-cart-content">
                            <div className="empty-cart-icon">🛒</div>
                            <h2>Your Cart is Empty</h2>
                            <p>Add some products to get started with checkout</p>
                            <button onClick={() => navigate('/products')} className="btn btn-primary btn-lg">
                                Start Shopping
                            </button>
                        </div>
                    </div>
                </div>
                <style jsx="true">{`
                    .empty-cart-page {
                        padding: var(--spacing-5xl) 0;
                        min-height: 60vh;
                    }
                    .empty-cart-content {
                        text-align: center;
                        max-width: 500px;
                        margin: 0 auto;
                    }
                    .empty-cart-icon {
                        font-size: 6rem;
                        margin-bottom: var(--spacing-xl);
                    }
                    .empty-cart-content h2 {
                        font-size: var(--font-size-3xl);
                        margin-bottom: var(--spacing-md);
                    }
                    .empty-cart-content p {
                        color: var(--text-secondary);
                        margin-bottom: var(--spacing-2xl);
                        font-size: var(--font-size-lg);
                    }
                `}</style>
            </AppLayout>
        )
    }

    return (
        <AppLayout>
            <div className="checkout-page">
                <div className="container">
                    {/* Progress Steps */}
                    <div className="checkout-progress">
                        <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                            <div className="step-circle">
                                {step > 1 ? '✓' : '1'}
                            </div>
                            <span className="step-label">Shipping</span>
                        </div>
                        <div className="progress-line"></div>
                        <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                            <div className="step-circle">
                                {step > 2 ? '✓' : '2'}
                            </div>
                            <span className="step-label">Payment</span>
                        </div>
                        <div className="progress-line"></div>
                        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                            <div className="step-circle">3</div>
                            <span className="step-label">Review</span>
                        </div>
                    </div>

                    <div className="checkout-layout">
                        {/* Main Content */}
                        <div className="checkout-main">
                            {/* Step 1: Shipping Information */}
                            {step === 1 && (
                                <div className="checkout-section animate-fadeInUp">
                                    <h2 className="section-title">Shipping Information</h2>
                                    <form onSubmit={handleShippingSubmit} className="checkout-form">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">Full Name *</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    value={shippingInfo.fullName}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Phone Number *</label>
                                                <input
                                                    type="tel"
                                                    className="form-input"
                                                    value={shippingInfo.phone}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Email Address *</label>
                                            <input
                                                type="email"
                                                className="form-input"
                                                value={shippingInfo.email}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Street Address *</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={shippingInfo.address}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                                placeholder="House number and street name"
                                                required
                                            />
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">City *</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    value={shippingInfo.city}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">State *</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    value={shippingInfo.state}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">ZIP Code *</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    value={shippingInfo.zipCode}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Country *</label>
                                                <select
                                                    className="form-select"
                                                    value={shippingInfo.country}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                                                    required
                                                >
                                                    <option value="Nigeria">Nigeria</option>
                                                    <option value="Ghana">Ghana</option>
                                                    <option value="Kenya">Kenya</option>
                                                    <option value="South Africa">South Africa</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-checkbox">
                                            <input
                                                type="checkbox"
                                                id="saveInfo"
                                                checked={saveInfo}
                                                onChange={(e) => setSaveInfo(e.target.checked)}
                                            />
                                            <label htmlFor="saveInfo">Save this information for next time</label>
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-lg btn-block">
                                            Continue to Payment
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Step 2: Payment Method */}
                            {step === 2 && (
                                <div className="checkout-section animate-fadeInUp">
                                    <h2 className="section-title">Payment Method</h2>
                                    <form onSubmit={handlePaymentSubmit} className="checkout-form">
                                        <div className="payment-methods">
                                            <label className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="card"
                                                    checked={paymentMethod === 'card'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <div className="payment-content">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                                        <line x1="1" y1="10" x2="23" y2="10"></line>
                                                    </svg>
                                                    <span>Credit / Debit Card</span>
                                                </div>
                                            </label>

                                            <label className={`payment-option ${paymentMethod === 'bank' ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="bank"
                                                    checked={paymentMethod === 'bank'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <div className="payment-content">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                                    </svg>
                                                    <span>Bank Transfer</span>
                                                </div>
                                            </label>

                                            <label className={`payment-option ${paymentMethod === 'cash' ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="cash"
                                                    checked={paymentMethod === 'cash'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <div className="payment-content">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <line x1="12" y1="1" x2="12" y2="23"></line>
                                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                                    </svg>
                                                    <span>Cash on Delivery</span>
                                                </div>
                                            </label>
                                        </div>

                                        {paymentMethod === 'card' && (
                                            <div className="card-details animate-fadeInUp">
                                                <div className="form-group">
                                                    <label className="form-label">Card Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-input"
                                                        placeholder="1234 5678 9012 3456"
                                                        maxLength="19"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Cardholder Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-input"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label className="form-label">Expiry Date</label>
                                                        <input
                                                            type="text"
                                                            className="form-input"
                                                            placeholder="MM/YY"
                                                            maxLength="5"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">CVV</label>
                                                        <input
                                                            type="text"
                                                            className="form-input"
                                                            placeholder="123"
                                                            maxLength="3"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="form-actions">
                                            <button type="button" onClick={() => setStep(1)} className="btn btn-outline btn-lg">
                                                Back
                                            </button>
                                            <button type="submit" className="btn btn-primary btn-lg">
                                                Review Order
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Step 3: Review & Place Order */}
                            {step === 3 && (
                                <div className="checkout-section animate-fadeInUp">
                                    <h2 className="section-title">Review Your Order</h2>

                                    <div className="review-section">
                                        <h3 className="review-subtitle">Shipping Address</h3>
                                        <div className="review-card">
                                            <p><strong>{shippingInfo.fullName}</strong></p>
                                            <p>{shippingInfo.address}</p>
                                            <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                                            <p>{shippingInfo.country}</p>
                                            <p>{shippingInfo.phone}</p>
                                            <p>{shippingInfo.email}</p>
                                            <button onClick={() => setStep(1)} className="edit-btn">Edit</button>
                                        </div>
                                    </div>

                                    <div className="review-section">
                                        <h3 className="review-subtitle">Payment Method</h3>
                                        <div className="review-card">
                                            <p><strong>
                                                {paymentMethod === 'card' && 'Credit / Debit Card'}
                                                {paymentMethod === 'bank' && 'Bank Transfer'}
                                                {paymentMethod === 'cash' && 'Cash on Delivery'}
                                            </strong></p>
                                            <button onClick={() => setStep(2)} className="edit-btn">Edit</button>
                                        </div>
                                    </div>

                                    <div className="form-checkbox">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                        />
                                        <label htmlFor="terms">
                                            I agree to the <a href="/terms">Terms and Conditions</a> and <a href="/privacy">Privacy Policy</a>
                                        </label>
                                    </div>

                                    <div className="form-actions">
                                        <button type="button" onClick={() => setStep(2)} className="btn btn-outline btn-lg">
                                            Back
                                        </button>
                                        <button
                                            onClick={handlePlaceOrder}
                                            className="btn btn-primary btn-lg"
                                            disabled={!agreedToTerms}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M9 11l3 3L22 4"></path>
                                                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                                            </svg>
                                            Place Order (${total.toFixed(2)})
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="checkout-sidebar">
                            <div className="order-summary">
                                <h3 className="summary-title">Order Summary</h3>

                                <div className="summary-items">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="summary-item">
                                            <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} />
                                            <div className="item-details">
                                                <h4>{item.name}</h4>
                                                <p>Qty: {item.quantity}</p>
                                            </div>
                                            <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="summary-totals">
                                    <div className="total-row">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="total-row">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="total-row">
                                        <span>Tax (7.5%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="total-row grand-total">
                                        <strong>Total</strong>
                                        <strong>${total.toFixed(2)}</strong>
                                    </div>
                                </div>

                                {shipping === 0 && (
                                    <div className="free-shipping-badge">
                                        ✓ You're getting FREE shipping!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx="true">{`
                .checkout-page {
                    padding: var(--spacing-2xl) 0 var(--spacing-5xl);
                    background: var(--bg-primary);
                    min-height: calc(100vh - 200px);
                }

                /* Progress Steps */
                .checkout-progress {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: var(--spacing-4xl);
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .progress-step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: var(--spacing-sm);
                    position: relative;
                }

                .step-circle {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: var(--bg-secondary);
                    border: 2px solid var(--border-light);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    color: var(--text-muted);
                    transition: all var(--transition-base);
                }

                .progress-step.active .step-circle {
                    border-color: var(--primary);
                    color: var(--primary);
                    background: rgba(246, 139, 30, 0.1);
                }

                .progress-step.completed .step-circle {
                    background: var(--primary);
                    border-color: var(--primary);
                    color: white;
                }

                .step-label {
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    color: var(--text-secondary);
                }

                .progress-step.active .step-label {
                    color: var(--primary);
                }

                .progress-line {
                    flex: 1;
                    height: 2px;
                    background: var(--border-light);
                    margin: 0 var(--spacing-md);
                    min-width: 80px;
                }

                /* Checkout Layout */
                .checkout-layout {
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: var(--spacing-3xl);
                }

                .checkout-section {
                    background: var(--bg-secondary);
                    padding: var(--spacing-3xl);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-md);
                }

                .section-title {
                    font-size: var(--font-size-3xl);
                    margin-bottom: var(--spacing-2xl);
                }

                /* Forms */
                .checkout-form {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xl);
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-lg);
                }

                .form-checkbox {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                }

                .form-checkbox input[type="checkbox"] {
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                }

                .form-checkbox label {
                    font-size: var(--font-size-sm);
                    cursor: pointer;
                }

                .form-checkbox a {
                    color: var(--primary);
                    text-decoration: underline;
                }

                /* Payment Methods */
                .payment-methods {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }

                .payment-option {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    padding: var(--spacing-lg);
                    border: 2px solid var(--border-light);
                    border-radius: var(--radius-lg);
                    cursor: pointer;
                    transition: all var(--transition-base);
                }

                .payment-option:hover {
                    border-color: var(--primary);
                    background: rgba(246, 139, 30, 0.05);
                }

                .payment-option.active {
                    border-color: var(--primary);
                    background: rgba(246, 139, 30, 0.1);
                }

                .payment-option input[type="radio"] {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                }

                .payment-content {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    flex: 1;
                }

                .payment-content span {
                    font-weight: 600;
                }

                .card-details {
                    margin-top: var(--spacing-xl);
                    padding: var(--spacing-xl);
                    background: var(--bg-primary);
                    border-radius: var(--radius-lg);
                }

                /* Review */
                .review-section {
                    margin-bottom: var(--spacing-xl);
                }

                .review-subtitle {
                    font-size: var(--font-size-lg);
                    font-weight: 700;
                    margin-bottom: var(--spacing-md);
                }

                .review-card {
                    padding: var(--spacing-xl);
                    background: var(--bg-primary);
                    border-radius: var(--radius-lg);
                    position: relative;
                }

                .review-card p {
                    margin-bottom: var(--spacing-xs);
                    color: var(--text-secondary);
                }

                .edit-btn {
                    position: absolute;
                    top: var(--spacing-lg);
                    right: var(--spacing-lg);
                    background: none;
                    border: none;
                    color: var(--primary);
                    font-weight: 600;
                    cursor: pointer;
                    padding: var(--spacing-xs) var(--spacing-sm);
                    border-radius: var(--radius-md);
                    transition: all var(--transition-fast);
                }

                .edit-btn:hover {
                    background: rgba(246, 139, 30, 0.1);
                }

                .form-actions {
                    display: flex;
                    gap: var(--spacing-md);
                    margin-top: var(--spacing-xl);
                }

                .form-actions button {
                    flex: 1;
                }

                /* Order Summary */
                .order-summary {
                    background: var(--bg-secondary);
                    padding: var(--spacing-2xl);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-md);
                    position: sticky;
                    top: 100px;
                }

                .summary-title {
                    font-size: var(--font-size-2xl);
                    margin-bottom: var(--spacing-xl);
                    padding-bottom: var(--spacing-md);
                    border-bottom: 2px solid var(--border-light);
                }

                .summary-items {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                    margin-bottom: var(--spacing-xl);
                    max-height: 300px;
                    overflow-y: auto;
                }

                .summary-item {
                    display: flex;
                    gap: var(--spacing-md);
                    align-items: center;
                }

                .summary-item img {
                    width: 60px;
                    height: 60px;
                    object-fit: cover;
                    border-radius: var(--radius-md);
                    background: var(--bg-primary);
                }

                .item-details {
                    flex: 1;
                }

                .item-details h4 {
                    font-size: var(--font-size-sm);
                    margin-bottom: 0.25rem;
                    line-height: 1.3;
                }

                .item-details p {
                    font-size: var(--font-size-xs);
                    color: var(--text-muted);
                }

                .item-price {
                    font-weight: 700;
                    color: var(--text-primary);
                }

                .summary-totals {
                    padding-top: var(--spacing-lg);
                    border-top: 1px solid var(--border-light);
                }

                .total-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: var(--spacing-md);
                    font-size: var(--font-size-base);
                }

                .total-row.grand-total {
                    font-size: var(--font-size-xl);
                    padding-top: var(--spacing-md);
                    border-top: 2px solid var(--border-light);
                    margin-top: var(--spacing-md);
                    color: var(--primary);
                }

                .free-shipping-badge {
                    background: linear-gradient(135deg, var(--success) 0%, #16a34a 100%);
                    color: white;
                    padding: var(--spacing-md);
                    border-radius: var(--radius-lg);
                    text-align: center;
                    font-weight: 600;
                    margin-top: var(--spacing-xl);
                }

                @media (max-width: 1024px) {
                    .checkout-layout {
                        grid-template-columns: 1fr;
                    }

                    .order-summary {
                        position: static;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                    }

                    .checkout-progress {
                        padding: 0 var(--spacing-md);
                    }

                    .progress-line {
                        min-width: 40px;
                    }

                    .step-label {
                        font-size: var(--font-size-xs);
                    }
                }
            `}</style>
        </AppLayout>
    )
}
