import MainLayout from '@/layouts/MainLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
 
export default function ProductShow({ product, related }: any) {
    const [qty, setQty] = useState(1);
 
    const addToCart = () => {
        router.post('/cart', { product_id: product.id, quantity: qty });
    };
 
    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-6 flex gap-2">
                    <Link href="/" className="hover:text-emerald-600">Beranda</Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-emerald-600">Produk</Link>
                    <span>/</span>
                    <span className="text-gray-900">{product.name}</span>
                </nav>
 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Image */}
                    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                        {product.image ? (
                            <img src={`/storage/${product.image}`} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
                                <svg className="w-24 h-24 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                        )}
                    </div>
 
                    {/* Info */}
                    <div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{product.category}</span>
                        <h1 className="mt-3 text-3xl font-bold text-gray-900">{product.name}</h1>
                        <p className="mt-4 text-3xl font-bold text-emerald-600">{product.formatted_price}</p>
 
                        <div className="mt-4 flex items-center gap-2">
                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                                {product.stock > 0 ? `Stok: ${product.stock}` : 'Habis'}
                            </span>
                        </div>
 
                        {product.description && (
                            <div className="mt-6">
                                <h3 className="font-semibold text-gray-900 mb-2">Deskripsi Produk</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                            </div>
                        )}
 
                        {product.stock > 0 && (
                            <div className="mt-8 space-y-4">
                                {/* Quantity */}
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-700">Jumlah:</span>
                                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors">−</button>
                                        <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">{qty}</span>
                                        <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors">+</button>
                                    </div>
                                </div>
 
                                <button
                                    onClick={addToCart}
                                    className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors"
                                >
                                    Tambah ke Keranjang
                                </button>
                                <button
                                    onClick={() => { router.post('/cart', { product_id: product.id, quantity: qty }, { onSuccess: () => router.visit('/checkout') }); }}
                                    className="w-full border-2 border-emerald-600 text-emerald-600 font-semibold py-3 rounded-xl hover:bg-emerald-50 transition-colors"
                                >
                                    Beli Sekarang
                                </button>
                            </div>
                        )}
                    </div>
                </div>
 
                {/* Related products */}
                {related.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Produk Serupa</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {related.map((p: any) => (
                                <Link key={p.id} href={`/products/${p.slug}`} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                                    <div className="aspect-square bg-gray-100">
                                        {p.image ? (
                                            <img src={`/storage/${p.image}`} alt={p.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-teal-100" />
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <p className="text-sm font-medium text-gray-900 line-clamp-2">{p.name}</p>
                                        <p className="mt-1 font-bold text-emerald-600 text-sm">{p.formatted_price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}