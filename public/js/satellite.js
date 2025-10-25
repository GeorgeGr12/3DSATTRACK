// Satellite Class
class Satellite {
    constructor(noradId, name, type) {
        this.noradId = noradId;
        this.name = name;
        this.type = type;
        this.lat = null;
        this.lon = null;
        this.altitude = null;
        this.velocity = null;
        this.marker = null;
        this.color = this.getColorByType();
        this.dataLoaded = false;
    }

    getColorByType() {
        switch(this.type) {
            case 'space_station': return 0x00bfff;
            case 'communications': return 0x00ff00;
            case 'telescope': return 0x9933ff;
            case 'navigation': return 0xffaa00;
            case 'weather': return 0xff0000;
            default: return 0xffffff;
        }
    }

    async updatePosition() {
        try {
            console.log(`Fetching data for ${this.name} (NORAD: ${this.noradId})`);
            let data;

            // ISS uses WhereTheISS.at
            if (this.noradId === 25544) {
                const response = await fetch(`https://api.wheretheiss.at/v1/satellites/${this.noradId}`);
                if (!response.ok) throw new Error(`HTTP error ${response.status}`);
                data = await response.json();
                this.lat = parseFloat(data.latitude);
                this.lon = parseFloat(data.longitude);
                this.altitude = parseFloat(data.altitude);
                this.velocity = parseFloat(data.velocity);
            } else {
                // All other satellites use N2YO with CORS proxy
                const n2yoUrl = `https://api.n2yo.com/rest/v1/satellite/positions/${this.noradId}/${OBSERVER_LAT}/${OBSERVER_LON}/${OBSERVER_ALT}/1&apiKey=${N2YO_API_KEY}`;
                const corsProxy = 'https://corsproxy.io/?';
                const url = corsProxy + encodeURIComponent(n2yoUrl);
                
                const response = await fetch(url);
                if (!response.ok) throw new Error(`N2YO error ${response.status}`);
                data = await response.json();

                if (data.positions && data.positions.length > 0) {
                    const pos = data.positions[0];
                    this.lat = parseFloat(pos.satlatitude);
                    this.lon = parseFloat(pos.satlongitude);
                    this.altitude = parseFloat(pos.sataltitude);
                    this.velocity = parseFloat(pos.satvelocity || 0);
                } else {
                    throw new Error("No position data returned");
                }
            }

            this.dataLoaded = true;
            this.updateMarker();
            console.log(`Success: ${this.name} at lat:${this.lat}, lon:${this.lon}, alt:${this.altitude}`);
        } catch (error) {
            console.error(`Error fetching position for ${this.name}:`, error);
            this.dataLoaded = false;
        }
    }

    updateMarker() {
        if (!this.dataLoaded || this.lat === null || this.lon === null) {
            console.warn(`Cannot update marker for ${this.name} - no data loaded`);
            return;
        }

        if (this.marker) {
            earth.remove(this.marker);
        }

        const earthRadius = 6371;
        const scaledRadius = 1 + (this.altitude / earthRadius);

        const geometry = new THREE.SphereGeometry(0.015, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: this.color });
        this.marker = new THREE.Mesh(geometry, material);
        
        // Store reference to satellite in marker for click detection
        this.marker.userData.satellite = this;
        
        const localPosition = latLonToVector3(this.lat, this.lon, scaledRadius);
        this.marker.position.copy(localPosition);
        
        earth.add(this.marker);
    }

    getInfo() {
        if (!this.dataLoaded) {
            return `<strong>${this.name}</strong><br><span class="error">Loading...</span>`;
        }
        return `<strong>${this.name}</strong><br>` +
               `<span class="success">Type: ${this.type.replace('_', ' ')}</span><br>` +
               `Lat: ${this.lat.toFixed(2)}° ${this.lat >= 0 ? 'N' : 'S'}<br>` +
               `Lon: ${Math.abs(this.lon).toFixed(2)}° ${this.lon >= 0 ? 'E' : 'W'}<br>` +
               `Alt: ${this.altitude.toFixed(0)} km`;
    }
}

// Helper function
function latLonToVector3(lat, lon, radius) {
    const phi = (lat) * (Math.PI / 180);
    const theta = (lon) * (Math.PI / 180);
    const x = radius * Math.cos(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi);
    const z = -radius * Math.cos(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
}