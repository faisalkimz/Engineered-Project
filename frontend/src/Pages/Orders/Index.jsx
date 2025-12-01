import React from 'react'
import { Head, Link } from '@inertiajs/react'
import AppLayout from '../../Components/Layout/AppLayout'

export default function Index({ orders }) {
    return (
        <AppLayout>
            <Head title="Order History" />

            <div className="max-w-7xl mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>

                {orders.length > 0 ? (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <li key={order.id}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-orange-600 truncate">
                                                Order #{order.order_number}
                                            </p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'}`}>
                                                    {order.status}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    Total: ${order.total}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                <p>
                                                    Placed on {new Date(order.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <h4 className="text-sm font-medium text-gray-900">Items</h4>
                                            <ul className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                                                {order.items.map((item) => (
                                                    <li key={item.id} className="py-2 flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <span className="text-sm text-gray-600">{item.product_name}</span>
                                                            <span className="ml-2 text-sm text-gray-400">x{item.quantity}</span>
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900">${item.total}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <h2 className="text-xl font-medium text-gray-900">No orders yet</h2>
                        <p className="mt-2 text-gray-500">You haven't placed any orders yet.</p>
                        <div className="mt-6">
                            <Link href="/products/" className="text-orange-600 font-medium hover:text-orange-500">
                                Start Shopping &rarr;
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    )
}
