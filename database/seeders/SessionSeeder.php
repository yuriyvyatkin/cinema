<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SessionSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $sessions = [
      [
        'movie_id' => 1,
        'hall_id' => 1,
        'start_time' => '14:00',
      ],
      [
        'movie_id' => 1,
        'hall_id' => 2,
        'start_time' => '19:50',
      ],
      [
        'movie_id' => 2,
        'hall_id' => 1,
        'start_time' => '00:00',
      ],
      [
        'movie_id' => 2,
        'hall_id' => 1,
        'start_time' => '10:00',
      ],
      [
        'movie_id' => 2,
        'hall_id' => 2,
        'start_time' => '16:00',
      ],
      [
        'movie_id' => 8,
        'hall_id' => 2,
        'start_time' => '10:00',
      ],
    ];

    DB::table('sessions')->insert($sessions);
  }
}
