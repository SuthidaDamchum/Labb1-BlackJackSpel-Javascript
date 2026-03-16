var playerSum = 0;
var dealerSum = 0;
var playerAcesCount = 0;
var dealerAcesCount = 0;
var hiddenCard;

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();
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

function startGame() {
  //Hiiden kort value med första korten
  console.log("Nu startar spelet!");
  hiddenCard = deck.pop();
  dealerSum += getCardValue(hiddenCard);
  dealerAcesCount += checkAces(hiddenCard);

  //Andra
  let card = deck.pop();
  let cardImage = document.createElement("img");
  cardImage.src = "./cards/" + card + ".png";
  dealerSum += getCardValue(card);
  dealerAcesCount += checkAces(card);
  document.getElementById("DealerCards").append(cardImage);
  document.getElementById("dealerSum").innerText = dealerSum;

  //Player 1
  card = deck.pop();
  cardImage = document.createElement("img");
  cardImage.src = "./cards/" + card + ".png";
  playerSum += getCardValue(card);
  playerAcesCount += checkAces(card);
  document.getElementById("PlayerCards").append(cardImage);

  //kort 2
  card = deck.pop();
  cardImage = document.createElement("img");
  cardImage.src = "./cards/" + card + ".png";
  playerSum += getCardValue(card);
  playerAcesCount += checkAces(card);
  document.getElementById("PlayerCards").append(cardImage);
  document.getElementById("playerSum").innerText = playerSum;
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

let message = "";

if (playerSum > 21) {
  message = "Dealer Wins!";
} else if (dealerSum > 21) {
  message = "You Win!";
} else if (playerSum == dealerSum) {
  message = "Tie!";
} else if (playerSum > dealerSum) {
  message = "You Win!";
} else {
  message = "Dealer Wins!";
}
doucment.getElementById("results").innerText = message;

function moreCard(card) {}
