@extends('layouts.main')

@section('script')
  <script src="{{ asset('js/client/sessionPage.js') }}" defer></script>
@endsection

@section('style')
  <link href="{{ asset('css/client/style.css') }}" rel="stylesheet">
@endsection

@section('title', 'Киносессия')

@section('content')
  @include('components.client.header')

  <main class="page-main">
    <section class="session">
      <div class="session__info">
        <div class="session__info-description">
          <h2 class="session__info-title">{{ $movieName }}</h2>
          <p class="session__info-start">Начало сеанса:
            <span class="session__info-start-time">{{ $startTime }}</span>
          </p>
          <p class="session__info-hall">Зал:
            <span class="session__info-hall-title">{{ $hallName }}</span>
          </p>
        </div>
        <div class="session__info-hint">
          <p>Тапните дважды,<br>чтобы увеличить</p>
        </div>
      </div>

      <form class="form" id="session-form" action="{{ route('session.book') }}" method="post" accept-charset="utf-8" data-hall={{ $hallData }}>
        @csrf

        <input class="data" type="hidden" name="data">

        <div class="chairs-grid">
          <div class="chairs-grid__wrapper"></div>
          <div class="chairs-grid__legend">
            <div class="chairs-grid__column">
              <p class="chairs-grid__legend-price">
                <span class="chairs-grid__chair chairs-grid__chair_standard"></span> Свободно (<span class="chairs-grid__legend-value">250</span> руб)
              </p>
              <p class="chairs-grid__legend-price">
                <span class="chairs-grid__chair chairs-grid__chair_vip"></span> Свободно VIP (<span class="chairs-grid__legend-value">350</span> руб)
              </p>
            </div>
            <div class="chairs-grid__column">
              <p class="chairs-grid__legend-price">
                <span class="chairs-grid__chair chairs-grid__chair_taken"></span> Занято
              </p>
              <p class="chairs-grid__legend-price">
                <span class="chairs-grid__chair chairs-grid__chair_selected"></span> Выбрано
              </p>
            </div>
          </div>
        </div>
        <input class="form__button-submit" type="submit" value="Забронировать">
      </form>
    </section>
  </main>
@endsection
