<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SessionsByDate;

class Order extends Model
{
  use HasFactory;

  public $timestamps = false;

  public function sessionByDate()
  {
    return $this->belongsTo(SessionsByDate::class, 'session_by_date_id', 'id');
  }
}
