// URL Endpoints
const baseUrl = "https://api.openopus.org/";
const essentialComposers = baseUrl + "composer/list/rec.json";
const popularComposers = baseUrl + "composer/list/pop.json"; 

// Selecting DOM elements
const pOfPiece = document.getElementById("pieceName");
const pOfResult = document.getElementById('result');
const inputField = document.getElementById('input');
const submitButton = document.getElementById("submit");

// Initialize
let correctGuesses = 0;
updateCorrectGuesses();
listenForEnter();
start();

// Gets a random Composer
function start() {
	axios.get(popularComposers)
		.then(data => {
			const composers = data["data"]["composers"];
			const num = Math.floor((Math.random() * 23));
			const composerID = composers[num]["id"];
			const composerName = composers[num]["name"];
			const normalizedComposerName = composerName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
			console.log(normalizedComposerName);
			getPiece(composerID);
			listenForSubmit(normalizedComposerName);
		})
		.catch(err => console.log(err));
}

function getPiece(id) {
	const pieceURL = baseUrl + "work/list/composer/" + id + "/genre/all.json";
	axios.get(pieceURL)
		.then((data) => {
			const composerWorks = data["data"]["works"];
			const numOfWorks = composerWorks.length;
			const numOfWork = Math.floor((Math.random() * numOfWorks));
			const title = composerWorks[numOfWork]["title"];
			pOfPiece.textContent = "Piece: " + title;
		})
		.catch(err => console.log(err));
};

function listenForSubmit(composerName) {
	submitButton.addEventListener("click", function listener() {
		if (inputField.value.toLowerCase() == "") {
			// pass
		} else if (inputField.value.toLowerCase() == composerName) {
			restartAnimation();
			pOfResult.textContent = "Correct!";
			correctGuesses++;
			updateCorrectGuesses();
			submitButton.removeEventListener('click', listener);
			start();
		} else {
			restartAnimation();
			pOfResult.textContent = "Incorrect!";
			submitButton.removeEventListener('click', listener);
			start();
		};
	});
};

function listenForEnter() {
	inputField.addEventListener('keydown', function (event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			submitButton.click();
			inputField.value = "";
		};
	});
};

function updateCorrectGuesses() {
	const displayCorrectGuesses = document.getElementById('correctGuesses');
	displayCorrectGuesses.textContent = "Correct Guesses: " + correctGuesses;
}

function restartAnimation() {
	pOfResult.style.animation = 'none';
	pOfResult.offsetHeight;
	pOfResult.style.animation = null;
}