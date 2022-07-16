export default class PricesConfigurator {
  constructor (pricesConfiguratorForm) {
    this.form = pricesConfiguratorForm;
    this.formDataset = this.getFormDataset();
    this.selectorsBox = this.form.querySelector('.form__selectors-box');
    this.standardPriceInput = this.form.querySelector('.standard-price');
    this.vipPriceInput = this.form.querySelector('.vip-price');
    this.resetButton = this.form.querySelector('.form__button-reset');
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

  fillInputs(listItem) {
    const hallDataName = listItem.classList[listItem.classList.length - 1];
    if (typeof this.formDataset[hallDataName] === 'string') {
      this.formDataset[hallDataName] = JSON.parse(this.formDataset[hallDataName]);
    }
    const hallData = this.formDataset[hallDataName];
    this.standardPriceInput.value = hallData.standardPrice;
    this.vipPriceInput.value = hallData.vipPrice;
  }

  handleSelectorsBox() {
    this.selectorsBox.addEventListener('click', ({target}) => {
      const formData = new FormData(this.form);
      const hallName = formData.get('hall_name');

      if (this.formDataset.currentHall !== hallName) {
        this.fillInputs(target.closest('li'));

        this.formDataset.currentHall = hallName;
      }
    });
  }

  handleResetButton() {
    this.form.addEventListener('reset', (event) => {
      event.preventDefault();

      this.selectorsBox.querySelector('input').click();
    });
  }

  assignHandlers() {
    this.handleSelectorsBox();
    this.handleResetButton();
  }

  init () {
    if (this.formDataset) {
      this.fillInputs(this.selectorsBox.firstElementChild);
      this.assignHandlers();
    } else {
      this.standardPriceInput.classList.add('form__input_disabled');
      this.standardPriceInput.disabled = true;
      this.vipPriceInput.classList.add('form__input_disabled');
      this.vipPriceInput.disabled = true;
      const resetButton = this.form.querySelector('.form__button-reset');
      resetButton.classList.add('form__button_disabled');
      resetButton.disabled = true;
      const submitButton = this.form.querySelector('.form__button-submit');
      submitButton.classList.add('form__button_disabled');
      submitButton.disabled = true;
    }
  }
}
