let field = document.getElementById('field');
let timer = document.getElementById('timer');
let start = document.getElementById('startGame');
let restart = document.getElementById('newGame');
let el = document.getElementById('numOfBombs');
let array = [];
let seconds = 0;
let minutes = 0;
let idInterval;

for (let i = 0; i < 81; i++) {
	let square = document.createElement('div');
	square.setAttribute('class', 'sapper__sq');
	square.setAttribute('id', i);
	field.appendChild(square);
}

function setBombs(numOfBombs) {
	array = [];

	while (array.length != numOfBombs) {
		rand = Math.floor(Math.random() * 82);
		if ( !array.includes(rand) ) {
			array.push(rand);
		}
	}
	console.log(array);
}

function changeClass(e) {
	let target = e.target;
	console.log(+target.getAttribute('id'));

	if( array.includes(+target.getAttribute('id')) ){
		let cells = document.querySelectorAll('div.sapper__sq');
		for (let value of cells) {
			if( array.includes(+value.getAttribute('id')) ) {
				let bomb = document.createElement('li');
				bomb.setAttribute('class', 'fas fa-bomb');
				value.appendChild(bomb);
				gameStop();
			}
		}
	}
	else if(target.className == 'sapper__sq') {
		target.className = 'sapper__sq-back';
		let id = +target.getAttribute('id');
		console.log(id);
		let checkId = [1, 9, 10, -8, -9, -10, 9, 8, -1];
		//-1, -10, -9, 8, 9
		//1, -8, -9, 9, 10
		//1, 9, 10, -10, -9, 9, 8, -1
		let start = 0;
		let end = 9;
		if ( (id+1) % 9 == 0 ) {
			start = 4;
		}
		else if ( (id) % 9 == 0 ) {
			end = 5;
		}
		for(let i = start; i < end; i++) {
			if (!array.includes(id + checkId[i]) && id + checkId[i] > -1 && id + checkId[i] < 81) {
				let el = document.getElementById(id + checkId[i]);
				el.className = 'sapper__sq-back';
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
}

function newGame() {
	seconds = 0;
	timer.textContent = 'Time: 00:00';
	numOfBombs.value = '';

	let backs = document.querySelectorAll('div.sapper__sq-back');
	backs.forEach(element => element.className ='sapper__sq');

	let bombs = document.querySelectorAll('div.sapper__sq');
	for (let value of bombs) {
		let li = document.querySelector('li');
		if( value.contains(li) ) {
			let li = document.querySelector('li');
			value.removeChild(li);
		}
	}
	gameStop();
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

start.addEventListener('click', startGame, false);
restart.addEventListener('click', newGame, false);