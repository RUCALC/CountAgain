const strawberryIMG = 'Strawberry.png'

const container = document.getElementById('sb-container')

var strawberryCount = 0; // list of numbers that are predetermined 

const marginX = 0;
const marginY = 10; 

document.addEventListener('keypress', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();

        const img = document.createElement('img');
        img.src = strawberryIMG;
        img.classList.add('strawberry');

        const xPos = (strawberryCount % 4) * (100 + marginX);
        const yPos = Math.floor(strawberryCount / 4) * (100 + marginY);

        img.style.left = `${xPos}px`;
        img.style.top = `${yPos}px`;    

        container.appendChild(img);
        strawberryCount++;
    }
});

// use R key to clear the webpage of strawberries

document.addEventListener('keypress', function(event) {
    if (event.code === 'KeyR') {
        event.preventDefault();

        const strawberries = document.querySelectorAll('.strawberry');
        strawberries.forEach(strawberry => strawberry.remove());
        strawberryCount = 0;

    }
});

// button functionality

// ADD strawberry

const addSbButton = document.getElementById('add-strawberry');

addSbButton.addEventListener('click', function() { 
        img = document.createElement('img');
        img.src = strawberryIMG;
        img.classList.add('strawberry');

        const xPos = (strawberryCount % 4) * (100 + marginX);
        const yPos = Math.floor(strawberryCount / 4) * (100 + marginY);


        img.style.left = `${xPos}px`;
        img.style.top = `${yPos}px`;    

        container.appendChild(img);
        strawberryCount++;


});

// REMOVE strawberry

const removeSbButton = document.getElementById('remove-strawberry');

removeSbButton.addEventListener('click', function() {
    const strawberries = document.querySelectorAll('.strawberry');
    if (strawberries.length > 0) {
        const lastStrawberry = strawberries[strawberries.length - 1];

        lastStrawberry.remove();

        strawberryCount--;
    }
 });

 // CLEAR strawberries 

 const clearSbButton = document.getElementById('clear-strawberries');

 clearSbButton.addEventListener('click', function() {
    const strawberries = document.querySelectorAll('.strawberry');

    strawberries.forEach(strawberry => strawberry.remove());
    strawberryCount = 0;
  });

// Check count strawberries logic

let numberOrder = [1, 3, 5, 2, 10, 4, 2, 4, 1, 3, 10, 5, 4, 5, 1, 3, 10, 2, 1, 10, 3, 2, 5, 4];

const displayNum = document.getElementById('display-num');
const nextPhaseButton = document.getElementById('next-phase');

let currentIndex = 0;
let childOrder = [];


document.getElementById('display-num').textContent = numberOrder[0];

nextPhaseButton.addEventListener('click', function() {
    if (currentIndex < numberOrder.length) {
        // add the number of strawberries the child put to the childOrder array
        childOrder.push(strawberryCount); 
        // clear all the strawberries
        const strawberries = document.querySelectorAll('.strawberry');
        strawberries.forEach(strawberry => strawberry.remove());
        strawberryCount = 0;
        // move to the next number in the numberOrder array
        currentIndex++;
        displayNum.textContent = numberOrder[currentIndex];

        console.log(childOrder);

    } else {
        displayNum.textContent = 'All done!';
    }
 });

// prevent spacebar from triggering the buttons

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('keypress', event => {
        if (event.key === " " || event.key === "Spacebar") {
            event.preventDefault();
            event.target.blur();

        }
    });
});