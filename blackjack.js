var playerSum = 0;
var dealerSum = 0;
var playerAceCount = 0;
var dealerAceCount = 0;
var hiddenCard;

window.onload = function () {
  buildDeck();
  shuffleDeck();
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
  hiddenCard = deck.pop();
  dealerSum += getCardValue(hiddenCard);
  dealerAceCount += checkAcs(card)
  
  let card = deck.pop();
  playerSum += getCardValue(value)
  dealerAceCount += checkAcs(card)
}

function getCardValue(card) {
  let splitCard = card.split("_of_");
  let value = splitCard[0];

  if (isNaN(value)) {
    if (value == "ace") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);


function checkAcs(){

  let splitCard = card.split("_of_");
  let value = splitCard[0]

  if (value === "ace"){
        return 1;
      }
        return 0; 
}
   
}
