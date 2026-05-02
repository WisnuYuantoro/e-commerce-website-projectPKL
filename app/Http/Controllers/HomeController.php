<?php

namespace App\Http\Controllers;
 
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
 
class HomeController extends Controller
{
    public function index()
    {
        $products = Product::with('category')
            // ->where('is_active', true) <--- Hapus atau komentari baris ini
            ->latest()
            ->take(8)
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'price' => $p->price,
                'formatted_price' => $p->formatted_price,
                'image' => $p->image,
                'stock' => $p->stock,
                'category' => $p->category?->name,
            ]);
 
        $categories = Category::withCount('products')->get();
 
        return Inertia::render('Home/Index', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}