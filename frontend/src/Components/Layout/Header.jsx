import React from 'react'
import { Link, usePage } from '@inertiajs/react'

export default function Header() {
    const { auth } = usePage().props

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="w-full py-6 flex items-center justify-between border-b border-orange-500 lg:border-none">
                    <div className="flex items-center">
                        <Link href="/">
                            <span className="sr-only">TechMart</span>
                            <span className="text-2xl font-bold text-orange-600">TechMart</span>
                        </Link>
                        <div className="hidden ml-10 space-x-8 lg:block">
                            <Link href="/products/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                Products
                            </Link>
                            <Link href="/products/?category=phones" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                Phones
                            </Link>
                            <Link href="/products/?category=laptops" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                Laptops
                            </Link>
                        </div>
                    </div>
                    <div className="ml-10 space-x-4">
                        {auth.user ? (
                            <>
                                <Link href="/cart/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                    Cart
                                </Link>
                                <Link href="/profile/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                    Profile
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login/" className="inline-block bg-orange-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                                    Sign in
                                </Link>
                                <Link href="/auth/register/" className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-orange-600 hover:bg-gray-50">
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}
