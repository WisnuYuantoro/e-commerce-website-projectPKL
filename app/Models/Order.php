<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Order extends Model
{
    protected $fillable = [
        'user_id', 'order_number', 'status', 'total_amount',
        'shipping_name', 'shipping_phone', 'shipping_address',
        'shipping_city', 'payment_method', 'payment_proof', 'notes'
    ];
 
    public function user()
    {
        return $this->belongsTo(User::class);
    }
 
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
 
    public function getFormattedTotalAttribute()
    {
        return 'Rp ' . number_format($this->total_amount, 0, ',', '.');
    }
 
    public function getStatusLabelAttribute()
    {
        return match($this->status) {
            'pending' => 'Menunggu Pembayaran',
            'processing' => 'Diproses',
            'shipped' => 'Dikirim',
            'delivered' => 'Selesai',
            'cancelled' => 'Dibatalkan',
            default => $this->status,
        };
    }
}