var playerSum = 0;
var dealerSum = 0;
var playerAcesCount = 0;
var dealerAcesCount = 0;
var hiddenCard;

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();

  document.getElementById("moreCard").addEventListener("click", hit);
  document.getElementById("stop").addEventListener("click", stand);
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
let messageColor = "white";

let resultsElement = document.getElementById("results");

if (playerSum > 21) {
  message = "You Lose!!";
  messageColor = "#FF4d4d";
} else if (dealerSum > 21) {
  message = "You win!!";
  messageColor = "#4CAF50";
} else if (playerSum == dealerSum) {
  message = "Tie!";
  messageColor = "white";
} else if (playerSum > dealerSum) {
  message = "You Win!!";
  messageColor = "#4CAF50";
} else {
  message = "You Lose!";
  messageColor = "#FF4d4d";
  doucment.getElementById("results").innerText = message;
}

function hit() {
  let card = deck.pop();
  playerSum += getCardValue(card);
  playerAcesCount = checkAces(card);

  let cardImage = document.createElement("img");
  cardImage.src = "./cards/" + card + ".png";
  document.getElementById("PlayerCards").append(cardImage);
  document.getElementById("playerSum").innerText = playerSum;

  if (playerSum > 21) {
    let message = "Dealer Wins!";
    let resultsElement = document.getElementById("results");
    resultsElement.innerText = message;
    document.getElementById("moreCard").disabled = true;

    //Delaer Visar kort hur man gör då?
    // Dealer visar kort direkt när jag öppnar
  }
}

function stand() {
  document.getElementById("stop").disabled = true;
  //Delaer Show Card and the result
  //Palyer still shwoing result
  let hiddenCardImg = document.getElementById("hiddencard");
  hiddenCardImg.src = "./cards/" + hiddenCard + ".png";
  document.getElementById("dealerCard").append(hiddenCardImg);

  // document.getElementById("playerSum").innerText = playerSum;
}
