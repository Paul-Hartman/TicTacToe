//This variable keeps track of whose turn it is
let activePlayer = 'X';
//This array stores an array of moves. We use this to determine win conditions.
let selectedSquares = [];

//This function is for placing x or o in a square
function placeXOrO(squareNumber) {
//This condition ensures a square hasnt been selected already
//The .some() method is used to check each element of selectedSquare array
//to see if it contains the square number clicked on
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //This variable retrieves the html element id that was clicked
        let select = document.getElementById(squareNumber);
        //This condition checks whos turn it is
        if (activePlayer === 'X') {
            //If active player is equal to X the x.png is placed in the html
            select.style.backgroundImage = "url('images/X3d.png')";
            //Active player may only be X or O so if not X it must be O
            
        } else {
            //if activePlayer is equal to O the o.png is placed in HTML
            select.style.backgroundImage = "url('images/O3d (1).png')";
        }
        //square Number and activePlayer are concactenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        //this calls a funcion to check for any win conditions
        checkWinConditions();
        //This condition is for changing the active player
        if (activePlayer === 'X') {
            //if active player is X change it to O
            activePlayer = 'O';
        //if active player is anything other than X
        } else {
            //change the active player to 'X'
            activePlayer = 'X';
        }

        //this function is the placement of sound
        audio('./media/baloonPlace.mp3');
        //this condition chechs to see if it is the computers turn
        if (activePlayer === 'O') {
            //this function disables clicking for computer choice
            disableClick();
            //This functiuon waits 1 second before computer places image and enables click
            setTimeout(function () { computersTurn();}, 1000)
        }
        //returning true is needed for out computersTurn() function to work
        return true;
    }
    //this function results in a random square being selected
    function computersTurn() {
        //this boolean is needed for our while loop
        let success = false;
        //this variable stores a random number 0-8.
        let pickASquare;
        //this condition allows our while loop to keep trying if a square is selected already
        while (!success) {
            //a random number between 0-8 is selected
            pickASquare = String(Math.floor(Math.random() * 9));
            //if the random number evaluated returns true, the square hasnt been selected yet
            if (placeXOrO(pickASquare)) {
                //this line calls the function
                placeXOrO(pickASquare);
                //This changes our boolean and ends the loop
                success = true;

            };
        }
    }
}
console.log(activePlayer)
//this function parses the selectedSquares array to search for win conditions
//drawWinLine function is called to draw line if condition is met
function checkWinConditions() {
    //x 0, 1, 2 condition
    if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) }
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304) }
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) }
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) }
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558) }
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) }
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90) }
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520) }
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100) }
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304) }
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508) }
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558) }
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558) }
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558) }
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90) }
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520) }
    //this condition checks for a tie. If none of the above conditions register and 9 
    //squares are selected the code executes
    else if (selectedSquares.length >= 9) {
        //this function plays the tie game sound
        audio('./media/balloonTie.mp3');
        //this function sets a .3 second timer before the resetGame is called
        setTimeout(function () { resetGame(); }, 1000);
    }
        //This function checks if an array includes 3 strings. It is used to check for 
        //each win condition
    function arrayIncludes(squareA, squareB, squareC) {
        //these 3 variables will be used to check for 3 in a row
        const a = selectedSquares.includes(squareA)
        const b = selectedSquares.includes(squareB)
        const c = selectedSquares.includes(squareC)
        //If the 3 variables we pass are all inclkuded in our array true is
        //returned and our else if condition executes and the drawWinLine function
        if (a === true && b ===true && c ===true) {return true}
        }
    
}

//this function makes ouyr body element temporarily unclickable
function disableClick() {
    //this makes our body unclickable
    body.style.pointerEvents = 'none';
    //this makes our body clickable again
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000);
}

//this function takes a string parameter of the path you set earlier for
//placement sound ('./media/place.mp3)
function audio(audioURL) {
    //we create a new audio object and we pass the path as a parameter
    let audio = new Audio(audioURL);
    //play method plays our audio
    audio.play();
}

//This function utilizes html canvas to draw lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //this line accesses our html canvas element
    const canvas = document.getElementById('win-lines')
    //this line gives us acces to methods and properties to use on canvas
    const c = canvas.getContext('2d');
    //this line indicates where the start of a lines x axis is
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2;
    //this variable stores temporary y axis data we update in our animation loop
        x = x1,
        y = y1;
    
    //this function interacts with the canvas
    function animateLineDrawing() {
        //this variable creates a loop
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        //this method clears content from last loop iteration
        c.clearRect(0, 0, 608, 608)
        //this method starts a new path
        c.beginPath();
        //this method moves us to a starting point for our line
        c.moveTo(x1, y1)
        //this method indicates the end point in our line
        c.lineTo(x, y)
        //this method sets the width of the line
        c.lineWidth = 10;
        //this method sets the color of the line
        c.strokeStyle = 'rgba(70, 255, 33, .8)';
        //this method draws everything we have laid out above
        c.stroke();
        // this condition checks if we have reached the end point
        if (x1 <= x2 && y1 <= y2) {
            //this condition adds 10 to the previos end x point
            if (x < x2) { x += 10; }
            if (y < y2) { y += 10; }
            //this condition cancels our animation loop if we have reached our end points
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
        }
            //this condition is similar to the one above
            //this is necessary fir the 6, 4, 2 win condition
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop);}
        }
        
    }

    //this function clears our canvas after our win line is drawn
    function clear() {
        //this line starts an animation loop
        const animationLoop = requestAnimationFrame(clear);
        //this line clears our canvas
        c.clearRect(0, 0, 608, 608)
        //this line stops our animation loop
        cancelAnimationFrame(animationLoop);
    }
    //this line disalows clicking while the win sound is playing
    disableClick();
    //this line plays the win sound
    audio('./media/glitterWinSound.mp3');
    //this line calls out our main animation loop
    animateLineDrawing();
    setTimeout(function () { clear(); resetGame(); }, 1000);
}

//this function resets the game in the event of a tie or a win
function resetGame() {
    for (let i = 0; i < 9; i++) {
        //this variable gets the html element
        let square = document.getElementById(String(i))
        //this removes our elements backgrounds
        square.style.backgroundImage = ''
    }
    //this resets our array so it is empty and we can start over 
    selectedSquares = [];
}
