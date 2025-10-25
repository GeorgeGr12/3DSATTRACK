// UI Functions

function filterSatellites() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredSatellites = satellites.filter(sat => 
        sat.name.toLowerCase().includes(searchTerm) || 
        sat.type.toLowerCase().includes(searchTerm)
    );
    
    const listHTML = filteredSatellites.map(sat => 
        `<div class="satellite-item">${sat.getInfo()}</div>`
    ).join('');
    
    document.getElementById('satellites').innerHTML = listHTML || '<div class="satellite-item"><span class="error">No satellites found</span></div>';
}

function toggleCrosshair() {
    crosshairEnabled = document.getElementById('crosshairToggle').checked;
    document.getElementById('crosshair').style.display = crosshairEnabled ? 'block' : 'none';
    document.getElementById('crosshairInfo').style.display = crosshairEnabled ? 'block' : 'none';
    if (!crosshairEnabled) {
        document.getElementById('crosshairInfo').textContent = '';
    }
}

function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    document.getElementById('dateTimeInfo').innerHTML = 
        `<strong>Current Time</strong><br>${now.toLocaleString('en-US', options)}`;
}

function updateSatelliteList() {
    const listHTML = satellites.map(sat => 
        `<div class="satellite-item">${sat.getInfo()}</div>`
    ).join('');
    document.getElementById('satellites').innerHTML = listHTML;
}

function selectSatellite(satellite) {
    // Deselect previous satellite
    if (selectedSatellite) {
        deselectSatellite();
    }

    selectedSatellite = satellite;
    
    // Show label
    updateSatelliteLabel();
    document.getElementById('satelliteLabel').style.display = 'block';
}

function deselectSatellite() {
    if (selectedSatellite) {
        selectedSatellite = null;
        document.getElementById('satelliteLabel').style.display = 'none';
    }
}

function updateSatelliteLabel() {
    if (!selectedSatellite || !selectedSatellite.marker) return;

    // Get screen position of the satellite marker
    const vector = selectedSatellite.marker.position.clone();
    vector.applyMatrix4(earth.matrixWorld);
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (vector.y * -0.5 + 0.5) * window.innerHeight;

    const label = document.getElementById('satelliteLabel');
    label.style.left = (x + 20) + 'px';
    label.style.top = (y - 20) + 'px';
    
    label.innerHTML = `
        <strong>${selectedSatellite.name}</strong><br>
        Type: ${selectedSatellite.type.replace('_', ' ')}<br>
        Alt: ${selectedSatellite.altitude.toFixed(0)} km<br>
        Lat: ${selectedSatellite.lat.toFixed(2)}°<br>
        Lon: ${selectedSatellite.lon.toFixed(2)}°
    `;
}

async function updateAllSatellites() {
    console.log('Updating all satellite positions...');
    
    // Batch update satellites to avoid rate limiting
    for (let i = 0; i < satellites.length; i += BATCH_SIZE) {
        const batch = satellites.slice(i, i + BATCH_SIZE);
        console.log(`Updating batch ${Math.floor(i/BATCH_SIZE) + 1} of ${Math.ceil(satellites.length/BATCH_SIZE)}`);
        
        const promises = batch.map(sat => sat.updatePosition());
        await Promise.all(promises);
        
        updateSatelliteList();
        
        // Wait before next batch (except for the last batch)
        if (i + BATCH_SIZE < satellites.length) {
            await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
        }
    }
    
    console.log('All satellites updated');
}