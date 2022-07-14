export default class HallsConfigurator {
  constructor (hallsConfiguratorForm, chairsTypes) {
    this.form = hallsConfiguratorForm;
    this.chairsTypes = chairsTypes;
    this.formDataset = this.getFormDataset();
    this.selectorsBox = this.form.querySelector('.form__selectors-box');
    this.chairsTypesInput = this.form.querySelector('.chairs-types');
    this.rowsInput = this.form.querySelector('.hall-rows');
    this.chairsInput = this.form.querySelector('.hall-chairs');
    this.hallSchema = this.form.querySelector('.chairs-grid__wrapper');
  }

  getFormDataset() {
    let formDataset = this.form.dataset;
    const isFormDataset = Object
      .keys(this.form.dataset)
      .some(key => key.startsWith('hall'));

    formDataset = Object.fromEntries(
      Object.entries(formDataset)
      .map(([key, val]) => [key, val])
    );

    return isFormDataset ? formDataset : undefined;
  }

  getChairsHTML(chairsTypes) {
    let html = '';

    chairsTypes.forEach(row => {
      html += '<div class="chairs-grid__row">';
      row.forEach(chairType => {
        html += `<span class="chairs-grid__chair chairs-grid__chair_${chairType}"></span>`;
      });
      html += '</div>';
    });

    return html;
  }

  insertChairsGrid(chairsTypes) {
    const html = this.getChairsHTML(chairsTypes);

    this.hallSchema.insertAdjacentHTML('afterbegin', html);
  }

  updateChairsGrid(chairsTypes) {
    while (this.hallSchema.firstChild) {
      this.hallSchema.removeChild(this.hallSchema.firstChild);
    }

    this.insertChairsGrid(chairsTypes);
  }

  fillForm(listItem, isInit = false) {
    const hallDataName = listItem.classList[listItem.classList.length - 1];
    if (typeof this.formDataset[hallDataName] === 'string') {
      this.formDataset[hallDataName] = JSON.parse(this.formDataset[hallDataName]);
    }
    const hallData = this.formDataset[hallDataName];
    const {rows, rowChairs, chairsTypes} = hallData;
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

  handleSelectorsBox() {
    this.selectorsBox.addEventListener('click', ({target}) => {
      const formData = new FormData(this.form);
      const hallName = formData.get('hall_name');

      if (this.formDataset.currentHall !== hallName) {
        this.fillForm(target.closest('li'));

        this.formDataset.currentHall = hallName;
      }
    });
  }

  handleRowsInput() {
    this.rowsInput.addEventListener('change', ({target}) => {
      const oldValue = +target.dataset.oldValue;
      const newValue = +target.value;
      let difference = Math.abs(oldValue - newValue);

      if (oldValue > newValue) {
        for (; difference > 0; difference -= 1) {
          this.hallSchema.lastElementChild.remove();
        }
      } else {
        for (; difference > 0; difference -= 1) {
          const lastRow = this.hallSchema.lastElementChild.cloneNode(true);
          this.hallSchema.appendChild(lastRow);
        }
      }

      target.dataset.oldValue = newValue;
    });
  }

  handleChairsInput() {
    this.chairsInput.addEventListener('change', ({target}) => {
      const oldValue = +target.dataset.oldValue;
      const newValue = +target.value;
      const rows = this.hallSchema.querySelectorAll('.chairs-grid__row');
      let difference = Math.abs(oldValue - newValue);

      if (oldValue > newValue) {
        for (; difference > 0; difference -= 1) {
          rows.forEach(row => {
            row.lastElementChild.remove();
          });
        }
      } else {
        for (; difference > 0; difference -= 1) {
          rows.forEach(row => {
            const lastChair = row.lastElementChild.cloneNode();
            row.appendChild(lastChair);
          });
        }
      }

      target.dataset.oldValue = newValue;
    });
  }

  handleHallSchema() {
    this.hallSchema.addEventListener('click', ({target}) => {
      if (target.matches('.chairs-grid__chair')) {
        const substringIndex = target.className.lastIndexOf('_') + 1;
        const chairType = target.className.substring(substringIndex);
        const chairTypesIndex = chairsTypes.indexOf(chairType);
        const nextChairType = chairsTypes[(chairTypesIndex + 1) % chairsTypes.length];

        target.className = target.className.replace(chairType, nextChairType);
      }
    });
  }

  handleResetButton() {
    this.form.addEventListener('reset', (event) => {
      event.preventDefault();

      this.formDataset.currentHall = '';

      const firstSelector = this.selectorsBox.querySelector('.form__radio');
      firstSelector.checked = true;

      this.fillForm(this.selectorsBox.firstElementChild);
    });
  }

  handleSubmitButton() {
    const submitForm = (event) => {
      event.preventDefault();

      // get chairs types grid
      const rows = this.hallSchema.querySelectorAll('.chairs-grid__row');
      const chosenChairsTypes = [];

      rows.forEach(row => {
        const chairs = row.querySelectorAll('.chairs-grid__chair');
        const rowChairsTypes = [];

        chairs.forEach(chair => {
          const substringIndex = chair.className.lastIndexOf('_') + 1;
          const chairType = chair.className.substring(substringIndex);
          rowChairsTypes.push(chairType);
        });

        chosenChairsTypes.push(rowChairsTypes);
      });

      this.chairsTypesInput.value = JSON.stringify(chosenChairsTypes);

      this.form.removeEventListener('submit', submitForm);

      this.form.submit();
    }

    this.form.addEventListener('submit', submitForm);
  }

  assignHandlers() {
    this.handleSelectorsBox();
    this.handleRowsInput();
    this.handleChairsInput();
    this.handleHallSchema();
    this.handleResetButton();
    this.handleSubmitButton();
  }

  init() {
    if (this.formDataset) {
      this.fillForm(this.selectorsBox.firstElementChild, true);
      this.assignHandlers();
    } else {
      this.rowsInput.classList.add('form__input_disabled');
      this.rowsInput.disabled = true;
      this.chairsInput.classList.add('form__input_disabled');
      this.chairsInput.disabled = true;
      const resetButton = this.form.querySelector('.form__button-reset');
      resetButton.classList.add('form__button_disabled');
      resetButton.disabled = true;
      const submitButton = this.form.querySelector('.form__button-submit');
      submitButton.classList.add('form__button_disabled');
      submitButton.disabled = true;
    }
  }
}
