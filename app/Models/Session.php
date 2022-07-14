<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Hall;
use App\Models\Movie;
use App\Models\SessionsByDate;

class Session extends Model
{
  use HasFactory;

  public $timestamps = false;

  public function hall()
  {
    return $this->belongsTo(Hall::class);
  }

  public function movie()
  {
    return $this->belongsTo(Movie::class);
  }

  public function sessionsByDate()
  {
    return $this->hasMany(SessionsByDate::class);
  }
}
