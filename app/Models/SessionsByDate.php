<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Session;

class SessionsByDate extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
      'session_id',
      'session_timestamp',
      'chairs_types',
    ];

  public function session()
  {
    return $this->belongsTo(Session::class);
  }
}
