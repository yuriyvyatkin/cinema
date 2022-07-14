<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\HallController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [ClientController::class, 'index']);

Auth::routes(['register' => false]);

Route::group(['middleware' => 'auth'], function() {
  Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');

  Route::put('/dashboard', [AdminController::class, 'putMoviesSessions'])->name('movies.sessions.put');

  Route::delete('/dashboard', [HallController::class, 'deleteHall'])->name('hall.delete');

  Route::post('/dashboard', [HallController::class, 'addHall'])->name('hall.add');

  Route::patch('/dashboard', [HallController::class, 'updateHall'])->name('hall.update');
});

Route::get('/session', [ClientController::class, 'session'])->name('session');

Route::post('/session', [ClientController::class, 'bookSession'])->name('session.book');

Route::get('/order/{hash}', [ClientController::class, 'order'])->name('order');

Route::get('/ticket/{hash}', [ClientController::class, 'ticket'])->name('ticket');

Route::fallback(function () {
    return view('layouts.404');
});
