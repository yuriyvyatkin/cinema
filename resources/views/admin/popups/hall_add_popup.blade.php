<x-admin.popup>
  <x-slot name="id">
    hall-add-popup
  </x-slot>

  <x-slot name="title">
    Добавление зала
  </x-slot>

  <form class="form" action="{{ route('hall.add') }}" method="post" accept-charset="utf-8">
    @csrf

    <label class="form__label form__label-fullsize" for="name">
      Название зала
      <input class="form__input hall-name" id="name" type="text" placeholder="Например, &laquo;Зал 1&raquo;" name="hall_name" required>
    </label>
    <div class="form__buttons text-center">
      <input class="form__button form__button-submit" type="submit" value="Добавить зал">
      <button class="form__button form__button-cancel">
        Отменить
      </button>
    </div>
  </form>
</x-admin.popup>
