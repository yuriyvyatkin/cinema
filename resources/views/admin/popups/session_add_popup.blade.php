<x-admin.popup>
  <x-slot name="id">
    session-add-popup
  </x-slot>

  <x-slot name="title">
    Добавление сеанса
  </x-slot>

  <form class="form" id="session-add-form">
    <input class="movie-id" type="hidden" name="movie_id">
    <input class="movie-duration" type="hidden" name="movie_duration">
    <input class="movie-color" type="hidden" name="movie_color">
    <label class="form__label form__label-fullsize" for="movie-name">
      Название фильма
      <input class="form__input form__input_readonly movie-name" id="movie-name" type="text" name="movie_name" readonly>
    </label>
    <label class="form__label form__label-fullsize" for="timeline-index">
      Название зала
      <select class="form__input" id="timeline-index" name="timeline_index" required>
        @foreach ($hallsNames as $key => $hallName)
          <option value="{{ $key }}" @selected($key === 0)>
            {{ Str::upper($hallName) }}
          </option>
        @endforeach
      </select>
    </label>
    <label class="form__label form__label-fullsize" for="start-time">
      Время начала
      <input class="form__input" id="start-time" type="time" value="00:00" name="start_time" required>
    </label>
    <div class="form__buttons text-center">
      <input class="form__button form__button-submit" type="submit" value="Добавить">
      <button class="form__button form__button-cancel">
        Отменить
      </button>
    </div>
  </form>
</x-admin.popup>
