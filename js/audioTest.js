class AudioManager {
    constructor() {
        this.overlay = null;
        this.audio = null;
        this.init();
    }

    init() {
        // Create overlay
        this.overlay = document.createElement('div');
        Object.assign(this.overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '9999'
        });

        const button = document.createElement('button');
        Object.assign(button.style, {
            padding: '20px 40px',
            fontSize: '18px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        });
        button.textContent = '🔊 Click to Enter Site';

        button.onclick = () => {
            this.playAudio();
            this.overlay.remove();
        };

        this.overlay.appendChild(button);
        document.body.appendChild(this.overlay);
    }

    playAudio() {
        // Your audio logic here
        const pracSpaceBar = document.getElementById('pracSpaceBar');

        pracSpaceBar.play();
    }
}