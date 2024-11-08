const findSpaceBar = document.getElementById('findSpaceBar');

document.addEventListener('click', () => {
    const audio = document.getElementById("myAudio");
    audio.play().catch(error => {
        console.error("Audio play was blocked:", error);
    });
}, { once: true });
