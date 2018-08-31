var ul = document.getElementsByTagName('ul')[0];
var li = document.getElementsByTagName('li');
var begin = document.getElementsByTagName('div')[0];
var end = document.getElementsByTagName('div')[1];
var loc = 0;
var food = {
	x : null,
	y : null
};
var growPos = {
	x : null,
	y : null
};
var act = 38;
var snake = {
	length : 5,
	posX : [20, 20, 20, 20, 20],
	posY : [20, 21, 22, 23, 24]
}
var timer ;
function coordinateToNum (x, y) {
	return (x + (y - 1) * 40) - 1;
}
function numTocoordinate (num) {
	return {
		x : num % 40 + 1,
		y : parseInt(num / 40) + 1
	}
}
function showChange() {
	for(var i = 0; i < snake.length; i ++) {
		loc = coordinateToNum(snake.posX[i], snake.posY[i]);
		li[loc].className = 'snake-head';
	}
	loc = coordinateToNum(snake.posX[0], snake.posY[0]);
}
showChange();
timer = setInterval(function (e) {
	autoHeadMove();
}, 300);
clearInterval(timer);
function autoHeadMove() {
	var morefood, posX, posY;
	morefood = false;
	posX = numTocoordinate(loc).x;
	posY = numTocoordinate(loc).y;
	switch(act) {
		case 38 :
			if(isDeath(posX, posY - 1)) {
				loc = coordinateToNum(posX, posY - 1);
				followMove();
				snake.posX[0] = numTocoordinate(loc).x;
				snake.posY[0] = numTocoordinate(loc).y;
				morefood = getLong();
				if(morefood == true) {
					createFood();
				}
				showChange();
			}else{
				gameEnd();
			}
			break;
		case 39 :
			if(isDeath(posX + 1, posY)) {
				loc = coordinateToNum(posX + 1, posY);
				followMove();
				snake.posX[0] = numTocoordinate(loc).x;
				snake.posY[0] = numTocoordinate(loc).y;
				morefood = getLong();
				if(morefood == true) {
					createFood();
				}
				showChange();
			}else{
				gameEnd();
			}
			break;
		case 40 :
			if(isDeath(posX, posY + 1)) {
				loc = coordinateToNum(posX, posY + 1);
				followMove();
				snake.posX[0] = numTocoordinate(loc).x;
				snake.posY[0] = numTocoordinate(loc).y;
				morefood = getLong();
				if(morefood == true) {
					createFood();
				}
				showChange();
			}else{
				gameEnd();
			}
			break;
		case 37 :
			if(isDeath(posX - 1, posY)) {
				loc = coordinateToNum(posX - 1, posY);
				followMove();
				snake.posX[0] = numTocoordinate(loc).x;
				snake.posY[0] = numTocoordinate(loc).y;
				morefood = getLong();
				if(morefood == true) {
					createFood();
				}
				showChange();
			}else{
				gameEnd();
			}
			break;
	}
}
function headMove(e) {
	var morefood, posX, posY;
	morefood = false;
	posX = numTocoordinate(loc).x;
	posY = numTocoordinate(loc).y;
	switch(e.which) {
		case 38 :
			if(isDeath(posX, posY - 1)) {
				act = 38;
				loc = coordinateToNum(posX, posY - 1);
				followMove();
				snake.posX[0] = numTocoordinate(loc).x;
				snake.posY[0] = numTocoordinate(loc).y;
				morefood = getLong();
				if(morefood == true) {
					createFood();
				}
				showChange();
			}else{
				gameEnd();
			}
			break;
		case 39 :
			if(isDeath(posX + 1, posY)) {
				act = 39;
				loc = coordinateToNum(posX + 1, posY);
				followMove();
				snake.posX[0] = numTocoordinate(loc).x;
				snake.posY[0] = numTocoordinate(loc).y;
				morefood = getLong();
				if(morefood == true) {
					createFood();
				}
				showChange();
			}else{
				gameEnd();
			}
			break;
		case 40 :
			if(isDeath(posX, posY + 1)) {
				act = 40;
				loc = coordinateToNum(posX, posY + 1);
				followMove();
				snake.posX[0] = numTocoordinate(loc).x;
				snake.posY[0] = numTocoordinate(loc).y;
				morefood = getLong();
				if(morefood == true) {
					createFood();
				}
				showChange();
			}else{
				gameEnd();
			}
			break;
		case 37 :
			if(isDeath(posX - 1, posY)) {
				act = 37;
				loc = coordinateToNum(posX - 1, posY);
				followMove();
				snake.posX[0] = numTocoordinate(loc).x;
				snake.posY[0] = numTocoordinate(loc).y;
				morefood = getLong();
				if(morefood == true) {
					createFood();
				}
				showChange();
			}else{
				gameEnd();
			}
			break;
	}
}
function followMove () {
	var reSnake = {};
	deepclone(snake, reSnake);
	for(var i = 1; i < snake.length; i ++) {
		snake.posX[i] = reSnake.posX[i - 1];
		snake.posY[i] = reSnake.posY[i - 1];
	}
	li[coordinateToNum(reSnake.posX[snake.length - 1], reSnake.posY[snake.length - 1])].className = 'block';
	growPos.x = reSnake.posX[snake.length - 1];
	growPos.y = reSnake.posY[snake.length - 1];
}
function isBodyCoincideFood () {
	var num = 0;
	num = Math.floor(Math.random() * 1600);
	for(var i = 0; i < snake.length; i ++) {
		if(numTocoordinate(num).x == snake.posX[i] && numTocoordinate(num).y == snake.posY[i]) {
			return {
				x : -1,
				y : -1
			};
		}
	}
	return {
		x : numTocoordinate(num).x,
		y : numTocoordinate(num).y
	};
}
function createFood () {
	var pos;
	pos = isBodyCoincideFood();
	while(pos.x == -1 && pos.y == -1) {
		pos = isBodyCoincideFood();
	}
	li[coordinateToNum(pos.x, pos.y)].className = 'food';
	food.x = pos.x;
	food.y = pos.y;
}
createFood();
function getLong () {
	if(snake.posX[0] == food.x && snake.posY[0] == food.y) {
		snake.posX.push(growPos.x);
		snake.posY.push(growPos.y);
		snake.length ++ ;
		return true;
	}
	return false;
}
function isDeath (x, y) {
	for(var i = 0; i < snake.length; i ++) {
		if(x == snake.posX[i] && y == snake.posY[i]) {
			return false;
		}
	}
	if(x > 40 || x < 1 || y > 40 || y < 1) {
		return false;
	}
	return true;
}
function gameBegin() {
	addEvent(document, 'keydown', headMove);
	timer = setInterval(function (e) {
		autoHeadMove();
	}, 300);
}
function gameEnd() {
	alert('Your snake died !');
	clearInterval(timer);
	removeEvent(document, 'keydown', headMove);
	window.location.reload();
}
addEvent(begin, 'click', gameBegin);
addEvent(end, 'click', gameEnd);