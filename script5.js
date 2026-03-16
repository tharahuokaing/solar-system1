// script5.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Define Planet-Specific Audio Elements ---
    const planetSounds = {
        mercury: new Audio('audio/mercury_sound.mp3'),
        venus: new Audio('audio/venus_sound.mp3'),
        earth: new Audio('audio/earth_sound.mp3'),
        mars: new Audio('audio/mars_sound.mp3'),
        jupiter: new Audio('audio/jupiter_sound.mp3'),
        saturn: new Audio('audio/saturn_sound.mp3'),
        uranus: new Audio('audio/uranus_sound.mp3'),
        neptune: new Audio('audio/neptune_sound.mp3'),
        pluto: new Audio('audio/pluto_sound.mp3')
    };

    // Set default volume for all planet sounds
    for (const planetId in planetSounds) {
        if (planetSounds.hasOwnProperty(planetId)) {
            planetSounds[planetId].volume = 0.5; // Adjust default volume as needed
        }
    }

    // --- Get all planet elements ---
    const planets = document.querySelectorAll('.planet');

    if (!planets || planets.length === 0) {
        console.warn("No planet elements found for click sounds.");
        return;
    }

    // --- Add click event listeners to each planet ---
    planets.forEach(planetElement => {
        // Find the specific planet class (e.g., 'mercury', 'venus')
        const planetId = Array.from(planetElement.classList).find(cls => planetSounds.hasOwnProperty(cls));

        if (!planetId) return;

        planetElement.addEventListener('click', () => {
            const sound = planetSounds[planetId];
            if (sound) {
                // Stop and replay to allow rapid clicking
                sound.pause();
                sound.currentTime = 0;

                // Play the sound, handle potential autoplay restrictions
                sound.play().catch(error => {
                    console.warn(`Could not play sound for ${planetId}:`, error);
                });
            }
        });
    });

    console.log("script5.js loaded: Planet-specific audio functionality initialized.");
});
