import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import AppLayout from '../../Components/Layout/AppLayout'

export default function Index({ cart, stripe_public_key }) {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        email: '',
        address: '',
        city: '',
        postal_code: '',
        country: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post('/checkout/')
    }

    return (
        <AppLayout>
            <Head title="Checkout" />

            <div className="max-w-7xl mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <div className="lg:col-span-7">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>

                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div className="sm:col-span-6">
                                        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full name</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="full_name"
                                                value={data.full_name}
                                                onChange={e => setData('full_name', e.target.value)}
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                            />
                                            {errors.full_name && <p className="mt-2 text-sm text-red-600">{errors.full_name}</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                        <div className="mt-1">
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                            />
                                            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="address"
                                                value={data.address}
                                                onChange={e => setData('address', e.target.value)}
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                            />
                                            {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="city"
                                                value={data.city}
                                                onChange={e => setData('city', e.target.value)}
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                            />
                                            {errors.city && <p className="mt-2 text-sm text-red-600">{errors.city}</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">Postal code</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="postal_code"
                                                value={data.postal_code}
                                                onChange={e => setData('postal_code', e.target.value)}
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                            />
                                            {errors.postal_code && <p className="mt-2 text-sm text-red-600">{errors.postal_code}</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="country"
                                                value={data.country}
                                                onChange={e => setData('country', e.target.value)}
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                            />
                                            {errors.country && <p className="mt-2 text-sm text-red-600">{errors.country}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h2>
                                <div className="p-4 border border-gray-200 rounded bg-gray-50 text-center text-gray-500">
                                    Stripe Payment Element would go here
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-orange-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-orange-500"
                            >
                                {processing ? 'Processing...' : `Pay $${cart.total_price}`}
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-5 mt-16 lg:mt-0">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                            <ul className="divide-y divide-gray-200">
                                {cart.items.map((item) => (
                                    <li key={item.id} className="py-4 flex">
                                        <div className="flex-shrink-0">
                                            {item.product.image ? (
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-16 h-16 rounded-md object-center object-cover"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                                            <p className="text-sm text-gray-500">{item.quantity} x ${item.price}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t border-gray-200 pt-4 mt-4 flex items-center justify-between">
                                <dt className="text-base font-medium text-gray-900">Total</dt>
                                <dd className="text-base font-medium text-gray-900">${cart.total_price}</dd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
