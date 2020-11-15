let field = document.querySelector('#field');
let timer = document.querySelector('#timer');
let startBtn = document.querySelector('#startGame');
let restarsBtn = document.querySelector('#newGame');
let bombsNum = document.querySelector('#numOfBombs');
let tiles;
let bombsArray = [];
let bombsMap = [];
let seconds = 0;
let minutes = 0;
let idInterval;

function fillField() {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			let square = document.createElement('div');
			square.setAttribute('class', 'saper__sq');
			square.setAttribute('id', i + '_' + j);
			field.appendChild(square);
		}
	}
	tiles = document.querySelectorAll('.saper__sq');
}

function setBombs(numOfBombs) {
	let count = 0;
	let pos = 0;
	bombsArray = [];
	bombsMap = [];

	while (bombsArray.length != numOfBombs) {
		rand = Math.floor(Math.random() * 81);
		pos = Math.floor(rand / 9) + '_' + rand % 9;
		if (!bombsArray.includes(pos)) {
			bombsArray.push(pos);
		}
	}

	for (let i = 0; i < 9; i++) {
		bombsMap[i] = [];
		for (let j = 0; j < 9; j++) {
			count = 0;
			for (let k = i - 1; k < i + 2; k++) {
				for (let l = j - 1; l < j + 2; l++) {
					try {
						if (k == i && l == j) {
							continue;
						}
						else if (bombsArray.includes(k + '_' + l)) {
							count++;
						}
					}
					catch (e) { };
				}
			}
			bombsMap[i][j] = count;
		}
	}
}

function openTile() {
	if (bombsArray.includes(this.getAttribute('id'))) {
		for (let bombsItem of bombsArray) {
			let bombCell = document.getElementById(bombsItem);
			bombCell.classList.add('bomb');
		}
		gameStop();
	}
	else {
		propogateOpening(this);
	}

	let count = document.querySelectorAll('.saper__sq_back');

	if (count.length === (81 - bombsNum.value)) {
		for (let bombsItem of bombsArray) {
			let bombCell = document.getElementById(bombsItem);
			bombCell.classList.add('bomb');
		}
		let time = timer.textContent.slice(-5);
		alert('Победа! Вы справились за ' + time);
		gameStop();
	}
}

function propogateOpening(target) {
	target.classList.add('saper__sq_back');
	let id = target.getAttribute('id');
	let i = +id.substring(0, 1);
	let j = +id.substring(2, 3);
	target.removeEventListener('click', openTile, false);

	if (bombsMap[i][j] > 0) {
		let p = document.createElement('p');
		let text = document.createTextNode(bombsMap[i][j]);
		p.appendChild(text);
		target.appendChild(p);
		return;
	}
	else {
		for (let k = i - 1; k < i + 2; k++) {
			for (let l = j - 1; l < j + 2; l++) {
				try {
					let tile = document.getElementById(k + '_' + l);

					if (tile.classList.contains('saper__sq_back')) {
						continue;
					}
					propogateOpening(tile);
				}
				catch (e) { }
			}
		}
	}
}

function startGame() {
	if (!parseInt(bombsNum.value)) {
		alert('Введите корректное количество бомб!');
		bombsNum.value = '';
		bombsNum.focus();
		return 0;
	}
	else if (parseInt(bombsNum.value) < 10 || parseInt(bombsNum.value) > 16) {
		alert('Введите количество бомб от 10 до 16');
		bombsNum.value = '';
		bombsNum.focus();
		return 0;
	}
	else {
		bombsNum.value = parseInt(bombsNum.value);
	}

	setBombs(+bombsNum.value);
	idInterval = setInterval(updateTimer, 1000);
	tiles.forEach(tile => tile.addEventListener('click', openTile, false));
	startBtn.removeEventListener('click', startGame, false);
}

function newGame() {
	seconds = 0;
	timer.textContent = 'Time: 00:00';
	bombsNum.value = '';

	tiles.forEach(item => item.className = 'saper__sq');
	tiles.forEach(item => item.innerHTML = '');

	gameStop();
	bombsNum.focus();
	startBtn.addEventListener('click', startGame, false);
}

function gameStop() {
	tiles.forEach(tile => tile.removeEventListener('click', openTile, false));
	clearInterval(idInterval);
}

function updateTimer() {
	let time;
	seconds++;
	minutes = Math.floor(seconds / 60);
	time = ('0' + minutes).slice(-2, 3) + ':' + ('0' + (seconds - minutes * 60)).slice(-2, 3);
	timer.textContent = 'Time: ' + time;
}

document.addEventListener("DOMContentLoaded", fillField);
document.addEventListener("DOMContentLoaded", newGame);
restarsBtn.addEventListener('click', newGame, false);