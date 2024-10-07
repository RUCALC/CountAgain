// initial state of showing 15 fruits

const initialContainer = document.getElementById('fruit-container');
const endContainer = document.getElementById('fruit-plate');

// click screen bc google autoplay policy is a bit dumb
document.getElementById('instructions').click();




// ui changer that changes text based on mode


function uiChanger() {
    if (!practice) {
        const Instructions = document.getElementById('instructions');

        Instructions.textContent = 'Press spacebar to move the fruits into the blue region.';

        const addButton = document.getElementById('add-fruit');
        addButton.textContent = 'Add Fruit';
        const removeButton = document.getElementById('remove-fruit');
        removeButton.textContent = 'Remove Fruit';
        const clearButton = document.getElementById('clear-fruit');
        clearButton.textContent = 'Clear Fruit';

        clearInterval(checkUI);
    }
}

let checkUI = setInterval(uiChanger, 1000);


// function to populate images array of fruits

function popFruits(fruitTypes) {
    let fruitCount = 15;
    let fruits = [];

    // loop thru each fruit type and add 15 of each to their own inner array based on their type
    // then push that inner array to the fruits array

    fruitTypes.forEach(fruitType => {
        let innerArray = [];
        for (let i = 0; i < fruitCount; i++) {
            innerArray.push(fruitType);
        }
        fruits.push(innerArray);
    })


    return fruits;

    // fruitTypes.forEach(fruitType => {
    //     for (let i = 0; i < fruitCount; i++) {
    //         fruits.push(fruitType);
    //     }
    // });

    // RETURNS EX:
    // let fruits = [
    //     ['Strawberry.png'] x 15,
    //     ['Banana.png'] x 15,
    //     ['Orange.png'] x 15,
    // ];
}

// *** CHANGE & ADD FRUITS HERE ***

const initFruitTypes = ['/images/Strawberry.png', '/images/Banana.png', '/images/Orange.png'];

let fruits;

fruits = popFruits(initFruitTypes);

let currentPhase = 0;

function setFruits(imagePaths) {
    // clear container if there are still leftover fruits from last phase
    initialContainer.innerHTML = '';



    imagePaths.forEach(imagePath => {
        const fruit = document.createElement('div');
        fruit.className = 'fruit';
        fruit.style.backgroundImage = `url(${imagePath})`;
        initialContainer.appendChild(fruit);
    })
}

// only show the fruits if practice is over

// create practice mode listener to see when its done

let prevPractBool = practice;
function checkPractice() {
    if (prevPractBool === true && practice === false) {
        console.log('practice is over');
        clearInterval(checkInterval);
    }
}

let checkInterval = setInterval(checkPractice, 1000);


// movement logic
// function to move fruits from initial container to end container


let foodType;

setInterval(setFoodType, 1000);

function setFoodType() {
    if (practice) {
        foodType = '.cookie';
    } else {
        foodType = '.fruit';
        initialContainerCookie.style.gap = '2px';
    }
}
function moveFruits() {
    if (initialContainer.children.length > 0) {
        // select the FIRST fruit in the initial container
        const fruit = initialContainer.querySelector(foodType);
        console.log(fruit);
        if (fruit) {
            const placeHolder = document.createElement('div');
            placeHolder.className = 'placeholder';
            initialContainer.replaceChild(placeHolder, fruit);
            endContainer.appendChild(fruit);
        }
    }
}

// use spacebar to trigger moveFruits()

document.addEventListener('keypress', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();

        moveFruits();
    }
});

// use button to trigger moveFruits()

const moveFruitButton = document.getElementById('add-fruit');

moveFruitButton.addEventListener('click', function() {
    moveFruits();
});

// remove fruit from end container and put back into initial container

// first need to be able to find the last placeHolder

function findLastPH() {
    const placeHolders = initialContainer.querySelectorAll('.placeholder');
    return placeHolders[placeHolders.length - 1];
}

function removeFruits() {
    if (!practice) {
        if (endContainer.children.length > 0) {
            const fruit = endContainer.querySelector(foodType);
            const placeHolder = findLastPH();
            initialContainer.replaceChild(fruit, placeHolder);
        }
    }
}

// use button to trigger removeFruits()

const removeFruitButton = document.getElementById('remove-fruit');

removeFruitButton.addEventListener('click', function() {
    removeFruits();
});

// clear fruit is taken care of by clearFood in practice.js

// use R key to trigger clearFruits()

document.addEventListener('keypress', function(event) {
    if (event.code === 'KeyR') {
        event.preventDefault();

        clearFood();
    }
});

// use button to trigger clearFruits()

const clearFruitButton = document.getElementById('clear-fruit');

clearFruitButton.addEventListener('click', function() {
    clearFood();
});

// prevent spacebar from triggering the buttons

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('keypress', event => {
        if (event.key === " " || event.key === "Spacebar") {
            event.preventDefault();
            event.target.blur();
        }
    })
});

// *** PHASE LOGIC ***

let numberOrder = [ 'practice', 1, 3, 5, 2, 10, 4, 2, 4, 1, 3, 10, 5, 4, 5, 1, 3, 10, 2];

const displayNum = document.getElementById('display-num');
const nextPhaseButton = document.getElementById('next-phase');


let currentIndex = 0;
let childOrder = [];

// only display if practice is over
if (!practice) {
    displayNum.textContent = numberOrder[currentIndex];
}
// function to change phase

function changePhase() {
    if (!practice) {
        if (currentIndex < numberOrder.length - 1) {
            // add the number of fruits the child put to the childOrder array
            // check that the class of the objects inside the container are fruit
            initialChildren = initialContainer.querySelectorAll('.fruit');

            if (initialChildren.length > 0) {
                childOrder.push(endContainer.children.length);
            }
            // change the fruits to the next phase
            currentPhase = (currentPhase + 1) % 3;

            // move to the next number in the numberOrder array
            currentIndex++;
            displayNum.textContent = numberOrder[currentIndex];

            console.log(childOrder);

            // clear all the fruits & add new fruits
            endContainer.innerHTML = '';
            setFruits(fruits[currentPhase]);


        } else {
            childOrder.push(endContainer.children.length);
            displayNum.textContent = 'All done here! Please close this window and return to Children Helping Science.';

            let nameData;

            nameData = savefilename();

            saveData(nameData, makeData());
        }
    } else {
        // STUFFS left off here but basically need to figure out the phasing with practice mode
    }
}

// use button to trigger changePhase()

nextPhaseButton.addEventListener('click', function() {
    changePhase();
});

//get SubID
function savefilename(){
    const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const subjectID = urlParams.get('a1');
  return subjectID;
  }
  // save data
  function saveData(name, data){
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'write_data_file.php');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({filename: name, filedata: data}));
    }

    function download_csv(name, data) {
      var csv = data;
      console.log(csv);
      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      //hiddenElement.target = '_blank';
      hiddenElement.download = name;
      hiddenElement.click();
    }

// create random ID - DEPRECATED, using id from LOOKIT

// function generateID(length) {
//     const alphabetChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     let result = '';
//     let randomIndex;
//     for (i = 0; i < length; i++) {
//         randomIndex = Math.floor(Math.random() * alphabetChars.length);
//         result += alphabetChars[randomIndex];
//     }
//     return result;
// }


  function makeData() {

    // put the data in the value key pairs
    let childDataCsv = childOrder.join(',');

    return childDataCsv;
  }
