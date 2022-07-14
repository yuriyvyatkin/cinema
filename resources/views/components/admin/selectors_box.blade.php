<ul class="form__selectors-box">
  @forelse ($hallsNames as $key => $hallName)
    <li class="form__selector hall{{ $key }}">
      <input class="form__radio" type="radio" name="hall_name" value="{{ $hallName }}" @checked($key === 0)>
      <span class="form__selector-label">{{ $hallName }}</span>
    </li>
  @empty
    <li class="form__list-item-stub">Залов нет</li>
  @endforelse
</ul>
