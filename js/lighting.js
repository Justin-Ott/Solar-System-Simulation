import * as THREE from '../lib/three.module.js';

export function initLighting(scene, sun) {
    // Ambient light (soft background light)
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Point light from the sun
    const sunLight = new THREE.PointLight(0xffffff, 2, 200, 2); // (color, intensity, distance, decay)
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;

    // Attach light to the sun mesh
    sun.add(sunLight);

    // Optional: soft ambient color gradient
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.2);
    scene.add(hemisphereLight);
}
