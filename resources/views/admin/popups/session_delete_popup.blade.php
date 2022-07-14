<x-admin.popup>
  <x-slot name="id">
    session-delete-popup
  </x-slot>

  <x-slot name="title">
    Снятие с сеанса
  </x-slot>

  <form class="form" id="session-delete-form">
    <p class="form__paragraph">
      Вы действительно хотите снять с сеанса фильм
      "<span class="movie-name"></span>"?
    </p>
    <input class="session-id" type="hidden" name="session_id">
    <input class="timeline-index" type="hidden" name="timeline_index">
    <div class="form__buttons text-center">
      <input class="form__button form__button-submit" type="submit" value="Удалить">
      <button class="form__button form__button-cancel">
        Отменить
      </button>
    </div>
  </form>
</x-admin.popup>
