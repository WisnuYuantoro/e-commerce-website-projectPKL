import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

export default function Create({ categories }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        category_id: '',
        name: '',
        description: '',
        price: '',
        image: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('category_id', data.category_id);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        if (data.image) {
            formData.append('image', data.image);
        }

        post('/products', {
            forceFormData: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Tambah Produk" />
            
            <div className="container mx-auto p-4 max-w-2xl">
                <h1 className="text-2xl font-bold mb-6">Tambah Produk Baru</h1>
                
                <form onSubmit={submit} className="space-y-4">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Kategori</label>
                        <select
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        >
                            <option value="">Pilih Kategori</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Nama Produk</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Deskripsi</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            rows={3}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Harga (Rp)</label>
                        <input
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                            min="0"
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Gambar Produk</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Produk'}
                        </button>
                        <a
                            href="/"
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                            Batal
                        </a>
                    </div>
                </form>
            </div>
        </>
    );
}