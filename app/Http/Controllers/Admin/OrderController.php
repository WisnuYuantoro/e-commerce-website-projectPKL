<?php

namespace App\Http\Controllers\Admin;
 
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
 
class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('user')->latest();
 
        if ($request->status) {
            $query->where('status', $request->status);
        }
 
        $orders = $query->paginate(15)->through(fn($o) => [
            'id' => $o->id,
            'order_number' => $o->order_number,
            'user_name' => $o->user->name,
            'status' => $o->status,
            'status_label' => $o->status_label,
            'formatted_total' => $o->formatted_total,
            'payment_method' => $o->payment_method,
            'created_at' => $o->created_at->format('d M Y'),
        ]);
 
        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['status']),
        ]);
    }
 
    public function show(Order $order)
    {
        $order->load('items.product', 'user');
        return Inertia::render('Admin/Orders/Show', ['order' => $order]);
    }
 
    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);
 
        $order->update(['status' => $request->status]);
 
        return back()->with('success', 'Status pesanan diperbarui!');
    }
}
 