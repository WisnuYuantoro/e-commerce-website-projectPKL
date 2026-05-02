import AdminLayout from '@/layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
 
export default function AdminProductsIndex({ products }: any) {
    const deleteProduct = (id: number) => {
        if (confirm('Yakin ingin menghapus produk ini?')) {
            router.delete(`/admin/products/${id}`);
        }
    };
 
    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manajemen Produk</h1>
                    <p className="text-gray-500 text-sm mt-1">{products.total} produk terdaftar</p>
                </div>
                <Link href="/admin/products/create" className="bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors text-sm">
                    + Tambah Produk
                </Link>
            </div>
 
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Produk</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Kategori</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Harga</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Stok</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.data.map((p: any) => (
                                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                {p.image && <img src={`/storage/${p.image}`} alt={p.name} className="w-full h-full object-cover" />}
                                            </div>
                                            <span className="font-medium text-gray-900 line-clamp-1">{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{p.category?.name}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        Rp {Number(p.price).toLocaleString('id-ID')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`font-medium ${p.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>{p.stock}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {p.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Link href={`/admin/products/${p.id}/edit`} className="text-emerald-600 hover:underline font-medium">Edit</Link>
                                            <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-700 font-medium">Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
 
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex gap-2 justify-end">
                    {products.links.map((link: any, i: number) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${link.active ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} ${!link.url ? 'opacity-40 pointer-events-none' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}