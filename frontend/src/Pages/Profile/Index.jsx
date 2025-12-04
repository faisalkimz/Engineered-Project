import React, { useState, useEffect, useRef } from 'react'
import AppLayout from '../../Components/Layout/AppLayout'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { profileService, ugandaData } from '../../services/profileService'
import { toast } from 'react-hot-toast'

export default function ProfileIndex() {
    const { user, logout, setUser } = useAuth()
    const navigate = useNavigate()
    const fileInputRef = useRef(null)

    const [profile, setProfile] = useState(null)
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        phone_number: '',
    })

    // Load profile data
    useEffect(() => {
        if (user) {
            loadProfileData()
        }
    }, [user])

    const loadProfileData = async () => {
        try {
            const [profileData, statsData] = await Promise.all([
                profileService.getProfile(),
                profileService.getStats()
            ])

            setProfile(profileData)
            setStats(statsData)
            setFormData({
                first_name: profileData.first_name || '',
                last_name: profileData.last_name || '',
                username: profileData.username || '',
                phone_number: profileData.phone_number || '',
            })
        } catch (error) {
            console.error('Error loading profile:', error)
            toast.error('Failed to load profile data')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size must be less than 5MB')
            return
        }

        // Validate file type
        if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
            toast.error('Please upload a JPEG, PNG, or WebP image')
            return
        }

        setUploading(true)
        try {
            const result = await profileService.uploadAvatar(file)
            setProfile(result.user)
            setUser(result.user) // Update auth context
            toast.success('Profile picture updated! 📸')
        } catch (error) {
            console.error('Error uploading avatar:', error)
            toast.error('Failed to upload image')
        } finally {
            setUploading(false)
        }
    }

    const handleDeleteAvatar = async () => {
        if (!window.confirm('Are you sure you want to remove your profile picture?')) return

        try {
            await profileService.deleteAvatar()
            await loadProfileData()
            toast.success('Profile picture removed')
        } catch (error) {
            console.error('Error deleting avatar:', error)
            toast.error('Failed to delete avatar')
        }
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault()

        try {
            const updated = await profileService.updateProfile(formData)
            setProfile(updated)
            setUser(updated) // Update auth context
            setEditing(false)
            toast.success('Profile updated successfully! ✅')
        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error(error.response?.data?.error || 'Failed to update profile')
        }
    }

    if (!user) {
        return (
            <AppLayout>
                <div className="profile-page">
                    <div className="container">
                        <div className="empty-state">
                            <div className="empty-icon">🇺🇬</div>
                            <h2>Welcome to TechMart Uganda!</h2>
                            <p>Please log in to view your profile and start shopping with Uganda's best online marketplace.</p>
                            <Link to="/auth/login" className="btn btn-primary">
                                <span>🔐</span> Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </AppLayout>
        )
    }

    if (loading) {
        return (
            <AppLayout>
                <div className="profile-page">
                    <div className="container">
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading your profile...</p>
                        </div>
                    </div>
                </div>
            </AppLayout>
        )
    }

    const getInitials = () => {
        if (profile?.first_name && profile?.last_name) {
            return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
        }
        return profile?.username?.[0]?.toUpperCase() || 'U'
    }

    return (
        <AppLayout>
            <div className="profile-page">
                <div className="container">
                    {/* Header Section with Ugandan Colors */}
                    <div className="profile-header uganda-gradient">
                        <div className="profile-header-content">
                            {/* Avatar Section */}
                            <div className="profile-avatar-section">
                                <div className="avatar-wrapper">
                                    {profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt={profile.username} className="avatar-image" />
                                    ) : (
                                        <div className="avatar-placeholder">
                                            <span className="avatar-initials">{getInitials()}</span>
                                        </div>
                                    )}
                                    {uploading && (
                                        <div className="avatar-uploading">
                                            <div className="spinner-small"></div>
                                        </div>
                                    )}
                                </div>

                                <div className="avatar-actions">
                                    <button onClick={handleAvatarClick} className="btn btn-sm btn-outline" disabled={uploading}>
                                        📸 {profile?.avatar_url ? 'Change Photo' : 'Add Photo'}
                                    </button>
                                    {profile?.avatar_url && (
                                        <button onClick={handleDeleteAvatar} className="btn btn-sm btn-outline-danger">
                                            🗑️ Remove
                                        </button>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={handleAvatarChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="profile-info">
                                <div className="profile-name-section">
                                    <h1>{profile?.full_name || profile?.username}</h1>
                                    {profile?.is_verified && (
                                        <span className="verified-badge" title="Verified User">
                                            ✓ Verified
                                        </span>
                                    )}
                                </div>
                                <p className="profile-email">
                                    <span>📧</span> {profile?.email}
                                </p>
                                {profile?.phone_number && (
                                    <p className="profile-phone">
                                        <span>📱</span> {ugandaData.formatPhone(profile.phone_number)}
                                    </p>
                                )}
                                <div className="profile-badges">
                                    <span className="badge badge-secondary">
                                        <span>🇺🇬</span> Member since {profile?.member_since}
                                    </span>
                                    <span className="badge badge-primary">
                                        {profile?.role === 'buyer' ? '🛍️ Buyer' : profile?.role === 'seller' ? '🏪 Seller' : '👑 Admin'}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="profile-header-actions">
                                <button onClick={() => setEditing(!editing)} className="btn btn-outline">
                                    ✏️ {editing ? 'Cancel' : 'Edit Profile'}
                                </button>
                                <button onClick={handleLogout} className="btn btn-outline-danger">
                                    🚪 Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Edit Profile Form */}
                    {editing && (
                        <div className="edit-profile-section">
                            <h2>Edit Your Profile</h2>
                            <form onSubmit={handleUpdateProfile} className="edit-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            value={formData.first_name}
                                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                            placeholder="Enter your first name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            value={formData.last_name}
                                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            placeholder="Choose a username"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number 🇺🇬</label>
                                        <input
                                            type="tel"
                                            value={formData.phone_number}
                                            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                            placeholder="+256-XXX-XXXXXX"
                                        />
                                        <small>MTN or Airtel number for Mobile Money</small>
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="btn btn-primary">
                                        💾 Save Changes
                                    </button>
                                    <button type="button" onClick={() => setEditing(false)} className="btn btn-outline">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Stats Section */}
                    {stats && (
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">📦</div>
                                <div className="stat-value">{stats.total_orders}</div>
                                <div className="stat-label">Total Orders</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">✅</div>
                                <div className="stat-value">{stats.completed_orders}</div>
                                <div className="stat-label">Completed</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">⭐</div>
                                <div className="stat-value">{stats.total_reviews}</div>
                                <div className="stat-label">Reviews</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">📍</div>
                                <div className="stat-value">{stats.total_addresses}</div>
                                <div className="stat-label">Addresses</div>
                            </div>
                        </div>
                    )}

                    {/* Dashboard Grid */}
                    <div className="profile-grid">
                        <Link to="/orders" className="dashboard-card">
                            <div className="card-icon">📦</div>
                            <h3>My Orders</h3>
                            <p>Track and view your order history</p>
                            <span className="card-arrow">→</span>
                        </Link>

                        <Link to="/wishlist" className="dashboard-card">
                            <div className="card-icon">❤️</div>
                            <h3>Wishlist</h3>
                            <p>View your saved products</p>
                            <span className="card-arrow">→</span>
                        </Link>

                        <div className="dashboard-card" onClick={() => toast.info('Coming soon! 🚀')}>
                            <div className="card-icon">📍</div>
                            <h3>Delivery Addresses</h3>
                            <p>Manage your shipping addresses across Uganda</p>
                            <span className="card-arrow">→</span>
                        </div>

                        <div className="dashboard-card" onClick={() => toast.info('Coming soon! 🚀')}>
                            <div className="card-icon">💰</div>
                            <h3>Mobile Money</h3>
                            <p>Manage MTN & Airtel Money settings</p>
                            <span className="card-arrow">→</span>
                        </div>

                        <div className="dashboard-card" onClick={() => toast.info('Coming soon! 🚀')}>
                            <div className="card-icon">🎁</div>
                            <h3>Loyalty Rewards</h3>
                            <p>View your points and rewards</p>
                            <span className="card-arrow">→</span>
                        </div>

                        <div className="dashboard-card" onClick={() => toast.info('Coming soon! 🚀')}>
                            <div className="card-icon">⚙️</div>
                            <h3>Settings</h3>
                            <p>Update your account preferences</p>
                            <span className="card-arrow">→</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================
                STYLES - PREMIUM UGANDAN DESIGN
                ============================================ */}
            <style jsx="true">{`
                .profile-page {
                    padding: var(--spacing-2xl) 0 var(--spacing-3xl);
                    min-height: calc(100vh - 80px - 400px);
                    background: linear-gradient(135deg, #f5f7fa 0%, #fff 100%);
                }
                
                /* ===== UGANDAN GRADIENT HEADER ===== */
                .uganda-gradient {
                    background: linear-gradient(135deg, 
                        #000000 0%,    /* Black */
                        #FCDC04 50%,   /* Yellow */
                        #D90000 100%   /* Red */
                    );
                    position: relative;
                    overflow: hidden;
                }
                
                .uganda-gradient::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                }
                
                .profile-header {
                    border-radius: var(--radius-2xl);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    margin-bottom: var(--spacing-3xl);
                    position: relative;
                }
                
                .profile-header-content {
                    position: relative;
                    z-index: 1;
                    padding: var(--spacing-3xl);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-2xl);
                    flex-wrap: wrap;
                }
                
                /* ===== AVATAR SECTION ===== */
                .profile-avatar-section {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                    align-items: center;
                }
                
                .avatar-wrapper {
                    position: relative;
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    border: 5px solid white;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                    background: white;
                }
                
                .avatar-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .avatar-placeholder {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #FCDC04 0%, #f68b1e 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .avatar-initials {
                    font-size: 3.5rem;
                    font-weight: 800;
                    color: #000;
                }
                
                .avatar-uploading {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .spinner-small {
                    width: 30px;
                    height: 30px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                
                .avatar-actions {
                    display: flex;
                    gap: var(--spacing-sm);
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                /* ===== PROFILE INFO ===== */
                .profile-info {
                    flex: 1;
                    min-width: 300px;
                    color: white;
                }
                
                .profile-name-section {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    flex-wrap: wrap;
                    margin-bottom: var(--spacing-sm);
                }
                
                .profile-info h1 {
                    font-size: var(--font-size-4xl);
                    margin: 0;
                    font-weight: 800;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                }
                
                .verified-badge {
                    background: #27ae60;
                    color: white;
                    padding: 4px 12px;
                    border-radius: var(--radius-full);
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                }
                
                .profile-email, .profile-phone {
                    font-size: var(--font-size-lg);
                    margin: var(--spacing-xs) 0;
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    opacity: 0.95;
                }
                
                .profile-email span, .profile-phone span {
                    font-size: 1.2em;
                }
                
                .profile-badges {
                    display: flex;
                    gap: var(--spacing-md);
                    margin-top: var(--spacing-md);
                    flex-wrap: wrap;
                }
                
                .badge {
                    padding: 6px 16px;
                    border-radius: var(--radius-full);
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    display: inline-flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                }
                
                .badge-secondary {
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    backdrop-filter: blur(10px);
                }
                
                .badge-primary {
                    background: rgba(252, 220, 4, 0.3);
                    color: white;
                    border: 2px solid #FCDC04;
                }
                
                /* ===== HEADER ACTIONS ===== */
                .profile-header-actions {
                    display: flex;
                    gap: var(--spacing-md);
                    flex-wrap: wrap;
                    margin-left: auto;
                }
                
                .btn-outline {
                    background: rgba(255, 255, 255, 0.15);
                    color: white;
                    border: 2px solid white;
                    backdrop-filter: blur(10px);
                }
                
                .btn-outline:hover {
                    background: white;
                    color: #000;
                }
                
                .btn-outline-danger {
                    background: rgba(217, 0, 0, 0.2);
                    color: white;
                    border: 2px solid #D90000;
                }
                
                .btn-outline-danger:hover {
                    background: #D90000;
                    color: white;
                }
                
                .btn-sm {
                    padding: 6px 16px;
                    font-size: var(--font-size-sm);
                }
                
                /* ===== EDIT PROFILE SECTION ===== */
                .edit-profile-section {
                    background: white;
                    padding: var(--spacing-2xl);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-lg);
                    margin-bottom: var(--spacing-3xl);
                    animation: slideDown 0.3s ease;
                }
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .edit-profile-section h2 {
                    margin-bottom: var(--spacing-xl);
                    color: var(--text-primary);
                }
                
                .edit-form {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                }
                
                .form-row {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: var(--spacing-lg);
                }
                
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xs);
                }
                
                .form-group label {
                    font-weight: 600;
                    color: var(--text-primary);
                }
                
                .form-group input {
                    padding: 12px 16px;
                    border: 2px solid var(--border-light);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-base);
                    transition: all var(--transition-base);
                }
                
                .form-group input:focus {
                    outline: none;
                    border-color: #FCDC04;
                    box-shadow: 0 0 0 3px rgba(252, 220, 4, 0.1);
                }
                
                .form-group small {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }
                
                .form-actions {
                    display: flex;
                    gap: var(--spacing-md);
                    margin-top: var(--spacing-md);
                }
                
                /* ===== STATS GRID ===== */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: var(--spacing-xl);
                    margin-bottom: var(--spacing-3xl);
                }
                
                .stat-card {
                    background: white;
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-md);
                    text-align: center;
                    transition: all var(--transition-base);
                    border: 2px solid transparent;
                }
                
                .stat-card:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-xl);
                    border-color: #FCDC04;
                }
                
                .stat-icon {
                    font-size: 3rem;
                    margin-bottom: var(--spacing-sm);
                }
                
                .stat-value {
                    font-size: var(--font-size-4xl);
                    font-weight: 800;
                    color: var(--primary);
                    margin-bottom: var(--spacing-xs);
                }
                
                .stat-label {
                    color: var(--text-secondary);
                    font-size: var(--font-size-base);
                    font-weight: 600;
                }
                
                /* ===== DASHBOARD GRID ===== */
                .profile-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: var(--spacing-xl);
                }

                .dashboard-card {
                    background: white;
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-md);
                    text-decoration: none;
                    color: var(--text-primary);
                    transition: all var(--transition-base);
                    border: 2px solid transparent;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                }

                .dashboard-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: linear-gradient(90deg, #000000 0%, #FCDC04 50%, #D90000 100%);
                    transform: scaleX(0);
                    transition: transform var(--transition-base);
                }

                .dashboard-card:hover::before {
                    transform: scaleX(1);
                }

                .dashboard-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                    border-color: #FCDC04;
                }

                .card-icon {
                    font-size: 3.5rem;
                    margin-bottom: var(--spacing-md);
                }

                .dashboard-card h3 {
                    font-size: var(--font-size-xl);
                    margin-bottom: var(--spacing-xs);
                    font-weight: 700;
                }

                .dashboard-card p {
                    color: var(--text-secondary);
                    font-size: var(--font-size-base);
                    line-height: 1.5;
                    margin-bottom: var(--spacing-md);
                }
                
                .card-arrow {
                    font-size: 1.5rem;
                    color: var(--primary);
                    margin-top: auto;
                    transition: transform var(--transition-base);
                }
                
                .dashboard-card:hover .card-arrow {
                    transform: translateX(8px);
                }

                /* ===== EMPTY & LOADING STATES ===== */
                .empty-state, .loading-state {
                    text-align: center;
                    padding: var(--spacing-3xl);
                    background: white;
                    border-radius: var(--radius-2xl);
                    box-shadow: var(--shadow-lg);
                }
                
                .empty-icon {
                    font-size: 5rem;
                    margin-bottom: var(--spacing-xl);
                }
                
                .empty-state h2 {
                    margin-bottom: var(--spacing-md);
                }
                
                .empty-state p {
                    color: var(--text-secondary);
                    margin-bottom: var(--spacing-xl);
                    max-width: 500px;
                    margin-left: auto;
                    margin-right: auto;
                }
                
                .spinner {
                    width: 60px;
                    height: 60px;
                    border: 4px solid var(--border-light);
                    border-top-color: var(--primary);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto var(--spacing-xl);
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                /* ===== RESPONSIVE ===== */
                @media (max-width: 968px) {
                    .profile-header-content {
                        flex-direction: column;
                        text-align: center;
                        padding: var(--spacing-xl);
                    }
                    
                    .profile-info {
                        text-align: center;
                    }
                    
                    .profile-header-actions {
                        margin-left: 0;
                        justify-content: center;
                    }
                    
                    .profile-info h1 {
                        font-size: var(--font-size-3xl);
                    }
                }
            `}</style>
        </AppLayout>
    )
}
