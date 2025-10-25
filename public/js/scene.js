// Scene and interaction management

// Global variables
let scene, camera, renderer, earth;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotation = { x: 0, y: 0 };
let crosshairEnabled = false;
let raycaster = new THREE.Raycaster();
let mouseVector = new THREE.Vector2(0, 0);
let satellites = [];
let selectedSatellite = null;

function initScene() {
    console.log('Initializing satellite tracker...');
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    const canvas = document.getElementById('canvas');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
    const material = new THREE.MeshPhongMaterial({
        map: earthTexture,
        shininess: 10
    });
    
    earth = new THREE.Mesh(geometry, material);
    earth.rotation.y = Math.PI / 2;
    scene.add(earth);

    console.log(`Initializing ${satelliteDatabase.length} satellites...`);
    satelliteDatabase.forEach(satData => {
        const sat = new Satellite(satData.noradId, satData.name, satData.type);
        satellites.push(sat);
    });

    setupEventListeners(canvas);
}

function setupEventListeners(canvas) {
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    canvas.addEventListener('click', onCanvasClick);
    canvas.addEventListener('touchstart', onTouchStart);
    canvas.addEventListener('touchmove', onTouchMove);
    canvas.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('wheel', onWheel);

    window.addEventListener('resize', onWindowResize);
}

function onWheel(e) {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const delta = e.deltaY > 0 ? 1 : -1;
    camera.position.z += delta * zoomSpeed;
    camera.position.z = Math.max(1.5, Math.min(20, camera.position.z));
}

function onMouseDown(e) {
    if (selectedSatellite) return;
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
}

function onCanvasClick(e) {
    const mouse = new THREE.Vector2();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    const clickRaycaster = new THREE.Raycaster();
    clickRaycaster.setFromCamera(mouse, camera);

    const earthIntersects = clickRaycaster.intersectObject(earth);
    if (earthIntersects.length > 0 && selectedSatellite) {
        deselectSatellite();
        return;
    }

    const markers = satellites.map(sat => sat.marker).filter(m => m !== null);
    const intersects = clickRaycaster.intersectObjects(markers);

    if (intersects.length > 0) {
        const clickedMarker = intersects[0].object;
        const satellite = clickedMarker.userData.satellite;
        selectSatellite(satellite);
    }
}

function onMouseMove(e) {
    if (isDragging && !selectedSatellite) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        rotation.y += deltaX * 0.005;
        rotation.x += deltaY * 0.005;
        rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.x));
        previousMousePosition = { x: e.clientX, y: e.clientY };
    }
}

function onMouseUp() {
    isDragging = false;
}

function onTouchStart(e) {
    if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
}

function onTouchMove(e) {
    if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;
        rotation.y += deltaX * 0.005;
        rotation.x += deltaY * 0.005;
        rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.x));
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
}

function onTouchEnd() {
    isDragging = false;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function vector3ToLatLon(vector) {
    const x = vector.x;
    const y = vector.y;
    const z = vector.z;
    const lat = Math.asin(y) * (180 / Math.PI);
    const lon = Math.atan2(-z, x) * (180 / Math.PI);
    return { lat, lon };
}

function updateCrosshairPosition() {
    if (!crosshairEnabled) return;
    raycaster.setFromCamera(mouseVector, camera);
    const intersects = raycaster.intersectObject(earth);

    if (intersects.length > 0) {
        const point = intersects[0].point;
        const localPoint = point.clone();
        const earthMatrix = new THREE.Matrix4();
        earthMatrix.makeRotationFromEuler(earth.rotation);
        earthMatrix.invert();
        localPoint.applyMatrix4(earthMatrix);
        localPoint.normalize();
        const coords = vector3ToLatLon(localPoint);
        
        document.getElementById('crosshairInfo').innerHTML = 
            `<strong>Crosshair Location:</strong><br>` +
            `Lat: ${coords.lat.toFixed(4)}° ${coords.lat >= 0 ? 'N' : 'S'}<br>` +
            `Lon: ${Math.abs(coords.lon).toFixed(4)}° ${coords.lon >= 0 ? 'E' : 'W'}`;
    }
}

function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y = rotation.y - (Math.PI / 2);
    earth.rotation.x = rotation.x;
    updateCrosshairPosition();
    
    // Update satellite sizes based on distance from camera
    satellites.forEach(sat => {
        if (sat.marker && sat.dataLoaded) {
            const distance = camera.position.distanceTo(sat.marker.getWorldPosition(new THREE.Vector3()));
            const scale = (distance / 3) * 2.0;
            
            if (selectedSatellite === sat) {
                sat.marker.scale.set(scale * 2, scale * 2, scale * 2);
            } else {
                sat.marker.scale.set(scale, scale, scale);
            }
        }
    });
    
    if (selectedSatellite) {
        updateSatelliteLabel();
    }
    
    renderer.render(scene, camera);
}