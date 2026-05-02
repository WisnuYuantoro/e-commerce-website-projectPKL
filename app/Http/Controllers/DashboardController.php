<?php

namespace App\Http\Controllers\Admin;
 
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;
 
class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'total_users' => User::where('role', 'customer')->count(),
            'total_revenue' => Order::whereIn('status', ['delivered', 'processing', 'shipped'])->sum('total_amount'),
            'pending_orders' => Order::where('status', 'pending')->count(),
        ];
 
        $recent_orders = Order::with('user')
            ->latest()
            ->take(10)
            ->get()
            ->map(fn($o) => [
                'id' => $o->id,
                'order_number' => $o->order_number,
                'user_name' => $o->user->name,
                'status' => $o->status,
                'status_label' => $o->status_label,
                'formatted_total' => $o->formatted_total,
                'created_at' => $o->created_at->format('d M Y'),
            ]);
 
        $low_stock = Product::where('stock', '<', 10)->where('is_active', true)->take(5)->get();
 
        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_orders' => $recent_orders,
            'low_stock' => $low_stock,
        ]);
    }
}