import PopupsManager from './modules/PopupsManager';
import HallsConfigurator from './modules/HallsConfigurator';
import PricesConfigurator from './modules/PricesConfigurator';
import SalesController from './modules/SalesController';
import SessionsConfigurator from './modules/SessionsConfigurator';


// delete anchor on scrolling
const deleteAnchor = () => {
  const href = window.location.href;
  const hashTagIndex = href.indexOf('#');
  if (hashTagIndex !== -1) {
    history.pushState({}, null, '/dashboard');
  }
  window.removeEventListener('scroll', deleteAnchor);
}

window.addEventListener('scroll', deleteAnchor);


// accordion
const headers = document.querySelectorAll('.section__header');
headers.forEach(header => header.addEventListener('click', () => {
  header.classList.toggle('section__header_closed');
  header.classList.toggle('section__header_opened');
}));


// init popups manager
const popupTriggers = document.querySelectorAll('[data-popup-id]');

const popupsManager = new PopupsManager(popupTriggers);

popupsManager.assignHandlers();


// init halls configurator
const hallsConfiguratorForm = document.getElementById('halls-configurator-form');
const chairsTypes = ['disabled', 'standard', 'vip'];

const hallsConfigurator = new HallsConfigurator(
  hallsConfiguratorForm,
  chairsTypes
);

hallsConfigurator.init();


// init prices configurator
const pricesConfiguratorForm = document.getElementById('prices-configurator-form');

const pricesConfigurator = new PricesConfigurator(pricesConfiguratorForm);

pricesConfigurator.init();


// init sales controller
const salesControllerForm = document.getElementById('sales-controller-form');

const salesController = new SalesController(salesControllerForm);

salesController.init();


// init sessions configurator
const sessionsConfiguratorForm = document.getElementById('sessions-configurator-form');
const movieAddForm = document.getElementById('movie-add-form');
const movieDeleteForm = document.getElementById('movie-delete-form');
const sessionAddForm = document.getElementById('session-add-form');
const sessionDeleteForm = document.getElementById('session-delete-form');

const sessionsConfigurator = new SessionsConfigurator(
  sessionsConfiguratorForm,
  movieAddForm,
  movieDeleteForm,
  sessionAddForm,
  sessionDeleteForm,
);

sessionsConfigurator.init();
