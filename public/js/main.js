// Main initialization

function init() {
    // Initialize the 3D scene
    initScene();
    
    // Start date/time updates
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Start satellite position updates
    console.log('Starting satellite position updates...');
    updateAllSatellites();
    setInterval(updateAllSatellites, UPDATE_INTERVAL);
    
    // Start animation loop
    animate();
}

// Start the application when the page loads
window.addEventListener('DOMContentLoaded', init);