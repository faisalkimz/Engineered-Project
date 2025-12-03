import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const WishlistContext = createContext()

export const useWishlist = () => {
    const context = useContext(WishlistContext)
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider')
    }
    return context
}

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('wishlist')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }, [wishlist])

    const addToWishlist = (product) => {
        const exists = wishlist.find(item => item.id === product.id)
        if (exists) {
            toast.error('Already in your wishlist!')
            return false
        }

        setWishlist(prev => [...prev, {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.image,
            category: product.category,
            brand: product.brand,
            addedAt: new Date().toISOString()
        }])
        toast.success('Added to wishlist! ❤️')
        return true
    }

    const removeFromWishlist = (productId) => {
        setWishlist(prev => prev.filter(item => item.id !== productId))
        toast.success('Removed from wishlist')
    }

    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId)
    }

    const clearWishlist = () => {
        setWishlist([])
        toast.success('Wishlist cleared')
    }

    const getWishlistCount = () => {
        return wishlist.length
    }

    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        getWishlistCount
    }

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    )
}
