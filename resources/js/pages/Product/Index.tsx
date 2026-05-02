import MainLayout from '@/layouts/MainLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
 
export default function ProductsIndex({ products, categories, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
 
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/products', { ...filters, search }, { preserveState: true });
    };
 
    const handleFilter = (key: string, value: string) => {
        router.get('/products', { ...filters, [key]: value }, { preserveState: true });
    };
 
    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Semua Produk</h1>
 
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Cari produk..."
                            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                        />
                        <button type="submit" className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors">
                            Cari
                        </button>
                    </form>
                    <select
                        value={filters.sort || ''}
                        onChange={e => handleFilter('sort', e.target.value)}
                        className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                        <option value="">Terbaru</option>
                        <option value="price_asc">Harga Terendah</option>
                        <option value="price_desc">Harga Tertinggi</option>
                    </select>
                </div>
 
                {/* Category pills */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <button
                        onClick={() => handleFilter('category', '')}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${!filters.category ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-400'}`}
                    >
                        Semua
                    </button>
                    {categories.map((cat: any) => (
                        <button
                            key={cat.id}
                            onClick={() => handleFilter('category', cat.slug)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${filters.category === cat.slug ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-400'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
 
                {/* Products grid */}
                {products.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products.data.map((p: any) => (
                                <div key={p.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden group">
                                    <Link href={`/products/${p.slug}`}>
                                        <div className="aspect-square bg-gray-100 overflow-hidden">
                                            {p.image ? (
                                                <img src={`/storage/${p.image}`} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
                                                    <svg className="w-12 h-12 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                    <div className="p-4">
                                        <Link href={`/products/${p.slug}`}>
                                            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 hover:text-emerald-600">{p.name}</h3>
                                        </Link>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="font-bold text-gray-900 text-sm">{p.formatted_price}</span>
                                            <span className="text-xs text-gray-400">Stok: {p.stock}</span>
                                        </div>
                                        <button
                                            onClick={() => router.post('/cart', { product_id: p.id, quantity: 1 })}
                                            disabled={p.stock === 0}
                                            className="mt-3 w-full bg-emerald-600 text-white text-sm font-medium py-2 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
                                        >
                                            {p.stock === 0 ? 'Habis' : '+ Keranjang'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
 
                        {/* Pagination */}
                        <div className="mt-8 flex justify-center gap-2">
                            {products.links.map((link: any, i: number) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${link.active ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-400'} ${!link.url ? 'opacity-40 pointer-events-none' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-medium text-gray-500">Produk tidak ditemukan</p>
                        <p className="text-sm mt-1">Coba kata kunci lain atau hapus filter</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}