import React from 'react'
import { Head, Link } from '@inertiajs/react'

export default function Show({ product }) {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Head title={product.name} />

            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    {/* Image Gallery */}
                    <div className="md:w-1/2 p-8">
                        <div className="mb-4">
                            {product.images.length > 0 ? (
                                <img
                                    src={product.images[0].url}
                                    alt={product.images[0].alt}
                                    className="w-full h-96 object-cover rounded-lg"
                                />
                            ) : (
                                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.slice(1).map(img => (
                                <img
                                    key={img.id}
                                    src={img.url}
                                    alt={img.alt}
                                    className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-75"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="md:w-1/2 p-8 bg-gray-50">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                        <p className="text-2xl text-orange-600 font-bold mb-6">${product.price}</p>

                        <div className="prose prose-sm text-gray-500 mb-8">
                            <p>{product.description}</p>
                        </div>

                        {/* Variants */}
                        {product.variants.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900 mb-2">Options</h3>
                                <div className="flex gap-2">
                                    {product.variants.map(variant => (
                                        <button
                                            key={variant.id}
                                            className="px-4 py-2 border rounded-md hover:border-orange-500 hover:text-orange-600"
                                        >
                                            {variant.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button className="flex-1 bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition shadow-md">
                                Add to Cart
                            </button>
                            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100">
                                ❤️
                            </button>
                        </div>

                        {/* Specifications */}
                        {Object.keys(product.specifications).length > 0 && (
                            <div className="mt-8 border-t pt-8">
                                <h3 className="font-medium text-gray-900 mb-4">Specifications</h3>
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">{key}</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
