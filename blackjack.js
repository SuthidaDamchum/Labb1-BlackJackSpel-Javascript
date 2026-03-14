var hiddenCard;

window.onload = function () {
  buildDeck();

};



let deck = []
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
