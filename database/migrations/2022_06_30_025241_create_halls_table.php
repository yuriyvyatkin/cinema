<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('halls', function (Blueprint $table) {
      $table->id();
      $table->string('name', 100)->unique();
      $table->unsignedTinyInteger('rows')->default(3);
      $table->unsignedTinyInteger('row_chairs')->default(3);
      $table->unsignedMediumInteger('standard_chair_price')->default(0);
      $table->unsignedMediumInteger('vip_chair_price')->default(0);
      $table->json('chairs_types')->default('[["disabled","disabled","disabled"],["disabled","disabled","disabled"],["disabled","disabled","disabled"]]');
      $table->boolean('sales_state')->default(false);
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('halls');
  }
};
