import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
 
const statusColors: any = {
    pending: 'bg-yellow-50 text-yellow-700',
    processing: 'bg-blue-50 text-blue-700',
    shipped: 'bg-purple-50 text-purple-700',
    delivered: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-600',
};
 
export default function OrdersIndex({ orders }: any) {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Pesanan Saya</h1>
 
                {orders.length > 0 ? (
                    <div className="space-y-4">
                        {orders.map((order: any) => (
                            <div key={order.id} className="bg-white rounded-2xl shadow-sm p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-semibold text-gray-900">{order.order_number}</p>
                                        <p className="text-sm text-gray-500 mt-0.5">{order.created_at} · {order.item_count} produk</p>
                                    </div>
                                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                                        {order.status_label}
                                    </span>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="font-bold text-gray-900">{order.formatted_total}</span>
                                    <Link href={`/orders/${order.id}`} className="text-sm text-emerald-600 font-medium hover:underline">
                                        Detail →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">Belum ada pesanan.</p>
                        <Link href="/products" className="mt-4 inline-block text-emerald-600 font-medium hover:underline">Mulai Belanja</Link>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
 