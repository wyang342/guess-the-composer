console.log(axios);

const request = new XMLHttpRequest();
const baseUrl = "https://api.openopus.org/";
const essentialComposers = baseUrl + "composer/list/rec.json";

const divOfPiece = document.getElementById("pieceName");
const divOfComposer = document.getElementById("composerName");

axios.get(essentialComposers)
	.then(data => {
		const composers = data["data"]["composers"];
		console.log(composers);
		const num = Math.floor((Math.random() * 76));
		const composerID = composers[num]["id"];
		const composerName = composers[num]["name"];
		divOfComposer.textContent = composerName;
		console.log(composerID);
		getPiece(composerID);
	})
	.catch(err => console.log(err));

function getPiece(id) {
	const pieceURL = baseUrl + "work/list/composer/" + id + "/genre/all.json";
	axios.get(pieceURL)
		.then((data) => {
			console.log(data);
			const composerWorks = data["data"]["works"];
			const numOfWorks = composerWorks.length - 1;
			const numOfWork = Math.floor((Math.random() * numOfWorks));
			console.log(numOfWork);
			const title = composerWorks[numOfWork]["title"];
			console.log(title);
			divOfPiece.textContent = title;
		})
		.catch(err => console.log(err));
};