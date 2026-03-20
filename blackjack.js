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

function startGame() {
  //Hiiden kort value med första korten
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

function hit() {
  let card = deck.pop();
  playerSum += getCardValue(card);
  playerAcesCount = checkAces(card);

  let cardImage = document.createElement("img");
  cardImage.src = "./cards/" + card + ".png";
  document.getElementById("PlayerCards").append(cardImage);
  document.getElementById("playerSum").innerText = playerSum;

  if (playerSum > 21 && playerSum === 21) {
    // let message = "Dealer Wins!";
    let resultsElement = document.getElementById("results");
    resultsElement.innerText = message;
    ShowDealerCard = document;
    document.getElementById("moreCard").disabled = true;
  }
}

async function stand() {
  debugger;

  document.getElementById("stop").disabled = true;
  document.getElementById("moreCard").disabled = true;
  document.getElementById("hiddenCard").src = "./cards/" + hiddenCard + ".png";
  document.getElementById("dealerSum").innerText = dealerSum;

  await delay(1000);

  while (dealerSum < 17) {
    console.log("Dealer drar ett kort...");
    let moreCardToDealer = deck.pop();
    dealerSum += getCardValue(moreCardToDealer);

    let newCardToDealerImg = document.createElement("img");
    newCardToDealerImg.src = "./cards/" + moreCardToDealer + ".png";
    document.getElementById("DealerCards").append(newCardToDealerImg);
    document.getElementById("dealerSum").innerText = dealerSum;

    await delay(1000);
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
    messageColor = "yellow";
  } else if (playerSum > dealerSum) {
    message = "You Win!!";
    messageColor = "#4CAF50";
  } else {
    message = "You Lose!";
    messageColor = "#FF4d4d";
  }
  resultsElement.innerText = message;
  resultsElement.style.color = messageColor;

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

function deal() {
  location.reload();
}

//TODOLIST
//21 om player 21 och dealer mindre än 21 då player vinner direkt
//DO function CheckBlackJack
