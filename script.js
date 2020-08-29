const gameContainer = document.getElementById("game");
const startBtn = document.querySelector('.start-btn');

// Start the game button
startBtn.addEventListener('click', () => {
  gameContainer.style.display = '';

  if (score !== 0) {
    location.reload();
  }
});

let counter = 0;
let score = 0;
let rightMatches = 0;

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
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  counter = array.length;

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

  // Variable declarations for iterating and matching colors
  const color = event.target.className;
  const divs = gameContainer.children;
  const clickedDiv = event.target;
  counter++;

  // Increases the score every click
  increaseScore();

  // Playing the rounds and resetting the counter
  if (counter <= 1) {

    clickedDiv.style.backgroundColor = color;
    clickedDiv.classList.toggle('open');


  } else if (counter === 2) {

    clickedDiv.style.backgroundColor = color;
    clickedDiv.classList.toggle('open');

    setTimeout(() => {
      for (let one of divs) {
        one.classList.remove('open');

        if (!one.classList.contains('face-up')) {
          one.style.backgroundColor = '';
        }
      }
    }, 1000);

    counter = 0;
  }

  //  Iterating through the divs to find a match
  for (let one of divs) {

    if (one.classList.contains('open') && one !== clickedDiv) {

      if (one.style.backgroundColor === clickedDiv.style.backgroundColor) {

        one.classList.toggle('face-up');
        clickedDiv.classList.toggle('face-up');
        counter = 0;
        rightMatches += 1;

        if (rightMatches === 5) {
          setTimeout(restartGame(), 2000);
        }
      }

    }

  }
}

function restartGame() {
}

function increaseScore() {
  const scoreboard = document.getElementById('score');
  score += 10;
  scoreboard.innerText = score;
}

// when the DOM loads
createDivsForColors(shuffledColors);