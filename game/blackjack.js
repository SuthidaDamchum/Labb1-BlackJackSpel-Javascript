const activePlayer = JSON.parse(localStorage.getItem("currentUser"));

var isGameActive = false;
let isBettingTime = false;

var playerSum = 0;
var dealerSum = 0;
var playerAcesCount = 0;
var dealerAcesCount = 0;
var hiddenCard;
let currentBet = 0;

var chip100 = 100;
var chip200 = 200;
var chip500 = 500;
var chip1000 = 1000;

let canHit = false;

document.getElementById("start-button").addEventListener("click", sitDown);

var wallet = Number(localStorage.getItem("savedWallet")) || 1000;

function sitDown() {
  isGameActive = true;
  isBettingTime = true;
  document.getElementById("start-button").style.display = "none";
  document.getElementById("stop").disabled = true;
  document.getElementById("moreCard").disabled = true;
  document.getElementById("newGame").disabled = true;
  setChipButtonsEnabled(true);

  buildDeck();

  shuffleDeck();
}

window.onload = function () {
  setupUser();
  updateUI();
  document.getElementById("moreCard").addEventListener("click", hit);
  document.getElementById("stop").addEventListener("click", stand);
  document.getElementById("newGame").addEventListener("click", deal);
  document.getElementById("topup-money").addEventListener("click", topUpMoney);
  document.getElementById("exit").addEventListener("click", exit);
  document.getElementById("newGame").disabled = true;
  document.getElementById("stop").disabled = true;
  document.getElementById("moreCard").disabled = true;
  setChipButtonsEnabled(false);
};

function setChipButtonsEnabled(enabled) {
  document.querySelectorAll(".coins img").forEach((chip) => {
    if (enabled) {
      chip.classList.remove("disabled");
    } else {
      chip.classList.add("disabled");
    }
  });
}

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

function placeBet(amount) {
  if (isBettingTime === false || isGameActive === false) {
    return;
  }

  if (amount <= wallet) {
    wallet -= amount;
    currentBet += amount;

    document.getElementById("moreCard").disabled = true;
    document.getElementById("stop").disabled = true;
    document.getElementById("newGame").disabled = false;

    document.getElementById("balance").innerText = wallet;
    document.getElementById("bet-display").innerText = currentBet;
    localStorage.setItem("savedWallet", wallet);
  } else {
    alert("You don't have enough money!");
  }
}

async function startGame() {
  document.getElementById("newGame").disabled = true;

  const dealerHiddenCard = document.getElementById("DealerCards");
  dealerHiddenCard.innerHTML =
    '<img id="hiddenCard" src="../cards/Back.png" />';

  hiddenCard = deck.pop();
  dealerSum += getCardValue(hiddenCard);
  dealerAcesCount += checkAces(hiddenCard);

  //Dealerns kort 2
  let card = deck.pop();
  let cardImage = document.createElement("img");
  cardImage.src = "../cards/" + card + ".png";
  dealerSum += getCardValue(card);
  dealerAcesCount += checkAces(card);

  document.getElementById("DealerCards").append(cardImage);

  //Player 1
  card = deck.pop();

  cardImage = document.createElement("img");
  cardImage.src = "../cards/" + card + ".png";
  playerSum += getCardValue(card);
  playerAcesCount += checkAces(card);
  document.getElementById("PlayerCards").append(cardImage);

  //kort 2
  card = deck.pop();

  cardImage = document.createElement("img");
  cardImage.src = "../cards/" + card + ".png";
  playerSum += getCardValue(card);
  playerAcesCount += checkAces(card);
  playerSum = reducePlayerAces();
  document.getElementById("PlayerCards").append(cardImage);
  document.getElementById("playerSum").innerText = playerSum;
  // playerSum = 21;

  document.getElementById("newGame").disabled = true;
  document.getElementById("stop").disabled = false;
  document.getElementById("moreCard").disabled = false;

  if (playerSum === 21 || dealerSum === 21) {
    canHit = false;

    await delay(600);
    checkWinner();
  }
}

function hit() {
  if (!canHit) {
    return;
  }

  let card = deck.pop();

  playerSum += getCardValue(card);
  playerAcesCount += checkAces(card);

  let cardImage = document.createElement("img");
  cardImage.src = "../cards/" + card + ".png";
  document.getElementById("PlayerCards").append(cardImage);
  playerSum = reducePlayerAces();
  document.getElementById("playerSum").innerText = playerSum;

  if (playerSum > 21) {
    canHit = false;
    checkWinner();
  } else if (playerSum === 21) {
    stand();
  }
}

async function stand() {
  if (canHit === false) {
    return;
  }

  document.getElementById("stop").disabled = true;

  document.getElementById("moreCard").disabled = true;

  document.getElementById("hiddenCard").src = "../cards/" + hiddenCard + ".png";

  document.getElementById("dealerSum").innerText = dealerSum;

  await delay(100);

  while (dealerSum < 17) {
    let moreCardToDealer = deck.pop();
    dealerSum += getCardValue(moreCardToDealer);
    dealerAcesCount += checkAces(moreCardToDealer);
    dealerSum = reduceDelaerAces();

    let newCardToDealerImg = document.createElement("img");
    newCardToDealerImg.src = "../cards/" + moreCardToDealer + ".png";
    document.getElementById("DealerCards").append(newCardToDealerImg);

    await delay(100);
  }
  checkWinner();
  updateBalanceInLocalStorage();
}

function deal() {
  console.log("NU klicka deal");
  if (currentBet <= 0) {
    console.log("Please place your bet först");
    return;
  }
  document.getElementById("stop").disabled = false;
  document.getElementById("moreCard").disabled = false;
  document.getElementById("newGame").disabled = false;
  document.getElementById("newGame").disabled = false;

  isBettingTime = false;
  canHit = true;
  document.getElementById("DealerCards").innerHTML =
    '<img id="hiddenCard" src="../cards/Back.png">';
  startGame();
}

function checkWinner() {
  let message = "";
  let messageColor = "black";

  let cardPlayerOnTable = document
    .getElementById("PlayerCards")
    .getElementsByTagName("img").length;

  let resultsElement = document.getElementById("results");
  document.getElementById("hiddenCard").src = "../cards/" + hiddenCard + ".png";
  document.getElementById("dealerSum").innerText = dealerSum;

  if (playerSum === 21 && cardPlayerOnTable === 2 && dealerSum !== 21) {
    message = "BLACKJACK! ★";
    messageColor = "#FFD700";
    updateWallet(currentBet * 2);
  } else if (playerSum > 21) {
    message = "Dealer Wins!";
    messageColor = "#FF4d4d";
    updateWallet(0);
  } else if (dealerSum > 21) {
    message = "You Win!";
    messageColor = "#4CAF50";
    updateWallet(currentBet * 2);
  } else if (playerSum === dealerSum) {
    message = "Tie!";
    updateWallet(currentBet);
    messageColor = "yellow";
  } else if (playerSum > dealerSum) {
    message = "You Win!";
    messageColor = "#4CAF50";
    updateWallet(currentBet * 2);
  } else {
    message = "You Lose!";
    messageColor = "#FF4d4d";
    updateWallet(0);
  }
  setTimeout(nextRound, 3000);

  resultsElement.innerText = message;
  resultsElement.style.color = messageColor;

  document.getElementById("stop").disabled = true;
  document.getElementById("moreCard").disabled = true;
  document.getElementById("newGame").disabled = true;
  updateUI();
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

async function updateWallet(amount) {
  wallet += amount;

  await delay(3500);

  document.getElementById("balance").innerText = wallet;

  localStorage.setItem("savedWallet", wallet);

  console.log("Saldo sparat i LocalStorage: " + wallet);
}

function nextRound() {
  playerCard = [];
  dealerCard = [];
  playerSum = 0;
  dealerSum = 0;
  playerAcesCount = 0;
  dealerAcesCount = 0;
  hiddenCard = null;
  currentBet = 0;

  document.getElementById("results").innerText = "";
  document.getElementById("PlayerCards").innerHTML = "";
  document.getElementById("DealerCards").innerHTML = "";
  document.getElementById("bet-display").innerText = "0";
  document.getElementById("playerSum").innerText = "";
  document.getElementById("dealerSum").innerText = "";

  isBettingTime = true;
  canHit = true;

  document.getElementById("newGame").disabled = true;
  document.getElementById("stop").disabled = true;
  document.getElementById("moreCard").disabled = true;

  buildDeck();
  shuffleDeck();
}

function setActionButtonsDisabled(shouldBeDisabled) {
  document.getElementById("topup-money").disabled = shouldBeDisabled;
  document.getElementById("moreCard").disabled = shouldBeDisabled;
  document.getElementById("stop").disabled = shouldBeDisabled;
  document.getElementById("newGame").disabled = shouldBeDisabled;
}

function updateUI() {
  document.getElementById("balance").innerText = wallet;

  document.getElementById("bet-display").innerText = currentBet;

  if (wallet === 0) {
    document.getElementById("topup-money").style.display = "block";
  } else {
    document.getElementById("topup-money").style.display = "none";
    document.getElementById("topup-money").style.display = "none";
  }
}

function topUpMoney() {
  if (wallet <= 0) {
    wallet = 1000;

    document.getElementById("balance").innerText = wallet;
    document.getElementById("topup-money").style.display = "none";

    console.log("Wallet refilled to 1000!");
    updateBalanceInLocalStorage();
  }
}

function updateBalanceInLocalStorage() {
  activePlayer.balance = wallet;
  localStorage.setItem("currentUser", JSON.stringify(activePlayer));

  let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

  const userIndex = allUsers.findIndex(
    (user) => user.username === activePlayer.username,
  );

  if (userIndex !== -1) {
    allUsers[userIndex].balance = wallet;
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
  }
}

function exit() {
  if (currentBet > 0) {
    document.getElementById("exitModal").style.display = "block";
  } else {
    actuallyLogout();
  }
}

document.getElementById("confirmExit").onclick = function () {
  actuallyLogout();
};

document.getElementById("cancleExit").onclick = function () {
  document.getElementById("exitModal").style.display = "none";
};

function actuallyLogout() {
  updateBalanceInLocalStorage();
  localStorage.removeItem("currentUser");
  window.location.href = "../login/index.html";
}
function setupUser() {
  if (!activePlayer) {
    window.location.href = "../login/index.html";
    return;
  }

  const nameElement = document.getElementById("display-name");
  if (nameElement) {
    nameElement.innerText = "Player: " + activePlayer.username;
  } else {
    console.log("Tips: Du saknar id='display-name' i din HTML!");
  }
}
