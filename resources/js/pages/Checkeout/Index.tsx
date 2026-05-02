import MainLayout from '../../layouts/MainLayout';
import { router, useForm } from '@inertiajs/react';
 
export default function CheckoutIndex({ carts, total, formatted_total, user }: any) {
    const { data, setData, post, processing, errors } = useForm({
        shipping_name: user?.name || '',
        shipping_phone: user?.phone || '',
        shipping_address: user?.address || '',
        shipping_city: '',
        payment_method: 'transfer',
        notes: '',
    });
 
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/checkout');
    };
 
    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
 
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Shipping form */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h2 className="font-bold text-gray-900 text-lg mb-5">Informasi Pengiriman</h2>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Nama Penerima', key: 'shipping_name', type: 'text', placeholder: 'Masukkan nama lengkap' },
                                        { label: 'Nomor HP', key: 'shipping_phone', type: 'tel', placeholder: '08xxxxxxxxxx' },
                                        { label: 'Kota', key: 'shipping_city', type: 'text', placeholder: 'Contoh: Semarang' },
                                    ].map(field => (
                                        <div key={field.key}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                            <input
                                                type={field.type}
                                                value={(data as any)[field.key]}
                                                onChange={e => setData(field.key as any, e.target.value)}
                                                placeholder={field.placeholder}
                                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                                            />
                                            {(errors as any)[field.key] && <p className="text-red-500 text-xs mt-1">{(errors as any)[field.key]}</p>}
                                        </div>
                                    ))}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                                        <textarea
                                            value={data.shipping_address}
                                            onChange={e => setData('shipping_address', e.target.value)}
                                            placeholder="Jl. contoh No. 1, RT/RW, Kelurahan, Kecamatan"
                                            rows={3}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                                        />
                                        {errors.shipping_address && <p className="text-red-500 text-xs mt-1">{errors.shipping_address}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Catatan (opsional)</label>
                                        <textarea
                                            value={data.notes}
                                            onChange={e => setData('notes', e.target.value)}
                                            placeholder="Catatan untuk penjual..."
                                            rows={2}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
 
                            {/* Payment */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h2 className="font-bold text-gray-900 text-lg mb-4">Metode Pembayaran</h2>
                                <div className="space-y-3">
                                    {[
                                        { value: 'transfer', label: 'Transfer Bank', desc: 'BCA, BRI, Mandiri, BNI' },
                                        { value: 'cod', label: 'Bayar di Tempat (COD)', desc: 'Bayar saat barang diterima' },
                                    ].map(method => (
                                        <label key={method.value} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${data.payment_method === method.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                value={method.value}
                                                checked={data.payment_method === method.value}
                                                onChange={() => setData('payment_method', method.value)}
                                                className="text-emerald-600"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900 text-sm">{method.label}</p>
                                                <p className="text-xs text-gray-500">{method.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
 
                        {/* Order summary */}
                        <div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                                <h2 className="font-bold text-gray-900 text-lg mb-4">Pesanan Kamu</h2>
                                <div className="space-y-3 max-h-60 overflow-y-auto">
                                    {carts.map((item: any) => (
                                        <div key={item.id} className="flex gap-3 text-sm">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                {item.product.image && (
                                                    <img src={`/storage/${item.product.image}`} alt={item.product.name} className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                                                <p className="text-gray-500">x{item.quantity}</p>
                                            </div>
                                            <span className="font-medium text-gray-900 flex-shrink-0">
                                                Rp {item.subtotal.toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <hr className="my-4 border-gray-100" />
                                <div className="flex justify-between font-bold text-gray-900">
                                    <span>Total</span>
                                    <span className="text-emerald-600">{formatted_total}</span>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-5 w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Memproses...' : 'Buat Pesanan'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}