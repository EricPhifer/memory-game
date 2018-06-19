
/* setting global values associated with cards */

let card = document.getElementsByClassName("card");
let cards = [...card];
console.log(cards);

const allCards = document.querySelector(".allCards");
let matched = document.getElementsByClassName("match");
var flippedCard = [];

/* shuffles cards */

function shuffle(array) {
    var index = array.length, value, randomIndex;
    while (index !== 0) {
        randomIndex = Math.floor(Math.random() * index);
        index -= 1;
        value = array[index];
        array[index] = array[randomIndex];
        array[randomIndex] = value;
    }
    return array;
}

document.body.onload = beginGame();

var showCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");    
};

function flipOver() {
    flippedCard.push(this);
    var amt = flippedCard.length;
    if(amt === 2) {
        counter();
        if(flippedCard[0].type === flippedCard[1].type) {
            match();
        } else {
            noMatch();
        }
    } 
}

/* if the cards selected match, this will 
    disable the cards to be unselectable */

function match() {
    flippedCard[0].classList.add("match", "disabled");
    flippedCard[1].classList.add("match", "disabled");
    flippedCard[0].classList.remove("open", "show", "no-event");
    flippedCard[1].classList.remove("open", "show", "no-event");
    flippedCard = [];    
}

function noMatch() {
    flippedCard[0].classList.add("noMatch");
    flippedCard[1].classList.add("noMatch");
    disable();
    setTimeout(function() {
        flippedCard[0].classList.remove("show", "open", "no-event", "noMatch");
        flippedCard[1].classList.remove("show", "open", "no-event", "noMatch");
        enable();
        flippedCard = [];
    }, 1000);
}

function disable() {
    Array.prototype.filter.call(cards, function (card) {
       card.classList.add("disabled"); 
    });
}

function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove("disabled");
        for(var y = 0; y < matched.length; y++) {
            matched[y].classList.add("disabled");
        }
    });
}

/* setting global values for the move counter function */

let moves = 0;
let moveCounter = document.querySelector("#moves");

let starsList = document.querySelectorAll(".stars");
const stars = document.querySelectorAll("#star-ranking");
let lemon = document.querySelector("#lemon");

/* tracks every second card selection and moves the counter up one */

function counter() {
    moves++;
    moveCounter.innerHTML = moves;
/* sets timer to start on the first click of card element */    
    if(moves == 1) {
        milliseconds = 0;
        seconds = 0;
        minutes = 0;
        beginTimer();
    }
/* reduces stars by one after 10 moves [2 stars] */
    if (moves >= 10 && moves < 13) {
        for(var x = 0; x < 3; x++) {
            if(x > 2){
                stars[x].style.visibility = "hidden";
            }
        }
    }
    /* 13 moves [1 stars] */
    else if (moves >= 13 && moves < 16) {
        for(var x = 0; x < 3; x++) {
            if(x > 1){
                stars[x].style.visibility = "hidden";
            }
        }
    }
    /* lemon at 16 moves [0 stars] */
    else if (moves >= 16) {
        for(var x = 0; x < 3; x++) {
            if(x > 0){
                stars[x].style.visibility = "hidden";
                lemon.style.visibility = "visible";
            }
        }
    }
}

/* setting the timer */

var milliseconds = 0, seconds = 0, minutes = 0;
var timer = document.querySelector("#timer");
function beginTimer() {
    var interval = setInterval(function(){
        timer.innerHTML = minutes + ":" + seconds + ":" + milliseconds;
        milliseconds++;
        if(milliseconds == 60) {
            seconds++;
            milliseconds = 0;
        }
        if(seconds == 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);

}

/* sets the reset button to reset the game on click */

function beginGame() {
    'use strict';
    cards = shuffle(cards);
    for (let n = 0; n < cards.length; n++) {
        allCards.innerHTML = "";
        [].forEach.call(cards, function(item) {
            allCards.appendChild(item);
        });
        cards[n].classList.remove("match", "open", "disabled", "show");
    }
    var moves = 0;
    var moveCounter.innerHTML = moves;
    for (var t = 0; t < stars.length; t++) {
        stars[t].style.visibility = "visible";
    }
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "00:00:00";
    clearInterval(interval);
}

/* changes the cards to flip on click instead of hopen */

for (var j = 0; j < cards.length; j++){
    card = cards[j];
    card.addEventListener("click", showCard);
    card.addEventListener("click", flipOver);
    card.addEventListener("click", complete);
}

/* setting the global values for the modal pop-up */

let closeicon = document.querySelector(".close");
let modal = document.getElementById("myModal");

/* sets the modal pop-up upon winning the game */

function complete() {
    if (matched.length == 16) {
        clearInterval(interval);
        var clearTime = timer.innerHTML;

        modal.classList.add("show");

        var rating = document.querySelector(".stars").innerHTML;

        document.getElementById("moveTotal").innerHTML = moves;
        document.getElementById("timeElapsed").innerHTML = rating;
        document.getElementById("starRanking").innerHTML = clearTime;

        closePopUp();
    }
}

function closePopUp() {
    closeicon.addEventListener("click", function(x) {
        modal.classList.remove("show");
        beginGame();
    });
}

function restart() {
    modal.classList.remove("show");
    beginGame();
}

