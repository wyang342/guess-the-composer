// URL Endpoints
const baseUrl = "https://api.openopus.org/";
const essentialComposers = baseUrl + "composer/list/rec.json";

// Selecting divs
const pOfPiece = document.getElementById("pieceName");
const pOfResult = document.getElementById('result');
const inputField = document.getElementById('input');
const submitButton = document.getElementById("submit");

// Initialize
let correctGuesses = 0;
updateCorrectGuesses();
listenForEnter();
start();

// Gets a random Essential Composer
function start() {
	axios.get(essentialComposers)
		.then(data => {
			const composers = data["data"]["composers"];
			const num = Math.floor((Math.random() * 77));
			const composerID = composers[num]["id"];
			const composerName = composers[num]["name"];
			console.log(composerName);
			getPiece(composerID);
			listenForSubmit(composerName);
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
	submitButton.addEventListener("click", function listener () {
		if (inputField.value == "") {
			// pass
		} else if (inputField.value == composerName) {
			pOfResult.textContent = "Correct!";
			correctGuesses++;
			updateCorrectGuesses();
			submitButton.removeEventListener('click', listener);
			start();
		} else {
			pOfResult.textContent = "Incorrect!";
			submitButton.removeEventListener('click', listener);
			start();
		};
	});
};

function listenForEnter() {
	inputField.addEventListener('keydown', function(event) {
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