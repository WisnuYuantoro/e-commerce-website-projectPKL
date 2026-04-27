import { Head, Link } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    category: Category;
}

interface Props {
    products: Product[];
}

export default function Index({ products }: Props) {
    return (
        <>
            <Head title="Daftar Menu" />
            
            <div className="container mx-auto p-4">
                {/* Header dengan Tombol Tambah */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Daftar Menu Makanan</h1>
                    <Link
                        href="/products/create"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        + Tambah Produk
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <Link 
                            key={product.id} 
                            href={`/products/${product.id}`}
                            className="border rounded p-4 shadow hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            <img 
                                src={product.image ? `/storage/${product.image}` : 'https://via.placeholder.com/300'} 
                                alt={product.name} 
                                className="w-full h-48 object-cover mb-2 rounded"
                            />
                            <h2 className="text-xl font-semibold">{product.name}</h2>
                            <p className="text-gray-600 text-sm">{product.category.name}</p>
                            <p className="text-gray-800 mt-2 line-clamp-2">{product.description}</p>
                            <p className="text-green-600 font-bold mt-2">
                                Rp {product.price.toLocaleString('id-ID')}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}