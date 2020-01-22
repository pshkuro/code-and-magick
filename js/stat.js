'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 15;
var FONT_GAP = 15; // междустрочный интервал
var HELLO_HEIGHT = 50; // высота блока верхнего текста
var TEXT_HEIGHT = 20; // высота текста
// var HISTO_HEIGHT = 150; // высота гистограммы
var barHeight = CLOUD_HEIGHT - GAP - HELLO_HEIGHT - TEXT_HEIGHT - TEXT_HEIGHT - GAP; // высота колонки
var BAR_WIDTH = 40; // ширина колонки
var BAR_GAP = 50; // расстояние между колонками

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var calculateAvailableSpace = function (maxHeight, time, maxTime) {
  return (maxHeight - (maxHeight * time / maxTime));
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP * 2 + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var k = 0; k < times.length; k++) {
    ctx.fillText(Math.round(times[k]), CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * k, CLOUD_Y + GAP + HELLO_HEIGHT);
  }

  for (var i = 0; i < players.length; i++) {
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'blue';
    }

    ctx.fillText(players[i], CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + GAP + HELLO_HEIGHT + TEXT_HEIGHT + barHeight + TEXT_HEIGHT);
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + HELLO_HEIGHT + TEXT_HEIGHT + (barHeight - (barHeight * times[i] / maxTime)), BAR_WIDTH, (barHeight * times[i] / maxTime));
  }


};

