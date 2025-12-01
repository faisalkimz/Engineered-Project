import React from 'react'
import { Head } from '@inertiajs/react'

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Head title="Home" />
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-orange-600 mb-4">Welcome to TechMart</h1>
                <p className="text-gray-600">Your premium destination for phones and gadgets.</p>
                <button className="mt-6 bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition">
                    Shop Now
                </button>
            </div>
        </div>
    )
}
