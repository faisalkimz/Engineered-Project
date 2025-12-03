import { createContext, useContext, useState, useEffect } from 'react'

const RecentlyViewedContext = createContext()

export const useRecentlyViewed = () => {
    const context = useContext(RecentlyViewedContext)
    if (!context) {
        throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider')
    }
    return context
}

export const RecentlyViewedProvider = ({ children }) => {
    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        const saved = localStorage.getItem('recentlyViewed')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed))
    }, [recentlyViewed])

    const addToRecentlyViewed = (product) => {
        setRecentlyViewed(prev => {
            // Remove if already exists
            const filtered = prev.filter(item => item.id !== product.id)

            // Add to front
            const updated = [{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.image,
                category: product.category,
                brand: product.brand,
                viewedAt: new Date().toISOString()
            }, ...filtered]

            // Keep only last 12 items
            return updated.slice(0, 12)
        })
    }

    const clearRecentlyViewed = () => {
        setRecentlyViewed([])
    }

    const value = {
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed
    }

    return (
        <RecentlyViewedContext.Provider value={value}>
            {children}
        </RecentlyViewedContext.Provider>
    )
}
