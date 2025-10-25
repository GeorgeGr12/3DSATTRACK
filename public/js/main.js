// Main initialization

function init() {
    initScene();
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    console.log('Starting satellite position updates...');
    updateAllSatellites();
    setInterval(updateAllSatellites, UPDATE_INTERVAL);
    
    animate();
}

// Start the application when the page loads
window.addEventListener('DOMContentLoaded', init);