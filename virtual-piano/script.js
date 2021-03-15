const fullscreen = document.querySelector('.openfullscreen');
const notes = document.querySelector('.btn-notes');
const letters = document.querySelector('.btn-letters');
const pianoKey = document.querySelectorAll('.piano-key');

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

pianoKey.forEach((key) => {
	key.addEventListener('click', playNote);
});

function playNote(event) {
	let key = event.target;
	key.classList.add('piano-key-active');
	let note = document.getElementById(key.dataset.note);
	note.currentTime = 0;
	note.play();
    note.addEventListener('ended', () => {
        key.classList.remove('piano-key-active');
    });
}

window.addEventListener('keydown', playNoteKeyboard);

function playNoteKeyboard(e) {
	console.log(e.keyCode);
	let note = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	let key = document.querySelector(`.piano-key[data-key="${e.keyCode}"]`);
	if (!key) return;
	console.log(key);
	key.classList.add('piano-key-active');
    if(e.repeat) return true;
	note.currentTime = 0;
	note.play();
	note.addEventListener('ended', () => {
		key.classList.remove('piano-key-active');
	});
}

pianoKey.forEach((key) => {
	key.addEventListener('mouseover', playNoteMovingMouse);
});

function playNoteMovingMouse(event) {
	if (event.which == 1&& event.target.classList.contains('piano-key')) {
		let key = event.target;
		key.classList.add('piano-key-active');
		let note = document.getElementById(key.dataset.note);
		note.currentTime = 0;
		note.play();
		note.addEventListener('ended', () => {
			key.classList.remove('piano-key-active');
		});
	}
}
