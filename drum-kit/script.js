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