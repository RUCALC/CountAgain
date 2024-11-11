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

class AudioManager {
    constructor() {
        // Configuration for the interaction button
        this.buttonConfig = {
            text: '🔊 Enable Audio',
            styles: {
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                zIndex: '1000'
            }
        };
        
        this.audioElements = new Map(); // Store multiple audio elements if needed
        this.init();
    }

    init() {
        // Only show button if audio hasn't been enabled yet
        if (!this.isAudioEnabled()) {
            this.createInteractionButton();
        } else {
            // If already enabled, we can auto-play
            this.handleAudioPlayback();
        }
    }

    isAudioEnabled() {
        return sessionStorage.getItem('audioEnabled') === 'true';
    }

    createInteractionButton() {
        const button = document.createElement('button');
        button.innerText = this.buttonConfig.text;
        
        // Apply styles
        Object.assign(button.style, this.buttonConfig.styles);
        
        // Add hover effect
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#45a049';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '#4CAF50';
        });

        // Handle click
        button.addEventListener('click', () => {
            this.enableAudio();
            button.remove();
        });

        document.body.appendChild(button);
    }

    enableAudio() {
        sessionStorage.setItem('audioEnabled', 'true');
        this.handleAudioPlayback();
    }

    handleAudioPlayback() {
        // Example of playing different audio based on the current page
        const currentPage = window.location.pathname;
        let audioSource;
        let nextPhaseCounter = 0;
        let lastAudio;

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

        // Listen again functionality 

        const playButton = document.getElementById('play-instructions');

        playButton.addEventListener('click', function() {
                lastAudio.play();
        });

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


    }
}

document.addEventListener('DOMContentLoaded', () => {
    const audioManager = new AudioManager();
});