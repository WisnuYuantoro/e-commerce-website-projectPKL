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
    product: Product;
}

export default function Show({ product }: Props) {
    const imageUrl = product.image 
        ? `/storage/${product.image}`
        : 'https://via.placeholder.com/600x400';

    return (
        <>
            <Head title={product.name} />
            
            <div className="container mx-auto p-4 max-w-4xl">
                {/* Back Button */}
                <Link 
                    href="/" 
                    className="inline-block mb-4 text-blue-600 hover:underline"
                >
                    ← Kembali ke Daftar Produk
                </Link>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Product Image */}
                        <div className="h-96">
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-2">
                                {product.category.name}
                            </span>
                            
                            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                            
                            <p className="text-2xl text-green-600 font-bold mb-4">
                                Rp {product.price.toLocaleString('id-ID')}
                            </p>
                            
                            <div className="border-t border-b py-4 my-4">
                                <h2 className="font-semibold mb-2">Deskripsi</h2>
                                <p className="text-gray-600">
                                    {product.description || 'Tidak ada deskripsi'}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
                                    Tambah ke Keranjang
                                </button>
                                
                                <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                                    Pesan Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}