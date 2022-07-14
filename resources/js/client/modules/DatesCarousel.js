export default class DatesCarousel {
  constructor(body) {
    this.body = body;
    this.prevBtn = this.body.querySelector('a.page-nav__day_previous');
    this.nextBtn = this.body.querySelector('a.page-nav__day_next');
    this.days = this.body.querySelectorAll('a.page-nav__day:not(.page-nav__day_previous):not(.page-nav__day_next)');
    this.todayTimestamp = Date.now();
    this.shiftedTimestamp = Date.now();
    this.chosenDate = null;
    this.day = 24 * 60 * 60 * 1000;
  }

  getWeekDays(timestamp)
  {
    const baseDate = new Date(timestamp);
    const weekDays = [];

    for(let i = 0; i < 6; i += 1)
    {
      let dateValues = baseDate.toLocaleDateString('ru-Ru', {weekday: 'short', day: 'numeric'});
      dateValues = dateValues.split(', ');
      let [weekDay, day] = dateValues;

      weekDay = weekDay.substring(0, 1).toLocaleUpperCase() + weekDay.substring(1);

      weekDays.push({weekDay, day});
      baseDate.setDate(baseDate.getDate() + 1);
    }

    return weekDays;
  }

  update(timestamp) {
    const weekDays = this.getWeekDays(timestamp);

    this.days.forEach((day, index) => {
      const weekDay = weekDays[index].weekDay;
      day.firstElementChild.innerText = weekDay;
      day.lastElementChild.innerText = weekDays[index].day;

      day.classList.remove('page-nav__day_weekend');

      if (weekDay === 'Сб' || weekDay === 'Вс') {
        day.classList.add('page-nav__day_weekend');
      }
    })

    if ((this.shiftedTimestamp - this.todayTimestamp) === 0) {
      this.prevBtn.classList.add('page-nav__day_disabled');
      this.days[0].classList.add('page-nav__day_today');
    } else {
      this.prevBtn.classList.remove('page-nav__day_disabled');
      this.days[0].classList.remove('page-nav__day_today');
    }
  }

  prevBtnHandler() {
    this.prevBtn.addEventListener('click', (event) => {
      event.preventDefault();

      if (event.target.classList.contains('page-nav__day_disabled')) {
        return;
      }

      this.shiftedTimestamp -= this.day;

      this.update(this.shiftedTimestamp);
    })
  }

  nextBtnHandler() {
    this.nextBtn.addEventListener('click', (event) => {
      event.preventDefault();

      this.shiftedTimestamp += this.day;

      this.update(this.shiftedTimestamp);
    })
  }

  getChosenDateTimestamp() {
    const shiftedDate = new Date(this.shiftedTimestamp);
    const chosenDate = new Date(
      shiftedDate.getFullYear(),
      shiftedDate.getMonth(),
      +this.chosenDate.lastElementChild.innerText
    );
    const timestamp = chosenDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000;

    return timestamp;
  }

  dayHandler() {
    this.days.forEach(day => day.addEventListener('click', (event) => {
      event.preventDefault();

      this.chosenDate.classList.remove('page-nav__day_chosen');

      event.currentTarget.classList.add('page-nav__day_chosen');

      this.chosenDate = event.currentTarget;
    }))
  }

  assignHandlers() {
    this.prevBtnHandler();
    this.nextBtnHandler();
    this.dayHandler();
  }

  init() {
    this.update(this.todayTimestamp);
    this.days[0].classList.add('page-nav__day_chosen');
    this.chosenDate = this.days[0];

    this.assignHandlers();
  }
}
