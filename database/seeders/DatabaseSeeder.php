<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    \App\Models\User::factory()->create([
      'email' => 'admin@mail.ru',
      'password' => '12341234',
    ]);

    $data = [
      HallSeeder::class,
      MovieSeeder::class,
      SessionSeeder::class,
    ];

    $this->call($data);
  }
}
