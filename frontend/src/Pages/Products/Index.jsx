import React from 'react'
import { Head, Link } from '@inertiajs/react'
import AppLayout from '../../Components/Layout/AppLayout'
import ProductGrid from '../../Components/Products/ProductGrid'
import ProductFilter from '../../Components/Products/ProductFilter'

export default function Index({ products, categories, brands, filters }) {
    return (
        <AppLayout>
            <Head title="Products" />

            <div className="max-w-7xl mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>

                <div className="flex gap-8">
                    <ProductFilter categories={categories} currentCategory={filters.category} />

                    <div className="flex-1">
                        <ProductGrid products={products.data} />

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
        </AppLayout>
    )
}
