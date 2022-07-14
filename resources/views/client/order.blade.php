@extends('layouts.main')

@section('style')
  <link href="{{ asset('css/client/style.css') }}" rel="stylesheet">
@endsection

@section('title', 'Бронирование')

@section('content')
  @include('components.client.header')

  <main class="page-main">
    <section class="ticket">

      <header class="ticket__check">
        <h2 class="ticket__check-title">Вы забронировали:</h2>
      </header>

      <div class="ticket__info-wrapper">
        <p class="ticket__info">Ряд/место: <span class="ticket__details ticket__chairs">{{ $takenChairs }}</span></p>
        <p class="ticket__info">В зале: <span class="ticket__details ticket__hall">{{ $hallName }}</span></p>
        <p class="ticket__info">На сеанс фильма: <span class="ticket__details ticket__title">{{ $movieName }}</span></p>
        <p class="ticket__info">Начало: <span class="ticket__details ticket__start">{{ $startTime }}</span></p>
        <p class="ticket__info">Стоимость: <span class="ticket__details ticket__cost">{{ $price }}</span> {{ $priceNoun }}</p>

        <a class="form__button-submit" onclick="location.href=location.href.replace('order', 'ticket')" >Получить код бронирования</a>

        <p class="ticket__hint">Внимание! Данная и последующая страницы будут доступны вам в любое время. Сохраните электронный билет в закладках или сфотографируйте, чтобы не потерять.</p>
      </div>
    </section>
  </main>
@endsection
