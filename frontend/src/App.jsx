import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
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

import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
