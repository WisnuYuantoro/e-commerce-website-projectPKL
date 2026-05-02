import MainLayout from '@/layouts/MainLayout';
import { Link, router } from '@inertiajs/react';
 
export default function CartIndex({ carts, total, formatted_total }: any) {
    const updateQty = (cartId: number, qty: number) => {
        if (qty < 1) return;
        router.patch(`/cart/${cartId}`, { quantity: qty }, { preserveScroll: true });
    };
 
    const removeItem = (cartId: number) => {
        router.delete(`/cart/${cartId}`, { preserveScroll: true });
    };
 
    if (carts.length === 0) {
        return (
            <MainLayout>
                <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                    <svg className="w-24 h-24 mx-auto text-gray-200 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h2>
                    <p className="text-gray-500 mb-8">Belum ada produk yang ditambahkan ke keranjang.</p>
                    <Link href="/products" className="bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors">
                        Mulai Belanja
                    </Link>
                </div>
            </MainLayout>
        );
    }
 
    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Keranjang Belanja</h1>
 
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart items */}
                    <div className="lg:col-span-2 space-y-4">
                        {carts.map((item: any) => (
                            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                    {item.product.image ? (
                                        <img src={`/storage/${item.product.image}`} alt={item.product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-teal-100" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 text-sm">{item.product.name}</h3>
                                    <p className="text-emerald-600 font-bold mt-1">{item.product.formatted_price}</p>
                                    <div className="mt-2 flex items-center gap-3">
                                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2 py-1 text-gray-500 hover:bg-gray-50 text-sm">−</button>
                                            <span className="px-3 py-1 text-sm font-semibold">{item.quantity}</span>
                                            <button onClick={() => updateQty(item.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock} className="px-2 py-1 text-gray-500 hover:bg-gray-50 text-sm disabled:opacity-40">+</button>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 text-xs transition-colors">Hapus</button>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <span className="font-bold text-gray-900 text-sm">
                                        Rp {item.subtotal.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
 
                    {/* Summary */}
                    <div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                            <h2 className="font-bold text-gray-900 text-lg mb-4">Ringkasan</h2>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal ({carts.length} produk)</span>
                                    <span className="font-medium text-gray-900">{formatted_total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Ongkos Kirim</span>
                                    <span className="text-emerald-600">Dihitung saat checkout</span>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-100" />
                            <div className="flex justify-between font-bold text-gray-900">
                                <span>Total</span>
                                <span className="text-emerald-600 text-lg">{formatted_total}</span>
                            </div>
                            <Link
                                href="/checkout"
                                className="mt-6 block w-full bg-emerald-600 text-white text-center font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors"
                            >
                                Checkout Sekarang
                            </Link>
                            <Link href="/products" className="mt-3 block w-full text-center text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                                ← Lanjut Belanja
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}