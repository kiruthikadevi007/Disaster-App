const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Temporary memory data storage
let emergencyReports = [
    { 
        id: 1, 
        name: "Demo Rescue Team", 
        location: "Chennai Central", 
        disasterType: "Flood", 
        details: "Sample initial alert record", 
        time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) 
    }
];

// 1. POST API: Receives alert from public user (index.html)
app.post('/api/reports', (req, res) => {
    const { name, location, disasterType, details } = req.body;

    if (!name || !location || !disasterType) {
        return res.status(400).json({ message: "Mandatory fields fill pannungga!" });
    }

    const newReport = {
        id: emergencyReports.length + 1,
        name,
        location,
        disasterType,
        details,
            time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    emergencyReports.push(newReport);
    console.log("🚨 NEW ALERT RECEIVED:", newReport);

    res.status(200).json({ 
        message: "Swadeshi Alert System-ukku report Send Aayiduchi! Control Room Alerted.",
        reportId: newReport.id
    });
});

// 2. GET API: Sends all stored alerts to Admin Dashboard (admin.html)
app.get('/api/reports', (req, res) => {
    res.status(200).json(emergencyReports);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Swadeshi Server Running Successfully on port ${PORT}`);
});