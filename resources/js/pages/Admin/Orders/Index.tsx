import AdminLayout from '@/layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
 
const statusColors: any = {
    pending: 'bg-yellow-50 text-yellow-700',
    processing: 'bg-blue-50 text-blue-700',
    shipped: 'bg-purple-50 text-purple-700',
    delivered: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-600',
};
 
export default function AdminOrdersIndex({ orders, filters }: any) {
    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Manajemen Pesanan</h1>
                <select
                    value={filters.status || ''}
                    onChange={e => router.get('/admin/orders', { status: e.target.value })}
                    className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                    <option value="">Semua Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Diproses</option>
                    <option value="shipped">Dikirim</option>
                    <option value="delivered">Selesai</option>
                    <option value="cancelled">Dibatalkan</option>
                </select>
            </div>
 
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">No. Pesanan</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Pelanggan</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Pembayaran</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {orders.data.map((o: any) => (
                            <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-emerald-600">{o.order_number}</td>
                                <td className="px-6 py-4 text-gray-700">{o.user_name}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{o.formatted_total}</td>
                                <td className="px-6 py-4 text-gray-600 capitalize">{o.payment_method}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[o.status]}`}>{o.status_label}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{o.created_at}</td>
                                <td className="px-6 py-4">
                                    <Link href={`/admin/orders/${o.id}`} className="text-emerald-600 hover:underline font-medium">Detail</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="px-6 py-4 border-t border-gray-100 flex gap-2 justify-end">
                    {orders.links.map((link: any, i: number) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${link.active ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} ${!link.url ? 'opacity-40 pointer-events-none' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
 