export default class SessionsConfigurator {
  constructor(
    sessionsConfiguratorForm,
    movieAddForm,
    movieDeleteForm,
    sessionAddForm,
    sessionDeleteForm
  ) {
    this.form = sessionsConfiguratorForm;
    this.formDataset = this.getFormDataset();
    this.moviesGrid = this.form.querySelector('.movies-grid');
    this.moviesList = [];
    this.sessionsGrid = this.form.querySelector('.sessions-grid');
    this.timelines = this.sessionsGrid.querySelectorAll('.sessions-grid__timeline');
    this.sessionsIntervals = new Array(this.timelines.length).fill(null);
    this.movieAddForm = movieAddForm;
    this.movieDeleteForm = movieDeleteForm;
    this.sessionAddForm = sessionAddForm;
    this.sessionDeleteForm = sessionDeleteForm;
    this.moviesInput = this.form.querySelector('.movies');
    this.sessionsInput = this.form.querySelector('.sessions');
  }

  getLastArrayElement(array) {
    return array[array.length - 1];
  }

  stringToNumber(string) {
    return Number.parseInt(string.match(/\d+$/), 10);
  }

  checkLinkIsInvalid(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    try {
      xhr.send();
    } catch {
      return false;
    }

    return xhr.responseText.startsWith('<!');
  }

  getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

  getExtendedTime(hours, minutes) {
    const extendedHours = !hours ? '' : hours + this.getNoun(
      hours,
      ' час',
      ' часа',
      ' часов',
    );
    const extendedMinutes = !minutes ? '' : minutes + this.getNoun(
      minutes,
      ' минута',
      ' минуты',
      ' минут',
    );
    return extendedHours + ' ' + extendedMinutes;
  }

  getFormDataset() {
    const formDataset = this.form.dataset;
    const isFormDataset = formDataset.hasOwnProperty('grids') && formDataset.grids.length;

    return isFormDataset ? JSON.parse(formDataset.grids) : undefined;
  }

  showErrorMessage(form, inputName, errorMessage) {
    const input = form.elements[inputName];
    let errorElement = input.nextElementSibling;

    if (!errorElement || errorElement.className !== 'form__error') {
      input.insertAdjacentHTML('afterend', this.getFormErrorHTML(errorMessage));
      errorElement = input.nextElementSibling;
    }

    setTimeout(() => {
      errorElement.remove();
    }, 3000);
  }

  updateSessionsColors() {
    const sessions = this.sessionsGrid.querySelectorAll('.sessions-grid__session');
    sessions.forEach(session => {
      const movieId = this.getLastArrayElement(session.classList);
      const movie = this.moviesGrid.querySelector(`.${movieId}`);
      const movieColor = getComputedStyle(movie).backgroundColor;
      session.style.backgroundColor = movieColor;
    });
  }

  escapeHTML(unsafeString)
  {
    const escapedString = unsafeString
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    return escapedString;
  }

  fillForm() {
    const movies = this.formDataset;

    let moviesGridHTML = '';
    let sessionsGridHTML = {};
    let timeIntervals = {};

    movies.forEach(movie => {

      // get movie parameters for html template
      const movieId = 'movie' + movie.id;
      const name = movie.name;
      const hoursDuration = Math.trunc(movie.duration / 60);
      const minutesDuration = movie.duration % 60;
      const duration = this.getExtendedTime(hoursDuration, minutesDuration);
      const posterLink = movie.posterLink;

      // get and save movie html
      moviesGridHTML += this.getMovieHTML(
        movieId,
        name,
        duration,
        posterLink,
      )

      // save movie name
      this.moviesList.push(movie.name);

      // loop over sessions
      if (movie.sessions.length) {
        movie.sessions.forEach(session => {
          const {hallId} = session;

          // initialize objects properties if it hasn't been done yet
          if (!timeIntervals.hasOwnProperty(hallId)) {
            timeIntervals[hallId] = [];
            sessionsGridHTML[hallId] = '';
          }

          // get session parameters for html template
          const movieId = 'movie' + movie.id;
          const movieName = movie.name;
          let leftShift = session.start.split(':');
          leftShift = +leftShift[0] * 30 + +leftShift[1] * 0.5;
          const width = movie.duration * 0.5;
          const startTime = session.start;
          const sessionId = 'session' + session.id;

          // get and save session html
          sessionsGridHTML[hallId] += this.getSessionHTML(
            movieId,
            movieName,
            leftShift,
            width,
            startTime,
            sessionId,
          )

          // set last session id
          this.sessionsGrid.dataset.lastId = session.id;

          // save session time interval in px
          const start = leftShift;
          const end = leftShift + width;
          timeIntervals[hallId].push({start, end});
        })
      }
    })

    // insert movies data
    this.moviesGrid.dataset.lastId = movies[(movies.length - 1)].id;
    this.moviesGrid.insertAdjacentHTML('beforeend', moviesGridHTML);

    // insert sessions data
    sessionsGridHTML = Object.values(sessionsGridHTML);
    this.timelines.forEach((timeline, index) => {
      timeline.insertAdjacentHTML('afterbegin', sessionsGridHTML[index] || '');
      this.sessionsIntervals[index] = timeIntervals[index + 1] || null;
    })

    this.updateSessionsColors();
  }

  getMovieHTML(movieId, name, duration, posterLink, description = "",  country = "") {
    const disabled = this.timelines.length ? '' : 'movies-grid__movie_disabled';

    return `<div class="movies-grid__movie ${disabled} ${movieId}" data-description="${description}" data-country="${country}">
      <div class="movies-grid__movie-body">
        <img class="movies-grid__movie-poster" alt="Постер" src="${posterLink}">
        <h3 class="movies-grid__movie-title">
          ${name}
        </h3>
        <p class="movies-grid__movie-duration">${duration}</p>
      </div>
      <button class="movies-grid__movie-button-trash form__button form__button-trash" />
    </div>`;
  }

  getSessionHTML(movieId, movieName, leftShift, width, startTime, sessionId, movieColor = '') {
    return `<div class="sessions-grid__session ${movieId}" id="${sessionId}" style="width: ${width}px; background-color: ${movieColor}; left: ${leftShift}px;">
      <p class="sessions-grid__movie-title">${movieName}</p>
      <p class="sessions-grid__movie-start">${startTime}</p>
    </div>`;
  }

  getFormErrorHTML(errorMessage) {
    return `<p class="form__error">${errorMessage}</p>`;
  }

  handleMovieAddForm() {
    this.movieAddForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const data = new FormData(this.movieAddForm);

      // get name
      const name = data.get('name');
      if (this.moviesList.length) {
        const nameUnavailable = this.moviesList.includes(name);
        if (nameUnavailable) {
          this.showErrorMessage(
            event.target,
            'name',
            'Ошибка! Указанное имя уже существует!'
          );
          return;
        }
      }
      this.moviesList.push(name);

      // get poster link
      const posterLink = data.get('poster_link');
      const posterUnavailable = this.checkLinkIsInvalid(posterLink);

      if (posterUnavailable) {
        this.showErrorMessage(
          event.target,
          'poster_link',
          'Ошибка! Постер по указанной ссылке не доступен!'
        );
        this.moviesList.pop();
        return;
      }

      // get duration
      let duration = data.get('duration').split(':');
      const hoursDuration= +duration[0];
      const minutesDuration = +duration[1];
      duration = this.getExtendedTime(hoursDuration, minutesDuration);

      // get movie id
      const lastMovie = this.moviesGrid.lastElementChild;
      let lastId;
      if (lastMovie) {
        const lastMovieId = this.getLastArrayElement(lastMovie.classList);
        lastId = this.stringToNumber(lastMovieId);
      } else {
        lastId = +this.moviesGrid.dataset.lastId;
      }
      const movieId = 'movie' + (lastId + 1);

      // get description and country
      const description = this.escapeHTML(data.get('description'));
      const country = this.escapeHTML(data.get('country'));

      // get html
      const movieHTML = this.getMovieHTML(
        movieId,
        name,
        duration,
        posterLink,
        description,
        country,
      );

      // insert data
      this.moviesGrid.insertAdjacentHTML('beforeend', movieHTML);

      // close and reset the form
      event.target.closest('.popup').classList.remove('active');
      event.target.reset();
    });
  }

  handleMovieDeleteForm() {
    this.movieDeleteForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const data = new FormData(this.movieDeleteForm);

      const movieId = data.get('movie_id');

      const lastMovieId =  this.getLastArrayElement(
        this.moviesGrid.lastElementChild.classList
      );

      // delete elements with movie id
      const elements = this.form.querySelectorAll(`.${movieId}`);
      elements.forEach(element => element.remove());

      // delete movie name from movies names
      const movieName = data.get('movie_name');
      this.moviesList.splice(this.moviesList.indexOf(movieName), 1);

      // update sessions colors because of movies shifting
      if (movieId !== lastMovieId){
        this.updateSessionsColors();
      }

      // close the form
      event.target.closest('.popup').classList.remove('active');
    });
  }

  handleSessionAddForm() {
    this.sessionAddForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const data = new FormData(this.sessionAddForm);

      // get movie start time
      const startTime = data.get('start_time');

      // get session left shift on timeline
      let leftShift = startTime.split(':');
      leftShift = +leftShift[0] * 30 + +leftShift[1] * 0.5;

      // check if session time in px is available on timeline
      const movieDuration = data.get('movie_duration');
      const width = +movieDuration * 0.5;
      const sessionEnd = leftShift + width;
      const timelineIndex = data.get('timeline_index');

      let timelineSessionsIntervals = this.sessionsIntervals[timelineIndex];
      const [start, end] = [leftShift, sessionEnd];

      if (timelineSessionsIntervals === null) {
        this.sessionsIntervals[timelineIndex] = [{start, end}];
      } else {

        // check the interval for overlap
        const sessionTimeUnavailable = timelineSessionsIntervals.some(sessionInterval => {
          return start < sessionInterval.end && end > sessionInterval.start;
        });
        if (sessionTimeUnavailable) {
          this.showErrorMessage(
            event.target,
            'start_time',
            'Ошибка! Время сеанса уже занято!'
          );
          return;
        }

        // save new session interval
        timelineSessionsIntervals.push({start, end});
      }

      // get new session id
      const sessions = this.sessionsGrid.querySelectorAll('.sessions-grid__session');
      let lastId;
      if (sessions.length) {
        const lastSession = this.getLastArrayElement(sessions);
        lastId = this.stringToNumber(lastSession.id);
      } else {
        lastId = +this.sessionsGrid.dataset.lastId;
      }
      const sessionId = 'session' + (lastId + 1);

      // get the rest session parameters for html template
      const movieId = data.get('movie_id');
      const movieName = data.get('movie_name');
      const movieColor = data.get('movie_color');

      // get html
      const sessionHTML = this.getSessionHTML(
        movieId,
        movieName,
        leftShift,
        width,
        startTime,
        sessionId,
        movieColor
      );

      // insert html
      const timeline = this.timelines[timelineIndex];
      timeline.insertAdjacentHTML('beforeend', sessionHTML);

      // close and reset the form
      event.target.closest('.popup').classList.remove('active');
      event.target.reset();
    });
  }

  handleSessionDeleteForm() {
    this.sessionDeleteForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const data = new FormData(this.sessionDeleteForm);

      // find session by id and delete it
      const sessionId = data.get('session_id');
      const timelineIndex = data.get('timeline_index');
      const timeline = this.timelines[timelineIndex];
      const session = timeline.querySelector(`#${sessionId}`);

      // delete session interval and session
      const sessionsIntervals = this.sessionsIntervals[timelineIndex];
      const start = parseInt(getComputedStyle(session).left, 10);
      const sessionIntervalIndex = sessionsIntervals.findIndex(sessionInterval => {
        return start === sessionInterval.start;
      });
      sessionsIntervals.splice(sessionIntervalIndex, 1);
      session.remove();

      // close the form
      event.target.closest('.popup').classList.remove('active');
    });
  }

  handleResetButton() {
    this.form.addEventListener('reset', () => {
      const resetElements = this.form.querySelectorAll('.movies-grid, .sessions-grid__timeline');
      resetElements.forEach(resetElement => {
        while (resetElement.firstChild) {
          resetElement.removeChild(resetElement.firstChild);
        }
      })

      this.moviesList = [];
      this.sessionsIntervals = new Array(this.timelines.length).fill(null);

      if (this.formDataset) {
        this.fillForm();
      }
    });
  }

  handleSubmitButton() {
    const submitForm = (event) => {
      event.preventDefault();

      // get movies data
      const movies = this.moviesGrid.querySelectorAll('.movies-grid__movie');
      const moviesData = [];

      movies.forEach(movie => {
        const id = this.stringToNumber(
          this.getLastArrayElement(movie.classList)
        );
        const name = movie.querySelector('.movies-grid__movie-title').innerText;
        const description = movie.dataset.description;
        const country = movie.dataset.country;
        let duration = movie
          .querySelector('.movies-grid__movie-duration')
          .innerText
          .split(' ');
        if (duration.length === 2) {
          if(duration[1].startsWith('мин')) {
            duration = +duration[0];
          } else {
            duration = +duration[0] * 60;
          }
        } else {
          duration = +duration[0] * 60 + +duration[2];
        }
        const poster = movie
          .querySelector('.movies-grid__movie-poster')
          .getAttribute('src');

        moviesData.push({id, name, description, country, duration, poster})
      });

      // get sessions data
      const sessionsData = [];
      const hallsIds = JSON.parse(this.sessionsGrid.dataset.hallsIds);

      this.timelines.forEach((timeline, timeLineIndex) => {
        const sessions = timeline.querySelectorAll('.sessions-grid__session');
        sessions.forEach(session => {
          let id = session.id;
          id = this.stringToNumber(id);
          let movieId = this.getLastArrayElement(session.classList);
          movieId = this.stringToNumber(movieId);
          const hallId = +hallsIds[timeLineIndex];
          const startTime = session.querySelector('.sessions-grid__movie-start').innerText;

          sessionsData.push({id, movieId, hallId, startTime})
        });
      })

      this.moviesInput.value = JSON.stringify(moviesData);
      this.sessionsInput.value = JSON.stringify(sessionsData);

      this.form.removeEventListener('submit', submitForm);

      this.form.submit();
    }

    this.form.addEventListener('submit', submitForm);
  }

  assignHandlers() {
    this.handleMovieAddForm();
    this.handleMovieDeleteForm();
    this.handleSessionAddForm();
    this.handleSessionDeleteForm();
    this.handleResetButton();
    this.handleSubmitButton();
  }

  init() {
    this.assignHandlers();

    if (this.formDataset) {
      this.fillForm();
    }
  }
}
