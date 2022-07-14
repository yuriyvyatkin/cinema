<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\HallController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\SessionController;

class AdminController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware('auth');
    $this->hallController = new HallController;
    $this->movieController = new MovieController;
    $this->sessionController = new SessionController;
  }

  /**
   * Show the application dashboard.
   *
   * @return \Illuminate\Contracts\Support\Renderable
   */
  public function index()
  {
    $hallsNames = $this->hallController->getHallsNames();

    $halls = $this->hallController->getHalls();

    $hallsConfig = [];
    $pricesConfig = [];
    $salesData = [];
    $hallsIds = [];

    foreach ($halls as $key => $hall) {
      $hallsIds[] = $hall->id;

      $salesData[] = "data-hall$key=" . json_encode((object) [
        'salesIsOpened'  => (bool) $hall->sales_state,
        'sessionsNumber'  => count($hall->sessions),
      ]);

      extract($hall->toArray());

      $nextHallConfig = "data-hall$key={\"rows\":$rows,\"rowChairs\":$row_chairs,\"chairsTypes\":$chairs_types}";

      $hallsConfig[] = $nextHallConfig;

      $nextPricesConfig = "data-hall$key={\"standardPrice\":$standard_chair_price,\"vipPrice\":$vip_chair_price}";

      $pricesConfig[] = $nextPricesConfig;
    }

    $sessionsConfiguratorData = [];

    $movies = $this->movieController->getMovies();

    foreach ($movies as $movie) {
      $nextElement = (object) [
        'id'  => $movie->id,
        'name'  => $movie->name,
        'duration'  => $movie->duration,
        'posterLink'  => $movie->poster,
        'sessions'  => [],
      ];

      foreach ($movie->sessions as $session) {
        $nextElement->sessions[] = (object) [
          'id'  => $session->id,
          'hallId'  => $session->hall_id,
          'start'  => $session->start_time,
        ];
      }

      $sessionsConfiguratorData[] = json_encode($nextElement);
    }

    return view('admin.dashboard', [
      'hallsNames' => $hallsNames,
      'hallsConfig' => $hallsConfig,
      'pricesConfig' => $pricesConfig,
      'sessionsConfiguratorData' => $sessionsConfiguratorData,
      'lastMovieId' => $movies->last()->id ?? 0,
      'lastSessionId' => $this->sessionController->getLastId(),
      'hallsIds' => json_encode($hallsIds),
      'salesData' => $salesData,
    ]);
  }

  public function putMoviesSessions(Request $request) {
    $movies = $request->input('movies');
    $sessions = $request->input('sessions');

    $this->movieController->putMovies($movies);
    $this->sessionController->putSessions($sessions);

    return redirect(route('dashboard') . '#sessions-configurator');
  }
}
