const board = document.getElementById("board");
const message = document.getElementById("message");
const levelTitle = document.getElementById("level-title");
const livesDisplay = document.getElementById("lives");
const restartBtn = document.getElementById("restart");

let lives = 3;
let flippedCards = [];
let matchedCount = 0;
let level = 0;

// Scenes with image backgrounds
const scenes = [
  { name: "Jungle", bg: "url('images/jungle.jpg') no-repeat center center/cover", msg: "You survived the Jungle! 🌴 Enter the Cave..." },
  { name: "Cave", bg: "url('images/cave.jpg') no-repeat center center/cover", msg: "Darkness conquered! 🕳️ Head to the Temple..." },
  { name: "Temple", bg: "url('images/temple.jpg') no-repeat center center/cover", msg: "Ancient secrets solved! 🏛️ Treasure awaits..." },
  { name: "Treasure", bg: "url('images/treasure.jpg') no-repeat center center/cover", msg: "🎉 Congratulations! You found the treasure! 🏝️" }
];

// Emoji sets
const emojis = ["🍎","🍌","🍇","🍒","🍑","🍍","🥝","🍉"];

function startGame() {
  lives = 3;
  level = 0;
  loadLevel();
}

function loadLevel() {
  flippedCards = [];
  matchedCount = 0;
  document.body.style.background = scenes[level].bg;
  levelTitle.textContent = `Level ${level + 1}: ${scenes[level].name}`;
  message.textContent = "Match all pairs to move ahead!";
  livesDisplay.textContent = `❤️ Lives: ${lives}`;
  
  board.innerHTML = "";
  let cards = [...emojis.slice(0, 4), ...emojis.slice(0, 4)];
  cards.sort(() => Math.random() - 0.5);

  cards.forEach(emoji => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.textContent = "?";
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.textContent = card.dataset.emoji;
    card.classList.add("flipped");
    flippedCards.push(card);
  }

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 600);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    matchedCount++;
    message.textContent = "✅ Match Found!";
    if (matchedCount === 4) {
      setTimeout(nextLevel, 1000);
    }
  } else {
    card1.textContent = "?";
    card2.textContent = "?";
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    lives--;
    livesDisplay.textContent = `❤️ Lives: ${lives}`;
    if (lives === 0) {
      message.textContent = "💀 Game Over!";
      board.innerHTML = "";
    }
  }
  flippedCards = [];
}

function nextLevel() {
  if (level < scenes.length - 1) {
    alert(scenes[level].msg);
    level++;
    loadLevel();
  } else {
    message.textContent = scenes[level].msg;
    board.innerHTML = "";
  }
}

restartBtn.addEventListener("click", startGame);
startGame();