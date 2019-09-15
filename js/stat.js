'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GRAPH_Y = 80;
var GAP = 10;
var FONT_GAP = 15;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

// Рисование облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Поиск максимального элемента в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  // Тень под облаком статистики
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  // Облако статистики
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // ==========
  // Гистограма
  // ==========
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2.5 + FONT_GAP);

  // Поиск максимального времени
  var maxTime = getMaxElement(times);

  // Возвращаю baseline по умолчанию
  ctx.textBaseline = 'alphabetic';

  for (var i = 0; i < names.length; i++) {
    //   MAX_BAR       BAR[i]
    // ------------ = --------
    //  BAR_HEIGHT        X

    // X = (BAR_HEIGHT * BAR[i]) / MAX_BAR

    var bar = (BAR_HEIGHT * times[i] / maxTime); // текущее значение столбца гистограмы
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + GRAPH_Y + (BAR_HEIGHT - bar));

    // Столбец игрока красным цветом, остальные синим с разной насыщенностью
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturation = 100 * Math.random();
      ctx.fillStyle = 'hsla(240,' + saturation + '%, 50%, 1)';
    }

    ctx.translate(0, (BAR_HEIGHT - bar));
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + GRAPH_Y + GAP, BAR_WIDTH, bar);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset current transformation matrix to the identity matrix
  }

};
