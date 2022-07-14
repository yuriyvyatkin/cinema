<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SessionsByDate;

class SessionsByDateController extends Controller
{
  public function updateOrCreateRecord ($sessionId, $timestamp, $chairsTypes) {
    $record = SessionsByDate::updateOrCreate(
      ['session_id' => $sessionId, 'session_timestamp' => $timestamp],
      ['chairs_types' => $chairsTypes]
    );

    return $record->id;
  }
}
