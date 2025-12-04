import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const response = await api.get('/auth/api/user/')
            setUser(response.data.user)
        } catch (error) {
            console.error('Auth check failed:', error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (credentials) => {
        try {
            const response = await api.post('/auth/api/login/', credentials)
            setUser(response.data.user)
            return { success: true }
        } catch (error) {
            console.error('Login failed:', error)
            return {
                success: false,
                error: error.response?.data?.error || 'Login failed'
            }
        }
    }

    const register = async (userData) => {
        try {
            const response = await api.post('/auth/api/register/', userData)
            setUser(response.data.user)
            return { success: true }
        } catch (error) {
            console.error('Registration failed:', error)
            return {
                success: false,
                error: error.response?.data?.error || 'Registration failed'
            }
        }
    }

    const logout = async () => {
        try {
            await api.post('/auth/api/logout/')
            setUser(null)
            return { success: true }
        } catch (error) {
            console.error('Logout failed:', error)
            return { success: false }
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            login,
            logout,
            register,
            isAuthenticated: !!user,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}
