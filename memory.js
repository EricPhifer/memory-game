
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

var showCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disable");    
};

function flipOver() {
    flippedCard.push(this);
    var amt = flippedCard.length;
    if(amt === 2) {
        moveCount();
        if(flippedCard[0].id === flippedCard[1].id) {
            match();
        } else {
            noMatch();
        }
    } 
}

/* if the cards selected match, this will 
    disable the cards to be unselectable */

function match() {
    flippedCard[0].classList.add("match", "disable");
    flippedCard[1].classList.add("match", "disable");
    flippedCard[0].classList.remove("show");
    flippedCard[1].classList.remove("show");
    flippedCard = [];    
}

function noMatch() {
    flippedCard[0].classList.add("noMatch");
    flippedCard[1].classList.add("noMatch");
    disable();
    setTimeout(function() {
        flippedCard[0].classList.remove("show", "open", "noMatch", "disable");
        flippedCard[1].classList.remove("show", "open", "noMatch", "disable");
        enable();
        flippedCard = [];
    }, 1000);
}

function disable() {
    Array.prototype.filter.call(cards, function(card) {
       card.classList.add("disable"); 
    });
}

function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove("disable");
        for(var y = 0; y < matched.length; y++) {
            matched[y].classList.add("disable");
        }
    });
}

/* setting global values for the move counter function */

var moves = 0;
var counter = document.querySelector(".moves");

let starsList = document.querySelectorAll(".stars");
let stars = document.querySelectorAll("#starRanking");
let star1 = document.querySelector("#stars1");
let star2 = document.querySelector("#stars2");
let star3 = document.querySelector("#stars3");
let lemon = document.querySelector("#lemon");
var rating = "";

/* tracks every second card selection and moves the counter up one */

function moveCount() {
    moves++;
    counter.innerHTML = moves;
/* sets timer to start on the first click of card element */    
    if(moves == 1) {
        seconds = 0;
        minutes = 0;
        beginTimer();
    }
/* reduces stars by one after 14 moves [2 stars] */
    
    if (moves >= 13 && moves < 16) {
        stars1.style.visibility = "hidden";
        rating = "2 stars";
    }  
    /* 16 moves [1 stars] */
    else if (moves >= 16 && moves < 20) {
        stars2.style.visibility = "hidden";
        rating =  "1 star";

    }
    /* lemon at 20 moves [0 stars] */
    else if (moves >= 20) {
        stars3.style.visibility = "hidden";
        lemon.style.visibility = "visible";
        rating = "Lemon!";
    } else {
        rating =  "3 stars";
    }
    return rating;
}

/* setting the timer */

var seconds = 0, minutes = 0;
var timer = document.querySelector("#timer");
var interval = null;
function beginTimer() {
    interval = setInterval(function(){
        timer.innerHTML = minutes + " Minute(s) " + seconds + " Seconds";
        seconds++;
        if(seconds == 60) {
            minutes++;
            seconds = 0;
        }
        else if(minutes == 60) {
            return "Out of time!";          
        }
    }, 1000);
}

/* sets the reset button to reset the game on click */

document.body.onload = beginGame();

function beginGame() {
    cards = shuffle(cards);
    for (var n = 0; n < cards.length; n++) {
        allCards.innerHTML = "";
        [].forEach.call(cards, function(item) {
            allCards.appendChild(item);
        });
        cards[n].classList.remove("match", "open", "disable", "show");
    }
    //resetting values
    moves = 0;
    counter.innerHTML = moves;
    star1.style.visibility = "visible";
    star2.style.visibility = "visible";
    star3.style.visibility = "visible";
    lemon.style.visibility = "hidden";
    
    seconds = 0;
    minutes = 0;
    clearInterval(interval);
    var timer = document.querySelector("#timer");
    timer.innerHTML = "0 Minute(s) 0 Seconds";
}

/* changes the cards to flip on click instead of hover */

for (var j = 0; j < cards.length; j++){
    card = cards[j];
    card.addEventListener("click", showCard);
    card.addEventListener("click", flipOver);
    card.addEventListener("click", complete);
}

/* sets the pop-up upon winning the game */

function complete() {
    if (matched.length == 16) {
        var clearTime = timer.innerHTML;

        var popUp = confirm("Nicely done!\nHere's how you did...\nYou moved " + 
            moves + " times.\nYou took " + clearTime + 
            " to do it.\nYou earned " + rating + "\nWant to play again?");

        if (popUp === true) {
            beginGame();
        }     
    }
}

