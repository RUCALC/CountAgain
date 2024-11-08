// assign each html audio to a variable 
const findSpaceBar = document.getElementById('findSpaceBar');
const pracSpaceBar = document.getElementById('pracSpaceBar');
const spaceBarTrans = document.getElementById('spaceBarTrans');
const audioStartPrac = document.getElementById('audioStartPrac');
const audioPrac1 = document.getElementById('audioPrac1');
const audioPrac2 = document.getElementById('audioPrac2');
const audioStartTrial = document.getElementById('audioStartTrial');
const audioTrial1 = document.getElementById('audioTrial1');
const audioEnd = document.getElementById('audioEnd');

// trials 2-24 can go into an array to loop thru for better code readability

const audioTrials = ['../mp3/3orange.mp3', '../mp3/5strawberry.mp3', '../mp3/2banana.mp3', '../mp3/10orange.mp3', 
    '../mp3/4strawberry.mp3', '../mp3/2banana.mp3', '../mp3/4orange.mp3', '../mp3/1strawberry.mp3', '../mp3/3banana.mp3',
    '../mp3/10orange.mp3', '../mp3/5strawberry.mp3', '../mp3/4banana.mp3', '../mp3/5orange.mp3', '../mp3/1strawberry.mp3',
    '../mp3/3banana.mp3', '../mp3/10orange.mp3', '../mp3/2strawberry.mp3', '../mp3/1banana.mp3', '../mp3/10orange.mp3',
    '../mp3/3strawberry.mp3', '../mp3/2banana.mp3', '../mp3/5orange.mp3', '../mp3/4strawberry.mp3'];




// play the audio as soon as the page loads, commented out for dev

window.addEventListener('load', function() {
    var pageID = document.body.id;

   // check that spacebar phases have been cleared
    switch(pageID) {
        case 'spacebar1':  
            findSpaceBar.play();
            break;
        case 'spacebar2':
            pracSpaceBar.play();
            break; 
        case 'neutral':
            if (spaceBarTrans) {
                spaceBarTrans.play();
                spaceBarTrans.addEventListener('ended', function() {
                    window.location.href = 'index.html';
                })
            } else {
                console.log("spaceBarTrans audio element not found.");
            }
            break;
    
        case 'study':
            // play the p1cookie.mp3 audio
            audioStartPrac.play();
            audioStartPrac.addEventListener('ended', function() {
            audioPrac1.play();

                lastAudio = audioPrac1;
            });
            nextPhaseCounter++;

        }   
        
});



const instructionsElement = document.getElementById('instructions');

// Function to simulate a button click
function simulateButtonClick() {
    // Create a new event
    const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    // Dispatch the event on the button element
    instructionsElement.dispatchEvent(event);
}

// Simulate the button click after a delay
setTimeout(simulateButtonClick, 1000);

// listen again function and button 

let lastAudio;

const playButton = document.getElementById('play-instructions');

playButton.addEventListener('click', function() {
    lastAudio.play();
});

// everytime the phase button is pressed an audio has to play that corresponds to the fruit and the number

// option 1, correspond to the amount of times the next phase button is pressed and each time its pressed we iterate thru the audios
// the audios MUST autoplay
let nextPhaseCounter = 0;



// for the rest of the trials

const audioTrialPlayer = document.getElementById('trialPlayer');

function playNextTrial() {
    if (nextPhaseCounter < audioTrials.length + 3) {
        audioTrialPlayer.src = audioTrials[nextPhaseCounter - 3];
        audioTrialPlayer.play();

        lastAudio = audioTrialPlayer;
    }
}



const nextPhaseButtonAudio = document.getElementById('next-phase');

nextPhaseButtonAudio.addEventListener('click', function() {
    if (nextPhaseCounter === 0) {
        
    } else if (nextPhaseCounter === 1) {
        // play the p2cookie.mp3 audio
        audioPrac2.play();

        lastAudio = audioPrac2;
    } else if (nextPhaseCounter === 2) {
        audioTrial1.play();

        lastAudio = audioTrial1;
    
    } else if (nextPhaseCounter === 26) {
        // got rid of all done audio, playing through lookit 
    } else{
        playNextTrial();
    }
    nextPhaseCounter++;
});