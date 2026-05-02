<?php

namespace App\Http\Controllers;
 
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
 
class OrderController extends Controller
{
    public function checkout()
    {
        $carts = Cart::with('product')
            ->where('user_id', auth()->id())
            ->get();
 
        if ($carts->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Keranjang kosong!');
        }
 
        $total = $carts->sum(fn($c) => $c->quantity * $c->product->price);
 
        return Inertia::render('Checkout/Index', [
            'carts' => $carts->map(fn($c) => [
                'id' => $c->id,
                'quantity' => $c->quantity,
                'subtotal' => $c->quantity * $c->product->price,
                'product' => [
                    'name' => $c->product->name,
                    'price' => $c->product->price,
                    'image' => $c->product->image,
                ],
            ]),
            'total' => $total,
            'formatted_total' => 'Rp ' . number_format($total, 0, ',', '.'),
            'user' => auth()->user()->only(['name', 'phone', 'address']),
        ]);
    }
 
    public function store(Request $request)
    {
        $request->validate([
            'shipping_name' => 'required|string',
            'shipping_phone' => 'required|string',
            'shipping_address' => 'required|string',
            'shipping_city' => 'required|string',
            'payment_method' => 'required|in:transfer,cod',
            'notes' => 'nullable|string',
        ]);
 
        $carts = Cart::with('product')->where('user_id', auth()->id())->get();
 
        if ($carts->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Keranjang kosong!');
        }
 
        // Validate stock
        foreach ($carts as $cart) {
            if ($cart->product->stock < $cart->quantity) {
                return back()->with('error', "Stok {$cart->product->name} tidak mencukupi.");
            }
        }
 
        DB::transaction(function () use ($request, $carts) {
            $total = $carts->sum(fn($c) => $c->quantity * $c->product->price);
 
            $order = Order::create([
                'user_id' => auth()->id(),
                'order_number' => 'ORD-' . strtoupper(uniqid()),
                'status' => 'pending',
                'total_amount' => $total,
                'shipping_name' => $request->shipping_name,
                'shipping_phone' => $request->shipping_phone,
                'shipping_address' => $request->shipping_address,
                'shipping_city' => $request->shipping_city,
                'payment_method' => $request->payment_method,
                'notes' => $request->notes,
            ]);
 
            foreach ($carts as $cart) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cart->product_id,
                    'quantity' => $cart->quantity,
                    'price' => $cart->product->price,
                ]);
 
                // Reduce stock
                $cart->product->decrement('stock', $cart->quantity);
            }
 
            // Clear cart
            Cart::where('user_id', auth()->id())->delete();
 
            session(['last_order_id' => $order->id]);
        });
 
        return redirect()->route('orders.success')->with('success', 'Pesanan berhasil dibuat!');
    }
 
    public function success()
    {
        $orderId = session('last_order_id');
        $order = $orderId ? Order::with('items.product')->find($orderId) : null;
 
        return Inertia::render('Checkout/Success', [
            'order' => $order ? [
                'order_number' => $order->order_number,
                'total_amount' => $order->total_amount,
                'formatted_total' => $order->formatted_total,
                'payment_method' => $order->payment_method,
                'status' => $order->status_label,
            ] : null,
        ]);
    }
 
    public function index()
    {
        $orders = Order::with('items.product')
            ->where('user_id', auth()->id())
            ->latest()
            ->get()
            ->map(fn($o) => [
                'id' => $o->id,
                'order_number' => $o->order_number,
                'status' => $o->status,
                'status_label' => $o->status_label,
                'total_amount' => $o->total_amount,
                'formatted_total' => $o->formatted_total,
                'created_at' => $o->created_at->format('d M Y'),
                'item_count' => $o->items->sum('quantity'),
            ]);
 
        return Inertia::render('Orders/Index', ['orders' => $orders]);
    }
 
    public function show(Order $order)
    {
        $this->authorize('view', $order);
 
        $order->load('items.product');
 
        return Inertia::render('Orders/Show', [
            'order' => [
                'order_number' => $order->order_number,
                'status' => $order->status,
                'status_label' => $order->status_label,
                'formatted_total' => $order->formatted_total,
                'shipping_name' => $order->shipping_name,
                'shipping_phone' => $order->shipping_phone,
                'shipping_address' => $order->shipping_address,
                'shipping_city' => $order->shipping_city,
                'payment_method' => $order->payment_method,
                'notes' => $order->notes,
                'created_at' => $order->created_at->format('d M Y H:i'),
                'items' => $order->items->map(fn($i) => [
                    'product_name' => $i->product->name,
                    'product_image' => $i->product->image,
                    'quantity' => $i->quantity,
                    'price' => $i->price,
                    'subtotal' => $i->subtotal,
                ]),
            ],
        ]);
    }
}