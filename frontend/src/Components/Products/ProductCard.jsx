import React from 'react'
import { Link } from '@inertiajs/react'

export default function ProductCard({ product }) {
    return (
        <Link href={`/products/${product.slug}/`} className="group">
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
    )
}
