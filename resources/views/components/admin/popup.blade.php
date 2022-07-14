<div class="popup" id="{{ $id }}">
  <div class="popup__content">
    <div class="popup__header">
      <h2 class="popup__title">
      {{ $title }}
      <a class="popup__dismiss" href="#0">
        <img src="{{ asset('img/admin/close.png') }}" alt="Закрыть">
      </a>
      </h2>
    </div>

    <div class="popup__wrapper">
      {{ $slot }}
    </div>
  </div>
</div>
