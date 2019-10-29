// dialog.js
'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  // 1.  Открытие/закрытие окна настройки персонажа:
  // -  Окно.setup должно открываться по нажатию на блок.setup-open.
  // Открытие окна производится удалением класса hidden у блока
  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');

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
    setup.removeAttribute('style');
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

  // Добавить возможность передвигать диалог редактирования персонажа по экрану
  // Реализовать возможность добавления предметов из магазина в инвентарь
  var dialogHandler = setup.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtDrag) {
          evtDrag.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };

        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
