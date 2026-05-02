import AdminLayout from '@/layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
 
export default function AdminProductCreate({ categories }: any) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        image: null as File | null,
        is_active: true,
    });
 
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/products', { forceFormData: true });
    };
 
    return (
        <AdminLayout>
            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/products" className="text-gray-400 hover:text-gray-600 transition-colors">← Kembali</Link>
                <h1 className="text-2xl font-bold text-gray-900">Tambah Produk</h1>
            </div>
 
            <div className="max-w-2xl bg-white rounded-2xl shadow-sm p-8">
                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
                        <select
                            value={data.category_id}
                            onChange={e => setData('category_id', e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                            <option value="">Pilih Kategori</option>
                            {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                    </div>
 
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk *</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                            placeholder="Nama produk"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
 
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            rows={4}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                            placeholder="Deskripsi produk"
                        />
                    </div>
 
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp) *</label>
                            <input
                                type="number"
                                value={data.price}
                                onChange={e => setData('price', e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="0"
                                min="0"
                            />
                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stok *</label>
                            <input
                                type="number"
                                value={data.stock}
                                onChange={e => setData('stock', e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="0"
                                min="0"
                            />
                            {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                        </div>
                    </div>
 
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Foto Produk</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setData('image', e.target.files?.[0] || null)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:text-xs file:font-medium"
                        />
                    </div>
 
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={data.is_active}
                            onChange={e => setData('is_active', e.target.checked)}
                            className="text-emerald-600"
                        />
                        <label htmlFor="is_active" className="text-sm text-gray-700">Produk Aktif (tampil di toko)</label>
                    </div>
 
                    <div className="flex gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-70"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Produk'}
                        </button>
                        <Link href="/admin/products" className="px-6 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium text-center">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}