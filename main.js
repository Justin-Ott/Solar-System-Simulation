import * as THREE from './lib/three.module.js';

import { initCamera, initCameraControls, updateCamera } from './js/camera.js';
import { createStars } from './js/stars.js';
import { initLighting } from './js/lighting.js';
import { createSolarSystem } from './js/planets.js';
import { loadSpaceship } from './js/spaceship.js';
import { initUI, updateUI } from './js/ui.js';

// Scene setup
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Initialize basic scene elements that don't depend on loaded assets
const camera = initCamera(renderer);
const controls = initCameraControls(camera, renderer);
createStars(scene);

// Temporary ambient light while assets load
const tempLight = new THREE.AmbientLight(0x404040, 0.3);
scene.add(tempLight);

// Load assets and initialize the rest
let planets = [];
let spaceship;

const keysPressed = { w: false, a: false, s: false, d: false };

Promise.all([
    createSolarSystem(scene, camera), // Pass camera to update positions 
    loadSpaceship(scene)
]).then(([{ sun, planets: loadedPlanets }, loadedSpaceship]) => {
    document.getElementById('loading').style.display = 'none';

    // Remove temp light and add proper lighting
    scene.remove(tempLight);
    initLighting(scene, sun);

    planets = loadedPlanets;

    // Create a pivot around the sun (0,0,0)
    const spaceshipPivot = new THREE.Object3D();
    scene.add(spaceshipPivot);

    // Place the spaceship at an orbiting radius
    loadedSpaceship.position.set(9, 0, 0);
    spaceshipPivot.add(loadedSpaceship);

    spaceship = loadedSpaceship;
    spaceship.userData.pivot = spaceshipPivot;

    initUI(scene, camera);
    animate();
});

window.addEventListener('keydown', (e) => {
    keysPressed[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', (e) => {
    keysPressed[e.key.toLowerCase()] = false;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    updateCamera(camera);
    planets.forEach(planet => planet.update());
    updateUI();

    if (spaceship) {
        const orbitSpeed = 0.02;
        const pivot = spaceship.userData.pivot;

        // Orbit control (pivot rotation around Y axis)
        if (keysPressed.a) pivot.rotation.y += orbitSpeed;
        if (keysPressed.d) pivot.rotation.y -= orbitSpeed;

        // Optional vertical orbit movement (Y-axis on spaceship itself)
        if (keysPressed.w) pivot.rotation.x += orbitSpeed;
        if (keysPressed.s) pivot.rotation.x -= orbitSpeed;

        // Self-rotation (spin around own axis for some realism)
        spaceship.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

// Window resize handler felt like I needed this
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
