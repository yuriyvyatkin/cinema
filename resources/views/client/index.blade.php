@extends('layouts.main')

@section('script')
  <script src="{{ asset('js/client/homePage.js') }}" defer></script>
@endsection

@section('style')
  <link href="{{ asset('css/client/style.css') }}" rel="stylesheet">
@endsection

@section('title', 'Главная')

@section('content')
  @include('components.client.header')

  <span class="hint nav-hint">Выберите дату посещения:</span>
  <nav class="page-nav">
    <a class="page-nav__day page-nav__day_previous" href="#0"></a>
    <a class="page-nav__day" href="#0">
      <span class="page-nav__day-week">Пн</span>
      <span class="page-nav__day-number">31</span>
    </a>
    <a class="page-nav__day" href="#0">
      <span class="page-nav__day-week">Вт</span>
      <span class="page-nav__day-number">1</span>
    </a>
    <a class="page-nav__day" href="#0">
      <span class="page-nav__day-week">Ср</span>
      <span class="page-nav__day-number">2</span>
    </a>
    <a class="page-nav__day" href="#0">
      <span class="page-nav__day-week">Чт</span>
      <span class="page-nav__day-number">3</span>
    </a>
    <a class="page-nav__day" href="#0">
      <span class="page-nav__day-week">Пт</span>
      <span class="page-nav__day-number">4</span>
    </a>
    <a class="page-nav__day" href="#0">
      <span class="page-nav__day-week">Сб</span>
      <span class="page-nav__day-number">5</span>
    </a>
    <a class="page-nav__day page-nav__day_next" href="#0"></a>
  </nav>

  <main class="page-main">
    @forelse ($pageData as $movie)
      <section class="movie">
        <div class="movie__info">
          <div class="movie__poster">
            <img class="movie__poster-image" alt="{{ $movie->name }} постер" src="{{ $movie->posterLink }}">
          </div>
          <div class="movie__description">
            <h2 class="movie__title">{{ $movie->name }}</h2>
            <p class="movie__summary">
              @php
                $paragraphs = explode('\n', $movie->description);
              @endphp
              @if (count($paragraphs) > 1)
                @foreach ($paragraphs as $key => $paragraph)
                  @if ($key === 0)
                    {{ $paragraph }}
                  @else
                    <br><br>{{ $paragraph }}
                  @endif
                @endforeach
              @else
                {{ $movie->description }}
              @endif
            </p>
            <p class="movie__data">
              <span class="movie__data-duration">{{ $movie->duration }}</span>
              <span class="movie__data-origin">{{ $movie->country }}</span>
            </p>
          </div>
        </div>

        <span class="hint movie-hint">Выберите зал и время:</span>
        @foreach ($movie->sessions as $hallName => $sessions)
          <div class="movie__hall">
            <h3 class="movie__hall-title">{{ $hallName }}</h3>
            <ul class="movie__sessions-list">
              @foreach ($sessions as $session)
                <li class="movie__time-block">
                  <a class="movie__time" href="session?id={{ $session['id'] }}">
                    {{ $session['start'] }}
                  </a>
                </li>
              @endforeach
            </ul>
          </div>
        @endforeach
      </section>
    @empty
      <p class="page-stub">Фильмов нет<p>
    @endforelse
  </main>
@endsection
