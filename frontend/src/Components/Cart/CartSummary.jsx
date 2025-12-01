import React from 'react'
import { Link } from '@inertiajs/react'

export default function CartSummary({ total }) {
    return (
        <div className="lg:col-span-5 mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:sticky lg:top-24">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">${total}</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                    <dd className="text-base font-medium text-gray-900">${total}</dd>
                </div>
            </dl>

            <div className="mt-6">
                <Link
                    href="/checkout/"
                    className="w-full bg-orange-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-orange-500 block text-center"
                >
                    Checkout
                </Link>
            </div>
        </div>
    )
}
