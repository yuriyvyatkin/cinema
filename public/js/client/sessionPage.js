/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/client/modules/SessionFormHandler.js":
/*!***********************************************************!*\
  !*** ./resources/js/client/modules/SessionFormHandler.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SessionFormHandler)
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

var SessionFormHandler = /*#__PURE__*/function () {
  function SessionFormHandler(sessionForm) {
    _classCallCheck(this, SessionFormHandler);

    this.form = sessionForm;
    this.formDataset = this.getFormDataset();
    this.hallSchema = this.form.querySelector('.chairs-grid__wrapper');
    this.standardPrice = this.form.querySelector('span.chairs-grid__chair_standard').nextElementSibling;
    this.vipPrice = this.form.querySelector('span.chairs-grid__chair_vip').nextElementSibling;
    this.formInput = this.form.querySelector('.data');
    this.submitButton = this.form.querySelector('.form__button-submit');
  }

  _createClass(SessionFormHandler, [{
    key: "getFormDataset",
    value: function getFormDataset() {
      var formDataset = this.form.dataset;
      var isFormDataset = formDataset.hasOwnProperty('hall') && formDataset.hall.length;

      if (isFormDataset) {
        formDataset = JSON.parse(formDataset.hall);
        formDataset = Object.fromEntries(Object.entries(formDataset).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              val = _ref2[1];

          return [key, val];
        }));
        formDataset.chairsTypes = JSON.parse(formDataset.chairsTypes);
        return formDataset;
      } else {
        return undefined;
      }
    }
  }, {
    key: "isAvailableChairs",
    value: function isAvailableChairs() {
      var chairsTypes = this.formDataset.chairsTypes.flat();
      return chairsTypes.includes('standard') || chairsTypes.includes('vip');
    }
  }, {
    key: "getChairsHTML",
    value: function getChairsHTML(chairsTypes) {
      var html = '';
      chairsTypes.forEach(function (row) {
        html += '<div class="chairs-grid__row">';
        row.forEach(function (chairType) {
          html += "<span class=\"chairs-grid__chair chairs-grid__chair_".concat(chairType, "\"></span>");
        });
        html += '</div>';
      });
      return html;
    }
  }, {
    key: "insertChairsGrid",
    value: function insertChairsGrid(chairsTypes) {
      var html = this.getChairsHTML(chairsTypes);
      this.hallSchema.insertAdjacentHTML('afterbegin', html);
    }
  }, {
    key: "handleHallSchema",
    value: function handleHallSchema() {
      this.hallSchema.addEventListener('click', function (_ref3) {
        var target = _ref3.target;

        if (target.matches('.chairs-grid__chair_standard') || target.matches('.chairs-grid__chair_vip')) {
          target.classList.toggle('chairs-grid__chair_selected');
        }
      });
    }
  }, {
    key: "handleSubmitButton",
    value: function handleSubmitButton() {
      var _this = this;

      var submitForm = function submitForm(event) {
        event.preventDefault(); // get chairs types grid

        var rows = _this.hallSchema.querySelectorAll('.chairs-grid__row');

        var chairsTypes = [];
        var chosenChairs = [];
        var totalPrice = 0;
        rows.forEach(function (row, rowIndex) {
          var chairs = row.querySelectorAll('.chairs-grid__chair');
          var rowChairsTypes = [];
          chairs.forEach(function (chair, chairIndex) {
            var substringIndex = chair.className.lastIndexOf('_') + 1;
            var chairType = chair.className.substring(substringIndex);

            if (chairType === 'selected') {
              chosenChairs.push({
                row: rowIndex + 1,
                chair: chairIndex + 1
              });
              chairType = 'taken';

              if (chair.classList.contains('chairs-grid__chair_standard')) {
                totalPrice += _this.formDataset.standardPrice;
              } else if (chair.classList.contains('chairs-grid__chair_vip')) {
                totalPrice += _this.formDataset.vipPrice;
              }
            }

            rowChairsTypes.push(chairType);
          });
          chairsTypes.push(rowChairsTypes);
        });

        if (chosenChairs.length === 0) {
          _this.submitButton.value = 'выберите место';

          _this.submitButton.classList.add('form__button-submit_disabled');

          _this.submitButton.disabled = true;
          setTimeout(function () {
            _this.submitButton.value = 'забронировать';

            _this.submitButton.classList.remove('form__button-submit_disabled');

            _this.submitButton.disabled = false;
          }, 1000);
        }

        var URLParams = new URLSearchParams(window.location.search);
        _this.formInput.value = JSON.stringify({
          'chairs_types': JSON.stringify(chairsTypes),
          'taken_chairs': JSON.stringify(chosenChairs),
          'total_price': totalPrice,
          'session_id': URLParams.get('id'),
          'timestamp': URLParams.get('timestamp')
        });

        _this.form.removeEventListener('submit', submitForm);

        _this.form.submit();
      };

      this.form.addEventListener('submit', submitForm);
    }
  }, {
    key: "assignHandlers",
    value: function assignHandlers() {
      this.handleHallSchema();
      this.handleSubmitButton();
    }
  }, {
    key: "init",
    value: function init() {
      if (this.formDataset && this.isAvailableChairs()) {
        this.insertChairsGrid(this.formDataset.chairsTypes);
        this.standardPrice.innerText = this.formDataset.standardPrice;
        this.vipPrice.innerText = this.formDataset.vipPrice;
        this.assignHandlers();
      } else {
        this.hallSchema.classList.add('chairs-grid__wrapper_unavailable');
        var submitButton = this.form.querySelector('.form__button-submit');
        submitButton.classList.add('form__button-submit_disabled');
        submitButton.disabled = true;
      }
    }
  }]);

  return SessionFormHandler;
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
/*!********************************************!*\
  !*** ./resources/js/client/sessionPage.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_SessionFormHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/SessionFormHandler */ "./resources/js/client/modules/SessionFormHandler.js");
 // handle double tap on mobile devices

var description = document.querySelector('.session__info-description');
var tap = document.querySelector('.session__info-hint');
tap.addEventListener('touchstart', function (_ref) {
  var currentTarget = _ref.currentTarget;

  if (!currentTarget.hasAttribute('data-taped')) {
    currentTarget.setAttribute('data-taped', 'true');
    setTimeout(function () {
      currentTarget.removeAttribute('data-taped');
    }, 300);
    return false;
  }

  description.classList.add('session__info-description_zoomed');
}, {
  passive: true
}); // init session form handler

var sessionForm = document.getElementById('session-form');
var sessionFormHandler = new _modules_SessionFormHandler__WEBPACK_IMPORTED_MODULE_0__["default"](sessionForm);
sessionFormHandler.init();
})();

/******/ })()
;