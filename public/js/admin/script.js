/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/admin/modules/HallsConfigurator.js":
/*!*********************************************************!*\
  !*** ./resources/js/admin/modules/HallsConfigurator.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HallsConfigurator)
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

var HallsConfigurator = /*#__PURE__*/function () {
  function HallsConfigurator(hallsConfiguratorForm, chairsTypes) {
    _classCallCheck(this, HallsConfigurator);

    this.form = hallsConfiguratorForm;
    this.chairsTypes = chairsTypes;
    this.formDataset = this.getFormDataset();
    this.selectorsBox = this.form.querySelector('.form__selectors-box');
    this.chairsTypesInput = this.form.querySelector('.chairs-types');
    this.rowsInput = this.form.querySelector('.hall-rows');
    this.chairsInput = this.form.querySelector('.hall-chairs');
    this.hallSchema = this.form.querySelector('.chairs-grid__wrapper');
  }

  _createClass(HallsConfigurator, [{
    key: "getFormDataset",
    value: function getFormDataset() {
      var formDataset = this.form.dataset;
      var isFormDataset = Object.keys(this.form.dataset).some(function (key) {
        return key.startsWith('hall');
      });
      formDataset = Object.fromEntries(Object.entries(formDataset).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];

        return [key, val];
      }));
      return isFormDataset ? formDataset : undefined;
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
    key: "updateChairsGrid",
    value: function updateChairsGrid(chairsTypes) {
      while (this.hallSchema.firstChild) {
        this.hallSchema.removeChild(this.hallSchema.firstChild);
      }

      this.insertChairsGrid(chairsTypes);
    }
  }, {
    key: "fillForm",
    value: function fillForm(listItem) {
      var isInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var hallDataName = listItem.classList[listItem.classList.length - 1];

      if (typeof this.formDataset[hallDataName] === 'string') {
        this.formDataset[hallDataName] = JSON.parse(this.formDataset[hallDataName]);
      }

      var hallData = this.formDataset[hallDataName];
      var rows = hallData.rows,
          rowChairs = hallData.rowChairs,
          chairsTypes = hallData.chairsTypes;
      this.rowsInput.value = rows;
      this.rowsInput.dataset.oldValue = this.rowsInput.value;
      this.chairsInput.value = rowChairs;
      this.chairsInput.dataset.oldValue = this.chairsInput.value;

      if (isInit) {
        this.insertChairsGrid(chairsTypes);
      } else {
        this.updateChairsGrid(chairsTypes);
      }
    }
  }, {
    key: "handleSelectorsBox",
    value: function handleSelectorsBox() {
      var _this = this;

      this.selectorsBox.addEventListener('click', function (_ref3) {
        var target = _ref3.target;
        var formData = new FormData(_this.form);
        var hallName = formData.get('hall_name');

        if (_this.formDataset.currentHall !== hallName) {
          _this.fillForm(target.closest('li'));

          _this.formDataset.currentHall = hallName;
        }
      });
    }
  }, {
    key: "handleRowsInput",
    value: function handleRowsInput() {
      var _this2 = this;

      this.rowsInput.addEventListener('change', function (_ref4) {
        var target = _ref4.target;
        var oldValue = +target.dataset.oldValue;
        var newValue = +target.value;
        var difference = Math.abs(oldValue - newValue);

        if (oldValue > newValue) {
          for (; difference > 0; difference -= 1) {
            _this2.hallSchema.lastElementChild.remove();
          }
        } else {
          for (; difference > 0; difference -= 1) {
            var lastRow = _this2.hallSchema.lastElementChild.cloneNode(true);

            _this2.hallSchema.appendChild(lastRow);
          }
        }

        target.dataset.oldValue = newValue;
      });
    }
  }, {
    key: "handleChairsInput",
    value: function handleChairsInput() {
      var _this3 = this;

      this.chairsInput.addEventListener('change', function (_ref5) {
        var target = _ref5.target;
        var oldValue = +target.dataset.oldValue;
        var newValue = +target.value;

        var rows = _this3.hallSchema.querySelectorAll('.chairs-grid__row');

        var difference = Math.abs(oldValue - newValue);

        if (oldValue > newValue) {
          for (; difference > 0; difference -= 1) {
            rows.forEach(function (row) {
              row.lastElementChild.remove();
            });
          }
        } else {
          for (; difference > 0; difference -= 1) {
            rows.forEach(function (row) {
              var lastChair = row.lastElementChild.cloneNode();
              row.appendChild(lastChair);
            });
          }
        }

        target.dataset.oldValue = newValue;
      });
    }
  }, {
    key: "handleHallSchema",
    value: function handleHallSchema() {
      this.hallSchema.addEventListener('click', function (_ref6) {
        var target = _ref6.target;

        if (target.matches('.chairs-grid__chair')) {
          var substringIndex = target.className.lastIndexOf('_') + 1;
          var chairType = target.className.substring(substringIndex);
          var chairTypesIndex = chairsTypes.indexOf(chairType);
          var nextChairType = chairsTypes[(chairTypesIndex + 1) % chairsTypes.length];
          target.className = target.className.replace(chairType, nextChairType);
        }
      });
    }
  }, {
    key: "handleResetButton",
    value: function handleResetButton() {
      var _this4 = this;

      this.form.addEventListener('reset', function (event) {
        event.preventDefault();
        _this4.formDataset.currentHall = '';

        var firstSelector = _this4.selectorsBox.querySelector('.form__radio');

        firstSelector.checked = true;

        _this4.fillForm(_this4.selectorsBox.firstElementChild);
      });
    }
  }, {
    key: "handleSubmitButton",
    value: function handleSubmitButton() {
      var _this5 = this;

      var submitForm = function submitForm(event) {
        event.preventDefault(); // get chairs types grid

        var rows = _this5.hallSchema.querySelectorAll('.chairs-grid__row');

        var chosenChairsTypes = [];
        rows.forEach(function (row) {
          var chairs = row.querySelectorAll('.chairs-grid__chair');
          var rowChairsTypes = [];
          chairs.forEach(function (chair) {
            var substringIndex = chair.className.lastIndexOf('_') + 1;
            var chairType = chair.className.substring(substringIndex);
            rowChairsTypes.push(chairType);
          });
          chosenChairsTypes.push(rowChairsTypes);
        });
        _this5.chairsTypesInput.value = JSON.stringify(chosenChairsTypes);

        _this5.form.removeEventListener('submit', submitForm);

        _this5.form.submit();
      };

      this.form.addEventListener('submit', submitForm);
    }
  }, {
    key: "assignHandlers",
    value: function assignHandlers() {
      this.handleSelectorsBox();
      this.handleRowsInput();
      this.handleChairsInput();
      this.handleHallSchema();
      this.handleResetButton();
      this.handleSubmitButton();
    }
  }, {
    key: "init",
    value: function init() {
      if (this.formDataset) {
        this.fillForm(this.selectorsBox.firstElementChild, true);
        this.assignHandlers();
      } else {
        this.rowsInput.classList.add('form__input_disabled');
        this.rowsInput.disabled = true;
        this.chairsInput.classList.add('form__input_disabled');
        this.chairsInput.disabled = true;
        var resetButton = this.form.querySelector('.form__button-reset');
        resetButton.classList.add('form__button_disabled');
        resetButton.disabled = true;
        var submitButton = this.form.querySelector('.form__button-submit');
        submitButton.classList.add('form__button_disabled');
        submitButton.disabled = true;
      }
    }
  }]);

  return HallsConfigurator;
}();



/***/ }),

/***/ "./resources/js/admin/modules/PopupsManager.js":
/*!*****************************************************!*\
  !*** ./resources/js/admin/modules/PopupsManager.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupsManager)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var PopupsManager = /*#__PURE__*/function () {
  function PopupsManager(popupTriggers) {
    _classCallCheck(this, PopupsManager);

    this.popupTriggers = popupTriggers;
  }

  _createClass(PopupsManager, [{
    key: "popupHandler",
    value: function popupHandler(event) {
      event.preventDefault();
      var currentTarget = event.currentTarget,
          target = event.target;
      var popupId = currentTarget.dataset.popupId; // prepare popup form

      var popup;

      if (popupId !== 'movies-grid-popups') {
        popup = document.getElementById(popupId);
      }

      if (popupId === 'hall-add-popup') {
        popup.querySelector('.form__input').value = '';
      } else if (popupId === 'hall-delete-popup') {
        var hallName = currentTarget.parentElement.innerText.trim();
        popup.querySelector('span.hall-name').innerText = hallName;
        popup.querySelector('input.hall-name').value = hallName;
      } else if (popupId === 'session-delete-popup') {
        var session = target.closest('.sessions-grid__session');

        if (!session) {
          return;
        }

        var movieName = session.querySelector('.sessions-grid__movie-title').innerText;
        var sessionId = session.id;
        var hall = session.closest('.sessions-grid__hall');
        var timelineIndex = -1;

        do {
          timelineIndex += 1;
        } while (hall = hall.previousElementSibling);

        popup.querySelector('span.movie-name').innerText = movieName;
        popup.querySelector('input.session-id').value = sessionId;
        popup.querySelector('input.timeline-index').value = timelineIndex;
      } else if (target.classList.contains('movies-grid__movie-button-trash')) {
        event.stopPropagation();
        popup = document.getElementById('movie-delete-popup');
        var movie = target.closest('.movies-grid__movie');
        var _movieName = movie.querySelector('.movies-grid__movie-title').innerText;
        var movieId = movie.classList[movie.classList.length - 1];
        popup.querySelector('span.movie-name').innerText = _movieName;
        popup.querySelector('input.movie-id').value = movieId;
        popup.querySelector('input.movie-name').value = _movieName;
      } else if (target.className.startsWith('movies-grid__movie')) {
        var _movie = target.closest('.movies-grid__movie');

        if (_movie.classList.contains('movies-grid__movie_disabled')) {
          return;
        }

        popup = document.getElementById('session-add-popup');
        var _movieId = _movie.classList[_movie.classList.length - 1];

        var _movieName2 = _movie.querySelector('.movies-grid__movie-title').innerText;

        var extendedTime = _movie.querySelector('.movies-grid__movie-duration').innerText;

        var movieDuration;
        var parts = extendedTime.split(' ');

        if (parts.length === 2 && parts[1].startsWith('мин')) {
          movieDuration = +parts[0];
        } else if (parts.length === 2) {
          movieDuration = +parts[0] * 60;
        } else {
          movieDuration = +parts[0] * 60 + +parts[2];
        }

        var movieColor = getComputedStyle(_movie).backgroundColor;
        popup.querySelector('input.movie-id').value = _movieId;
        popup.querySelector('input.movie-name').value = _movieName2;
        popup.querySelector('input.movie-duration').value = movieDuration;
        popup.querySelector('input.movie-color').value = movieColor;
      } // handle close elements


      var closeElements = popup.querySelectorAll('.popup__dismiss, .form__button-cancel');
      closeElements.forEach(function (closeElement) {
        return closeElement.addEventListener('click', function (event) {
          event.preventDefault();
          event.target.closest('.popup').classList.remove('active');
        });
      }); // show popup

      popup.classList.add('active');
    }
  }, {
    key: "assignHandlers",
    value: function assignHandlers() {
      var _this = this;

      this.popupTriggers.forEach(function (popupTrigger) {
        return popupTrigger.addEventListener('click', _this.popupHandler);
      });
    }
  }]);

  return PopupsManager;
}();



/***/ }),

/***/ "./resources/js/admin/modules/PricesConfigurator.js":
/*!**********************************************************!*\
  !*** ./resources/js/admin/modules/PricesConfigurator.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PricesConfigurator)
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

var PricesConfigurator = /*#__PURE__*/function () {
  function PricesConfigurator(pricesConfiguratorForm) {
    _classCallCheck(this, PricesConfigurator);

    this.form = pricesConfiguratorForm;
    this.formDataset = this.getFormDataset();
    this.selectorsBox = this.form.querySelector('.form__selectors-box');
    this.standardPriceInput = this.form.querySelector('.standard-price');
    this.vipPriceInput = this.form.querySelector('.vip-price');
    this.resetButton = this.form.querySelector('.form__button-reset');
  }

  _createClass(PricesConfigurator, [{
    key: "getFormDataset",
    value: function getFormDataset() {
      var formDataset = this.form.dataset;
      var isFormDataset = Object.keys(this.form.dataset).some(function (key) {
        return key.startsWith('hall');
      });
      formDataset = Object.fromEntries(Object.entries(formDataset).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];

        return [key, val];
      }));
      return isFormDataset ? formDataset : undefined;
    }
  }, {
    key: "fillInputs",
    value: function fillInputs(listItem) {
      var hallDataName = listItem.classList[listItem.classList.length - 1];

      if (typeof this.formDataset[hallDataName] === 'string') {
        this.formDataset[hallDataName] = JSON.parse(this.formDataset[hallDataName]);
      }

      var hallData = this.formDataset[hallDataName];
      this.standardPriceInput.value = hallData.standardPrice;
      this.vipPriceInput.value = hallData.vipPrice;
    }
  }, {
    key: "handleSelectorsBox",
    value: function handleSelectorsBox() {
      var _this = this;

      this.selectorsBox.addEventListener('click', function (_ref3) {
        var target = _ref3.target;
        var formData = new FormData(_this.form);
        var hallName = formData.get('hall_name');

        if (_this.formDataset.currentHall !== hallName) {
          _this.fillInputs(target.closest('li'));

          _this.formDataset.currentHall = hallName;
        }
      });
    }
  }, {
    key: "handleResetButton",
    value: function handleResetButton() {
      var _this2 = this;

      this.form.addEventListener('reset', function (event) {
        event.preventDefault();

        _this2.selectorsBox.querySelector('input').click();
      });
    }
  }, {
    key: "assignHandlers",
    value: function assignHandlers() {
      this.handleSelectorsBox();
      this.handleResetButton();
    }
  }, {
    key: "init",
    value: function init() {
      if (this.formDataset) {
        this.fillInputs(this.selectorsBox.firstElementChild);
        this.assignHandlers();
      } else {
        this.standardPriceInput.classList.add('form__input_disabled');
        this.standardPriceInput.disabled = true;
        this.vipPriceInput.classList.add('form__input_disabled');
        this.vipPriceInput.disabled = true;
        var resetButton = this.form.querySelector('.form__button-reset');
        resetButton.classList.add('form__button_disabled');
        resetButton.disabled = true;
        var submitButton = this.form.querySelector('.form__button-submit');
        submitButton.classList.add('form__button_disabled');
        submitButton.disabled = true;
      }
    }
  }]);

  return PricesConfigurator;
}();



/***/ }),

/***/ "./resources/js/admin/modules/SalesController.js":
/*!*******************************************************!*\
  !*** ./resources/js/admin/modules/SalesController.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SalesController)
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

var SalesController = /*#__PURE__*/function () {
  function SalesController(salesConfiguratorForm) {
    _classCallCheck(this, SalesController);

    this.form = salesConfiguratorForm;
    this.formDataset = this.getFormDataset();
    this.selectorsBox = this.form.querySelector('.form__selectors-box');
    this.salesState = this.form.querySelector('.sales-state');
    this.hint = this.form.querySelector('.hint');
    this.submitButton = this.form.querySelector('.form__button-submit');
  }

  _createClass(SalesController, [{
    key: "getFormDataset",
    value: function getFormDataset() {
      var formDataset = this.form.dataset;
      var isFormDataset = Object.keys(this.form.dataset).some(function (key) {
        return key.startsWith('hall');
      });
      formDataset = Object.fromEntries(Object.entries(formDataset).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];

        return [key, val];
      }));
      return isFormDataset ? formDataset : undefined;
    }
  }, {
    key: "fillForm",
    value: function fillForm(listItem) {
      var hallDataName = listItem.classList[listItem.classList.length - 1];

      if (typeof this.formDataset[hallDataName] === 'string') {
        this.formDataset[hallDataName] = JSON.parse(this.formDataset[hallDataName]);
      }

      var hallData = this.formDataset[hallDataName];
      this.submitButton.classList.remove('form__button_disabled');

      if (hallData.salesIsOpened && hallData.sessionsNumber > 0) {
        this.hint.innerText = '⠀';
        this.submitButton.value = 'Приостановить продажу билетов';
        this.salesState.value = 0;
      } else if (hallData.sessionsNumber === 0) {
        this.hint.innerText = 'Продажа билетов не доступна. Нет киносессий.';
        this.submitButton.value = 'Открыть продажу билетов';
        this.submitButton.classList.add('form__button_disabled');
        this.salesState.value = '';
      } else {
        this.hint.innerText = 'Всё готово, теперь можно:';
        this.submitButton.value = 'Открыть продажу билетов';
        this.salesState.value = 1;
      }
    }
  }, {
    key: "handleSelectorsBox",
    value: function handleSelectorsBox() {
      var _this = this;

      this.selectorsBox.addEventListener('click', function (_ref3) {
        var target = _ref3.target;
        var formData = new FormData(_this.form);
        var hallName = formData.get('hall_name');

        if (_this.formDataset.currentHall !== hallName) {
          _this.fillForm(target.closest('li'));

          _this.formDataset.currentHall = hallName;
        }
      });
    }
  }, {
    key: "handleSubmitButton",
    value: function handleSubmitButton() {
      var _this2 = this;

      var submitForm = function submitForm(event) {
        event.preventDefault();

        if (_this2.submitButton.classList.contains('form__button_disabled')) {
          return;
        }

        _this2.form.removeEventListener('submit', submitForm);

        _this2.form.submit();
      };

      this.form.addEventListener('submit', submitForm);
    }
  }, {
    key: "assignHandlers",
    value: function assignHandlers() {
      this.handleSelectorsBox();
      this.handleSubmitButton();
    }
  }, {
    key: "init",
    value: function init() {
      if (this.formDataset) {
        this.fillForm(this.selectorsBox.firstElementChild);
        this.assignHandlers();
      } else {
        this.hint.innerText = 'Продажа билетов не доступна. Нет залов.';
        this.submitButton.value = 'Открыть продажу билетов';
        this.submitButton.classList.add('form__button_disabled');
        this.submitButton.disabled = true;
        this.handleSubmitButton();
      }
    }
  }]);

  return SalesController;
}();



/***/ }),

/***/ "./resources/js/admin/modules/SessionsConfigurator.js":
/*!************************************************************!*\
  !*** ./resources/js/admin/modules/SessionsConfigurator.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SessionsConfigurator)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var SessionsConfigurator = /*#__PURE__*/function () {
  function SessionsConfigurator(sessionsConfiguratorForm, movieAddForm, movieDeleteForm, sessionAddForm, sessionDeleteForm) {
    _classCallCheck(this, SessionsConfigurator);

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

  _createClass(SessionsConfigurator, [{
    key: "getLastArrayElement",
    value: function getLastArrayElement(array) {
      return array[array.length - 1];
    }
  }, {
    key: "stringToNumber",
    value: function stringToNumber(string) {
      return Number.parseInt(string.match(/\d+$/), 10);
    }
  }, {
    key: "checkLinkIsInvalid",
    value: function checkLinkIsInvalid(url) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);

      try {
        xhr.send();
      } catch (_unused) {
        return false;
      }

      return xhr.responseText.startsWith('<!');
    }
  }, {
    key: "getNoun",
    value: function getNoun(number, one, two, five) {
      var n = Math.abs(number);
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
  }, {
    key: "getExtendedTime",
    value: function getExtendedTime(hours, minutes) {
      var extendedHours = !hours ? '' : hours + this.getNoun(hours, ' час', ' часа', ' часов');
      var extendedMinutes = !minutes ? '' : minutes + this.getNoun(minutes, ' минута', ' минуты', ' минут');
      return extendedHours + ' ' + extendedMinutes;
    }
  }, {
    key: "getFormDataset",
    value: function getFormDataset() {
      var formDataset = this.form.dataset;
      var isFormDataset = formDataset.hasOwnProperty('grids') && formDataset.grids.length;
      return isFormDataset ? JSON.parse(formDataset.grids) : undefined;
    }
  }, {
    key: "showErrorMessage",
    value: function showErrorMessage(form, inputName, errorMessage) {
      var input = form.elements[inputName];
      var errorElement = input.nextElementSibling;

      if (!errorElement || errorElement.className !== 'form__error') {
        input.insertAdjacentHTML('afterend', this.getFormErrorHTML(errorMessage));
        errorElement = input.nextElementSibling;
      }

      setTimeout(function () {
        errorElement.remove();
      }, 3000);
    }
  }, {
    key: "updateSessionsColors",
    value: function updateSessionsColors() {
      var _this = this;

      var sessions = this.sessionsGrid.querySelectorAll('.sessions-grid__session');
      sessions.forEach(function (session) {
        var movieId = _this.getLastArrayElement(session.classList);

        var movie = _this.moviesGrid.querySelector(".".concat(movieId));

        var movieColor = getComputedStyle(movie).backgroundColor;
        session.style.backgroundColor = movieColor;
      });
    }
  }, {
    key: "escapeHTML",
    value: function escapeHTML(unsafeString) {
      var escapedString = unsafeString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
      return escapedString;
    }
  }, {
    key: "fillForm",
    value: function fillForm() {
      var _this2 = this;

      var movies = this.formDataset;
      var moviesGridHTML = '';
      var sessionsGridHTML = {};
      var timeIntervals = {};
      movies.forEach(function (movie) {
        // get movie parameters for html template
        var movieId = 'movie' + movie.id;
        var name = movie.name;
        var hoursDuration = Math.trunc(movie.duration / 60);
        var minutesDuration = movie.duration % 60;

        var duration = _this2.getExtendedTime(hoursDuration, minutesDuration);

        var posterLink = movie.posterLink; // get and save movie html

        moviesGridHTML += _this2.getMovieHTML(movieId, name, duration, posterLink); // save movie name

        _this2.moviesList.push(movie.name); // loop over sessions


        if (movie.sessions.length) {
          movie.sessions.forEach(function (session) {
            var hallId = session.hallId; // initialize objects properties if it hasn't been done yet

            if (!timeIntervals.hasOwnProperty(hallId)) {
              timeIntervals[hallId] = [];
              sessionsGridHTML[hallId] = '';
            } // get session parameters for html template


            var movieId = 'movie' + movie.id;
            var movieName = movie.name;
            var leftShift = session.start.split(':');
            leftShift = +leftShift[0] * 30 + +leftShift[1] * 0.5;
            var width = movie.duration * 0.5;
            var startTime = session.start;
            var sessionId = 'session' + session.id; // get and save session html

            sessionsGridHTML[hallId] += _this2.getSessionHTML(movieId, movieName, leftShift, width, startTime, sessionId); // set last session id

            _this2.sessionsGrid.dataset.lastId = session.id; // save session time interval in px

            var start = leftShift;
            var end = leftShift + width;
            timeIntervals[hallId].push({
              start: start,
              end: end
            });
          });
        }
      }); // insert movies data

      this.moviesGrid.dataset.lastId = movies[movies.length - 1].id;
      this.moviesGrid.insertAdjacentHTML('beforeend', moviesGridHTML); // insert sessions data

      sessionsGridHTML = Object.values(sessionsGridHTML);
      this.timelines.forEach(function (timeline, index) {
        timeline.insertAdjacentHTML('afterbegin', sessionsGridHTML[index] || '');
        _this2.sessionsIntervals[index] = timeIntervals[index + 1] || null;
      });
      this.updateSessionsColors();
    }
  }, {
    key: "getMovieHTML",
    value: function getMovieHTML(movieId, name, duration, posterLink) {
      var description = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
      var country = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
      var disabled = this.timelines.length ? '' : 'movies-grid__movie_disabled';
      return "<div class=\"movies-grid__movie ".concat(disabled, " ").concat(movieId, "\" data-description=\"").concat(description, "\" data-country=\"").concat(country, "\">\n      <div class=\"movies-grid__movie-body\">\n        <img class=\"movies-grid__movie-poster\" alt=\"\u041F\u043E\u0441\u0442\u0435\u0440\" src=\"").concat(posterLink, "\">\n        <h3 class=\"movies-grid__movie-title\">\n          ").concat(name, "\n        </h3>\n        <p class=\"movies-grid__movie-duration\">").concat(duration, "</p>\n      </div>\n      <button class=\"movies-grid__movie-button-trash form__button form__button-trash\" />\n    </div>");
    }
  }, {
    key: "getSessionHTML",
    value: function getSessionHTML(movieId, movieName, leftShift, width, startTime, sessionId) {
      var movieColor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
      return "<div class=\"sessions-grid__session ".concat(movieId, "\" id=\"").concat(sessionId, "\" style=\"width: ").concat(width, "px; background-color: ").concat(movieColor, "; left: ").concat(leftShift, "px;\">\n      <p class=\"sessions-grid__movie-title\">").concat(movieName, "</p>\n      <p class=\"sessions-grid__movie-start\">").concat(startTime, "</p>\n    </div>");
    }
  }, {
    key: "getFormErrorHTML",
    value: function getFormErrorHTML(errorMessage) {
      return "<p class=\"form__error\">".concat(errorMessage, "</p>");
    }
  }, {
    key: "handleMovieAddForm",
    value: function handleMovieAddForm() {
      var _this3 = this;

      this.movieAddForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var data = new FormData(_this3.movieAddForm); // get name

        var name = data.get('name');

        if (_this3.moviesList.length) {
          var nameUnavailable = _this3.moviesList.includes(name);

          if (nameUnavailable) {
            _this3.showErrorMessage(event.target, 'name', 'Ошибка! Указанное имя уже существует!');

            return;
          }
        }

        _this3.moviesList.push(name); // get poster link


        var posterLink = data.get('poster_link');

        var posterUnavailable = _this3.checkLinkIsInvalid(posterLink);

        if (posterUnavailable) {
          _this3.showErrorMessage(event.target, 'poster_link', 'Ошибка! Постер по указанной ссылке не доступен!');

          _this3.moviesList.pop();

          return;
        } // get duration


        var duration = data.get('duration').split(':');
        var hoursDuration = +duration[0];
        var minutesDuration = +duration[1];
        duration = _this3.getExtendedTime(hoursDuration, minutesDuration); // get movie id

        var lastMovie = _this3.moviesGrid.lastElementChild;
        var lastId;

        if (lastMovie) {
          var lastMovieId = _this3.getLastArrayElement(lastMovie.classList);

          lastId = _this3.stringToNumber(lastMovieId);
        } else {
          lastId = +_this3.moviesGrid.dataset.lastId;
        }

        var movieId = 'movie' + (lastId + 1); // get description and country

        var description = _this3.escapeHTML(data.get('description'));

        var country = _this3.escapeHTML(data.get('country')); // get html


        var movieHTML = _this3.getMovieHTML(movieId, name, duration, posterLink, description, country); // insert data


        _this3.moviesGrid.insertAdjacentHTML('beforeend', movieHTML); // close and reset the form


        event.target.closest('.popup').classList.remove('active');
        event.target.reset();
      });
    }
  }, {
    key: "handleMovieDeleteForm",
    value: function handleMovieDeleteForm() {
      var _this4 = this;

      this.movieDeleteForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var data = new FormData(_this4.movieDeleteForm);
        var movieId = data.get('movie_id');

        var lastMovieId = _this4.getLastArrayElement(_this4.moviesGrid.lastElementChild.classList); // delete elements with movie id


        var elements = _this4.form.querySelectorAll(".".concat(movieId));

        elements.forEach(function (element) {
          return element.remove();
        }); // delete movie name from movies names

        var movieName = data.get('movie_name');

        _this4.moviesList.splice(_this4.moviesList.indexOf(movieName), 1); // update sessions colors because of movies shifting


        if (movieId !== lastMovieId) {
          _this4.updateSessionsColors();
        } // close the form


        event.target.closest('.popup').classList.remove('active');
      });
    }
  }, {
    key: "handleSessionAddForm",
    value: function handleSessionAddForm() {
      var _this5 = this;

      this.sessionAddForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var data = new FormData(_this5.sessionAddForm); // get movie start time

        var startTime = data.get('start_time'); // get session left shift on timeline

        var leftShift = startTime.split(':');
        leftShift = +leftShift[0] * 30 + +leftShift[1] * 0.5; // check if session time in px is available on timeline

        var movieDuration = data.get('movie_duration');
        var width = +movieDuration * 0.5;
        var sessionEnd = leftShift + width;
        var timelineIndex = data.get('timeline_index');
        var timelineSessionsIntervals = _this5.sessionsIntervals[timelineIndex];
        var start = leftShift,
            end = sessionEnd;

        if (timelineSessionsIntervals === null) {
          _this5.sessionsIntervals[timelineIndex] = [{
            start: start,
            end: end
          }];
        } else {
          // check the interval for overlap
          var sessionTimeUnavailable = timelineSessionsIntervals.some(function (sessionInterval) {
            return start < sessionInterval.end && end > sessionInterval.start;
          });

          if (sessionTimeUnavailable) {
            _this5.showErrorMessage(event.target, 'start_time', 'Ошибка! Время сеанса уже занято!');

            return;
          } // save new session interval


          timelineSessionsIntervals.push({
            start: start,
            end: end
          });
        } // get new session id


        var sessions = _this5.sessionsGrid.querySelectorAll('.sessions-grid__session');

        var lastId;

        if (sessions.length) {
          var lastSession = _this5.getLastArrayElement(sessions);

          lastId = _this5.stringToNumber(lastSession.id);
        } else {
          lastId = +_this5.sessionsGrid.dataset.lastId;
        }

        var sessionId = 'session' + (lastId + 1); // get the rest session parameters for html template

        var movieId = data.get('movie_id');
        var movieName = data.get('movie_name');
        var movieColor = data.get('movie_color'); // get html

        var sessionHTML = _this5.getSessionHTML(movieId, movieName, leftShift, width, startTime, sessionId, movieColor); // insert html


        var timeline = _this5.timelines[timelineIndex];
        timeline.insertAdjacentHTML('beforeend', sessionHTML); // close and reset the form

        event.target.closest('.popup').classList.remove('active');
        event.target.reset();
      });
    }
  }, {
    key: "handleSessionDeleteForm",
    value: function handleSessionDeleteForm() {
      var _this6 = this;

      this.sessionDeleteForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var data = new FormData(_this6.sessionDeleteForm); // find session by id and delete it

        var sessionId = data.get('session_id');
        var timelineIndex = data.get('timeline_index');
        var timeline = _this6.timelines[timelineIndex];
        var session = timeline.querySelector("#".concat(sessionId)); // delete session interval and session

        var sessionsIntervals = _this6.sessionsIntervals[timelineIndex];
        var start = parseInt(getComputedStyle(session).left, 10);
        var sessionIntervalIndex = sessionsIntervals.findIndex(function (sessionInterval) {
          return start === sessionInterval.start;
        });
        sessionsIntervals.splice(sessionIntervalIndex, 1);
        session.remove(); // close the form

        event.target.closest('.popup').classList.remove('active');
      });
    }
  }, {
    key: "handleResetButton",
    value: function handleResetButton() {
      var _this7 = this;

      this.form.addEventListener('reset', function () {
        var resetElements = _this7.form.querySelectorAll('.movies-grid, .sessions-grid__timeline');

        resetElements.forEach(function (resetElement) {
          while (resetElement.firstChild) {
            resetElement.removeChild(resetElement.firstChild);
          }
        });
        _this7.moviesList = [];
        _this7.sessionsIntervals = new Array(_this7.timelines.length).fill(null);

        if (_this7.formDataset) {
          _this7.fillForm();
        }
      });
    }
  }, {
    key: "handleSubmitButton",
    value: function handleSubmitButton() {
      var _this8 = this;

      var submitForm = function submitForm(event) {
        event.preventDefault(); // get movies data

        var movies = _this8.moviesGrid.querySelectorAll('.movies-grid__movie');

        var moviesData = [];
        movies.forEach(function (movie) {
          var id = _this8.stringToNumber(_this8.getLastArrayElement(movie.classList));

          var name = movie.querySelector('.movies-grid__movie-title').innerText;
          var description = movie.dataset.description;
          var country = movie.dataset.country;
          var duration = movie.querySelector('.movies-grid__movie-duration').innerText.split(' ');

          if (duration.length === 2) {
            if (duration[1].startsWith('мин')) {
              duration = +duration[0];
            } else {
              duration = +duration[0] * 60;
            }
          } else {
            duration = +duration[0] * 60 + +duration[2];
          }

          var poster = movie.querySelector('.movies-grid__movie-poster').getAttribute('src');
          moviesData.push({
            id: id,
            name: name,
            description: description,
            country: country,
            duration: duration,
            poster: poster
          });
        }); // get sessions data

        var sessionsData = [];
        var hallsIds = JSON.parse(_this8.sessionsGrid.dataset.hallsIds);

        _this8.timelines.forEach(function (timeline, timeLineIndex) {
          var sessions = timeline.querySelectorAll('.sessions-grid__session');
          sessions.forEach(function (session) {
            var id = session.id;
            id = _this8.stringToNumber(id);

            var movieId = _this8.getLastArrayElement(session.classList);

            movieId = _this8.stringToNumber(movieId);
            var hallId = +hallsIds[timeLineIndex];
            var startTime = session.querySelector('.sessions-grid__movie-start').innerText;
            sessionsData.push({
              id: id,
              movieId: movieId,
              hallId: hallId,
              startTime: startTime
            });
          });
        });

        _this8.moviesInput.value = JSON.stringify(moviesData);
        _this8.sessionsInput.value = JSON.stringify(sessionsData);

        _this8.form.removeEventListener('submit', submitForm);

        _this8.form.submit();
      };

      this.form.addEventListener('submit', submitForm);
    }
  }, {
    key: "assignHandlers",
    value: function assignHandlers() {
      this.handleMovieAddForm();
      this.handleMovieDeleteForm();
      this.handleSessionAddForm();
      this.handleSessionDeleteForm();
      this.handleResetButton();
      this.handleSubmitButton();
    }
  }, {
    key: "init",
    value: function init() {
      this.assignHandlers();

      if (this.formDataset) {
        this.fillForm();
      }
    }
  }]);

  return SessionsConfigurator;
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
/*!**************************************!*\
  !*** ./resources/js/admin/script.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_PopupsManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/PopupsManager */ "./resources/js/admin/modules/PopupsManager.js");
/* harmony import */ var _modules_HallsConfigurator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/HallsConfigurator */ "./resources/js/admin/modules/HallsConfigurator.js");
/* harmony import */ var _modules_PricesConfigurator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/PricesConfigurator */ "./resources/js/admin/modules/PricesConfigurator.js");
/* harmony import */ var _modules_SalesController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/SalesController */ "./resources/js/admin/modules/SalesController.js");
/* harmony import */ var _modules_SessionsConfigurator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/SessionsConfigurator */ "./resources/js/admin/modules/SessionsConfigurator.js");




 // delete anchor on scrolling

var deleteAnchor = function deleteAnchor() {
  var href = window.location.href;
  var hashTagIndex = href.indexOf('#');

  if (hashTagIndex !== -1) {
    history.pushState({}, null, '/dashboard');
  }

  window.removeEventListener('scroll', deleteAnchor);
};

window.addEventListener('scroll', deleteAnchor); // accordion

var headers = document.querySelectorAll('.section__header');
headers.forEach(function (header) {
  return header.addEventListener('click', function () {
    header.classList.toggle('section__header_closed');
    header.classList.toggle('section__header_opened');
  });
}); // init popups manager

var popupTriggers = document.querySelectorAll('[data-popup-id]');
var popupsManager = new _modules_PopupsManager__WEBPACK_IMPORTED_MODULE_0__["default"](popupTriggers);
popupsManager.assignHandlers(); // init halls configurator

var hallsConfiguratorForm = document.getElementById('halls-configurator-form');
var chairsTypes = ['disabled', 'standard', 'vip'];
var hallsConfigurator = new _modules_HallsConfigurator__WEBPACK_IMPORTED_MODULE_1__["default"](hallsConfiguratorForm, chairsTypes);
hallsConfigurator.init(); // init prices configurator

var pricesConfiguratorForm = document.getElementById('prices-configurator-form');
var pricesConfigurator = new _modules_PricesConfigurator__WEBPACK_IMPORTED_MODULE_2__["default"](pricesConfiguratorForm);
pricesConfigurator.init(); // init sales controller

var salesControllerForm = document.getElementById('sales-controller-form');
var salesController = new _modules_SalesController__WEBPACK_IMPORTED_MODULE_3__["default"](salesControllerForm);
salesController.init(); // init sessions configurator

var sessionsConfiguratorForm = document.getElementById('sessions-configurator-form');
var movieAddForm = document.getElementById('movie-add-form');
var movieDeleteForm = document.getElementById('movie-delete-form');
var sessionAddForm = document.getElementById('session-add-form');
var sessionDeleteForm = document.getElementById('session-delete-form');
var sessionsConfigurator = new _modules_SessionsConfigurator__WEBPACK_IMPORTED_MODULE_4__["default"](sessionsConfiguratorForm, movieAddForm, movieDeleteForm, sessionAddForm, sessionDeleteForm);
sessionsConfigurator.init();
})();

/******/ })()
;