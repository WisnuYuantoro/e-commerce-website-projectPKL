import MainLayout from '@/layouts/MainLayout';
import { Link, router } from '@inertiajs/react';
 
interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    formatted_price: string;
    image: string | null;
    stock: number;
    category: string;
}
 
interface Category {
    id: number;
    name: string;
    slug: string;
    products_count: number;
}
 
interface Props {
    products: Product[];
    categories: Category[];
}
 
function ProductCard({ product }: { product: Product }) {
    const addToCart = () => {
        router.post('/cart', { product_id: product.id, quantity: 1 });
    };
 
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden group">
            <Link href={`/products/${product.slug}`}>
                <div className="aspect-square bg-gray-100 overflow-hidden">
                    {product.image ? (
                        <img
                            src={`/storage/${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
                            <svg className="w-16 h-16 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                    )}
                </div>
            </Link>
            <div className="p-4">
                <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">{product.category}</span>
                <Link href={`/products/${product.slug}`}>
                    <h3 className="mt-2 font-semibold text-gray-900 text-sm line-clamp-2 hover:text-emerald-600 transition-colors">{product.name}</h3>
                </Link>
                <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-gray-900">{product.formatted_price}</span>
                    <span className="text-xs text-gray-400">Stok: {product.stock}</span>
                </div>
                <button
                    onClick={addToCart}
                    disabled={product.stock === 0}
                    className="mt-3 w-full bg-emerald-600 text-white text-sm font-medium py-2 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {product.stock === 0 ? 'Habis' : '+ Keranjang'}
                </button>
            </div>
        </div>
    );
}
 
export default function Home({ products, categories }: Props) {
    return (
        <MainLayout>
            {/* Hero */}
            <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
                <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Belanja Produk UMKM<br />
                            <span className="text-emerald-200">Lokal Berkualitas</span>
                        </h1>
                        <p className="mt-4 text-emerald-100 text-lg max-w-md">
                            Dukung pengusaha lokal dengan berbelanja produk UMKM terpilih langsung dari sumbernya.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <Link href="/products" className="bg-white text-emerald-700 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors">
                                Lihat Produk
                            </Link>
                            <Link href="/register" className="border border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                                Daftar Gratis
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 hidden md:flex justify-center">
                        <div className="w-72 h-72 bg-white/10 rounded-full flex items-center justify-center">
                            <div className="w-56 h-56 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-28 h-28 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
 
            {/* Categories */}
            {categories.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Kategori Produk</h2>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {categories.map(cat => (
                            <Link
                                key={cat.id}
                                href={`/products?category=${cat.slug}`}
                                className="flex-shrink-0 bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-xl text-sm font-medium hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                            >
                                {cat.name}
                                <span className="ml-2 text-xs text-gray-400">({cat.products_count})</span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
 
            {/* Products */}
            <section className="max-w-7xl mx-auto px-4 pb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Produk Terbaru</h2>
                    <Link href="/products" className="text-emerald-600 text-sm font-medium hover:underline">
                        Lihat semua →
                    </Link>
                </div>
                {products.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                ) : (
                    <div className="text-center py-16 text-gray-400">
                        <p>Belum ada produk tersedia.</p>
                    </div>
                )}
            </section>
        </MainLayout>
    );
}