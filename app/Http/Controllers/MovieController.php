<?php

namespace App\Http\Controllers;

use App\Models\Movie;

class MovieController extends Controller
{
  public function getMovies() {
    $movies = Movie::all();

    return $movies;
  }

  public function putMovies($data) {
    $movies = json_decode($data);

    if (count($movies) === 0) {
      foreach (Movie::all() as $movie) {
        $movie->delete();
      }
    } else if (Movie::count() === 0) {
      foreach ($movies as $movie) {
        $newMovie = new Movie;
        $newMovie->name = $movie->name;
        $newMovie->description = $movie->description;
        $newMovie->country = $movie->country;
        $newMovie->duration = $movie->duration;
        $newMovie->poster = $movie->poster;
        $newMovie->save();
      }
    } else {
      $moviesIds = array_column($movies, 'id');

      $savedMovies = Movie::all()->toArray();

      $savedMoviesIds = array_column($savedMovies, 'id');

      $idsToDelete = array_diff($savedMoviesIds, $moviesIds);

      Movie::destroy($idsToDelete);

      $idsToSave = array_diff($moviesIds, $savedMoviesIds);

      $filteredMovies = collect($movies)->whereIn('id', $idsToSave)->all();

      foreach ($filteredMovies as $movie) {
        $newMovie = new Movie;
        $newMovie->name = $movie->name;
        $newMovie->description = $movie->description;
        $newMovie->country = $movie->country;
        $newMovie->duration = $movie->duration;
        $newMovie->poster = $movie->poster;
        $newMovie->save();
      }
    }
  }
}
