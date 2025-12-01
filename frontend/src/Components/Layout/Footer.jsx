import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">TechMart</h3>
                        <p className="text-gray-400">Your premium destination for the latest gadgets and electronics.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/products/" className="hover:text-white">Shop</a></li>
                            <li><a href="/about/" className="hover:text-white">About Us</a></li>
                            <li><a href="/contact/" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <p className="text-gray-400">support@techmart.com</p>
                        <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 TechMart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
