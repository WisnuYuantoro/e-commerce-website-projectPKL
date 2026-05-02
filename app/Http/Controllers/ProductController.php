<?php

namespace App\Http\Controllers;
 
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;
 
class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category')->where('is_active', true);
 
        if ($request->search) {
            $query->where('name', 'like', "%{$request->search}%");
        }
 
        if ($request->category) {
            $query->whereHas('category', fn($q) => $q->where('slug', $request->category));
        }
 
        if ($request->sort === 'price_asc') {
            $query->orderBy('price', 'asc');
        } elseif ($request->sort === 'price_desc') {
            $query->orderBy('price', 'desc');
        } else {
            $query->latest();
        }
 
        $products = $query->paginate(12)->through(fn($p) => [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'price' => $p->price,
            'formatted_price' => $p->formatted_price,
            'image' => $p->image,
            'stock' => $p->stock,
            'category' => $p->category?->name,
        ]);
 
        $categories = Category::all();
 
        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'sort']),
        ]);
    }
 
    public function show(Product $product)
    {
        $product->load('category');
 
        $related = Product::with('category')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            
            ->take(4)
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'price' => $p->price,
                'formatted_price' => $p->formatted_price,
                'image' => $p->image,
                'stock' => $p->stock,
            ]);
 
        return Inertia::render('Products/Show', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'price' => $product->price,
                'formatted_price' => $product->formatted_price,
                'image' => $product->image,
                'stock' => $product->stock,
                'category' => $product->category?->name,
            ],
            'related' => $related,
        ]);
    }
}
 