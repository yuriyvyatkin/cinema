<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hall;
use Illuminate\Support\Str;

class HallController extends Controller
{
  public function getHallsNames() {
    $hallsNames = Hall::all()->pluck('name');

    return $hallsNames;
  }

  public function getHalls() {
    $halls = Hall::all();

    return $halls;
  }

  public function deleteHall(Request $request) {
    $hallName = $request->input('hall_name');
    $hallName =  Str::lower($hallName);

    $hall = Hall::where('name', $hallName)->first();

    foreach ($hall->sessions as $session) {
      $session->delete();
    }

    $hall->delete();

    return redirect(route('dashboard') . '#available-halls');
  }

  public function addHall(Request $request) {
    $hallName = $request->input('hall_name');
    $hallName =  Str::lower($hallName);

    $hall = new Hall;
    $hall->name = $hallName;
    $hall->save();

    return redirect(route('dashboard') . '#available-halls');
  }

  public function updateHall(Request $request) {
    $formName = $request->input('form_name');

    $hallName = $request->input('hall_name');
    $hall = Hall::where('name', $hallName)->first();
    $sectionAnchor = '';

    if ($formName === 'chairs') {
      $hall->rows = (int) $request->input('rows');
      $hall->row_chairs = (int) $request->input('chairs');
      $hall->chairs_types = $request->input('chairs_types');
      $sectionAnchor = 'halls-configurator';
    } else if ($formName === 'prices') {
      $hall->standard_chair_price = (int) $request->input('standard_price');
      $hall->vip_chair_price = (int) $request->input('vip_price');
      $sectionAnchor = 'prices-configurator';
    } else if ($formName === 'sales') {
      $hall->sales_state = (int) $request->input('sales_state');
      $sectionAnchor = 'sales-controller';
    }

    $hall->save();

    return redirect(route('dashboard') . '#' . $sectionAnchor);
  }
}
