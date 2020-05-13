function addNote() {
	let text = document.getElementById('task-list__input').value;

	if(text.length > 0){
		let newP = document.createElement('p');
		let newText = document.createTextNode(text);
		newP.appendChild(newText);

		let newInput = document.createElement('input');
		newInput.setAttribute('type', 'button');
		newInput.setAttribute('class', 'task-list__button-remove');
		newInput.setAttribute('value', 'x');

		let newLi = document.createElement('li');
		newLi.appendChild(newP);
		newLi.appendChild(newInput);

		let list = document.querySelector('ul');
		list.appendChild(newLi);

		document.getElementById('task-list__input').value = '';
		document.getElementById('task-list__input').focus();
	}
}

function removeItem(e) {
	let target, parent, grandParent;
	target = e.target;
	if(target.className == 'task-list__button-remove') {
		parent = target.parentElement;
		grandParent = parent.parentElement;
		grandParent.removeChild(parent);
	}
}

let addButton = document.getElementById('task-list__button-add');
addButton.onclick = addNote;

let removeButton = document.getElementById('task-list__list');
removeButton.addEventListener('click', function(e) {
											removeItem(e);
										}, false);