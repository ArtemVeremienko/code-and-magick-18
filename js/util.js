// util.js
'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

  var userDialog = document.querySelector('.setup');


  // Получение случайного элемента из массива
  var getRandomElement = function (array) {
    return array[Math.floor(array.length * Math.random())];
  };
  // Удаление случайного элемента из массива и возврат его
  var getDeleteElement = function (array) {
    var random = Math.floor(array.length * Math.random());
    return array.splice(random, 1)[0];
  };
  // Экспорт нужных данных
  window.util = {
    WIZARD_NAMES,
    WIZARD_SURNAME,
    WIZARD_EYES_COLOR,
    WIZARD_COAT_COLOR,
    getRandomElement
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

  var form = userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  })
})();
