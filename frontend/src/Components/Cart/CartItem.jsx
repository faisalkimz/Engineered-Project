import React from 'react'
import { Link } from '@inertiajs/react'

export default function CartItem({ item, updateQuantity, removeItem, processing }) {
    return (
        <li className="flex py-6 sm:py-10">
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
                            <p className="text-gray-500">{item.variant ? item.variant.name : 'Standard'}</p>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">${item.price}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${item.id}`} className="sr-only">
                            Quantity, {item.product.name}
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md w-32">
                            <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                disabled={processing}
                            >
                                -
                            </button>
                            <input
                                id={`quantity-${item.id}`}
                                name={`quantity-${item.id}`}
                                value={item.quantity}
                                readOnly
                                className="w-full text-center border-none focus:ring-0 p-1"
                            />
                            <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                disabled={processing}
                            >
                                +
                            </button>
                        </div>

                        <div className="absolute top-0 right-0">
                            <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                disabled={processing}
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
    )
}
