let field = document.getElementById('field');
let timer = document.getElementById('timer');
let start = document.getElementById('startGame');
let restart = document.getElementById('newGame');
let el = document.getElementById('numOfBombs');
let bombsArray = [];
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
}

function setBombs(numOfBombs) {
	bombsArray = [];
	let count = 0;
	while (bombsArray.length != numOfBombs) {
		rand = Math.floor(Math.random() * 82);
		if ( !bombsArray.includes(rand) ) {
			bombsArray.push(rand);
		}
	}
	for (let i = 0; i < 9; i++) {
		cellsArray[i] = [];
		for (let j = 0; j < 9; j++) {
			cellsArray[i][j] = {'index': count, 'dangerous': 0};
			count++;
		}
	}
	count = 0;
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			count = 0;
			if( bombsArray.includes(+cellsArray[i][j].index) ) {
				continue;
			}
			for(let k = i - 1; k < i + 2; k++) {
				for(let l = j - 1; l < j + 2; l++) {
					try{
						if(k == i && l == j){
							continue;
						}
						else if( bombsArray.includes(+cellsArray[k][l].index) ){
							count++;
						}
					}
					catch(e){};
				}
			}
			cellsArray[i][j].dangerous = +count;
		}
	}
}

function changeClass(e) {
	let target = e.target;

	if( bombsArray.includes(+target.getAttribute('id')) ){
		let cells = document.querySelectorAll('div.sapper__sq-front');
		for (let value of cells) {
			if( bombsArray.includes(+value.getAttribute('id')) ) {
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
		showNumbers(id);
	}
}
function showNumbers(id) {
	let i = Math.floor(id / 9);
	let j = id % 9;
	for(let k = i - 1; k < i + 2; k++) {
		for(let l = j - 1; l < j + 2; l++) {
			try{
				if(k == i && l == j){
					continue;
				}
				else if( !bombsArray.includes(+cellsArray[k][l].index) ){
					let back = document.getElementById(+cellsArray[k][l].index);
					if(!back.hasChildNodes() ) {
						back.className = 'sapper__sq-back';
						let p = document.createElement('p');
						try{
							let text = document.createTextNode(+cellsArray[k][l].dangerous);
							if( !(+cellsArray[k][l].dangerous == 0) ){
								p.appendChild(text);
								p.setAttribute('id',+cellsArray[k][l].index+'a')
								back.appendChild(p);
							}
						}
						catch(e){};
					}
				}
			}
			catch(e){
			};
		}
	}
}
function hideNumbers(){
	for (let i = 0; i < 81; i++) {
		let square = document.getElementById(i);
		if(square.hasChildNodes()) {
			let p = document.getElementById(i+'a');
			square.removeChild(p);
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
	hideNumbers();
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
	hideNumbers();
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

document.addEventListener("DOMContentLoaded", fillField);
document.addEventListener("DOMContentLoaded", newGame);
restart.addEventListener('click', newGame, false);