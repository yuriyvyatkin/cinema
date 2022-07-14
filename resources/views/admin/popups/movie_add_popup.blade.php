<x-admin.popup>
  <x-slot name="id">
    movie-add-popup
  </x-slot>

  <x-slot name="title">
    Добавление фильма
  </x-slot>

  <form class="form" id="movie-add-form">
    <label class="form__label form__label-fullsize" for="name">
      Название фильма
      <input class="form__input" id="name" type="text" placeholder="Например, &laquo;Двенадцать друзей Оушена&raquo;" name="name" required>
    </label>
    <label class="form__label form__label-fullsize" for="description">
      Описание фильма
      <textarea class="form__textarea form__input" id="description" type="text" name="description" required></textarea>
    </label>
    <label class="form__label form__label-fullsize" for="country">
      Страна
      <input class="form__input" id="country" type="text" placeholder="Например, &laquo;Австралия&raquo;" name="country" required>
    </label>
    <label class="form__label form__label-fullsize" for="duration">
      Продолжительность
      <input class="form__input" id="duration" type="time" min="00:30" value="00:00" name="duration" required>
    </label>
    <label class="form__label form__label-fullsize" for="poster-link">
      Прямая ссылка на постер
      <input class="form__input" id="poster-link" type="text" name="poster_link" required>
      <p class="form__hint">Например, https://imageup.ru/img180/3970746/poster.jpeg или ../../img/posters/poster.jpeg</p>
    </label>
    <div class="form__buttons text-center">
      <input class="form__button form__button-submit" type="submit" value="Добавить фильм">
      <button class="form__button form__button-cancel">
        Отменить
      </button>
    </div>
  </form>
</x-admin.popup>
