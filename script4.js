// script4.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Audio Elements ---
    const backgroundMusic = new Audio('space.mp3'); // Path to your ambient music

    // --- UI Elements ---
    const toggleMusicBtn = document.getElementById('toggle-music-btn');
    const volumeSlider = document.getElementById('volume-slider');

    // --- Background Music Settings ---
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3; // Default volume

    // --- Function to Play or Resume Music ---
    function playBackgroundMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                if (toggleMusicBtn) toggleMusicBtn.textContent = 'Pause Music';
                console.log("Background music started.");
            }).catch(err => {
                console.warn("Background music couldn't start automatically:", err);
                if (toggleMusicBtn) toggleMusicBtn.textContent = 'Play Music (click to start)';
            });
        }
    }

    // --- Function to Pause Music ---
    function pauseBackgroundMusic() {
        backgroundMusic.pause();
        if (toggleMusicBtn) toggleMusicBtn.textContent = 'Play Music';
        console.log("Background music paused.");
    }

    // --- Event Listeners ---

    // 1. Toggle Music Button
    if (toggleMusicBtn) {
        toggleMusicBtn.addEventListener('click', () => {
            backgroundMusic.paused ? playBackgroundMusic() : pauseBackgroundMusic();
        });
    }

    // 2. Volume Slider
    if (volumeSlider) {
        volumeSlider.value = backgroundMusic.volume; // Initialize slider
        volumeSlider.addEventListener('input', (event) => {
            backgroundMusic.volume = parseFloat(event.target.value);
            console.log("Music volume set to:", backgroundMusic.volume);
        });
    }

    // 3. Start music on first user interaction (required by browsers)
    const startMusicOnInteraction = () => {
        playBackgroundMusic();
        document.body.removeEventListener('click', startMusicOnInteraction);
        document.body.removeEventListener('keypress', startMusicOnInteraction);
    };
    document.body.addEventListener('click', startMusicOnInteraction, { once: true });
    document.body.addEventListener('keypress', startMusicOnInteraction, { once: true });

    // Initialize button text
    if (toggleMusicBtn) {
        toggleMusicBtn.textContent = backgroundMusic.paused ? 'Play Music' : 'Pause Music';
    }

    console.log("script4.js loaded: Ambient audio initialized.");
});
