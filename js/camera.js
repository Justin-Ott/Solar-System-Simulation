import * as THREE from '../lib/three.module.js';
import { OrbitControls } from '../lib/OrbitControls.module.js';

let camera, controls;

export function initCamera(renderer) {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 20, 30);
    return camera;
}

export function initCameraControls(cam, renderer) {
    controls = new OrbitControls(cam, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI;
    return controls;
}

export function updateCamera() {
    controls.update();
}

