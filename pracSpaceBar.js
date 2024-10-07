const spaceBarContainer = document.getElementById('spacebar-container');
const message = document.getElementById('message');
let spaceBarCount = 0;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        spaceBarCount++;
        console.log('spacebar pressed', spaceBarCount);
        createSmiley();
        updateMessage();
    }
});

function createSmiley() {
    const smiley = document.createElement('img');
    smiley.src = 'clear-relieved-emoji.png';
    smiley.alt = 'smiley';
    smiley.className = 'smiley';
    smiley.style.left = `${Math.random() * 80 + 10}%`;
    smiley.style.top = '80%';
    spaceBarContainer.appendChild(smiley);

    setTimeout(() => {
        smiley.remove();
    }, 2000);
}

function updateMessage() {
    if (spaceBarCount > 0) {
        message.textContent = "Good Job! Keep pressing the spacebar!";
    }
}