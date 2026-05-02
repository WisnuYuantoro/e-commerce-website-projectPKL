import AdminLayout from '@/layouts/AdminLayout';
import { Link } from '@inertiajs/react';
 
export default function AdminDashboard({ stats, recent_orders, low_stock }: any) {
    const statCards = [
        { label: 'Total Produk', value: stats.total_products, color: 'bg-blue-50 text-blue-700', icon: '📦' },
        { label: 'Total Pesanan', value: stats.total_orders, color: 'bg-purple-50 text-purple-700', icon: '🛒' },
        { label: 'Pesanan Pending', value: stats.pending_orders, color: 'bg-yellow-50 text-yellow-700', icon: '⏳' },
        { label: 'Total Pengguna', value: stats.total_users, color: 'bg-green-50 text-green-700', icon: '👥' },
        {
            label: 'Total Pendapatan',
            value: 'Rp ' + Number(stats.total_revenue).toLocaleString('id-ID'),
            color: 'bg-emerald-50 text-emerald-700',
            icon: '💰',
            wide: true,
        },
    ];
 
    const statusColors: any = {
        pending: 'bg-yellow-50 text-yellow-700',
        processing: 'bg-blue-50 text-blue-700',
        shipped: 'bg-purple-50 text-purple-700',
        delivered: 'bg-green-50 text-green-700',
        cancelled: 'bg-red-50 text-red-600',
    };
 
    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Selamat datang di panel admin UMKMStore</p>
            </div>
 
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {statCards.map((stat, i) => (
                    <div key={i} className={`bg-white rounded-2xl p-5 shadow-sm ${stat.wide ? 'col-span-2 md:col-span-4' : ''}`}>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                                <p className={`text-2xl font-bold mt-1 ${stat.color.split(' ')[1]}`}>{stat.value}</p>
                            </div>
                            <span className="text-2xl">{stat.icon}</span>
                        </div>
                    </div>
                ))}
            </div>
 
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent orders */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900">Pesanan Terbaru</h2>
                        <Link href="/admin/orders" className="text-sm text-emerald-600 hover:underline">Lihat semua</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">No. Pesanan</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Pelanggan</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recent_orders.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3">
                                            <Link href={`/admin/orders/${order.id}`} className="font-medium text-emerald-600 hover:underline">
                                                {order.order_number}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-3 text-gray-700">{order.user_name}</td>
                                        <td className="px-6 py-3 font-medium text-gray-900">{order.formatted_total}</td>
                                        <td className="px-6 py-3">
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[order.status]}`}>
                                                {order.status_label}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
 
                {/* Low stock */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="font-bold text-gray-900">Stok Hampir Habis</h2>
                    </div>
                    <div className="p-4 space-y-3">
                        {low_stock.length > 0 ? low_stock.map((p: any) => (
                            <div key={p.id} className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                                </div>
                                <span className="ml-2 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-lg">{p.stock} sisa</span>
                            </div>
                        )) : (
                            <p className="text-sm text-gray-400 text-center py-4">Semua stok aman ✓</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}