<x-admin.popup>
  <x-slot name="id">
    movie-delete-popup
  </x-slot>

  <x-slot name="title">
    Удаление фильма
  </x-slot>

  <form class="form" id="movie-delete-form">
    <p class="form__paragraph">
      Вы действительно хотите удалить фильм
      "<span class="movie-name"></span>"?
    </p>
    <div class="form__buttons text-center">
      <input class="movie-id" type="hidden" name="movie_id">
      <input class="movie-name" type="hidden" name="movie_name">
      <input class="form__button form__button-submit" type="submit" value="Удалить">
      <button class="form__button form__button-cancel">
        Отменить
      </button>
    </div>
  </form>
</x-admin.popup>
