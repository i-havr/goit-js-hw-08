import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  const formData = {
    email: refs.email.value,
    message: refs.message.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  if (refs.email.value === '' || refs.message.value === '') {
    alert('Please fill in all the fields!');
  } else {
    event.preventDefault();

    const currentDataObject = {
      email: refs.email.value,
      message: refs.message.value,
    };
    console.log(currentDataObject);
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}

function fillForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData) {
    refs.email.value = savedData.email;
    refs.message.value = savedData.message;
  }
}

fillForm();
