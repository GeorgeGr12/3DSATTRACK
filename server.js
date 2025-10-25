const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('public'));

app.get('/api/satellite/:noradId', async (req, res) => {
    const { noradId } = req.params;
    const API_KEY = process.env.N2YO_API_KEY;
    
    if (!API_KEY) {
        return res.status(500).json({ error: 'API key not configured' });
    }
    
    try {
        // For ISS, use WhereTheISS API
        if (noradId === '25544') {
            const response = await fetch(`https://api.wheretheiss.at/v1/satellites/${noradId}`);
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            const data = await response.json();
            return res.json(data);
        }
        
        // For other satellites, use N2YO API
        const url = `https://api.n2yo.com/rest/v1/satellite/positions/${noradId}/0/0/0/1&apiKey=${API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`N2YO API error ${response.status}`);
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(`Error fetching satellite ${noradId}:`, error);
        res.status(500).json({ error: 'Failed to fetch satellite data', message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});