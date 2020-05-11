let field = document.getElementById('field');
let timer = document.getElementById('timer');
let start = document.getElementById('startGame');
let restart = document.getElementById('newGame');
let el = document.getElementById('numOfBombs');
let array = [];
let cellsArray = [];
let seconds = 0;
let minutes = 0;
let idInterval;

function fillField() {
	for (let i = 0; i < 81; i++) {
		let square = document.createElement('div');
		square.setAttribute('class', 'sapper__sq-front');
		square.setAttribute('id', i);
		field.appendChild(square);
	}
	let count = 0;
	for (let i = 0; i < 9; i++) {
		cellsArray[i] = [];
		for (let j = 0; j < 9; j++) {
			cellsArray[i][j] = {'index': count, 'dangerous': 0};
			count++;
		}
	}
	console.log(cellsArray);
}

function setBombs(numOfBombs) {
	array = [];

	while (array.length != numOfBombs) {
		rand = Math.floor(Math.random() * 82);
		if ( !array.includes(rand) ) {
			array.push(rand);
		}
	}
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if( array.includes(+cellsArray[i][j].index) ) {
				console.log('contain');
				continue;
			}
			// for(let k = 0; k < 8) {

			// }
			// cellsArray[i][j] = {'index': count, 'dangerous': 0};
			// count++;
		}
	}
	console.log(array);
}

function changeClass(e) {
	let target = e.target;
	console.log(+target.getAttribute('id'));

	if( array.includes(+target.getAttribute('id')) ){
		let cells = document.querySelectorAll('div.sapper__sq-front');
		for (let value of cells) {
			if( array.includes(+value.getAttribute('id')) ) {
				let bomb = document.createElement('li');
				bomb.setAttribute('class', 'fas fa-bomb');
				value.appendChild(bomb);
				gameStop();
			}
		}
	}
	else if(target.className == 'sapper__sq-front') {
		target.className = 'sapper__sq-back';
		let id = +target.getAttribute('id');
		console.log(id);
		let checkId = [1, 9, 10, -8, -9, -10, 9, 8, -1];

		let start = 0;
		let end = 9;
		if ( (id+1) % 9 == 0 ) {
			start = 4;
		}
		else if ( (id) % 9 == 0 ) {
			end = 5;
		}
		for(let i = start; i < end; i++) {
			if (!array.includes(id + checkId[i])) {
				let back = document.getElementById(id + checkId[i]);
				back.className = 'sapper__sq-back';
			}
		}
	}
}

function startGame() {
	if( !parseInt(el.value) ) {
		alert('Введите корректное количество бомб!');
		el.value = '';
		el.focus();
		return 0;
	}
	else if( parseInt(el.value) < 10 || parseInt(el.value) > 16) {
		alert('Введите количество бомб от 10 до 16');
		el.value = '';
		el.focus();
		return 0;
	}
	else {
		el.value = parseInt(el.value);
	}

	setBombs(+el.value);
	idInterval = setInterval(updateTimer, 1000);
	field.addEventListener('click', changeClass, false);
	start.removeEventListener('click', startGame, false);
}

function newGame() {
	seconds = 0;
	timer.textContent = 'Time: 00:00';
	numOfBombs.value = '';

	let backs = document.querySelectorAll('div.sapper__sq-back');
	backs.forEach(element => element.className ='sapper__sq-front');

	let bombs = document.querySelectorAll('div.sapper__sq-front');
	for (let value of bombs) {
		let li = document.querySelector('li');
		if( value.contains(li) ) {
			let li = document.querySelector('li');
			value.removeChild(li);
		}
	}

	gameStop();
	el.focus();
	start.addEventListener('click', startGame, false);
}

function gameStop() {
	field.removeEventListener('click', changeClass, false);
	clearInterval(idInterval);
}

function updateTimer() {
	let time;
	seconds++;
	minutes = Math.floor(seconds / 60);
	time = ('0' + minutes).slice(-2, 3) + ':' + ('0'+(seconds - minutes*60)).slice(-2, 3);
	timer.textContent = 'Time: ' + time;
}

document.addEventListener("DOMContentLoaded", newGame);
document.addEventListener("DOMContentLoaded", fillField);
restart.addEventListener('click', newGame, false);