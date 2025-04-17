// import * as THREE from '../lib/three.module.js';
import { GLTFLoader } from '../lib/GLTFLoader.module.js';

export function loadSpaceship(scene) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(
            'assets/models/spaceship.glb',
            (gltf) => {
                const spaceship = gltf.scene;
                gltf.scene.scale.set(0.005, 0.005, 0.005);
                gltf.scene.position.set(9, 6, 0);
                gltf.scene.rotation.set(2, Math.PI / 3, 0.2);
                scene.add(spaceship);
                resolve(spaceship);
            },
            (xhr) => {
                const percent = (xhr.loaded / xhr.total) * 100;
                document.querySelector('progress').value = percent;
            },
            (error) => {
                console.error('Error loading model:', error);
                reject(error);
            }
        );
    });
}
