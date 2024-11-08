const findSpaceBar = document.getElementById('findSpaceBar');

document.addEventListener('click', () => {
    const audio = document.getElementById("findSpaceBar");
    audio.play().catch(error => {
        console.error("Audio play was blocked:", error);
    });
}, { once: true });
