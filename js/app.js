/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var cardList = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-anchor",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-bomb",
    "fa-leaf",
    "fa-bomb",
    "fa-bolt",
    "fa-bicycle",
    "fa-paper-plane-o",
    "fa-cube"
   ]



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var shuffledCard = shuffle(cardList);

function createCard(className){
    //create list item with specific class from the above iteration
    var liElement = document.createElement('li');
    var iElement = document.createElement('i');
    iElement.classList.add('fa',className);
    liElement.appendChild(iElement);
    liElement.classList.add('card');
    return liElement;

}
function generateGameBoard(){
    if(document.querySelector('.deck').innerHTML != ''){
          document.querySelector('.deck').innerHTML = '';
        }
   //call the createCard() function and append it to the ul tag
   for (var i = 0; i<shuffledCard.length;i++){
       var generatedElement = createCard(shuffledCard[i]); 
       document.querySelector('.deck').appendChild(generatedElement);
   }
   activateCard();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

var lastFlipped = null;
var moves = 0;
var starsCount = 0;
var matchedcardCounter = [];
let timer =  document.getElementById("timer");
let isFirstClick = true;

function activateCard(){
    document.querySelectorAll('li.card').forEach(function(card){
        
        card.addEventListener('click',function(){
              
              if(isFirstClick) {
                // Start our timer
                startTimer();
                // Change our First Click indicator's value
                isFirstClick = false;
            }
            //display the selected card symbol
              displayCardSymbol(card);
              openCards(card);
           
        });
    });
}




function displayCardSymbol(card){
        card.classList.add('show','open','disable','animated','flipInY'); 
}

function openCards(card){
    if(lastFlipped){
        var openCardList = [];
            openCardList[0] = lastFlipped;
            openCardList[1] = card;
        compareCards(openCardList);
    }
    else {
        lastFlipped = card;
    }
}

function compareCards(openCardList) {
    //logic to compare cards
    var test1 = openCardList[0].children;
    var test11 = test1.item(0).classList.item(1);
    var test2 = openCardList[1].children;
    var test22 = test2.item(0).classList.item(1);

    if(test11 === test22 ){ 
       matchedCard(openCardList);
    } 
    else {
        setTimeout(function(){unmatchedCard(openCardList)},1000);
    }
}

function matchedCard(openCardList){ 
    matchedcardCounter.push(openCardList[0]);
    matchedcardCounter.push(openCardList[1]);
    
    openCardList[0].classList.add('match');
    openCardList[1].classList.add('match');
    openCardList = [];
    lastFlipped = null;

    moveCounter();
    if(matchedcardCounter.length === 16){
        gameOver();
    }
}

function unmatchedCard(openCardList){
    openCardList[0].classList.remove('show','open','disable','animated','flipInY');
    openCardList[1].classList.remove('show','open','disable','animated','flipInY');
    openCardList = [];
    lastFlipped = null;
    moveCounter();  
}

function moveCounter(){
    moves +=1;
    document.querySelector('.moves').innerHTML = moves;
    stars();
}

function gameOver(){
    clearInterval(timerVar);
    document.querySelector('#moves-made').innerHTML = moves;
    document.querySelector('#time-elapsed').innerHTML = timeElapsed;
    document.querySelector('#stars-won').innerHTML = starsCount;
    document.querySelector('.bg-modal').style.display = 'flex';
}

function stars(){
    if(moves>=2 && moves<=15){
        starsCount = 3;
    }
    else if(moves>15 && moves<=45){
        starsCount = 2;
    }
    else if(moves>45){
        starsCount = 1;
    }


    if(moves==15){
        document.querySelector('.stars').firstChild.remove();
    } else if(moves==30){
        document.querySelector('.stars').firstChild.remove();
    } else if(moves==45){
        document.querySelector('.stars').firstChild.remove();  
    }
}



//event listiner for restart
document.querySelector('.restart').addEventListener('click',function(){
    shuffledCard = shuffle(cardList);
    initialize();   
},true)


// timer section
var totalSeconds = 0;
var timeElapsed ;
var timerVar = 0;
function countTimer() {
    ++totalSeconds;
    var hour = Math.floor(totalSeconds /3600);
    var minute = Math.floor((totalSeconds - hour*3600)/60);
    var seconds = totalSeconds - (hour*3600 + minute*60);
    timeElapsed = (hour*3600) + (minute*60) + seconds;
   timer.innerHTML = hour + ":" + minute + ":" + seconds;
}

function startTimer(){
    timerVar = setInterval(countTimer, 1000);
}
function stopTimer(){
    if(timerVar){
        clearInterval(timerVar);
    }
    
}


//play again button 
document.querySelector('#playAgain').addEventListener('click',function(){
    document.querySelector('.bg-modal').style.display = 'none';
    document.querySelector('.deck').innerHTML = '';
    initialize();  
},true)

function initialize(){
    timer.innerHTML = '0:0:0';
    generateGameBoard();
    moves = 0; //resets the move counter
    stopTimer();
    totalSeconds = 0;
    matchedcardCounter = []; //reset matchedcard
    document.querySelector('.moves').innerHTML = moves;
    isFirstClick = true;
    var stars = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    document.querySelector('.stars').innerHTML = '';
    document.querySelector('.stars').innerHTML = stars;
}
// Goes into games over fuction
generateGameBoard();






