<?php

namespace App\Http\Controllers;

use App\Models\Order;

class OrderController extends Controller
{
  public function getNewId() {
    $lastId = Order::all()->last()->id ?? 0;
    return $lastId + 1;
  }

  public function addOrder($sessionsByDateId, $takenChairs, $totalPrice) {
    $order = new Order;
    $order->session_by_date_id = $sessionsByDateId;
    $order->taken_chairs = $takenChairs;
    $order->total_price = $totalPrice;
    $order->hash = hash('ripemd160', $this->getNewId() . $takenChairs);
    $order->save();

    return $order->hash;
  }

  public function getOrder($hash) {
    return Order::where('hash', $hash)->first();
  }
}
