// ---------- Solar System Drag & Rotate ----------
document.addEventListener('DOMContentLoaded', () => {
    const solarSystem = document.querySelector('.solar-system');

    let isDragging = false;
    let startX = 0, startY = 0;
    let rotateX = 0, rotateY = 0; // vertical (pitch) and horizontal (yaw)
    let panX = 0, panY = 0;       // optional panning

    const rotationSensitivity = 0.2; // degrees per pixel
    const panSensitivity = 1;        // pixels per pixel (for future pan)

    // ---------- START DRAG ----------
    function startDrag(x, y) {
        isDragging = true;
        startX = x;
        startY = y;
        solarSystem.style.cursor = 'grabbing';
    }

    // ---------- STOP DRAG ----------
    function stopDrag() {
        isDragging = false;
        solarSystem.style.cursor = 'grab';
    }

    // ---------- DRAG MOVE ----------
    function dragMove(x, y) {
        if (!isDragging) return;

        const deltaX = x - startX;
        const deltaY = y - startY;

        // Update rotation
        rotateY += deltaX * rotationSensitivity;
        rotateX -= deltaY * rotationSensitivity; // inverted for natural control

        // Optional: update pan if needed
        // panX += deltaX * panSensitivity;
        // panY += deltaY * panSensitivity;

        // Clamp vertical rotation
        rotateX = Math.max(-90, Math.min(90, rotateX));

        updateTransform();

        startX = x;
        startY = y;
    }

    // ---------- APPLY TRANSFORM ----------
    function updateTransform() {
        solarSystem.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${panX}px) translateY(${panY}px)`;
    }

    // ---------- EVENT LISTENERS ----------
    // Mouse
    solarSystem.addEventListener('mousedown', e => {
        startDrag(e.clientX, e.clientY);
        e.preventDefault();
    });

    document.addEventListener('mousemove', e => dragMove(e.clientX, e.clientY));
    document.addEventListener('mouseup', stopDrag);

    // Touch (mobile support)
    solarSystem.addEventListener('touchstart', e => {
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
    });

    document.addEventListener('touchmove', e => {
        const touch = e.touches[0];
        dragMove(touch.clientX, touch.clientY);
    }, { passive: false });

    document.addEventListener('touchend', stopDrag);

    // Reset view button
    document.getElementById('reset-view-btn')?.addEventListener('click', () => {
        rotateX = 0;
        rotateY = 0;
        panX = 0;
        panY = 0;
        updateTransform();
    });

    // ---------- INITIALIZE ----------
    solarSystem.style.transformOrigin = 'center center';
    solarSystem.style.transformStyle = 'preserve-3d';
    solarSystem.style.cursor = 'grab';
    updateTransform();
});
