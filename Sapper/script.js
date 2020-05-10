let field = document.getElementById('field');
let scoreField = document.getElementById('score');
let start = document.getElementById('startGame');
let restart = document.getElementById('newGame');
let el = document.getElementById('numOfBombs');
let array = [];
let score = 0;

for (let i = 0; i < 324; i++) {
	let square = document.createElement('div');
	square.setAttribute('class', 'sapper__sq');
	square.setAttribute('id', i);
	field.appendChild(square);
}

function setBombs(numOfBombs) {
	array = [];

	while (array.length != numOfBombs) {
		rand = Math.floor(Math.random() * 325);
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
		target.className += ' bomb';
		let bombs = document.querySelectorAll('div.sapper__sq');
		for (let value of bombs) {
			if( array.includes(+value.getAttribute('id')) ) {
				let bomb = document.createElement('li');
				bomb.setAttribute('class', 'fas fa-bomb');
				value.appendChild(bomb);
			}
		}
		return 0;
	}

	target.classList.toggle('sapper__sq-back');
	score++;
	scoreField.textContent = 'Score: ' + score;
}

function startGame() {
	console.log(parseInt(el.value));

	if( !parseInt(el.value) ) {
		alert('Введите корректное количество бомб!');
		el.value = '';
		el.focus();
		return 0;
	}
	else if( parseInt(el.value) < 10 || parseInt(el.value) > 20) {
		alert('Введите количество бомб от 10 до 20');
		el.value = '';
		el.focus();
		return 0;
	}
	else {
		el.value = parseInt(el.value);
	}
	setBombs(+el.value);
	field.addEventListener('click', changeClass, false);
}

function newGame() {
	score = 0;
	scoreField.textContent = 'Score: ' + score;
	numOfBombs.value = '';
	field.removeEventListener('click', changeClass, false);

	let bombs = document.querySelectorAll('div.sapper__sq');
	for (let value of bombs) {
		value.className = 'sapper__sq';
		let li = document.querySelector('li');
		if( value.contains(li) ) {
				let li = document.querySelector('li');
				value.removeChild(li);
			}
	}
}

start.addEventListener('click', startGame, false);
restart.addEventListener('click', newGame, false);