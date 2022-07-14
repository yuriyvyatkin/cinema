export default class PopupsManager {
  constructor (popupTriggers) {
    this.popupTriggers = popupTriggers;
  }

  popupHandler(event) {
    event.preventDefault();
    const {currentTarget, target} = event;
    const popupId = currentTarget.dataset.popupId;

    // prepare popup form
    let popup;
    if (popupId !== 'movies-grid-popups') {
      popup = document.getElementById(popupId);
    }

    if (popupId === 'hall-add-popup') {
      popup.querySelector('.form__input').value = '';
    } else if (popupId === 'hall-delete-popup') {
      const hallName = currentTarget.parentElement.innerText.trim();

      popup.querySelector('span.hall-name').innerText = hallName;
      popup.querySelector('input.hall-name').value = hallName;
    } else if (popupId === 'session-delete-popup') {
      const session = target.closest('.sessions-grid__session');

      if (!session) {
        return;
      }

      const movieName = session.querySelector('.sessions-grid__movie-title').innerText;
      const sessionId = session.id;
      let hall = session.closest('.sessions-grid__hall');
      let timelineIndex = -1;
      do {
        timelineIndex += 1;
      } while (hall = hall.previousElementSibling);

      popup.querySelector('span.movie-name').innerText = movieName;
      popup.querySelector('input.session-id').value = sessionId;
      popup.querySelector('input.timeline-index').value = timelineIndex;
    } else if (target.classList.contains('movies-grid__movie-button-trash')) {
      event.stopPropagation();

      popup = document.getElementById('movie-delete-popup');

      const movie = target.closest('.movies-grid__movie');
      const movieName = movie.querySelector('.movies-grid__movie-title').innerText;
      const movieId = movie.classList[movie.classList.length - 1];

      popup.querySelector('span.movie-name').innerText = movieName;
      popup.querySelector('input.movie-id').value = movieId;
      popup.querySelector('input.movie-name').value = movieName;
    } else if (target.className.startsWith('movies-grid__movie')) {
      const movie = target.closest('.movies-grid__movie');

      if (movie.classList.contains('movies-grid__movie_disabled')) {
        return;
      }

      popup = document.getElementById('session-add-popup');

      const movieId = movie.classList[movie.classList.length - 1];
      const movieName = movie.querySelector('.movies-grid__movie-title').innerText;
      let extendedTime = movie
        .querySelector('.movies-grid__movie-duration')
        .innerText;
      let movieDuration;
      const parts = extendedTime.split(' ');
      if (parts.length === 2 && parts[1].startsWith('мин')) {
        movieDuration = +parts[0];
      } else if (parts.length === 2) {
        movieDuration = +parts[0] * 60;
      } else {
        movieDuration = +parts[0] * 60 + +parts[2];
      }
      const movieColor = getComputedStyle(movie).backgroundColor;

      popup.querySelector('input.movie-id').value = movieId;
      popup.querySelector('input.movie-name').value = movieName;
      popup.querySelector('input.movie-duration').value = movieDuration;
      popup.querySelector('input.movie-color').value = movieColor;
    }

    // handle close elements
    const closeElements = popup.querySelectorAll('.popup__dismiss, .form__button-cancel');
    closeElements.forEach(closeElement => closeElement.addEventListener('click', (event) => {
      event.preventDefault();

      event.target.closest('.popup').classList.remove('active');
    }));

    // show popup
    popup.classList.add('active');
  }

  assignHandlers() {
    this.popupTriggers.forEach(popupTrigger => popupTrigger.addEventListener(
      'click',
      this.popupHandler
    ));
  }
}
