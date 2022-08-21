@extends('layouts.main')

@section('style')
  <link href="{{ asset('css/admin/style.css') }}" rel="stylesheet">
@endsection

@section('title', 'Авторизация')

@section('content')
  <header class="page-header">
    <h1 class="page-header__title">Идём<span>в</span>кино</h1>
    <span class="page-header__subtitle">Администраторская</span>
  </header>

  <main>
    <section class="login">
      <header class="login__header">
        <h2 class="login__title">Авторизация</h2>
      </header>
      <div class="login__wrapper">
        <form class="login__form" action="{{ route('login') }}" method="POST" accept-charset="utf-8">
          @csrf

          @if(isset($errors) && count($errors) > 0)
                @foreach($errors->all() as $error)
                  @php
                    $sentences = explode('\n', $error);
                  @endphp
                  @if (count($sentences) > 1)
                    @foreach ($sentences as $sentence)
                      <p class="login__error">{{ $sentence }}</p>
                    @endforeach
                  @else
                    <p class="login__error">{{ $error }}</p>
                  @endif
                @endforeach
          @endif

          <label class="login__label" for="email">
            Электронная почта
            <input class="login__input" id="email" type="email" placeholder="name@example.ru" name="email" value="admin@mail.ru" required autocomplete="email" autofocus>
          </label>
          <label class="login__label" for="password">
            Пароль
            <input class="login__input" id="password" type="password" name="password" value="1234" required autocomplete="current-password">
          </label>
          <label class="login__checkbox-label" for="remember">
            Запомнить меня
            <input class="login__checkbox" type="checkbox" name="remember" id="remember" checked>
          </label>
          <div class="text-center">
            <input value="Авторизоваться" type="submit" class="login__button">
          </div>
        </form>
      </div>
    </section>
  </main>
@endsection
