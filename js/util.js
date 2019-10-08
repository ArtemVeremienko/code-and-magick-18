// util.js
'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

  var userDialog = document.querySelector('.setup');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  // Экспорт нужных данных
  window.util = {
    WIZARD_NAMES,
    WIZARD_SURNAME,
    WIZARD_EYES_COLOR,
    WIZARD_COAT_COLOR,
    getRandomElement: function (array) { // Получение случайного элемента из массива
      return array[Math.floor(array.length * Math.random())];
    },
  };



  var createWizard = function (name, surname, coatColor, eyesColor) {
    name = window.util.getRandomElement(name) + ' ' + window.util.getRandomElement(surname);
    coatColor = window.util.getRandomElement(coatColor);
    eyesColor = window.util.getRandomElement(eyesColor);

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
})();
