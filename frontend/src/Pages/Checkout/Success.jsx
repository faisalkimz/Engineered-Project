import React from 'react'
import { Head, Link } from '@inertiajs/react'
import AppLayout from '../../Components/Layout/AppLayout'

export default function Success({ order }) {
    return (
        <AppLayout>
            <Head title="Order Confirmed" />

            <div className="max-w-7xl mx-auto p-8 flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h2>
                    <p className="text-lg text-gray-500 mb-8">
                        Thank you for your order. Your order number is <span className="font-bold text-gray-900">#{order.order_number}</span>.
                    </p>
                    <div className="space-x-4">
                        <Link href="/orders/" className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            View Order History
                        </Link>
                        <Link href="/products/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
