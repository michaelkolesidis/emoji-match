const game = document.getElementById('game');

const title = document.createElement('h1');
title.innerHTML = 'Emoji Match';
game.appendChild(title);

const board = document.createElement('div');
board.setAttribute('id', 'board');
game.appendChild(board);

// Edit dimensions only
const boardWidth = 6;
const boardLength = 6;
board.style.display = 'grid';
board.style.width = 'fit-content';
board.style.gridTemplateColumns = `repeat(${boardWidth}, 1fr)`;
board.style.gridTemplateRows = 'auto auto';

const numberOfTiles = boardWidth * boardLength;
const numberOfSets = numberOfTiles / 2;

const tiles = [];
const sets = [];
const foundSets = [];

let remainingSets = numberOfSets;
let openTiles = 0;
let selectedSet = '';
let gameEnded = false;
let mistakes = 0;
let moves = 0;

// prettier-ignore
const emoji = [
  // Smileys
  '😀', '💩', '🤡', '🎃',
  // Clothing and Accessories
  '👠', '🧦', '🦺',
  // Animals & Nature
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦁', '🐻', '🐼', '🐨', '🐸', '🦊', '🐷', '🐵', '🐮', '🐥', '🦄', '🐞', '🍄', '🌺', '🌞' , '🌝', '🫎', '🐧',
  // Food
  '🍎', '🍌', '🍇', '🍉', '🍕', '🍆', '🥑', '🍊', '🍐', '🍑',
  // Activity and Sports
  '🏀', '🎾', '🛹', '🏓', '🏆', '🎲',
  // Travel & Places
  '🚗', '🚕', '🚙', '🚌', '🚎', '🚀', '🏖', '🏔', '🏛', '🌃',
  // Objects
  '💾', '⏰', '☎️', '💣', '🧸', '🎁', '🎈', 
  // Symbols
  '🩷', '🧡', '💜', '🔔',
];

const pickSets = (sourceArray, targetArray, numberOfElements) => {
  // Create a copy of the source array to avoid modifying the original
  let tempArray = [...sourceArray];

  // Check if the number of elements to pick is greater than the source array length
  if (numberOfElements > tempArray.length) {
    numberOfElements = tempArray.length;
  }

  for (let i = 0; i < numberOfElements; i++) {
    let randomIndex = Math.floor(Math.random() * tempArray.length);
    // Remove the element from the temp array and insert it into the target array
    let element = tempArray.splice(randomIndex, 1)[0];
    targetArray.push(element);
  }

  // Directly modify the targetArray to double its elements
  targetArray.push(...targetArray);
};

pickSets(emoji, sets, numberOfSets);

const insertTileContent = (array) => {
  if (array.length === 0) return undefined;
  // Generate a random index
  const randomIndex = Math.floor(Math.random() * array.length);
  // Remove the element from the array and return it
  return array.splice(randomIndex, 1)[0];
};

const populateTiles = () => {
  for (i = 0; i < numberOfTiles; i++) {
    const tile = {};
    tile.num = i;
    tile.content = insertTileContent(sets);
    tiles.push(tile);
  }
};

populateTiles();

tiles.forEach((tile) => {
  const tileElement = document.createElement('div');
  tileElement.innerHTML = '';
  tileElement.classList.add('tile');
  tileElement.setAttribute('id', tile.num);

  tileElement.addEventListener('click', () => {
    if (gameEnded === false) {
      moves += 1;
      movesIndicator.innerHTML = `Moves: ${moves}`;

      openTiles += 1;

      if (openTiles == 1 && selectedSet == '') {
        tileElement.innerHTML = `${tile.content}`;
        selectedSet = tile.content;
        return;
      } else if (openTiles == 2) {
        tileElement.innerHTML = tile.content;
        if (selectedSet == tile.content) {
          openTiles = 0;
          selectedSet = '';
          remainingSets -= 1;

          if (remainingSets == 0) {
            gameEnded = true;
            const winMessage = document.createElement('div');
            winMessage.innerHTML = 'You win!';
            game.appendChild(winMessage);
          }

          foundSets.push(tile.content);
          return;
        } else {
          openTiles = 0;
          selectedSet = '';

          setTimeout(() => {
            tileElemes.forEach((tileElement) => {
              if (foundSets.includes(tileElement.innerHTML)) {
                return;
              }
              tileElement.innerHTML = '';
            });
          }, 500);
        }
      } else {
        return;
      }
    }
  });

  board.appendChild(tileElement);
});

const tileElements = document.getElementsByClassName('tile');
const tileElemes = [...tileElements];

// Moves indicator
const movesIndicator = document.createElement('div');
movesIndicator.setAttribute('id', 'moves');
movesIndicator.innerHTML = `Moves: ${moves}`;
game.appendChild(movesIndicator);
