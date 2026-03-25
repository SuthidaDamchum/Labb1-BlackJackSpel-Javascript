var playerSum = 0;
var dealerSum = 0;
var playerAcesCount = 0;
var dealerAcesCount = 0;
var hiddenCard;

var wallet = Number(localStorage.getItem("savedWallet")) || 1000;

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();
  document.getElementById("balance").innerText = wallet;
  document.getElementById("moreCard").addEventListener("click", hit);
  document.getElementById("stop").addEventListener("click", stand);
  document.getElementById("newGame").addEventListener("click", deal);
};

let deck = [];
function buildDeck() {
  let values = [
    "ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
  ];

  let types = ["clubs", "diamonds", "hearts", "spades"];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = values[j] + "_of_" + types[i];
      deck.push(card);
    }
  }
  console.log(deck);
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let temporaryValue = deck[i];
    deck[i] = deck[randomIndex];
    deck[randomIndex] = temporaryValue;
  }
  console.log(deck);
}

async function startGame() {
  document.getElementById("newGame").disabled = true;
  console.log("Nu startar spelet!");
  hiddenCard = deck.pop();
  dealerSum += getCardValue(hiddenCard);
  dealerAcesCount += checkAces(hiddenCard);

  //Dealerns kort 2
  let card = deck.pop();
  let cardImage = document.createElement("img");
  cardImage.src = "./cards/" + card + ".png";
  dealerSum += getCardValue(card);
  dealerAcesCount += checkAces(card);

  document.getElementById("DealerCards").append(cardImage);

  //Player 1
  card = deck.pop();
  // let card1 = "ace_of_spades";

  cardImage = document.createElement("img");
  cardImage.src = "./cards/" + card + ".png";
  playerSum += getCardValue(card);
  playerAcesCount += checkAces(card);
  document.getElementById("PlayerCards").append(cardImage);

  //kort 2
  card = deck.pop();
  // let card2 = "king_of_diamonds";
  cardImage = document.createElement("img");
  cardImage.src = "./cards/" + card + ".png";
  playerSum += getCardValue(card);
  playerAcesCount += checkAces(card);
  playerSum = reducePlayerAces();
  document.getElementById("PlayerCards").append(cardImage);
  document.getElementById("playerSum").innerText = playerSum;
  // playerSum = 21;

  if (playerSum === 21 || dealerSum === 21) {
    canHit = false;

    await delay(600);
    checkWinner();
  }
}

let canHit = true;

function hit() {
  if (!canHit) {
    return;
  }

  let card = deck.pop();

  playerSum += getCardValue(card);
  playerAcesCount += checkAces(card);

  let cardImage = document.createElement("img");
  cardImage.src = "./cards/" + card + ".png";
  document.getElementById("PlayerCards").append(cardImage);
  playerSum = reducePlayerAces();

  document.getElementById("playerSum").innerText = playerSum;

  if (playerSum > 21) {
    canHit = false;
    checkWinner();
  } else if (playerSum === 21) {
    canHit = false;
    stand();
  }
}

async function stand() {
  document.getElementById("stop").disabled = true;

  document.getElementById("moreCard").disabled = true;

  document.getElementById("hiddenCard").src = "./cards/" + hiddenCard + ".png";

  document.getElementById("dealerSum").innerText = dealerSum;

  await delay(100);

  while (dealerSum < 17) {
    let moreCardToDealer = deck.pop();
    dealerSum += getCardValue(moreCardToDealer);
    dealerAcesCount += checkAces(moreCardToDealer);
    dealerSum = reduceDelaerAces();

    let newCardToDealerImg = document.createElement("img");
    newCardToDealerImg.src = "./cards/" + moreCardToDealer + ".png";
    document.getElementById("DealerCards").append(newCardToDealerImg);

    await delay(100);
  }
  checkWinner();
}

function deal() {
  location.reload();
}

function checkWinner() {
  let message = "";
  let messageColor = "black";

  let cardPlayerOnTable = document
    .getElementById("PlayerCards")
    .getElementsByTagName("img").length;

  let resultsElement = document.getElementById("results");
  document.getElementById("hiddenCard").src = "./cards/" + hiddenCard + ".png";
  document.getElementById("dealerSum").innerText = dealerSum;

  if (playerSum === 21 && cardPlayerOnTable === 2 && dealerSum !== 21) {
    message = "BLACKJACK! ★";
    messageColor = "#FFD700";
    updateWallet(150);
  } else if (playerSum > 21) {
    message = "Dealer Wins!";
    messageColor = "#FF4d4d";
    updateWallet(-100);
  } else if (dealerSum > 21) {
    message = "You Win!";
    messageColor = "#4CAF50";
    updateWallet(100);
  } else if (playerSum === dealerSum) {
    message = "Tie!";
    messageColor = "yellow";
  } else if (playerSum > dealerSum) {
    message = "You Win!";
    messageColor = "#4CAF50";
    updateWallet(100);
  } else {
    message = "You Lose!";
    messageColor = "#FF4d4d";
    updateWallet(-100);
  }

  resultsElement.innerText = message;
  resultsElement.style.color = messageColor;

  document.getElementById("stop").disabled = true;
  document.getElementById("moreCard").disabled = true;
  document.getElementById("newGame").disabled = false;
}

function getCardValue(card) {
  let splitCard = card.split("_of_");
  let value = splitCard[0];

  if (isNaN(value)) {
    if (value === "ace") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAces(card) {
  let splitCard = card.split("_of_");
  let value = splitCard[0];
  if (value === "ace") {
    return 1;
  }
  return 0;
}

function reducePlayerAces() {
  while (playerSum > 21 && playerAcesCount > 0) {
    playerSum -= 10;
    playerAcesCount -= 1;
  }
  return playerSum;
}

function reduceDelaerAces() {
  while (dealerSum > 21 && dealerAcesCount > 0) {
    dealerSum -= 10;
    dealerAcesCount -= 1;
  }
  return dealerSum;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function updateWallet(amount) {
  wallet += amount;

  document.getElementById("balance").innerText = wallet;

  //SPARA TILL MINNET: Vi sparar "wallet" under namnet "savedWallet"
  localStorage.setItem("savedWallet", wallet);

  console.log("Saldo sparat i LocalStorage: " + wallet);
}

//Todo list
//Man kan ta inte mer kort om man är 21 och till dealerns tur automatisk
//How to bet money?
// 3 kort borde inte backjack
