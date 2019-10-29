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

  // // Объект с событиями изменениями цвета плаща и глаз
  var wizard = {
    onEyesChange: function (color) {
      return color;
    },
    onCoatChange: function (color) {
      return color;
    }
  };

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

    return randomItem;
  };

  setupWizardCoat.addEventListener('click', function () {
    var newColor = setWizardColor(window.util.WIZARD_COAT_COLOR, setupWizardCoat, setupInputWizardCoat);
    wizard.onCoatChange(newColor);
  });

  // 4.  Изменение цвета глаз персонажа по нажатию. Цвет глаз волшебника
  // меняется по нажатию на блок .setup-wizard .wizard-eyes.
  setupWizardEyes.addEventListener('click', function () {
    var newColor = setWizardColor(window.util.WIZARD_EYES_COLOR, setupWizardEyes, setupInputWizardEyes);
    wizard.onEyesChange(newColor);
  });

  // 5.  Изменение цвета фаерболов по нажатию. Цвет задаётся через
  // изменение фона у блока .setup-fireball-wrap.
  setupFireball.addEventListener('click', function () {
    setWizardColor(FIREBALL_BACKGROUND, setupFireball, setupInputFireball);
  });

  window.wizard = wizard;
})();
