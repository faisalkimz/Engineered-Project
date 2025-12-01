import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import AppLayout from '../../Components/Layout/AppLayout'
import CartItem from '../../Components/Cart/CartItem'
import CartSummary from '../../Components/Cart/CartSummary'

export default function Index({ cart }) {
    const { post, processing } = useForm()

    const updateQuantity = (itemId, quantity) => {
        if (quantity < 1) return
        post(`/cart/update/${itemId}/`, {
            data: { quantity },
            preserveScroll: true,
        })
    }

    const removeItem = (itemId) => {
        if (confirm('Are you sure you want to remove this item?')) {
            post(`/cart/remove/${itemId}/`, {
                preserveScroll: true,
            })
        }
    }

    return (
        <AppLayout>
            <Head title="Shopping Cart" />

            <div className="max-w-7xl mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                {cart.items.length > 0 ? (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                        <div className="lg:col-span-7">
                            <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                                {cart.items.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        updateQuantity={updateQuantity}
                                        removeItem={removeItem}
                                        processing={processing}
                                    />
                                ))}
                            </ul>
                        </div>

                        <CartSummary total={cart.total_price} />
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h2 className="text-xl font-medium text-gray-900">Your cart is empty</h2>
                        <p className="mt-4 text-gray-500">Looks like you haven't added any items to the cart yet.</p>
                        <div className="mt-6">
                            <Link href="/products/" className="text-orange-600 font-medium hover:text-orange-500">
                                Continue Shopping &rarr;
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    )
}
