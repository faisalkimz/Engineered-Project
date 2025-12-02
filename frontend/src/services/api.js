import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance with defaults
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized - clear tokens and redirect to login
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ===================
// PRODUCTS API
// ===================

export const productsAPI = {
    // Get all products with filters
    getProducts: async (params = {}) => {
        const response = await api.get('/products/api/products/', { params });
        return response.data;
    },

    // Get single product
    getProduct: async (slug) => {
        const response = await api.get(`/products/api/products/${slug}/`);
        return response.data;
    },

    // Get featured products
    getFeatured: async () => {
        const response = await api.get('/products/api/featured/');
        return response.data;
    },

    // Get categories
    getCategories: async () => {
        const response = await api.get('/products/api/categories/');
        return response.data;
    },

    // Get brands
    getBrands: async () => {
        const response = await api.get('/products/api/brands/');
        return response.data;
    },
};

// ===================
// CART API
// ===================

export const cartAPI = {
    // Get cart
    getCart: async () => {
        const response = await api.get('/cart/api/cart/');
        return response.data;
    },

    // Add to cart
    addToCart: async (data) => {
        const response = await api.post('/cart/api/cart/add/', data);
        return response.data;
    },

    // Update cart item
    updateCartItem: async (itemId, quantity) => {
        const response = await api.post(`/cart/api/cart/update/${itemId}/`, { quantity });
        return response.data;
    },

    // Remove from cart
    removeFromCart: async (itemId) => {
        const response = await api.delete(`/cart/api/cart/remove/${itemId}/`);
        return response.data;
    },

    // Clear cart
    clearCart: async () => {
        const response = await api.post('/cart/api/cart/clear/');
        return response.data;
    },
};

// ===================
// ORDERS API
// ===================

export const ordersAPI = {
    // Get all orders
    getOrders: async () => {
        const response = await api.get('/orders/api/orders/');
        return response.data;
    },

    // Get single order
    getOrder: async (orderNumber) => {
        const response = await api.get(`/orders/api/orders/${orderNumber}/`);
        return response.data;
    },

    // Create order
    createOrder: async (data) => {
        const response = await api.post('/orders/api/orders/create/', data);
        return response.data;
    },

    // Cancel order
    cancelOrder: async (orderNumber) => {
        const response = await api.post(`/orders/api/orders/${orderNumber}/cancel/`);
        return response.data;
    },
};

// ===================
// REVIEWS API
// ===================

export const reviewsAPI = {
    // Get product reviews
    getReviews: async (slug, params = {}) => {
        const response = await api.get(`/reviews/api/products/${slug}/reviews/`, { params });
        return response.data;
    },

    // Create review
    createReview: async (slug, data) => {
        const response = await api.post(`/reviews/api/products/${slug}/reviews/create/`, data);
        return response.data;
    },

    // Mark review as helpful
    markHelpful: async (reviewId) => {
        const response = await api.post(`/reviews/api/reviews/${reviewId}/helpful/`);
        return response.data;
    },
};

// ===================
// AUTH API
// ===================

export const authAPI = {
    // Login
    login: async (credentials) => {
        const response = await api.post('/auth/api/login/', credentials);
        if (response.data.tokens) {
            localStorage.setItem('access_token', response.data.tokens.access);
            localStorage.setItem('refresh_token', response.data.tokens.refresh);
        }
        return response.data;
    },

    // Register
    register: async (userData) => {
        const response = await api.post('/auth/api/register/', userData);
        if (response.data.tokens) {
            localStorage.setItem('access_token', response.data.tokens.access);
            localStorage.setItem('refresh_token', response.data.tokens.refresh);
        }
        return response.data;
    },

    // Logout
    logout: async () => {
        const response = await api.post('/auth/api/logout/');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return response.data;
    },

    // Get current user
    getCurrentUser: async () => {
        const response = await api.get('/auth/api/user/');
        return response.data;
    },
};

export default api;
