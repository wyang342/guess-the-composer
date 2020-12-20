// URL Endpoints
const baseUrl = "https://api.openopus.org/";
const essentialComposers = baseUrl + "composer/list/rec.json";

// Selecting divs
const divOfPiece = document.getElementById("pieceName");
const divOfComposer = document.getElementById("composerName");

// Initialize
getComposer();
listenForSubmit();

function getComposer() {
	axios.get(essentialComposers)
		.then(data => {
			const composers = data["data"]["composers"];
			const num = Math.floor((Math.random() * 77));
			const composerID = composers[num]["id"];
			const composerName = composers[num]["name"];
			divOfComposer.textContent = "Composer: " + composerName;
			getPiece(composerID);
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
			divOfPiece.textContent = "Piece: " + title;
		})
		.catch(err => console.log(err));
};

function listenForSubmit() {
	const submitButton = document.getElementById("submit");
	submitButton.addEventListener("click", () => {
		console.log("hi");
	});
};