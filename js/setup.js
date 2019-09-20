'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');


var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Получение случайного элемента из массива
var getRandomElement = function (array) {
  var randomElement = array[Math.floor(array.length * Math.random())];
  return randomElement;
};

var createWizard = function (name, surname, coatColor, eyesColor) {
  name = getRandomElement(name) + ' ' + getRandomElement(surname);
  coatColor = getRandomElement(coatColor);
  eyesColor = getRandomElement(eyesColor);

  var wizard = {
    name: name,
    coatColor: coatColor,
    eyesColor: eyesColor
  };

  return wizard;
};

var wizards = [];

for (var i = 0; i < 4; i++) {
  wizards.push(createWizard(WIZARD_NAMES, WIZARD_SURNAME, WIZARD_COAT_COLOR, WIZARD_EYES_COLOR));
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');


// 1.  Открытие/закрытие окна настройки персонажа:
// -  Окно.setup должно открываться по нажатию на блок.setup-open.
// Открытие окна производится удалением класса hidden у блока
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupWizard = setup.querySelector('.setup-wizard-appearance');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== userNameInput) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};
// Добавить обработчики для альтернативного ввода с
// клавиатуры keydown для кнопок открытия/закрытия диалога настройки персонажа:
setupOpen.addEventListener('click', function () {
  openPopup();
});
// 3.  Когда иконка пользователя в фокусе .setup-open-icon, то окно
// настройки персонажа должно открываться по нажатию кнопки ENTER
// Не забудьте добавить tabindex="0" для иконки пользователя, чтобы
// она фокусировалась.
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});
// -  Окно.setup должно закрываться по нажатию на элемент.setup-close,
// расположенный внутри окна. Нажатие на элемент .setup-close, расположенный
// внутри блока setup возвращает ему класс hidden.
setupClose.addEventListener('click', function () {
  closePopup();
});

// 4.  Когда окно настройки персонажа открыто, нажатие на
// клавишу ESC должно закрывать диалог
// Если фокус находится на форме ввода имени, то окно закрываться
// не должно.
// 5.  Если окно открыто и фокус находится на кнопке закрытия окна, то
// нажатие клавиши ENTERдолжно приводить к закрытию диалога
// 6.  Если диалог открыт, нажатие на кнопку «Сохранить» приводит к
// отправке формы
// 7.  Если диалог открыт и фокус находится на кнопке «Сохранить»,
// нажатие на ENTER приводит к отправке формы
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// 2.  Валидация ввода имени персонажа. Имя персонажа вводится в
// поле .setup-user-name. Добавьте следующие ограничения:
// -  имя персонажа не может содержать менее 2 символов;
// -  максимальная длина имени персонажа — 25 символов.
// Перевод ошибки на русский язык

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

// 3. Изменение цвета мантии персонажа по нажатию. Цвет мантии setup-wizard-appearance
// .wizard-coat должен обновляться по нажатию на неё. Цвет мантии задаётся через
// изменение инлайнового CSS-свойства fill для элемента.
setupWizardCoat.addEventListener('click', function () {
  setupWizardCoat.style.fill = getRandomElement(WIZARD_COAT_COLOR);
});
