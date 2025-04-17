# Solar System Simulation - CIS 367 Final Project

## Group Members
- Justin Ot

## Project Description
A 3D interactive model of our solar system built with Three.js and WebGL. Features realistic planet textures, orbital mechanics, and interactive controls.

## Features Implemented
1. **Geometry Primitives**: Spheres for planets, torus for Saturn's rings
2. **Phong Shading**: Realistic lighting with specular highlights
3. **Interactions**: 
   - Camera controls (orbit, zoom, pan)
   - Planet selection with info display
4. **Imported 3D Model**: Spaceship model in GLTF format
5. **Advanced Techniques**:
   - Texture mapping for all planetary bodies
   - Bump mapping for surface details
   - Model loading with progress tracking
   - Raycasting for object selection

## How to Run
1. Clone this repository
2. Open `index.html` in a modern browser
3. Use mouse to orbit, scroll to zoom
4. Click on planets to see information

## Controls
- Left click + drag: Rotate view
- Right click + drag: Pan view
- Scroll: Zoom in/out
- WASD: Move camera
- Q/E: Zoom in/out
- R: Reset view
- Click planet: Show information

## Technical Details
- Built with Three.js r128
- Uses ES6 modules for code organization
- Responsive design works on desktop and mobile
