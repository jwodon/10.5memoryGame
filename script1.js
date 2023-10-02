const gameContainer = document.getElementById("game");
let count = 0;
let clickedCardArray = [];
let lockCards = false;
let previousCard = null;
let score = 0;
const scoreDisplay = document.getElementById('score')
scoreDisplay.textContent = `Your score is: ${score}`;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (lockCards){ return; }
  if (event.target.classList.contains('flipped')) { return ;}
  count++;
  score++;
  scoreDisplay.textContent = `Your score is: ${score}`;
  console.log("you just clicked", event.target.className);
  let clickColor = event.target.className;
  clickedCardArray.push(clickColor);
  console.log(clickedCardArray);
  event.target.style.backgroundColor = clickColor;
  event.target.classList.add('flipped');

  if (previousCard === null){
    previousCard = event.target;
  }

  if (count === 2){
    if(lockCards) return;
    if (clickedCardArray[0] === clickedCardArray[1]){
      console.log('YOU GOT A MATCH');
      clickedCardArray = [];
      count = 0;
      previousCard = null;
    }
    else {;
    lockCards = true;
       setTimeout(function() {      //sets a timeout of 1 second before cards reset
        event.target.style.backgroundColor = '';    
        previousCard.style.backgroundColor = '';
        previousCard.classList.remove('flipped');
        event.target.classList.remove('flipped');
        count = 0;
        clickedCardArray = [];
        lockCards = false;
        previousCard = null;            
      }, 1000);
    }}}

// Reset Game Button
let buttonReset = document.querySelector("#resetGame")

buttonReset.addEventListener('click', function(e) {
    while (gameContainer.firstChild){
        gameContainer.removeChild(gameContainer.firstChild);
    }
    createDivsForColors(shuffledColors);
    score = 0;
    scoreDisplay.textContent = `Your score is: ${score}`;
})    


// when the DOM loads
createDivsForColors(shuffledColors);


