/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/client/modules/DatesCarousel.js":
/*!******************************************************!*\
  !*** ./resources/js/client/modules/DatesCarousel.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DatesCarousel)
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var DatesCarousel = /*#__PURE__*/function () {
  function DatesCarousel(body) {
    _classCallCheck(this, DatesCarousel);

    this.body = body;
    this.prevBtn = this.body.querySelector('a.page-nav__day_previous');
    this.nextBtn = this.body.querySelector('a.page-nav__day_next');
    this.days = this.body.querySelectorAll('a.page-nav__day:not(.page-nav__day_previous):not(.page-nav__day_next)');
    this.todayTimestamp = Date.now();
    this.shiftedTimestamp = Date.now();
    this.chosenDate = null;
    this.day = 24 * 60 * 60 * 1000;
  }

  _createClass(DatesCarousel, [{
    key: "getWeekDays",
    value: function getWeekDays(timestamp) {
      var baseDate = new Date(timestamp);
      var weekDays = [];

      for (var i = 0; i < 6; i += 1) {
        var dateValues = baseDate.toLocaleDateString('ru-Ru', {
          weekday: 'short',
          day: 'numeric'
        });
        dateValues = dateValues.split(', ');

        var _dateValues = dateValues,
            _dateValues2 = _slicedToArray(_dateValues, 2),
            weekDay = _dateValues2[0],
            day = _dateValues2[1];

        weekDay = weekDay.substring(0, 1).toLocaleUpperCase() + weekDay.substring(1);
        weekDays.push({
          weekDay: weekDay,
          day: day
        });
        baseDate.setDate(baseDate.getDate() + 1);
      }

      return weekDays;
    }
  }, {
    key: "update",
    value: function update(timestamp) {
      var weekDays = this.getWeekDays(timestamp);
      this.days.forEach(function (day, index) {
        var weekDay = weekDays[index].weekDay;
        day.firstElementChild.innerText = weekDay;
        day.lastElementChild.innerText = weekDays[index].day;
        day.classList.remove('page-nav__day_weekend');

        if (weekDay === 'Сб' || weekDay === 'Вс') {
          day.classList.add('page-nav__day_weekend');
        }
      });

      if (this.shiftedTimestamp - this.todayTimestamp === 0) {
        this.prevBtn.classList.add('page-nav__day_disabled');
        this.days[0].classList.add('page-nav__day_today');
      } else {
        this.prevBtn.classList.remove('page-nav__day_disabled');
        this.days[0].classList.remove('page-nav__day_today');
      }
    }
  }, {
    key: "prevBtnHandler",
    value: function prevBtnHandler() {
      var _this = this;

      this.prevBtn.addEventListener('click', function (event) {
        event.preventDefault();

        if (event.target.classList.contains('page-nav__day_disabled')) {
          return;
        }

        _this.shiftedTimestamp -= _this.day;

        _this.update(_this.shiftedTimestamp);
      });
    }
  }, {
    key: "nextBtnHandler",
    value: function nextBtnHandler() {
      var _this2 = this;

      this.nextBtn.addEventListener('click', function (event) {
        event.preventDefault();
        _this2.shiftedTimestamp += _this2.day;

        _this2.update(_this2.shiftedTimestamp);
      });
    }
  }, {
    key: "getChosenDateTimestamp",
    value: function getChosenDateTimestamp() {
      var shiftedDate = new Date(this.shiftedTimestamp);
      var chosenDate = new Date(shiftedDate.getFullYear(), shiftedDate.getMonth(), +this.chosenDate.lastElementChild.innerText);
      var timestamp = chosenDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000;
      return timestamp;
    }
  }, {
    key: "dayHandler",
    value: function dayHandler() {
      var _this3 = this;

      this.days.forEach(function (day) {
        return day.addEventListener('click', function (event) {
          event.preventDefault();

          _this3.chosenDate.classList.remove('page-nav__day_chosen');

          event.currentTarget.classList.add('page-nav__day_chosen');
          _this3.chosenDate = event.currentTarget;
        });
      });
    }
  }, {
    key: "assignHandlers",
    value: function assignHandlers() {
      this.prevBtnHandler();
      this.nextBtnHandler();
      this.dayHandler();
    }
  }, {
    key: "init",
    value: function init() {
      this.update(this.todayTimestamp);
      this.days[0].classList.add('page-nav__day_chosen');
      this.chosenDate = this.days[0];
      this.assignHandlers();
    }
  }]);

  return DatesCarousel;
}();



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************************!*\
  !*** ./resources/js/client/homePage.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_DatesCarousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/DatesCarousel */ "./resources/js/client/modules/DatesCarousel.js");
 // init dates carousel

var pageNav = document.querySelector('.page-nav');
var datesCarousel = new _modules_DatesCarousel__WEBPACK_IMPORTED_MODULE_0__["default"](pageNav);
datesCarousel.init(); // redirect on time click

var moviesTime = document.querySelectorAll('.movie__time');
moviesTime.forEach(function (movieTime) {
  return movieTime.addEventListener('click', function (event) {
    event.preventDefault();
    window.location = event.currentTarget.href + "&timestamp=".concat(datesCarousel.getChosenDateTimestamp());
  });
});
})();

/******/ })()
;