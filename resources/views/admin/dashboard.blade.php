@extends('layouts.main')

@section('script')
  <script src="{{ asset('js/admin/script.js') }}" defer></script>
@endsection

@section('style')
  <link href="{{ asset('css/admin/style.css') }}" rel="stylesheet">
@endsection

@section('title', 'Администраторская')

@section('content')
  @include('admin.popups.hall_add_popup')
  @include('admin.popups.hall_delete_popup')
  @include('admin.popups.movie_add_popup')
  @include('admin.popups.movie_delete_popup')
  @include('admin.popups.session_add_popup')
  @include('admin.popups.session_delete_popup')

  <div class="logout">
    <h2 class="logout__title">Администратор: {{ Auth::user()->name }}</h2>

    <form class="form" action="{{ route('logout') }}" method="post">
      @csrf

      <input class="form__button form__button-submit" type="submit" value="Выйти">
    </form>
  </div>

  <header class="page-header">
    <h1 class="page-header__title">Идём<span>в</span>кино</h1>
    <span class="page-header__subtitle">Администраторская</span>
  </header>

  <main class="page-main">
    <section class="section" id="available-halls">
      <header class="section__header section__header_opened">
        <h2 class="section__title">Управление залами</h2>
      </header>

      <div class="section__wrapper">
        <form class="form">
          <p class="form__paragraph">Доступные залы:</p>
          <ul class="form__list">
            @forelse ($hallsNames as $hallName)
              <li class="form__list-item">{{ $hallName }}
                <button class="form__button form__button-trash" data-popup-id="hall-delete-popup" />
              </li>
            @empty
              <li class="form__list-item-stub">Залов нет</li>
            @endforelse
          </ul>

          <button class="form__button form__button-submit" data-popup-id="hall-add-popup">
            Создать зал
          </button>
        </form>
      </div>
    </section>

    <section class="section" id="halls-configurator">
      <header class="section__header section__header_opened">
        <h2 class="section__title">Конфигурация залов</h2>
      </header>

      <div class="section__wrapper">
        <form class="form" id="halls-configurator-form" action="{{ route('hall.update') }}" method="post" accept-charset="utf-8" data-current-hall="" {{ implode(' ', $hallsConfig) }}>
          @method('PATCH')
          @csrf

          <input type="hidden" name="form_name" value="chairs">
          <input class="chairs-types" type="hidden" name="chairs_types">

          <p class="form__paragraph">Выберите зал для конфигурации:</p>
          @include('components.admin.selectors_box')

          <p class="form__paragraph">
            Укажите количество рядов и максимальное количество кресел в ряду:
          </p>
          <div class="form__legend">
            <label class="form__label" for="rows">
              Рядов, шт
              <input class="form__input hall-rows" id="rows" type="number" min="1" max="100" onkeydown="return false" data-old-value="" name="rows">
            </label>

            <span class="multiplier">x</span>

            <label class="form__label" for="chairs">
              Мест, шт
              <input class="form__input hall-chairs" id="chairs" type="number" min="1" max="100" onkeydown="return false" data-old-value="" name="chairs">
            </label>
          </div>

          <p class="form__paragraph">
            Теперь вы можете указать типы кресел на схеме зала:
          </p>
          <div class="form__legend">
            <span class="chair chairs-grid__chair chairs-grid__chair_standard"></span>
            — обычные кресла
            <span class="chair chairs-grid__chair chairs-grid__chair_vip"></span>
            — VIP кресла
            <span class="chair chairs-grid__chair chairs-grid__chair_disabled"></span>
            — заблокированные (нет кресла)
            <p class="form__hint">
              Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши
            </p>
          </div>

          <div class="chairs-grid">
            <div class="chairs-grid__wrapper"></div>
          </div>

          <fieldset class="form__buttons text-center">
            <button class="form__button form__button-reset" type="reset">
              Отмена
            </button>
            <input class="form__button form__button-submit" type="submit" value="Сохранить">
          </fieldset>
        </form>
      </div>
    </section>

    <section class="section" id="prices-configurator">
      <header class="section__header section__header_opened">
        <h2 class="section__title">Конфигурация цен</h2>
      </header>

      <div class="section__wrapper">
        <form class="form" id="prices-configurator-form" action="{{ route('hall.update') }}" method="post" accept-charset="utf-8" data-current-hall="" {{ implode(' ', $pricesConfig) }}>
          @method('PATCH')
          @csrf

          <input type="hidden" name="form_name" value="prices">

          <p class="form__paragraph">Выберите зал для конфигурации:</p>
          @include('components.admin.selectors_box')

          <p class="form__paragraph">Установите цены для типов кресел:</p>
          <div class="form__legend">
            <label class="form__label">
              Цена, рублей
              <input class="form__input standard-price" type="number" min="0" name="standard_price">
            </label>
            за <span class="chair chairs-grid__chair chairs-grid__chair_standard"></span> обычные кресла
          </div>
          <div class="form__legend">
            <label class="form__label">
              Цена, рублей
              <input class="form__input vip-price" type="number" min="0" name="vip_price">
            </label>
            за <span class="chair chairs-grid__chair chairs-grid__chair_vip"></span> VIP кресла
          </div>

          <fieldset class="form__buttons text-center">
            <button class="form__button form__button-reset" type="reset">
              Отмена
            </button>
            <input class="form__button form__button-submit" type="submit" value="Сохранить">
          </fieldset>
        </form>
      </div>
    </section>

    <section class="section" id="sessions-configurator">
      <header class="section__header section__header_opened">
        <h2 class="section__title">Сетка сеансов</h2>
      </header>

      <div class="section__wrapper">
        <form class="form" id="sessions-configurator-form" action="{{ route('movies.sessions.put') }}" method="post" accept-charset="utf-8" data-grids='[{{ implode(',', $sessionsConfiguratorData) }}]'>
          @method('PUT')
          @csrf

          <input class="movies" type="hidden" name="movies" value="movies">
          <input class="sessions" type="hidden" name="sessions" value="sessions">

          <span class="form__hint">* Кликните <button type="button" class="button-trash movies-grid__movie-button-trash form__button form__button-trash"></button> для удаления фильма</span>
          <span class="form__hint">* Кликните на фильме для добавления сессии (если залов нет, недоступно)</span>
          <span class="form__hint">* Кликните на сессии для ее удаления</span>

          <p class="form__paragraph">
            <button class="form__button form__button-submit" type="button" data-popup-id="movie-add-popup">
              Добавить фильм
            </button>
          </p>

          <div class="movies-grid" data-last-id="{{ $lastMovieId }}" data-popup-id="movies-grid-popups"></div>

          <div class="sessions-grid" data-halls-ids="{{ $hallsIds }}" data-last-id="{{ $lastSessionId }}" data-popup-id="session-delete-popup">
            @foreach ($hallsNames as $hallName)
              <div class="sessions-grid__hall">
                <h3 class="sessions-grid__title">{{ $hallName }}</h3>
                <div class="sessions-grid__timeline"></div>
              </div>
            @endforeach
          </div>

          <fieldset class="form__buttons text-center">
            <button class="form__button form__button-reset" type="reset">
              Отмена
            </button>
            <input class="form__button form__button-submit" type="submit" value="Сохранить">
          </fieldset>
        </form>
      </div>
    </section>

    <section class="section" id="sales-controller">
      <header class="section__header section__header_opened">
        <h2 class="section__title">Открыть продажи</h2>
      </header>

      <div class="section__wrapper text-center">
        <form class="form" id="sales-controller-form" action="{{ route('hall.update') }}" method="post" accept-charset="utf-8" data-current-hall="" {{ implode(' ', $salesData) }}>
          @method('PATCH')
          @csrf

          <input type="hidden" name="form_name" value="sales">
          <input class="sales-state" type="hidden" name="sales_state">

          <p class="form__paragraph">Выберите зал для конфигурации:</p>
          @include('components.admin.selectors_box')

          <p class="form__paragraph hint"></p>
          <input class="form__button form__button-submit" type="submit" />
        </form>
      </div>
    </section>
  </main>
@endsection


