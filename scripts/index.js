// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

// Array
const words = [
  "dependent",
  "dog",
  "superficial",
  "admit",
  "juice",
  "javascript",
  "developer",
  "airplane",
  "great",
  "fun",
  "manipulate",
  "cat",
  "transition",
  "school",
  "computer",
  "programming",
  "drag",
  "loving",
  "north",
];

//Initializing word
let randomWord;

//Initializing score
let score = 0;

//Initializing time
let time = 10;

function addWordToDOM() { 
//is the helper make a helper that picks a random word from the array 
//and shows it on the screen.
    //Step 1 : pick a random number for the word's position (from 0 to 18)
  let randomIndex = Math.floor(Math.random() * words.length);
//                           (  number   ) × (  number  )
//                           (    0.3    ) × (    19    )  = 5.7
//                Math.floor(5.7) = 5
// randomIndex = 5 (this is the name of the box that holds the random number)
  //Step 2: take the word
  randomWord = words[randomIndex];
  //Open locker number 1 (that number comes from randomIndex) in the words basket, 
  //and put the word into randomWord 
  //Step 3: show the word on the page (stick it on the wall)
  word.innerText = randomWord;
  //Put the picked word (randomWord) into the text of the word spot on the page (word).
  //.innerText is the text inside this element
}
//Step 4: call the helper (OUTSIDE the { }, so it runs when the page opens)
addWordToDOM(); //call it once so a word shows when the page opens

function updateScore() { // helper #2: gives 1 point
//updateScore: only cook when someone gets a word right
  // Step 1: add 1 to score
  score++; //is a shortcut for plus one “add 1 to score”.
  // Step 2: show the new score on the page
  scoreEl.innerText = score;
}
//updateScore is not called outside because the score should only go up 
//when the player types the right word, 
//so it’s called inside the listener’s if, not when the page opens.

text.addEventListener("input", function () { // When someone types in the box, run these steps. listen to the typing box
  // text              = the typing box 
  // .                 = "from inside it, use…" 
  // addEventListener  = start listening 
  // "input"           = for typing 
  // function () {     = then do these steps 
  // In short: "When someone types in the box, run these steps."

  // Step 1: get what the player typed
  const typedText = text.value;
  //Make a box called typedText, Save what the player typed in a box called typedText.
  // text.value = the words typed in the typing box

  // Step 2: is it the same as the word on the page?
  if (typedText === randomWord) { //=== = exactly the same
    updateScore();                  // +1 point
    addWordToDOM();                 // show a new word
    time += 5;                      // add 5 seconds
    timeEl.innerText = time + "s";  // show the new time on the page
    text.value = "";                // empty the typing box
  }
});

// ===== PART 2: TIMER =====
function updateTime() {          // runs every 1 second
  time--;                        // time goes down by 1 (10 → 9)
  timeEl.innerText = time + "s"; // show it on the page (9s)

  if (time <= 0) {               // if time is 0 (or less)…
    clearInterval(timeInterval); // stop the timer
    gameOver();                  // show the end box
  }
}

const timeInterval = setInterval(updateTime, 1000); // run updateTime every 1 second

// ===== PART 2: GAME OVER =====
function gameOver() {            // shows the end box
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play again</button>
  `;
  endgameEl.style.display = "flex"; // un-hide the box
}