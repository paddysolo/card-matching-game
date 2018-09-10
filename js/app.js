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
   // console.log(className);
    liElement.appendChild(iElement);
    liElement.classList.add('card');
    return liElement;

}
function generateGameBoard(){
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

// var stars;
var matchedcardCounter = [];

function activateCard(){
    
    document.querySelectorAll('li.card').forEach(function(card){
        
        card.addEventListener('click',function(){
              
              displayCardSymbol(card);//display the selected card symbol
             // deactivateCard(card);
              openCards(card);
           
        });
    });

    
}

function deactivateCard(card){
    // //remove event listener
       // card.removeEventListener('click',function(card){});
    
}


function displayCardSymbol(card){
    card.classList.add('show','open');
}

function openCards(card){
    if(lastFlipped){
        var openCardList = [];
            openCardList[0] = lastFlipped;
            openCardList[1] = card;
        //  lastFlipped = card;
        
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
        setTimeout(function(){unmatchedCard(openCardList)},900);
    }
}



function matchedCard(openCardList){
    // console.log("card matched");
    
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
    // console.log("card dont matched");
    openCardList[0].classList.remove('show','open');
    openCardList[1].classList.remove('show','open');
    openCardList = [];
    lastFlipped = null;
    moveCounter();
   
}

function moveCounter(){
    moves +=1;
    document.querySelector('.moves').innerHTML = moves;
    
    stars();
   
    

}

function gameOver() {
    // var h1 = document.createElement('h1');
    // h1.classList.add('h1class');
    // var p = document.createElement('p');
    // h1.innerHTML = 'Congratulations You Won !!!!';
    // //
    //  var message =   `<h1 class = "h1class">Congratulations You Won !!!!</h1>
    //                  <p class = "h1class">With ${moves} moves and 1 stars <br> Woooooo!!!</p>
    //                  <button id="btn" class = "h1class">Play Again</button>`;
    //                 //  console.log(message);
    //                 //  document.querySelector('.deck').innerHTML = '';
    //                  document.querySelector('.deck').innerHTML = message;
    clearInterval(timerVar);
    document.querySelector('#moves-made').innerHTML = moves;
    document.querySelector('#time-elapsed').innerHTML = timeElapsed;
    document.querySelector('#stars-won').innerHTML = starsCount;
    document.querySelector('.bg-modal').style.display = 'flex';
}

function stars() {
    // console.log(moves);

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

//****** var matchedCard = [];

// if(matchedCard ===16){
//     //logic for game won
//********* }

//event listiner for restart
document.querySelector('.restart').addEventListener('click',function(){
    document.querySelector('.deck').innerHTML = '';
    clearInterval(timerVar)
    generateGameBoard();
    totalSeconds = 0;
    timerVar = setInterval(countTimer, 1000);
    
    moves = 0; //resets the move counter
    matchedcardCounter = []; //reset matchedcard
    document.querySelector('.moves').innerHTML = moves;

    var stars = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    document.querySelector('.stars').innerHTML = '';
    document.querySelector('.stars').innerHTML = stars;
    
})


// timer section
timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;
var timeElapsed ;
function countTimer() {
++totalSeconds;
var hour = Math.floor(totalSeconds /3600);
var minute = Math.floor((totalSeconds - hour*3600)/60);
var seconds = totalSeconds - (hour*3600 + minute*60);

timeElapsed = hour + minute + seconds;

document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
}

//play again button 
document.querySelector('#playAgain').addEventListener('click',function(){
    document.querySelector('.bg-modal').style.display = 'none';
    document.querySelector('.deck').innerHTML = '';
    generateGameBoard();
    moves = 0; //resets the move counter
    clearInterval(timerVar);
    totalSeconds = 0;
    timerVar = setInterval(countTimer, 1000);
    matchedcardCounter = []; //reset matchedcard
    document.querySelector('.moves').innerHTML = moves;

    var stars = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    document.querySelector('.stars').innerHTML = '';
    document.querySelector('.stars').innerHTML = stars;
    
})
// Goes into games over fuction



generateGameBoard();






