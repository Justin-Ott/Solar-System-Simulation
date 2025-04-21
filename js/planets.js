import * as THREE from '../lib/three.module.js';

export function createSolarSystem(scene, camera) {
    return new Promise((resolve) => {
        const textureLoader = new THREE.TextureLoader();

        Promise.all([
            loadTexture(textureLoader, 'assets/textures/mercury.jpg'),
            loadTexture(textureLoader, 'assets/textures/venus.jpg'),
            loadTexture(textureLoader, 'assets/textures/earth.jpg'),
            loadTexture(textureLoader, 'assets/textures/earth_bump.jpg'),
            loadTexture(textureLoader, 'assets/textures/moon.jpg'),
            loadTexture(textureLoader, 'assets/textures/mars.jpg'),
            loadTexture(textureLoader, 'assets/textures/jupiter.jpg'),
            loadTexture(textureLoader, 'assets/textures/saturn.jpg'),
            loadTexture(textureLoader, 'assets/textures/saturn_ring.jpg'),
            loadTexture(textureLoader, 'assets/textures/uranus.jpg'),
            loadTexture(textureLoader, 'assets/textures/neptune.jpg'),
            loadTexture(textureLoader, 'assets/textures/sun.jpg')
        ]).then((textures) => {
            const [
                mercury, venus, earth, earthBump, moon, mars, 
                jupiter, saturn, saturnRing, uranus, neptune, sunTex
            ] = textures;

            const sunGeometry = new THREE.SphereGeometry(5, 64, 64);
            const sunMaterial = new THREE.MeshPhongMaterial({
                map: sunTex,
                emissive: 0xffff00,
                emissiveIntensity: 1.5,
                shininess: 100,
                specular: 0xffffff
            });
            const sun = new THREE.Mesh(sunGeometry, sunMaterial);
            scene.add(sun);

            const mercuryObj = createPlanet(0.5, 7, 0.04, mercury);
            const venusObj = createPlanet(0.9, 10, 0.015, venus);
            const earthObj = createPlanet(1.0, 13, 0.01, earth, earthBump);
            const moonObj = createPlanet(0.27, 1.5, 0.04, moon); 
            const marsObj = createPlanet(0.8, 17, 0.008, mars);
            const jupiterObj = createPlanet(2.5, 24, 0.002, jupiter);
            const saturnObj = createPlanet(2.0, 30, 0.001, saturn);
            const uranusObj = createPlanet(1.5, 36, 0.0008, uranus);
            const neptuneObj = createPlanet(1.5, 42, 0.0005, neptune);

            // Moon is fake (Could not get this to work)
            earthObj.mesh.add(moonObj.group);  // Add moon to earth
            moonObj.group.position.x = 2; // Position moon relative to Earth

            moonObj.group.scale.set(0.5, 0.5, 0.5); // Scale moon to make sure it's visible

            const ringGeometry = new THREE.RingGeometry(2.3, 3.5, 64);
            const ringMaterial = new THREE.MeshBasicMaterial({
                map: saturnRing,
                side: THREE.DoubleSide,
                transparent: true
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            saturnObj.mesh.add(ring);

            const planets = [
                mercuryObj,
                venusObj,
                earthObj,
                moonObj,
                marsObj,
                jupiterObj,
                saturnObj,
                uranusObj,
                neptuneObj
            ];

            planets.forEach(planet => {
                scene.add(planet.group);
            });

            function update() {
                planets.forEach(planet => planet.update());

                // Rotate the moon around the Earth
                moonObj.group.rotation.y += moonObj.speed; // Rotate the moon around Earth
            }

            resolve({ sun, planets, update });
        }).catch(error => {
            console.error('Error loading textures:', error);
        });
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

function loadTexture(loader, url) {
    return new Promise((resolve, reject) => {
        loader.load(
            url,
            texture => resolve(texture),
            undefined,
            error => reject(error)
        );
    });
}
