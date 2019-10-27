'use strict';

(function () {
  var FIREBALL_BACKGROUND = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var setupWizard = setup.querySelector('.setup-wizard-appearance');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupInputWizardCoat = setupWizard.querySelector('input[name=coat-color]');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupInputWizardEyes = setupWizard.querySelector('input[name=eyes-color]');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');
  var setupInputFireball = setupFireball.querySelector('input[name=fireball-color]');

  // 3. Изменение цвета мантии персонажа по нажатию. Цвет мантии setup-wizard-appearance
  // .wizard-coat должен обновляться по нажатию на неё. Цвет мантии задаётся через
  // изменение инлайнового CSS-свойства fill для элемента.

  // Случайно изменяем цвет (с массива) переданного элемента itemName + передаём его значение в inputName
  var setWizardColor = function (arrayOfVariables, itemName, inputName) {
    var randomItem = window.util.getRandomElement(arrayOfVariables);
    inputName.value = randomItem;
    if (itemName.tagName.toLowerCase() === 'div') { // в фаерболе меняем цвет background вместо fill
      itemName.style.backgroundColor = randomItem;
    } else {
      itemName.style.fill = randomItem;
    }
  };

  // Запоминаю текущий выбранный цвет куртки или глаз, при его смене
  var coatColor;
  var eyesColor;

  setupWizardCoat.addEventListener('click', function () {
    setWizardColor(coatColor = window.util.WIZARD_COAT_COLOR, setupWizardCoat, setupInputWizardCoat);
  });

  // 4.  Изменение цвета глаз персонажа по нажатию. Цвет глаз волшебника
  // меняется по нажатию на блок .setup-wizard .wizard-eyes.
  setupWizardEyes.addEventListener('click', function () {
    setWizardColor(window.util.WIZARD_EYES_COLOR, setupWizardEyes, setupInputWizardEyes);
  });

  // 5.  Изменение цвета фаерболов по нажатию. Цвет задаётся через
  // изменение фона у блока .setup-fireball-wrap.
  setupFireball.addEventListener('click', function () {
    setWizardColor(FIREBALL_BACKGROUND, setupFireball, setupInputFireball);
  });


  var wizards = [];

  var successHandler = function (data) {
    wizards = data;
    window.render(wizards);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
})();


