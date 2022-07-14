import SessionFormHandler from './modules/SessionFormHandler';


// handle double tap on mobile devices
const description = document.querySelector('.session__info-description');
const tap = document.querySelector('.session__info-hint');

tap.addEventListener('touchstart', ({currentTarget}) => {
  if(!currentTarget.hasAttribute('data-taped')) {
    currentTarget.setAttribute('data-taped', 'true');
    setTimeout(() => {
      currentTarget.removeAttribute('data-taped');
    }, 300);
    return false;
  }

  description.classList.add('session__info-description_zoomed');
}, {passive: true})


// init session form handler
const sessionForm = document.getElementById('session-form');

const sessionFormHandler = new SessionFormHandler(
  sessionForm
);

sessionFormHandler.init();
