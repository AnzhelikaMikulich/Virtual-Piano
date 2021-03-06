const fullscreen = document.querySelector('.openfullscreen');
const notes = document.querySelector('.btn-notes');
const letters = document.querySelector('.btn-letters');
const pianoKey = document.querySelectorAll('.piano-key');
const piano = document.querySelector('.piano');

fullscreen.addEventListener('click', changeScreen);

function changeScreen() {
	if (document.fullscreenElement === null) {
		document.documentElement.requestFullscreen();
	} else if (document.fullscreenEnabled) {
		document.exitFullscreen();
	}
}

letters.addEventListener('click', changeLetters);
notes.addEventListener('click', changeNotes);

function changeNotes() {
	notes.classList.add('btn-active');
	letters.classList.remove('btn-active');
	for (let i = 0; i < pianoKey.length; i++) {
		pianoKey[i].classList.remove('piano-key-letter');
	}
}

function changeLetters() {
	letters.classList.add('btn-active');
	notes.classList.remove('btn-active');
	for (let i = 0; i < pianoKey.length; i++) {
		pianoKey[i].classList.add('piano-key-letter');
	}
}

piano.addEventListener('mousedown', playNote);

function playNote(event) {
	let key = event.target;
	key.classList.add('piano-key-active', 'piano-key-active-pseudo');
	let note = document.getElementById(key.dataset.note);
	note.currentTime = 0;
	note.play();
	key.addEventListener('mouseup', () => {
		key.classList.remove('piano-key-active', 'piano-key-active-pseudo');
	});
}

window.addEventListener('keydown', playNoteKeyboard);
window.addEventListener('keyup', (e) => {
	let key = document.querySelector(`.piano-key[data-key="${e.keyCode}"]`);
	if (key.classList.contains('piano-key-active')) {
		key.classList.remove('piano-key-active', 'piano-key-active-pseudo');
	}
});

function playNoteKeyboard(e) {
	let note = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	let key = document.querySelector(`.piano-key[data-key="${e.keyCode}"]`);
	if (!key) return;
	key.classList.add('piano-key-active');
	if (e.repeat) return true;
	note.currentTime = 0;
	note.play();
}

let mouseClicked = false;
piano.addEventListener('mousedown', () => {
	mouseClicked = true;
});
document.addEventListener('mouseup', () => {
	mouseClicked = false;
});

piano.addEventListener('mouseover', (event) => {
	if (mouseClicked && event.target.classList.contains('piano-key') && event.which == 1) {
		let key = event.target;
		key.classList.add('piano-key-active', 'piano-key-active-pseudo');
		let note = document.getElementById(key.dataset.note);
		note.currentTime = 0;
		note.play();
	}
});

piano.addEventListener('mouseout', (event) => {
	if (event.target.classList.contains('piano-key')) {
		event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
	}
});
