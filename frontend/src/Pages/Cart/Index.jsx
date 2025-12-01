import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Index({ cart }) {
    const { post, processing } = useForm()

    const updateQuantity = (itemId, quantity) => {
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
        <div className="min-h-screen bg-gray-50 p-8">
            <Head title="Shopping Cart" />

            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                {cart.items.length > 0 ? (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                        <div className="lg:col-span-7">
                            <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                                {cart.items.map((item) => (
                                    <li key={item.id} className="flex py-6 sm:py-10">
                                        <div className="flex-shrink-0">
                                            {item.product.image ? (
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                                                />
                                            ) : (
                                                <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 sm:w-48 sm:h-48">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm">
                                                            <Link href={`/products/${item.product.slug}/`} className="font-medium text-gray-700 hover:text-gray-800">
                                                                {item.product.name}
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                    <div className="mt-1 flex text-sm">
                                                        <p className="text-gray-500">{item.variant}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm font-medium text-gray-900">${item.price}</p>
                                                </div>

                                                <div className="mt-4 sm:mt-0 sm:pr-9">
                                                    <label htmlFor={`quantity-${item.id}`} className="sr-only">
                                                        Quantity, {item.product.name}
                                                    </label>
                                                    <select
                                                        id={`quantity-${item.id}`}
                                                        name={`quantity-${item.id}`}
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                                                        className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                                    >
                                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                            <option key={num} value={num}>
                                                                {num}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <div className="absolute top-0 right-0">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItem(item.id)}
                                                            className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                                        >
                                                            <span className="sr-only">Remove</span>
                                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-5 mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:bg-gray-50">
                            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                                    <dd className="text-base font-medium text-gray-900">${cart.total}</dd>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    className="w-full bg-orange-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-orange-500"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h2 className="text-xl font-medium text-gray-900">Your cart is empty</h2>
                        <p className="mt-2 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
                        <div className="mt-6">
                            <Link href="/products/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
