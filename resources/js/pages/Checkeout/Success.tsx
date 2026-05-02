import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
 
export default function CheckoutSuccess({ order }: any) {
    return (
        <MainLayout>
            <div className="max-w-lg mx-auto px-4 py-20 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesanan Berhasil!</h1>
                <p className="text-gray-500 mb-8">Terima kasih! Pesananmu sedang diproses.</p>
 
                {order && (
                    <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">No. Pesanan</span>
                            <span className="font-semibold text-gray-900">{order.order_number}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total Pembayaran</span>
                            <span className="font-bold text-emerald-600">{order.formatted_total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Metode Bayar</span>
                            <span className="font-medium text-gray-900">{order.payment_method === 'transfer' ? 'Transfer Bank' : 'COD'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Status</span>
                            <span className="text-orange-600 font-medium">{order.status}</span>
                        </div>
                    </div>
                )}
 
                <div className="flex gap-4">
                    <Link href="/orders" className="flex-1 border-2 border-emerald-600 text-emerald-600 font-semibold py-3 rounded-xl hover:bg-emerald-50 transition-colors">
                        Lihat Pesanan
                    </Link>
                    <Link href="/products" className="flex-1 bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors">
                        Belanja Lagi
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}
 