import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'
import { RecentlyViewedProvider } from './context/RecentlyViewedContext'
import { QuickViewProvider } from './context/QuickViewContext'
import './index.css'

// Pages
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import ProductsIndex from './Pages/Products/Index'
import ProductShow from './Pages/Products/Show'
import CartIndex from './Pages/Cart/Index'
import CheckoutIndex from './Pages/Checkout/Index'
import CheckoutSuccess from './Pages/Checkout/Success'
import ProfileIndex from './Pages/Profile/Index'
import OrdersIndex from './Pages/Orders/Index'
import OrderShow from './Pages/Orders/Show'
import WishlistIndex from './Pages/Wishlist/Index'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <QuickViewProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/products" element={<ProductsIndex />} />
                    <Route path="/products/:id" element={<ProductShow />} />
                    <Route path="/cart" element={<CartIndex />} />
                    <Route path="/checkout" element={<CheckoutIndex />} />
                    <Route path="/checkout/success" element={<CheckoutSuccess />} />
                    <Route path="/profile" element={<ProfileIndex />} />
                    <Route path="/orders" element={<OrdersIndex />} />
                    <Route path="/orders/:orderNumber" element={<OrderShow />} />
                    <Route path="/wishlist" element={<WishlistIndex />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </BrowserRouter>

                {/* Toast notifications */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-light)',
                    },
                    success: {
                      iconTheme: {
                        primary: 'var(--success)',
                        secondary: 'white',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: 'var(--danger)',
                        secondary: 'white',
                      },
                    },
                  }}
                />
              </QuickViewProvider>
            </RecentlyViewedProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App

