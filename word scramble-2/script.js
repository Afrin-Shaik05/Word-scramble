// =============================================
// WIZARD'S WORD SCRAMBLE - script.js
// Concepts: String manipulation, Randomization
// =============================================


// --- STEP 1: Magical word list ---
const wordList = [
  { word: "DRAGON",   hint: "A fire-breathing beast" },
  { word: "POTION",   hint: "A bubbling magical brew" },
  { word: "WIZARD",   hint: "A master of spells" },
  { word: "CASTLE",   hint: "Home of kings and magic" },
  { word: "PHOENIX",  hint: "Rises from its own ashes" },
  { word: "AMULET",   hint: "A magical pendant" },
  { word: "GOBLIN",   hint: "A mischievous small creature" },
  { word: "ENCHANT",  hint: "To place a spell upon" },
  { word: "CRYSTAL",  hint: "A glowing magical gem" },
  { word: "SHADOW",   hint: "Darkness given form" },
  { word: "UNICORN",  hint: "A horned, magical horse" },
  { word: "MERLIN",   hint: "A legendary wizard's name" },
];


// --- STEP 2: Track game state ---
let currentWord = "";
let score    = 0;
let attempts = 0;
let streak   = 0;


// --- STEP 3: Create twinkling stars in the background ---
function createStars() {
  const starsContainer = document.getElementById("stars");
  const numberOfStars = 60;

  for (let i = 0; i < numberOfStars; i++) {
    let star = document.createElement("div");
    star.className = "star";

    // Random position using coordinates
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    // Random twinkle timing so they don't blink in sync
    star.style.animationDelay = Math.random() * 3 + "s";

    starsContainer.appendChild(star);
  }
}


// --- STEP 4: Shuffle letters (Fisher-Yates algorithm) ---
function shuffleWord(word) {
  let letters = word.split("");

  for (let i = letters.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = letters[i];
    letters[i] = letters[randomIndex];
    letters[randomIndex] = temp;
  }

  let scrambled = letters.join("");

  if (scrambled === word) {
    return shuffleWord(word);
  }

  return scrambled;
}


// --- STEP 5: Load a new magical rune ---
function loadNewWord() {
  let randomIndex = Math.floor(Math.random() * wordList.length);
  let chosen = wordList[randomIndex];

  currentWord = chosen.word;

  document.getElementById("scrambled-word").textContent = shuffleWord(currentWord);
  document.getElementById("hint-text").textContent = "Whisper \"reveal\" for a clue...";
  document.getElementById("player-input").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "feedback";
  document.getElementById("player-input").focus();
}


// --- STEP 6: Check the spell (the player's guess) ---
function checkGuess() {
  let playerInput = document.getElementById("player-input").value;
  let guess = playerInput.trim().toUpperCase();

  if (guess === "") return;

  attempts++;
  let feedback = document.getElementById("feedback");

  if (guess === currentWord) {
    score += 10;
    streak++;
    feedback.textContent = "✦ The spell is cast! +10 Mana";
    feedback.className = "feedback correct";
    updateStats();

    setTimeout(loadNewWord, 1500);

  } else {
    streak = 0;
    feedback.textContent = "✗ The rune resists... try again!";
    feedback.className = "feedback wrong";
    updateStats();
  }
}


// --- STEP 7: Reveal a clue ---
function showHint() {
  let match = wordList.find(function(item) {
    return item.word === currentWord;
  });

  if (match) {
    document.getElementById("hint-text").textContent = "Clue: " + match.hint;
  }
}


// --- STEP 8: Abandon the spell (reveal the answer) ---
function giveUp() {
  let feedback = document.getElementById("feedback");
  feedback.textContent = "The true word was: " + currentWord;
  feedback.className = "feedback wrong";
  streak = 0;
  updateStats();

  setTimeout(loadNewWord, 2000);
}


// --- STEP 9: Update the mana/score display ---
function updateStats() {
  document.getElementById("score").textContent    = score;
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("streak").textContent   = streak;
}


// =============================================
// Connect buttons to functions
// =============================================
document.getElementById("check-btn").addEventListener("click", checkGuess);
document.getElementById("new-word-btn").addEventListener("click", loadNewWord);
document.getElementById("hint-btn").addEventListener("click", showHint);
document.getElementById("give-up-btn").addEventListener("click", giveUp);

document.getElementById("player-input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});


// =============================================
// Start the game
// =============================================
createStars();
loadNewWord();