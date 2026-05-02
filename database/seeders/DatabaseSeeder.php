<?php

namespace Database\Seeders;
 
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
 
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::create([
            'name' => 'Admin UMKMStore',
            'email' => 'admin@umkmstore.id',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);
 
        // Customer user
        User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
            'phone' => '08123456789',
            'address' => 'Jl. Merdeka No. 10, Semarang',
            'email_verified_at' => now(),
        ]);
 
        // Categories
        $categories = [
            ['name' => 'Makanan & Minuman', 'description' => 'Produk makanan dan minuman UMKM lokal'],
            ['name' => 'Kerajinan Tangan', 'description' => 'Produk kerajinan dan handmade'],
            ['name' => 'Fashion & Aksesoris', 'description' => 'Pakaian dan aksesoris lokal'],
            ['name' => 'Pertanian & Holtikultura', 'description' => 'Produk segar dari petani lokal'],
            ['name' => 'Kosmetik & Perawatan', 'description' => 'Produk kecantikan alami'],
        ];
 
        foreach ($categories as $cat) {
            Category::create(array_merge($cat, ['slug' => \Illuminate\Support\Str::slug($cat['name'])]));
        }
 
        // Products
        $products = [
            ['name' => 'Keripik Singkong Pedas', 'price' => 15000, 'stock' => 50, 'category' => 1,
             'description' => 'Keripik singkong dengan bumbu pedas khas UMKM lokal. Renyah dan gurih.'],
            ['name' => 'Kopi Robusta Temanggung 250gr', 'price' => 45000, 'stock' => 30, 'category' => 1,
             'description' => 'Kopi robusta pilihan dari petani Temanggung, diproses natural.'],
            ['name' => 'Batik Tulis Solo Motif Parang', 'price' => 350000, 'stock' => 15, 'category' => 3,
             'description' => 'Batik tulis asli Solo dengan motif parang. Dibuat oleh pengrajin lokal berpengalaman.'],
            ['name' => 'Tas Anyaman Rotan Handmade', 'price' => 125000, 'stock' => 20, 'category' => 2,
             'description' => 'Tas anyaman rotan buatan tangan. Ramah lingkungan dan berkualitas tinggi.'],
            ['name' => 'Sambal Terasi Extra Pedas', 'price' => 25000, 'stock' => 40, 'category' => 1,
             'description' => 'Sambal terasi extra pedas dengan bahan alami tanpa pengawet.'],
            ['name' => 'Gelang Manik-Manik Etnik', 'price' => 35000, 'stock' => 25, 'category' => 3,
             'description' => 'Gelang manik-manik bermotif etnik Nusantara. Satu size fit all.'],
            ['name' => 'Emping Melinjo Original 200gr', 'price' => 20000, 'stock' => 60, 'category' => 1,
             'description' => 'Emping melinjo original tanpa tambahan bumbu. Cocok untuk cemilan.'],
            ['name' => 'Sabun Cuci Muka Lidah Buaya', 'price' => 28000, 'stock' => 35, 'category' => 5,
             'description' => 'Sabun cuci muka dengan ekstrak lidah buaya alami. Cocok untuk semua jenis kulit.'],
            ['name' => 'Jahe Merah Bubuk 100gr', 'price' => 18000, 'stock' => 45, 'category' => 1,
             'description' => 'Jahe merah bubuk organik untuk minuman sehat dan penghangat tubuh.'],
            ['name' => 'Dompet Kulit Sapi Asli', 'price' => 95000, 'stock' => 18, 'category' => 2,
             'description' => 'Dompet dari kulit sapi asli dengan jahitan rapi dan tahan lama.'],
            ['name' => 'Tempe Kedelai Organik 300gr', 'price' => 8000, 'stock' => 5, 'category' => 4,
             'description' => 'Tempe kedelai organik segar dari petani lokal. Tinggi protein.'],
            ['name' => 'Minyak Kelapa Murni 250ml', 'price' => 42000, 'stock' => 22, 'category' => 5,
             'description' => 'Minyak kelapa murni cold-pressed, cocok untuk masak dan perawatan kulit.'],
        ];
 
        foreach ($products as $p) {
            Product::create([
                'category_id' => $p['category'],
                'name' => $p['name'],
                'slug' => \Illuminate\Support\Str::slug($p['name']),
                'description' => $p['description'],
                'price' => $p['price'],
                'stock' => $p['stock'],
                'is_active' => true,
            ]);
        }
    }
}
 