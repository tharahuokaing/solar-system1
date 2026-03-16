// script2.js - Revised for Y2K38 hologram solar system

document.addEventListener('DOMContentLoaded', () => {
    const planets = document.querySelectorAll('.planet');
    const infoPanel = document.getElementById('planet-info-panel');
    const infoName = document.getElementById('info-planet-name');
    const infoData = document.getElementById('info-planet-data');
    const closeBtn = document.getElementById('close-info-panel');
    const solarSystem = document.querySelector('.solar-system');

    // EMP Flash function - localized to clicked planet
    function triggerEMPFlash(planetEl) {
        planetEl.classList.add('emp-flash');
        setTimeout(() => {
            planetEl.classList.remove('emp-flash');
        }, 250); // matches CSS animation duration
    }

    // Planet data
    const planetData = {
        mercury: { name: 'Mercury', moons: 0, diameter: '4,879 km', distance: '57.9 million km (0.39 AU)', composition: 'Rocky, metallic core', description: 'Smallest planet, closest to the Sun.', color: '#A0A0A0', scale: 1.5 },
        venus:   { name: 'Venus', moons: 0, diameter: '12,104 km', distance: '108.2 million km (0.72 AU)', composition: 'Rocky, iron core, dense atmosphere', description: 'Earth\'s sister planet, similar size.', color: '#E0C060', scale: 1.4 },
        earth:   { name: 'Earth', moons: 1, diameter: '12,742 km', distance: '149.6 million km (1 AU)', composition: 'Rocky, iron core, water, nitrogen-oxygen atmosphere', description: 'Our home planet.', color: '#6080E0', scale: 1.3 },
        mars:    { name: 'Mars', moons: 2, diameter: '6,779 km', distance: '227.9 million km (1.52 AU)', composition: 'Rocky, iron core, thin atmosphere', description: 'The Red Planet.', color: '#C04020', scale: 1.6 },
        jupiter: { name: 'Jupiter', moons: 79, diameter: '139,820 km', distance: '778.5 million km (5.2 AU)', composition: 'Hydrogen, Helium (Gas Giant)', description: 'Largest planet, Great Red Spot.', color: '#D0A070', scale: 1.1 },
        saturn:  { name: 'Saturn', moons: 82, diameter: '116,460 km', distance: '1.4 billion km (9.5 AU)', composition: 'Hydrogen, Helium (Gas Giant)', description: 'Famous for rings.', color: '#E0D0B0', scale: 1.05 },
        uranus:  { name: 'Uranus', moons: 27, diameter: '50,724 km', distance: '2.9 billion km (19.8 AU)', composition: 'Water, methane, ammonia ices (Ice Giant)', description: 'Rotates on its side.', color: '#A0E0E0', scale: 1.2 },
        neptune:{ name: 'Neptune', moons: 14, diameter: '49,244 km', distance: '4.5 billion km (30.1 AU)', composition: 'Water, methane, ammonia ices (Ice Giant)', description: 'Farthest planet.', color: '#4060C0', scale: 1.25 },
        pluto:  { name: 'Pluto', moons: 5, diameter: '2,376 km', distance: '5.9 billion km (39.5 AU)', composition: 'Rock and ice', description: 'Dwarf planet in Kuiper Belt.', color: '#B08090', scale: 1.8 }
    };

    let activePlanet = null;

    // ---------- Show Planet Info ----------
    function showInfo(planetId) {
        const data = planetData[planetId];
        if (!data) return;
        infoName.textContent = data.name;
        infoData.innerHTML = `
            <p><strong>Moons:</strong> ${data.moons}</p>
            <p><strong>Diameter:</strong> ${data.diameter}</p>
            <p><strong>Distance from Sun:</strong> ${data.distance}</p>
            <p><strong>Composition:</strong> ${data.composition}</p>
            <p><strong>Description:</strong> ${data.description}</p>
        `;
        infoPanel.classList.add('active');
        solarSystem.classList.add('info-panel-active');
    }

    // ---------- Hide Planet Info ----------
    function hideInfo() {
        infoPanel.classList.remove('active');
        solarSystem.classList.remove('info-panel-active');
    }

    // ---------- Zoom Planet ----------
    function toggleZoom(planetEl, planetId) {
        if (activePlanet && activePlanet !== planetEl) {
            activePlanet.classList.remove('zoomed');
            activePlanet.style.transform = '';
            activePlanet.style.zIndex = '';
        }

        planetEl.classList.toggle('zoomed');

        if (planetEl.classList.contains('zoomed')) {
            activePlanet = planetEl;
            const scale = planetData[planetId].scale || 2;
            planetEl.style.transform = `scale(${scale})`;
            planetEl.style.zIndex = 100;
        } else {
            activePlanet = null;
            planetEl.style.transform = '';
            planetEl.style.zIndex = '';
        }
    }

    // ---------- Add Click Event to Each Planet ----------
    planets.forEach(planetEl => {
        const planetId = Array.from(planetEl.classList).find(cls => planetData[cls]);
        if (!planetId) return;

        planetEl.addEventListener('click', () => {
            showInfo(planetId);
            toggleZoom(planetEl, planetId);
            triggerEMPFlash(planetEl); // Localized EMP flash
        });
    });

    // ---------- Close Info Panel ----------
    closeBtn.addEventListener('click', () => {
        hideInfo();
        if (activePlanet) {
            activePlanet.classList.remove('zoomed');
            activePlanet.style.transform = '';
            activePlanet.style.zIndex = '';
            activePlanet = null;
        }
    });

    // ---------- Close Panel Clicking Outside ----------
    document.addEventListener('click', e => {
        if (!infoPanel.contains(e.target) && !e.target.closest('.planet') && infoPanel.classList.contains('active')) {
            hideInfo();
            if (activePlanet) {
                activePlanet.classList.remove('zoomed');
                activePlanet.style.transform = '';
                activePlanet.style.zIndex = '';
                activePlanet = null;
            }
        }
    });
});
