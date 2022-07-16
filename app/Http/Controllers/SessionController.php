<?php

namespace App\Http\Controllers;

use App\Models\Session;

class SessionController extends Controller
{
  public function getLastId() {
    return Session::all()->last()->id ?? 0;
  }

  public function getSessionById($id) {
    return Session::find($id);
  }

  public function putSessions($data) {
    $sessions = json_decode($data);

    if (count($sessions) === 0) {
      foreach (Session::all() as $session) {
        $session->delete();
      }
    } else if (Session::count() === 0) {
      foreach ($sessions as $session) {
        $newSession = new Session;
        $newSession->movie_id = $session->movieId;
        $newSession->hall_id = $session->hallId;
        $newSession->start_time = $session->startTime;
        $newSession->save();
      }
    } else {
      $sessionsIds = array_column($sessions, 'id');

      $savedSessions = Session::all()->toArray();

      $savedSessionsIds = array_column($savedSessions, 'id');

      $idsToDelete = array_diff($savedSessionsIds, $sessionsIds);

      Session::destroy($idsToDelete);

      $idsToSave = array_diff($sessionsIds, $savedSessionsIds);

      $filteredSessions = collect($sessions)->whereIn('id', $idsToSave)->all();

      foreach ($filteredSessions as $session) {
        $newSession = new Session;
        $newSession->movie_id = $session->movieId;
        $newSession->hall_id = $session->hallId;
        $newSession->start_time = $session->startTime;
        $newSession->save();
      }
    }
  }
}
