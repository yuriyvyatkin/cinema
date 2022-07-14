export default class SalesController {
  constructor (salesConfiguratorForm) {
    this.form = salesConfiguratorForm;
    this.formDataset = this.getFormDataset();
    this.selectorsBox = this.form.querySelector('.form__selectors-box');
    this.salesState = this.form.querySelector('.sales-state');
    this.hint = this.form.querySelector('.hint');
    this.submitButton = this.form.querySelector('.form__button-submit');
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

  fillForm(listItem) {
    const hallDataName = listItem.classList[listItem.classList.length - 1];
    if (typeof this.formDataset[hallDataName] === 'string') {
      this.formDataset[hallDataName] = JSON.parse(this.formDataset[hallDataName]);
    }
    const hallData = this.formDataset[hallDataName];
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

  handleSubmitButton() {
    const submitForm = (event) => {
      event.preventDefault();

      if (this.submitButton.classList.contains('form__button_disabled')) {
        return;
      }

      this.form.removeEventListener('submit', submitForm);

      this.form.submit();
    };

    this.form.addEventListener('submit', submitForm);
  }

  assignHandlers() {
    this.handleSelectorsBox();
    this.handleSubmitButton();
  }

  init () {
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
}
