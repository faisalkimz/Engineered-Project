import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsAPI, cartAPI, ordersAPI, reviewsAPI, authAPI } from '../services/api';
import toast from 'react-hot-toast';

// ===================
// PRODUCTS HOOKS
// ===================

export const useProducts = (params = {}) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => productsAPI.getProducts(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useProduct = (slug) => {
    return useQuery({
        queryKey: ['product', slug],
        queryFn: () => productsAPI.getProduct(slug),
        enabled: !!slug,
        staleTime: 5 * 60 * 1000,
    });
};

export const useFeaturedProducts = () => {
    return useQuery({
        queryKey: ['featured-products'],
        queryFn: () => productsAPI.getFeatured(),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => productsAPI.getCategories(),
        staleTime: 30 * 60 * 1000, // 30 minutes
    });
};

export const useBrands = () => {
    return useQuery({
        queryKey: ['brands'],
        queryFn: () => productsAPI.getBrands(),
        staleTime: 30 * 60 * 1000,
    });
};

// ===================
// CART HOOKS
// ===================

export const useCart = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: () => cartAPI.getCart(),
        staleTime: 0, // Always fresh
    });
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cartAPI.addToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success('Added to cart!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to add to cart');
        },
    });
};

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ itemId, quantity }) => cartAPI.updateCartItem(itemId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to update cart');
        },
    });
};

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cartAPI.removeFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success('Removed from cart');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to remove from cart');
        },
    });
};

export const useClearCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cartAPI.clearCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success('Cart cleared');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to clear cart');
        },
    });
};

// ===================
// ORDERS HOOKS
// ===================

export const useOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () => ordersAPI.getOrders(),
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

export const useOrder = (orderNumber) => {
    return useQuery({
        queryKey: ['order', orderNumber],
        queryFn: () => ordersAPI.getOrder(orderNumber),
        enabled: !!orderNumber,
    });
};

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ordersAPI.createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            toast.success('Order placed successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to place order');
        },
    });
};

export const useCancelOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ordersAPI.cancelOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            toast.success('Order cancelled');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to cancel order');
        },
    });
};

// ===================
// REVIEWS HOOKS
// ===================

export const useReviews = (slug, params = {}) => {
    return useQuery({
        queryKey: ['reviews', slug, params],
        queryFn: () => reviewsAPI.getReviews(slug, params),
        enabled: !!slug,
    });
};

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ slug, data }) => reviewsAPI.createReview(slug, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['reviews', variables.slug] });
            queryClient.invalidateQueries({ queryKey: ['product', variables.slug] });
            toast.success('Review submitted successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to submit review');
        },
    });
};

export const useMarkHelpful = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reviewsAPI.markHelpful,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
            toast.success('Thank you for your feedback!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to mark as helpful');
        },
    });
};

// ===================
// AUTH HOOKS
// ===================

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authAPI.login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current-user'] });
            toast.success('Logged in successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Invalid credentials');
        },
    });
};

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authAPI.register,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current-user'] });
            toast.success('Account created successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to create account');
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authAPI.logout,
        onSuccess: () => {
            queryClient.clear();
            toast.success('Logged out successfully!');
        },
    });
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['current-user'],
        queryFn: () => authAPI.getCurrentUser(),
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
};
