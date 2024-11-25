function start() {
	const theButton = document.getElementById('btn-fetch');
	theButton.onclick = handleButton;
} //end start

//Note we added a parameter to fetchData
function handleButton() {
	const theSpan = document.getElementById('output');
	theSpan.innerHTML = "test";
	//perform fetch stuff
	fetchData(theSpan);
}//end handleButton
	
function fetchData(theSpan) {
	/*//fetch('') .then((res)=> res.json()) .then((data) => console.log(data))
	fetch('https://api.genratr.com/?length=16&uppercase&lowercase&special&numbers')
	.then(response => response.json())
	.then(json => {
		let content = JSON.stringify(json);
	theSpan.innerHTML = content;
});*/
	fetch('https://api.genratr.com/?length=16&uppercase&lowercase&special&numbers')
	.then(response => response.json())
	.then(json => {
		let content = json.password;
		theSpan.innerHTML = content;
	});
}

window.onload = start;