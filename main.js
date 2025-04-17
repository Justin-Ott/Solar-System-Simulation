// Local module imports
import * as THREE from '../lib/three.module.js';
// import { OrbitControls } from './lib/OrbitControls.module.js';
// import { GLTFLoader } from './lib/GLTFLoader.module.js';
// import Stats from './lib/Stats.module.js';

// Local script imports
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

// Temporary ambient light while assets load (optional)
const tempLight = new THREE.AmbientLight(0x404040, 0.3);
scene.add(tempLight);

// Load assets and initialize the rest
let planets = [];

Promise.all([
    createSolarSystem(scene),
    loadSpaceship(scene)
]).then(([{ sun, planets: loadedPlanets }, spaceship]) => {
    document.getElementById('loading').style.display = 'none';
    
    // Remove temporary light
    scene.remove(tempLight);
    
    // Initialize proper lighting now that we have the sun
    initLighting(scene, sun);
    
    // Store planets for animation
    planets = loadedPlanets;
    
    // Initialize UI and start animation
    initUI(scene, camera);
    animate();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    updateCamera(camera); // Make sure to pass camera if needed
    planets.forEach(planet => planet.update());
    updateUI();
    renderer.render(scene, camera);
}

// Window resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});