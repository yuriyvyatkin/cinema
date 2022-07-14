import DatesCarousel from './modules/DatesCarousel';


// init dates carousel
const pageNav = document.querySelector('.page-nav');
const datesCarousel = new DatesCarousel(pageNav);
datesCarousel.init();


// redirect on time click
const moviesTime = document.querySelectorAll('.movie__time');
moviesTime.forEach(movieTime => movieTime.addEventListener('click', (event) => {
  event.preventDefault();

  window.location = event.currentTarget.href + `&timestamp=${datesCarousel.getChosenDateTimestamp()}`;
}))
