// This module for an interactive UI for the planet information
// was planned but I could not implement it in time for the deadline.
// I have included the code here for future reference.

import * as THREE from '../lib/three.module.js';

let planetInfoDiv;
let selectedPlanet = null;

export function initUI(scene, camera) {
    planetInfoDiv = document.getElementById('planet-info');
    
    // Add click event listener for planet selection
    window.addEventListener('click', (event) => {
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );
        
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects(scene.children, true);
        
        if (intersects.length > 0) {
            let obj = intersects[0].object;
            while (obj.parent && !obj.userData.isPlanet) {
                obj = obj.parent;
            }
            
            if (obj.userData.isPlanet) {
                selectedPlanet = obj;
                updatePlanetInfo(obj);
            }
        }
    });
}

function updatePlanetInfo(planet) {
    planetInfoDiv.innerHTML = `
        <h3>${planet.userData.name}</h3>
        <p>Distance from Sun: ${planet.userData.distance} AU</p>
        <p>Orbital Period: ${planet.userData.period} Earth days</p>
        <p>Diameter: ${planet.userData.diameter} km</p>
    `;
}

export function updateUI() {
    // Could add real-time updates here
}