import React from 'react'
import { Link } from '@inertiajs/react'

export default function ProductFilter({ categories, currentCategory }) {
    return (
        <div className="w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                    <li>
                        <Link href="/products/" className={`block ${!currentCategory ? 'text-orange-600 font-medium' : 'text-gray-600'}`}>
                            All Categories
                        </Link>
                    </li>
                    {categories.map(cat => (
                        <li key={cat.slug}>
                            <Link
                                href={`/products/?category=${cat.slug}`}
                                className={`block ${currentCategory === cat.slug ? 'text-orange-600 font-medium' : 'text-gray-600'}`}
                            >
                                {cat.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
