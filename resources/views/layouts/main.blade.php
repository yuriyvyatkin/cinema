<!doctype html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>@yield('title') | Идём в кино</title>

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">

  <!-- Scripts -->
  @yield('script')

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">

  <!-- Styles -->
  <link href="{{ asset('css/normalize.css') }}" rel="stylesheet">
  @yield('style')
</head>

<body>
  @yield('content')
</body>

</html>
