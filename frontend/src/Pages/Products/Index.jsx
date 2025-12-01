import React from 'react'
import { Head, Link, usePage } from '@inertiajs/react'

export default function Index({ products, categories, brands, filters }) {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Head title="Products" />

            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>

                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="font-semibold mb-4">Categories</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/products/" className={`block ${!filters.category ? 'text-orange-600 font-medium' : 'text-gray-600'}`}>
                                        All Categories
                                    </Link>
                                </li>
                                {categories.map(cat => (
                                    <li key={cat.slug}>
                                        <Link
                                            href={`/products/?category=${cat.slug}`}
                                            className={`block ${filters.category === cat.slug ? 'text-orange-600 font-medium' : 'text-gray-600'}`}
                                        >
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {products.data.map(product => (
                                <Link key={product.id} href={`/products/${product.slug}/`} className="group">
                                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-48 w-full object-cover object-center group-hover:opacity-75"
                                                />
                                            ) : (
                                                <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-sm text-gray-700">{product.name}</h3>
                                            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                                            {product.brand && (
                                                <p className="mt-1 text-xs text-gray-500">{product.brand}</p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-8 flex justify-center gap-4">
                            {products.links.previous && (
                                <Link href={`?page=${products.links.current_page - 1}`} className="px-4 py-2 bg-white border rounded hover:bg-gray-50">
                                    Previous
                                </Link>
                            )}
                            {products.links.next && (
                                <Link href={`?page=${products.links.current_page + 1}`} className="px-4 py-2 bg-white border rounded hover:bg-gray-50">
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
