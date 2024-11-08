const findSpaceBar = document.getElementById('findSpaceBar');

document.addEventListener('click', () => {
    findSpaceBar.play().catch(error => {
        console.error("Audio play was blocked:", error);
    });
}, { once: true });
