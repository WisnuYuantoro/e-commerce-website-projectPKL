<?php

namespace App\Http\Controllers\Admin;
 
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
 
class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->latest()->paginate(15);
        return Inertia::render('Admin/Products/Index', ['products' => $products]);
    }
 
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Admin/Products/Create', ['categories' => $categories]);
    }
 
    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);
 
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }
 
        $data['slug'] = Str::slug($data['name']);
 
        Product::create($data);
 
        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil ditambahkan!');
    }
 
    public function edit(Product $product)
    {
        $categories = Category::all();
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }
 
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);
 
        if ($request->hasFile('image')) {
            if ($product->image) Storage::disk('public')->delete($product->image);
            $data['image'] = $request->file('image')->store('products', 'public');
        }
 
        $data['slug'] = Str::slug($data['name']);
        $product->update($data);
 
        return redirect()->route('admin.products.index')->with('success', 'Produk diperbarui!');
    }
 
    public function destroy(Product $product)
    {
        if ($product->image) Storage::disk('public')->delete($product->image);
        $product->delete();
        return back()->with('success', 'Produk dihapus!');
    }
}