<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\HallController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\SessionsByDateController;
use App\Http\Controllers\OrderController;

class ClientController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->hallController = new HallController;
    $this->movieController = new MovieController;
    $this->sessionController = new SessionController;
    $this->sessionsByDateController = new SessionsByDateController;
    $this->orderController = new OrderController;
  }

  public function getNoun($number, $one, $two, $five) {
    $n = abs($number);
    $n %= 100;
    if ($n >= 5 && $n <= 20) {
      return $five;
    }
    $n %= 10;
    if ($n === 1) {
      return $one;
    }
    if ($n >= 2 && $n <= 4) {
      return $two;
    }
    return $five;
  }

  public function index()
  {
    $pageData = [];

    $movies = $this->movieController->getMovies();

    foreach ($movies as $movie) {
      if (count($movie->sessions) === 0) {
        continue;
      }

      $duration = $movie->duration . $this->getNoun(
        $movie->duration,
        ' минута',
        ' минуты',
        ' минут',
      );

      $nextElement = (object) [
        'name'  => $movie->name,
        'description'  => $movie->description,
        'country'  => $movie->country,
        'duration'  => $duration,
        'posterLink'  => $movie->poster,
      ];

      $sessions = [];

      foreach ($movie->sessions as $session) {
        $sessions[] = [
          'id'  => $session->id,
          'start'  => $session->start_time,
          'hallName' => $session->hall->name,
        ];
      }

      $groupedSessions = collect($sessions)->groupBy('hallName')->all();
      $nextElement->sessions = $groupedSessions;

      $pageData[] = $nextElement;
    }

    return view('client.index', [
      'pageData' => $pageData,
      'result' => $pageData,
    ]);
  }

  public function session(Request $request)
  {
    $id = (int) $request->id;
    $timestamp = (int) $request->timestamp;
    $lastId = $this->sessionController->getLastId();

    if ($id < 1 || $id > $lastId || $timestamp < strtotime('UTC today midnight')) {
      return redirect('layouts.404');
    }

    $session = $this->sessionController->getSessionById($id);

    $movieName = $session->movie()->get()->first()->name;
    $startTime = $session->start_time;
    $hall = $session->hall()->get()->first();
    $hallName = $hall->name;

    $filter = function($item) use ($timestamp) {
      return $item->session_timestamp === $timestamp;
    };

    $sessionByDate = $session->sessionsByDate()->get()->filter($filter)->first();

    if ($sessionByDate) {
      $chairsTypes = $sessionByDate->chairs_types;
    } else {
      $chairsTypes = $session->hall()->get()->first()->chairs_types;
    }

    $hallData = json_encode((object) [
      'standardPrice'  => $hall->standard_chair_price,
      'vipPrice'  => $hall->vip_chair_price,
      'chairsTypes'  => $chairsTypes,
    ]);

    return view('client.session', [
      'movieName' => $movieName,
      'startTime' => $startTime,
      'hallName' => $hallName,
      'hallData' => $hallData,
    ]);
  }

  public function bookSession(Request $request) {
    $data = json_decode($request->input('data'));

    $sessionsByDateId = $this->sessionsByDateController->updateOrCreateRecord(
      (int) $data->session_id,
      (int) $data->timestamp,
      $data->chairs_types,
    );

    $newOrderHash = $this->orderController->addOrder(
      $sessionsByDateId,
      $data->taken_chairs,
      $data->total_price,
    );

    return redirect(route('order', ['hash' => $newOrderHash]));
  }

  public function order()
  {
    $hash = last(request()->segments());

    $order = $this->orderController->getOrder($hash);
    $sessionByDate = $order->sessionByDate;
    $session = $order->sessionByDate->session;
    $hall = $order->sessionByDate->session->hall;
    $movie = $order->sessionByDate->session->movie;

    $takenChairs = json_decode($order->taken_chairs);
    $takenChairs = array_map(fn($value) => "$value->row/$value->chair", $takenChairs);
    $takenChairs = implode(', ', $takenChairs);

    $hallName = $hall->name;
    $movieName = $movie->name;

    $localDate = new \Carbon\Carbon(round($sessionByDate->session_timestamp / 1000));
    $localDate = $localDate->locale('ru-Ru')->translatedFormat('j F');
    $startTime = $session->start_time. ', ' . $localDate;

    $price = $order->total_price;
    $priceNoun = $this->getNoun(
      $price,
      'рубль',
      'рубля',
      'рублей',
    );

    return view('client.order', [
      'takenChairs' => $takenChairs,
      'hallName' => $hallName,
      'movieName' => $movieName,
      'startTime' => $startTime,
      'price' => $price,
      'priceNoun' => $priceNoun,
    ]);
  }

  public function ticket()
  {
    $hash = last(request()->segments());

    $order = $this->orderController->getOrder($hash);
    $sessionByDate = $order->sessionByDate;
    $session = $order->sessionByDate->session;
    $hall = $order->sessionByDate->session->hall;
    $movie = $order->sessionByDate->session->movie;

    $ticketNumber = $order->id;
    $movieName = $movie->name;

    $takenChairs = json_decode($order->taken_chairs);
    $takenChairs = array_map(fn($value) => "$value->row/$value->chair", $takenChairs);
    $takenChairs = implode(', ', $takenChairs);

    $hallName = $hall->name;

    $localDate = new \Carbon\Carbon(round($sessionByDate->session_timestamp / 1000));
    $localDate = $localDate->locale('ru-Ru')->translatedFormat('j F');
    $startTime = $session->start_time. ', ' . $localDate;

    $hash = $order->hash;

    return view('client.ticket', [
      'ticketNumber' => $ticketNumber,
      'movieName' => $movieName,
      'takenChairs' => $takenChairs,
      'hallName' => $hallName,
      'startTime' => $startTime,
      'hash' => $hash,
    ]);
  }
}
