<?php

namespace App\Http\Controllers;
 
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
 
class CartController extends Controller
{
    public function index()
    {
        $carts = Cart::with('product.category')
            ->where('user_id', auth()->id())
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'quantity' => $c->quantity,
                'subtotal' => $c->subtotal,
                'product' => [
                    'id' => $c->product->id,
                    'name' => $c->product->name,
                    'price' => $c->product->price,
                    'formatted_price' => $c->product->formatted_price,
                    'image' => $c->product->image,
                    'stock' => $c->product->stock,
                ],
            ]);
 
        $total = $carts->sum('subtotal');
 
        return Inertia::render('Cart/Index', [
            'carts' => $carts,
            'total' => $total,
            'formatted_total' => 'Rp ' . number_format($total, 0, ',', '.'),
        ]);
    }
 
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
 
        $product = Product::findOrFail($request->product_id);
 
        if ($product->stock < $request->quantity) {
            return back()->with('error', 'Stok tidak mencukupi.');
        }
 
        $cart = Cart::updateOrCreate(
            ['user_id' => auth()->id(), 'product_id' => $request->product_id],
            ['quantity' => \DB::raw("quantity + {$request->quantity}")]
        );
 
        // Ensure quantity doesn't exceed stock
        if ($cart->quantity > $product->stock) {
            $cart->update(['quantity' => $product->stock]);
        }
 
        return back()->with('success', 'Produk ditambahkan ke keranjang!');
    }
 
    public function update(Request $request, Cart $cart)
    {
        $this->authorize('update', $cart);
 
        $request->validate(['quantity' => 'required|integer|min:1']);
 
        if ($request->quantity > $cart->product->stock) {
            return back()->with('error', 'Stok tidak mencukupi.');
        }
 
        $cart->update(['quantity' => $request->quantity]);
        return back()->with('success', 'Keranjang diperbarui.');
    }
 
    public function destroy(Cart $cart)
    {
        $this->authorize('delete', $cart);
        $cart->delete();
        return back()->with('success', 'Produk dihapus dari keranjang.');
    }
}