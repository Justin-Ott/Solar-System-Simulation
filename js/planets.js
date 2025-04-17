import * as THREE from '../lib/three.module.js';

export function createSolarSystem(scene, assets) {
    return new Promise((resolve) => {
        // Load textures
        const textureLoader = new THREE.TextureLoader();
        const textures = {
            mercury: textureLoader.load('assets/textures/mercury.jpg'),
            venus: textureLoader.load('assets/textures/venus.jpg'),
            earth: textureLoader.load('assets/textures/earth.jpg'),
            earthBump: textureLoader.load('assets/textures/earth_bump.jpg'),
            moon: textureLoader.load('assets/textures/moon.jpg'),
            mars: textureLoader.load('assets/textures/mars.jpg'),
            jupiter: textureLoader.load('assets/textures/jupiter.jpg'),
            saturn: textureLoader.load('assets/textures/saturn.jpg'),
            uranus: textureLoader.load('assets/textures/uranus.jpg'),
            neptune: textureLoader.load('assets/textures/neptune.jpg')
        };
        

        // Create sun with advanced shader material
        const sunGeometry = new THREE.SphereGeometry(5, 64, 64);
        const sunMaterial = new THREE.MeshPhongMaterial({
            map: textureLoader.load('assets/textures/sun.jpg'),
            emissive: 0xffff00,
            emissiveIntensity: 1.5,
            shininess: 100,
            specular: 0xffffff
        });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        // Create planets with factory pattern
        const planets = [
            createPlanet(0.5, 7, 0.04, textures.mercury),
            createPlanet(0.9, 10, 0.015, textures.venus),
            createPlanet(1.0, 13, 0.01, textures.earth, textures.earthBump),
            createPlanet(0.27, 1.5, 0.04, textures.moon), // Moon — we'll attach it to Earth below
            createPlanet(0.8, 17, 0.008, textures.mars),
            createPlanet(2.5, 24, 0.002, textures.jupiter),
            createPlanet(2.0, 30, 0.001, textures.saturn),
            createPlanet(1.5, 36, 0.0008, textures.uranus),
            createPlanet(1.5, 42, 0.0005, textures.neptune)
        ];
        
        // Earth is index 2, Moon is index 3
        planets[2].mesh.add(planets[3].group); // Add moon orbiting Earth
        planets[3].group.position.x = 2; // Distance from Earth

        // 💡 Add this right after defining the array
        planets.forEach(planet => {
            scene.add(planet.group);
        });
        

        resolve({ sun, planets });
    });
}

function createPlanet(size, distance, speed, texture, bumpMap = null) {
    const geometry = new THREE.SphereGeometry(size, 64, 64);
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        bumpMap: bumpMap,
        bumpScale: bumpMap ? 0.05 : 0,
        shininess: 10,
        specular: 0x111111
    });
    
    const planet = new THREE.Mesh(geometry, material);
    const planetGroup = new THREE.Group();
    planetGroup.add(planet);
    planet.position.x = distance;
    
    return {
        group: planetGroup,
        mesh: planet,
        speed: speed,
        update: function() {
            this.group.rotation.y += this.speed;
        }
    };
}

export function updatePlanets() {
    // Update planet positions and rotations
}