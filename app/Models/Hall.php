<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Session;

class Hall extends Model
{
  use HasFactory;

  public $timestamps = false;

  public function sessions()
  {
    return $this->hasMany(Session::class);
  }
}
