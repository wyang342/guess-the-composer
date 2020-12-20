// URL Endpoints
const baseUrl = "https://api.openopus.org/";
const essentialComposers = baseUrl + "composer/list/rec.json";

// Selecting divs
const pOfPiece = document.getElementById("pieceName");
const pOfResult = document.getElementById('result');

// Initialize
let correctGuesses = 0;
start();
updateCorrectGuesses();

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
	const submitButton = document.getElementById("submit");
	submitButton.addEventListener("click", () => {
		const inputField = document.getElementById('text');
		if (inputField.value == composerName) {
			pOfResult.textContent = "Correct!";
			correctGuesses++;
			updateCorrectGuesses();
		} else {
			pOfResult.textContent = "Incorrect!";
		};
	});
};

function updateCorrectGuesses() {
	const displayCorrectGuesses = document.getElementById('correctGuesses');
	displayCorrectGuesses.textContent = "Correct Guesses: " + correctGuesses;
}