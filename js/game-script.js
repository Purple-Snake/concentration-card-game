"use strict"

class boardSquare {
    constructor(element, color) {
    this.element = element;

    this.element.addEventLisitner("click", this, false);

    handleEvent(event) {
        switch (event.type) {
            case "click":
                console.log(this.color + "square clicked");
        }
    }

    this.isFaceUp = false;
    this.isMatched = false;
    this.setColor(color);
    }
    setColor(color) {
        const faceUpElement = this.element.getElementsByClassName("faceup")[0];

        this.color = color;

        faceUpElement.classList.add(color);
    }
}

function generateHTMLForBoardSquares() {
	const numberOfSquares = 16;
	let squaresHTML = "";
	
	for (let i = 0; i < numberOfSquares; i++) {
	    squaresHTML += `
	    <div class="col-3 board-square flipped">
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

    // Kol yra likusių elementų mayšytį
    while (0 !== currentIndex) {
        // Paimk likusius elementus
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

    // Ir sumaišyk su dabartiniu elemntu
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