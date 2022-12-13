"use strict"

class boardSquare {
    constructor(element, color) {
    this.element = element;

    this.element.addEventListener("click", this, false);

    this.isFaceUp = false;
    this.isMatched = false;
    this.setColor(color);

    }

    setColor(color) {
        const faceUpElement = this.element.getElementsByClassName("faceup")[0];

        this.color = color;

        faceUpElement.classList.add(color);
    }

    handleEvent(event) {
        switch (event.type) {
            case "click":
                // check if isFaceUp or isMatched are false
            if (this.isFaceUp || this.isMatched) {
                // if true do nothing
                
                return;
            }

            // if both are false set isFaceUp true and add the flipped class to the square 
            this.isFaceUp = true;
            this.element.classList.add("flipped");

            squareFlipped(this);
        }
    }

    reset() {
        this.isFaceUp = false;
        this.isMatched = false;
        this.element.classList.remove("flipped");
    }

    matchFound() {
        this.isFaceUp = true;
        this.isMatched = true;
    }
}

function generateHTMLForBoardSquares() {
	const numberOfSquares = 16;
	let squaresHTML = "";
	
	for (let i = 0; i < numberOfSquares; i++) {
	    squaresHTML += `
	    <div class="col-3 board-square">
	        <div class="face-container">
	            <div class="facedown"></div>
	            <div class="faceup"></div>
	        </div>
	    </div>`;
	}

	const boardElement = document.getElementById("gameboard");
	boardElement.innerHTML = squaresHTML;
}

const colorPairs = [];

function generateColorPairs() {
    if (colorPairs.length > 0) {
        return colorPairs;
    } else {
        for (let i = 0; i < 8; i++) {
            colorPairs.push("color-" + i);
            colorPairs.push("color-" + i);
        }
        return colorPairs;
    }
}

function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    }
    return array;
}

function shuffleColors() {
    const colorPairs = generateColorPairs()
    return shuffle(colorPairs);
}

const boardSquares = [];

function setUpGame() {
    generateHTMLForBoardSquares();

    const randomColorPairs = shuffleColors();

    const squareElements = document.getElementsByClassName("board-square");

    // Use for loop to add objects for the squares
    for (let i = 0; i < squareElements.length; i++) {
        const element = squareElements[i];
        const color = randomColorPairs[i];

        const square = new boardSquare(element, color)
        
        boardSquares.push(square);
    }
}

setUpGame()

let firstFaceUpSquare = null;

function squareFlipped(square) {
    if (firstFaceUpSquare === null ) {
        // check if the to be flipped square is the first one
        firstFaceUpSquare = square;
        return;
    }

    // if the selected square is the second square check if the colors match
    if (firstFaceUpSquare.color == square.color) {
        // if they do set both boardSquare objects to matched and clear the firstFaceUpSquare var.
        firstFaceUpSquare.matchFound();
        square.matchFound();

        firstFaceUpSquare = null;
    } else {
        // if not reset
        const a = firstFaceUpSquare;
        const b = square;

        firstFaceUpSquare = null;

        setTimeout(function() {
            a.reset();
            b.reset();
        }, 400);
    }
}