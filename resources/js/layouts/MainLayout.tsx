import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
    const { auth, cartCount, flash } = usePage<any>().props;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">U</span>
                            </div>
                            <span className="font-bold text-gray-900 text-lg">UMKMStore</span>
                        </Link>

                        {/* Nav links */}
                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/" className="text-gray-600 hover:text-emerald-600 text-sm font-medium transition-colors">
                                Beranda
                            </Link>
                            <Link href="/products" className="text-gray-600 hover:text-emerald-600 text-sm font-medium transition-colors">
                                Produk
                            </Link>
                        </div>

                        {/* Right actions */}
                        <div className="flex items-center gap-3">
                            {auth?.user ? (
                                <>
                                    {/* Cart */}
                                    <Link href="/cart" className="relative p-2 text-gray-600 hover:text-emerald-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        {cartCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>

                                    {/* User menu */}
                                    <div className="relative group">
                                        <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-600">
                                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                                <span className="text-emerald-700 font-semibold text-xs">
                                                    {auth.user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="hidden md:block">{auth.user.name}</span>
                                        </button>
                                        <div className="absolute right-0 top-10 bg-white shadow-lg rounded-xl border border-gray-100 py-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                            <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Pesanan Saya</Link>
                                            {auth.user.role === 'admin' && (
                                                <Link href="/admin" className="block px-4 py-2 text-sm text-emerald-600 hover:bg-gray-50">Admin Panel</Link>
                                            )}
                                            <hr className="my-1 border-gray-100" />
                                            <Link href="/logout" method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                                                Keluar
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-emerald-600 px-3 py-2">
                                        Masuk
                                    </Link>
                                    <Link href="/register" className="text-sm font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                                        Daftar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Flash messages */}
            {flash?.success && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 px-4 py-3 text-sm">
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 text-sm">
                    {flash.error}
                </div>
            )}

            {/* Main content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 mt-auto">
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">U</span>
                                </div>
                                <span className="font-bold text-white">UMKMStore</span>
                            </div>
                            <p className="text-sm leading-relaxed">Platform e-commerce untuk mendukung produk UMKM lokal berkualitas.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3 text-sm">Menu</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
                                <li><Link href="/products" className="hover:text-white transition-colors">Produk</Link></li>
                                <li><Link href="/orders" className="hover:text-white transition-colors">Pesanan</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3 text-sm">Kontak</h4>
                            <p className="text-sm">Email: info@umkmstore.id</p>
                            <p className="text-sm mt-1">WA: +62 812 3456 7890</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-center">
                        © {new Date().getFullYear()} UMKMStore — Proyek PKL
                    </div>
                </div>
            </footer>
        </div>
    );
}