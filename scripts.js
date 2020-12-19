const request = new XMLHttpRequest();
const baseUrl = "https://api.openopus.org/";
const workGuesser = baseUrl + "dyn/work/guess";
const popComposers = baseUrl + "composer/list/pop.json";
request.open("GET", popComposers);
request.send();

request.onreadystatechange = (e) => {
	console.log(request.responseText);
};