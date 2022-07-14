@extends('layouts.main')

@section('style')
  <link href="{{ asset('css/client/style.css') }}" rel="stylesheet">
@endsection

@section('title', 'Билет')

@section('content')
  @include('components.client.header')

  <main class="page-main">
    <section class="ticket">

      <header class="ticket__check">
        <h2 class="ticket__check-title">Электронный билет № {{ $ticketNumber }}</h2>
      </header>

      <div class="ticket__info-wrapper">
        <p class="ticket__info">На фильм: <span class="ticket__details ticket__title">{{ $movieName }}</span></p>
        <p class="ticket__info">Ряд/место: <span class="ticket__details ticket__chairs">{{ $takenChairs }}</span></p>
        <p class="ticket__info">В зале: <span class="ticket__details ticket__hall">{{ $hallName }}</span></p>
        <p class="ticket__info">Начало сеанса: <span class="ticket__details ticket__start">{{ $startTime }}</span></p>

        @php
          use chillerlan\QRCode\QRCode;
          echo '<img class="ticket__info-qr" src="' . (new QRCode)->render($hash) . '" alt="QR код" />';
        @endphp

        <p class="ticket__hint">КАК ПОЛУЧИТЬ БИЛЕТ:<br>
          Перед началом фильма назовите в кассе кинотеатра номер вашего электронного билета. Также вы можете воспользоваться терминалом выдачи билетов, просканировав приложенный QR-код, или введя номер электронного билета.
        </p>
        <p class="ticket__hint">Приятного просмотра! 🤩🍿🥤</p>
      </div>
    </section>
  </main>
@endsection
