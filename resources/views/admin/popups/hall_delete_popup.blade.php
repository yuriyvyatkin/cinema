<x-admin.popup>
  <x-slot name="id">
    hall-delete-popup
  </x-slot>

  <x-slot name="title">
    Удаление зала
  </x-slot>

  <form class="form" action="{{ route('hall.delete') }}" method="post" accept-charset="utf-8">
    @method('DELETE')
    @csrf

    <p class="form__paragraph">
      Вы действительно хотите удалить зал
      "<span class="hall-name"></span>"?
    </p>
    <div class="form__buttons text-center">
      <input class="hall-name" type="hidden" name="hall_name">
      <input class="form__button form__button-submit" type="submit" value="Удалить">
      <button class="form__button form__button-cancel">
      Отменить
      </button>
    </div>
  </form>
</x-admin.popup>
