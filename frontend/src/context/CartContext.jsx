import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Load cart from localStorage
        const savedCart = localStorage.getItem('techmart_cart')
        return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 }
    })

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('techmart_cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.items.findIndex(
                item => item.product.id === product.id
            )

            let newItems
            if (existingItemIndex > -1) {
                // Update existing item
                newItems = [...prevCart.items]
                newItems[existingItemIndex].quantity += quantity
                newItems[existingItemIndex].subtotal =
                    newItems[existingItemIndex].product.price * newItems[existingItemIndex].quantity
            } else {
                // Add new item
                newItems = [...prevCart.items, {
                    id: Date.now(),
                    product,
                    quantity,
                    subtotal: product.price * quantity
                }]
            }

            const total = newItems.reduce((sum, item) => sum + item.subtotal, 0)
            return { items: newItems, total }
        })
    }

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return

        setCart(prevCart => {
            const newItems = prevCart.items.map(item => {
                if (item.id === itemId) {
                    return {
                        ...item,
                        quantity: newQuantity,
                        subtotal: item.product.price * newQuantity
                    }
                }
                return item
            })

            const total = newItems.reduce((sum, item) => sum + item.subtotal, 0)
            return { items: newItems, total }
        })
    }

    const removeFromCart = (itemId) => {
        setCart(prevCart => {
            const newItems = prevCart.items.filter(item => item.id !== itemId)
            const total = newItems.reduce((sum, item) => sum + item.subtotal, 0)
            return { items: newItems, total }
        })
    }

    const clearCart = () => {
        setCart({ items: [], total: 0 })
    }

    const getCartCount = () => {
        return cart.items.reduce((count, item) => count + item.quantity, 0)
    }

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    )
}
