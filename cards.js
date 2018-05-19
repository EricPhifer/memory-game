// This file will contain the code to animate the cards of "memory"
//change letters in cards array with pictures
var cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
var values = [];
var cardIds = [];
var flipped = 0;
function shuffle(cards) {
	var i = this.length, x, temporary;
	while(--i > 0) {
		x = Math.floor(Math.random()*(i+1));
		temporary = this[x];
		this[x] = this[i];
		this[i] = temp;
		}
};		
function startingPoint() {
	flipped = 0;
	var output = '';
	cards.shuffle();
	for(var i = 0; i < cards.length; i++) {
		output += '<div id="card' + i + '"onclick="flipCard(this,/"" + " cards[i] "" + "\")"></div>';
	}
	document.getElementById('gameBoard').innerHTML = output;
}

function flipCard(card, value) {
	if(card.innerHTML == "" && values.length < 2) {
		card.style.background = '#333';
		card.innerHTML = value;
		if(values.length == 0) {
			values.push(value);
			cardIds.push(card.id);
		} else if(values.length == 1) {
			values.push(value);
			cardIds.push(card.id);
			if(values[0] == values[1]) {
				flipped +=2;
			values = [];
			cardIds = [];
			if(flipped == cards.length) {
				//add code for game completion popup here - alert("string")?
				document.getElementById('gameBoard').innerHTML = "";
				startingPoint();
			}
			} else {
				function flipBack() {
					var card1 = document.getElementById(cardIds[0]);
					var card2 = document.getElementById(cardIds[1]);
					card1.innerHTML = "";
					card2.innerHTML = "";
				}
				timeOut(flipBack, 1000);
			}
		}
	}
}