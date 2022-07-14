export default class SessionFormHandler {
  constructor (sessionForm) {
    this.form = sessionForm;
    this.formDataset = this.getFormDataset();
    this.hallSchema = this.form.querySelector('.chairs-grid__wrapper');
    this.standardPrice = this.form.querySelector('span.chairs-grid__chair_standard').nextElementSibling;
    this.vipPrice = this.form.querySelector('span.chairs-grid__chair_vip').nextElementSibling;
    this.formInput = this.form.querySelector('.data');
    this.submitButton = this.form.querySelector('.form__button-submit');
  }

  getFormDataset() {
    let formDataset = this.form.dataset;
    const isFormDataset = formDataset.hasOwnProperty('hall') && formDataset.hall.length;

    if (isFormDataset) {
      formDataset = JSON.parse(formDataset.hall);
      formDataset = Object.fromEntries(
        Object.entries(formDataset)
        .map(([key, val]) => [key, val])
      );
      formDataset.chairsTypes = JSON.parse(formDataset.chairsTypes);
      return formDataset;
    } else {
      return undefined;
    }
  }

  isAvailableChairs() {
    const chairsTypes = this.formDataset.chairsTypes.flat();
    return chairsTypes.includes('standard') || chairsTypes.includes('vip');
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

  handleHallSchema() {
    this.hallSchema.addEventListener('click', ({target}) => {
      if (
        target.matches('.chairs-grid__chair_standard')
        || target.matches('.chairs-grid__chair_vip')
      ) {
        target.classList.toggle('chairs-grid__chair_selected');
      }
    });
  }

  handleSubmitButton() {
    const submitForm = (event) => {
      event.preventDefault();

      // get chairs types grid
      const rows = this.hallSchema.querySelectorAll('.chairs-grid__row');
      const chairsTypes = [];
      const chosenChairs = [];
      let totalPrice = 0;

      rows.forEach((row, rowIndex) => {
        const chairs = row.querySelectorAll('.chairs-grid__chair');
        const rowChairsTypes = [];

        chairs.forEach((chair, chairIndex) => {
          const substringIndex = chair.className.lastIndexOf('_') + 1;
          let chairType = chair.className.substring(substringIndex);
          if (chairType === 'selected') {
            chosenChairs.push({row: rowIndex + 1, chair: chairIndex + 1})
            chairType = 'taken';

            if (chair.classList.contains('chairs-grid__chair_standard')) {
              totalPrice += this.formDataset.standardPrice;
            } else if (chair.classList.contains('chairs-grid__chair_vip')) {
              totalPrice += this.formDataset.vipPrice;
            }
          }
          rowChairsTypes.push(chairType);
        });

        chairsTypes.push(rowChairsTypes);
      });

      if (chosenChairs.length === 0) {
        this.submitButton.value = 'выберите место';
        this.submitButton.classList.add('form__button-submit_disabled');
        this.submitButton.disabled = true;

        setTimeout(() => {
          this.submitButton.value = 'забронировать';
          this.submitButton.classList.remove('form__button-submit_disabled');
          this.submitButton.disabled = false;
        }, 1000);
      }

      const URLParams = new URLSearchParams(window.location.search);

      this.formInput.value = JSON.stringify(
        {
          'chairs_types': JSON.stringify(chairsTypes),
          'taken_chairs': JSON.stringify(chosenChairs),
          'total_price': totalPrice,
          'session_id': URLParams.get('id'),
          'timestamp': URLParams.get('timestamp'),
        }
      );

      this.form.removeEventListener('submit', submitForm);

      this.form.submit();
    }

    this.form.addEventListener('submit', submitForm);
  }

  assignHandlers() {
    this.handleHallSchema();
    this.handleSubmitButton();
  }

  init() {
    if (this.formDataset && this.isAvailableChairs()) {
      this.insertChairsGrid(this.formDataset.chairsTypes);
      this.standardPrice.innerText = this.formDataset.standardPrice;
      this.vipPrice.innerText = this.formDataset.vipPrice;
      this.assignHandlers();
    } else {
      this.hallSchema.classList.add('chairs-grid__wrapper_unavailable');
      const submitButton = this.form.querySelector('.form__button-submit');
      submitButton.classList.add('form__button-submit_disabled');
      submitButton.disabled = true;
    }
  }
}
