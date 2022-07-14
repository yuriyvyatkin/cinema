<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory;

class HallSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $faker = Factory::create();

    $names = [
      'аквамарин',
      'бежевый',
      'белоснежный',
      'бирюзовый',
      'бордовый',
      'бронзовый',
      'жемчужный',
      'зелёный',
      'золотой',
      'изумрудный',
      'индиго',
      'коралловый',
      'лазурный',
      'медный',
      'оранжевый',
      'розовый',
      'серебряный',
      'сиреневый',
      'фиолетовый',
      'янтарный',
    ];

    DB::table('halls')->insert([
      'name' => $faker->unique()->randomElement($names),
      'rows' => 10,
      'row_chairs' => 8,
      'chairs_types' => '[["disabled","disabled","disabled","standard","standard","disabled","disabled","disabled"],["disabled","disabled","standard","standard","standard","standard","disabled","disabled"],["disabled","standard","standard","standard","standard","standard","standard","disabled"],["standard","standard","standard","vip","vip","standard","standard","disabled"],["standard","standard","vip","vip","vip","vip","standard","disabled"],["standard","standard","vip","vip","vip","vip","standard","disabled"],["standard","standard","vip","vip","vip","vip","standard","disabled"],["standard","standard","standard","standard","standard","standard","standard","disabled"],["standard","standard","standard","standard","standard","standard","standard","standard"],["standard","standard","standard","standard","standard","standard","standard","standard"]]',
      'standard_chair_price' => 100,
      'vip_chair_price' => 350,
      'sales_state' => 1,
    ]);

    DB::table('halls')->insert([
      'name' => $faker->unique()->randomElement($names),
      'rows' => 8,
      'row_chairs' => 6,
      'chairs_types' => '[["disabled","disabled","disabled","standard","standard","disabled"],["disabled","disabled","standard","standard","standard","standard"],["disabled","standard","standard","standard","standard","standard"],["standard","standard","standard","vip","vip","standard"],["standard","standard","vip","vip","vip","vip"],["standard","standard","vip","vip","vip","vip"],["standard","standard","vip","vip","vip","vip"],["standard","standard","standard","standard","standard","standard"]]',
      'standard_chair_price' => 300,
      'vip_chair_price' => 520,
      'sales_state' => 1,
    ]);

    DB::table('halls')->insert([
      'name' => $faker->unique()->randomElement($names)
    ]);
  }
}
