'use strict';

(function () {
  var wizards = [];

  // Запоминаю текущий выбранный цвет куртки или глаз, при его смене
  var coatColor;
  var eyesColor;

  // Система отличности одного мага от другого
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  // Сортировка магов по имени (в случае когда ранк магов одинаков)
  var namesComparator = function (leftName, rightName) {
    if (leftName > rightName) {
      return 1;
    } else if (leftName < rightName) {
      return -1;
    } else {
      return 0;
    }
  };

  var wizardsComparator = function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    return rankDiff === 0 ? namesComparator(left.name, right.name) : rankDiff;
  };

  var updateFilter = function () {
    window.render(wizards.sort(wizardsComparator));
  };

  window.wizard.onCoatChange = function (color) {
    coatColor = color;
    updateFilter();
  };

  window.wizard.onEyesChange = function (color) {
    eyesColor = color;
    updateFilter();
  };

  var successHandler = function (data) {
    wizards = data;
    updateFilter();
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


