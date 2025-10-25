// Satellite database with NORAD IDs
const satelliteDatabase = [
    // Space Stations
    { noradId: 25544, name: 'ISS', type: 'space_station' },
    { noradId: 48274, name: 'Tiangong', type: 'space_station' },
    
    // Telescopes
    { noradId: 20580, name: 'Hubble', type: 'telescope' },
    { noradId: 37362, name: 'Chandra X-ray', type: 'telescope' },
    { noradId: 28485, name: 'XMM-Newton', type: 'telescope' },
    { noradId: 26702, name: 'Spitzer', type: 'telescope' },
    
    // Communications Satellites (GEO and LEO)
    { noradId: 28626, name: 'DIRECTV 10', type: 'communications' },
    { noradId: 28644, name: 'DIRECTV 11', type: 'communications' },
    { noradId: 36032, name: 'INTELSAT 22', type: 'communications' },
    { noradId: 37834, name: 'SES-6', type: 'communications' },
    { noradId: 41179, name: 'EUTELSAT 8WB', type: 'communications' },
    { noradId: 27640, name: 'ASTRA 1M', type: 'communications' },
    { noradId: 26038, name: 'INTELSAT 5', type: 'communications' },
    { noradId: 40874, name: 'INTELSAT 29E', type: 'communications' },
    { noradId: 39020, name: 'SES-7', type: 'communications' },
    { noradId: 41581, name: 'INTELSAT 31', type: 'communications' },
    { noradId: 28868, name: 'TELSTAR 11N', type: 'communications' },
    { noradId: 32299, name: 'INTELSAT 19', type: 'communications' },
    { noradId: 33153, name: 'INTELSAT 20', type: 'communications' },
    { noradId: 38867, name: 'INTELSAT 28', type: 'communications' },
    { noradId: 25924, name: 'INTELSAT 3R', type: 'communications' },
    
    // Starlink (Sample)
    { noradId: 44238, name: 'Starlink-1007', type: 'communications' },
    { noradId: 44239, name: 'Starlink-1008', type: 'communications' },
    { noradId: 44240, name: 'Starlink-1009', type: 'communications' },
    { noradId: 44241, name: 'Starlink-1010', type: 'communications' },
    { noradId: 44242, name: 'Starlink-1011', type: 'communications' },
    { noradId: 44243, name: 'Starlink-1012', type: 'communications' },
    { noradId: 44244, name: 'Starlink-1013', type: 'communications' },
    { noradId: 44245, name: 'Starlink-1014', type: 'communications' },
    
    // GPS/Navigation
    { noradId: 28903, name: 'GPS IIR-20', type: 'navigation' },
    { noradId: 32711, name: 'GPS IIF-2', type: 'navigation' },
    { noradId: 40105, name: 'GPS IIF-5', type: 'navigation' },
    { noradId: 41328, name: 'GPS IIF-9', type: 'navigation' },
    { noradId: 25933, name: 'GPS IIR-2', type: 'navigation' },
    { noradId: 26360, name: 'GPS IIR-3', type: 'navigation' },
    { noradId: 26605, name: 'GPS IIR-5', type: 'navigation' },
    { noradId: 27663, name: 'GPS IIR-10', type: 'navigation' },
    { noradId: 28129, name: 'GPS IIR-15', type: 'navigation' },
    { noradId: 32384, name: 'GPS IIF-3', type: 'navigation' },
    { noradId: 35752, name: 'GPS IIF-4', type: 'navigation' },
    { noradId: 38833, name: 'GPS IIF-8', type: 'navigation' },
    { noradId: 39533, name: 'GPS IIF-10', type: 'navigation' },
    { noradId: 40534, name: 'GPS IIF-11', type: 'navigation' },
    { noradId: 41019, name: 'GPS IIF-12', type: 'navigation' },
    
    // Weather Satellites
    { noradId: 29499, name: 'GOES 13', type: 'weather' },
    { noradId: 35491, name: 'GOES 14', type: 'weather' },
    { noradId: 41866, name: 'GOES 16', type: 'weather' },
    { noradId: 43226, name: 'GOES 17', type: 'weather' },
    { noradId: 33591, name: 'NOAA 19', type: 'weather' },
    { noradId: 43013, name: 'NOAA 20', type: 'weather' },
    { noradId: 28654, name: 'NOAA 18', type: 'weather' },
    { noradId: 37849, name: 'Suomi NPP', type: 'weather' },
    { noradId: 40069, name: 'MetOp-C', type: 'weather' },
    { noradId: 38771, name: 'Himawari 8', type: 'weather' },
    { noradId: 41836, name: 'Himawari 9', type: 'weather' },
    { noradId: 27424, name: 'Meteosat 9', type: 'weather' },
    { noradId: 38552, name: 'Meteosat 11', type: 'weather' },
    
    // Earth Observation
    { noradId: 39084, name: 'Landsat 8', type: 'telescope' },
    { noradId: 25994, name: 'Terra', type: 'telescope' },
    { noradId: 27424, name: 'Aqua', type: 'telescope' },
    { noradId: 28376, name: 'Aura', type: 'telescope' },
    { noradId: 37348, name: 'Sentinel-1A', type: 'telescope' },
    { noradId: 41456, name: 'Sentinel-1B', type: 'telescope' },
    { noradId: 40697, name: 'Sentinel-2A', type: 'telescope' },
    { noradId: 42063, name: 'Sentinel-2B', type: 'telescope' },
    { noradId: 41549, name: 'Sentinel-3A', type: 'telescope' },
    { noradId: 43437, name: 'Sentinel-3B', type: 'telescope' },
    { noradId: 38771, name: 'WorldView-3', type: 'telescope' },
    { noradId: 40115, name: 'WorldView-4', type: 'telescope' },
    
    // Scientific Satellites
    { noradId: 36508, name: 'MAVEN', type: 'telescope' },
    { noradId: 37751, name: 'MMS 1', type: 'telescope' },
    { noradId: 37752, name: 'MMS 2', type: 'telescope' },
    { noradId: 37753, name: 'MMS 3', type: 'telescope' },
    { noradId: 37754, name: 'MMS 4', type: 'telescope' },
    { noradId: 27640, name: 'GRACE-FO 1', type: 'telescope' },
    { noradId: 27641, name: 'GRACE-FO 2', type: 'telescope' },
    { noradId: 43435, name: 'TESS', type: 'telescope' },
    { noradId: 39199, name: 'DSCOVR', type: 'telescope' },
    
    // OneWeb Constellation (Sample)
    { noradId: 44050, name: 'OneWeb-0001', type: 'communications' },
    { noradId: 44051, name: 'OneWeb-0002', type: 'communications' },
    { noradId: 44052, name: 'OneWeb-0003', type: 'communications' },
    { noradId: 44053, name: 'OneWeb-0004', type: 'communications' },
    { noradId: 44054, name: 'OneWeb-0005', type: 'communications' },
    { noradId: 44055, name: 'OneWeb-0006', type: 'communications' },
    
    // Iridium NEXT
    { noradId: 41917, name: 'Iridium 101', type: 'communications' },
    { noradId: 41918, name: 'Iridium 102', type: 'communications' },
    { noradId: 41919, name: 'Iridium 103', type: 'communications' },
    { noradId: 41920, name: 'Iridium 104', type: 'communications' },
    { noradId: 41921, name: 'Iridium 105', type: 'communications' },
    { noradId: 41922, name: 'Iridium 106', type: 'communications' },
    { noradId: 42803, name: 'Iridium 111', type: 'communications' },
    { noradId: 42804, name: 'Iridium 112', type: 'communications' },
    { noradId: 42805, name: 'Iridium 113', type: 'communications' },
    { noradId: 42806, name: 'Iridium 114', type: 'communications' },
    
    // Amateur Radio
    { noradId: 40379, name: 'AO-92', type: 'communications' },
    { noradId: 43017, name: 'AO-91', type: 'communications' },
    { noradId: 43678, name: 'AO-95', type: 'communications' },
    
    // Military/Intelligence (Unclassified)
    { noradId: 28888, name: 'USA 193', type: 'communications' },
    { noradId: 25730, name: 'USA 144', type: 'communications' },
    { noradId: 26900, name: 'USA 167', type: 'communications' },
    
    // CubeSats
    { noradId: 39444, name: 'FLOCK 1B-1', type: 'telescope' },
    { noradId: 40017, name: 'FLOCK 2E-1', type: 'telescope' },
    { noradId: 41558, name: 'FLOCK 2K-1', type: 'telescope' },
    { noradId: 42726, name: 'FLOCK 3P-1', type: 'telescope' },
    
    // Additional GEO Communications
    { noradId: 26608, name: 'ANIK F2', type: 'communications' },
    { noradId: 28626, name: 'ECHOSTAR 11', type: 'communications' },
    { noradId: 36830, name: 'SES-8', type: 'communications' },
    { noradId: 39460, name: 'THAICOM 6', type: 'communications' },
    { noradId: 25924, name: 'AMAZONAS 2', type: 'communications' }
];