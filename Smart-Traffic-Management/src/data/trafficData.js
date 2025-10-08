// Dummy data for Bhopal's main traffic areas
export const bhopalIntersections = [
    {
        id: 1,
        name: "DB City Mall Square",
        location: { lat: 23.2599, lng: 77.4126 },
        status: "active",
        vehicleCount: 145,
        averageSpeed: 25,
        congestionLevel: "high",
        signalTiming: { red: 45, yellow: 5, green: 60 },
        lastUpdate: new Date().toISOString(),
        cameras: 4,
        sensors: 8,
        peakHours: "8:00-10:00, 17:00-20:00",
        averageWaitTime: 3.2,
        throughput: 1200,
        incidents: 2
    },
    {
        id: 2,
        name: "New Market Chouraha",
        location: { lat: 23.2637, lng: 77.4032 },
        status: "active",
        vehicleCount: 178,
        averageSpeed: 18,
        congestionLevel: "critical",
        signalTiming: { red: 60, yellow: 5, green: 45 },
        lastUpdate: new Date().toISOString(),
        cameras: 6,
        sensors: 10,
        peakHours: "7:30-11:00, 16:30-21:00",
        averageWaitTime: 4.8,
        throughput: 980,
        incidents: 4
    },
    {
        id: 3,
        name: "ISBT Square",
        location: { lat: 23.2405, lng: 77.4106 },
        status: "active",
        vehicleCount: 132,
        averageSpeed: 30,
        congestionLevel: "medium",
        signalTiming: { red: 40, yellow: 5, green: 55 },
        lastUpdate: new Date().toISOString(),
        cameras: 3,
        sensors: 6,
        peakHours: "6:00-9:00, 18:00-20:00",
        averageWaitTime: 2.5,
        throughput: 1450,
        incidents: 1
    },
    {
        id: 4,
        name: "Habibganj Railway Station",
        location: { lat: 23.2287, lng: 77.4385 },
        status: "maintenance",
        vehicleCount: 89,
        averageSpeed: 35,
        congestionLevel: "low",
        signalTiming: { red: 35, yellow: 5, green: 50 },
        lastUpdate: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        cameras: 5,
        sensors: 8,
        peakHours: "7:00-9:30, 17:30-19:30",
        averageWaitTime: 1.8,
        throughput: 1680,
        incidents: 0
    },
    {
        id: 5,
        name: "Bittan Market Square",
        location: { lat: 23.2742, lng: 77.4072 },
        status: "active",
        vehicleCount: 156,
        averageSpeed: 22,
        congestionLevel: "high",
        signalTiming: { red: 50, yellow: 5, green: 55 },
        lastUpdate: new Date().toISOString(),
        cameras: 4,
        sensors: 7,
        peakHours: "8:30-10:30, 18:00-20:30",
        averageWaitTime: 3.8,
        throughput: 1150,
        incidents: 3
    }
];

export const alerts = [
    {
        id: 1,
        type: "critical",
        title: "Heavy Traffic Congestion",
        location: "New Market Chouraha",
        description: "Severe traffic jam reported. Estimated delay: 15-20 minutes",
        timestamp: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
        status: "active",
        severity: "high",
        estimatedClearTime: "25 minutes"
    },
    {
        id: 2,
        type: "maintenance",
        title: "Signal System Maintenance",
        location: "Habibganj Railway Station",
        description: "Scheduled maintenance in progress. Manual traffic control active",
        timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        status: "active",
        severity: "medium",
        estimatedClearTime: "2 hours"
    },
    {
        id: 3,
        type: "incident",
        title: "Minor Vehicle Breakdown",
        location: "DB City Mall Square",
        description: "Vehicle breakdown in left lane causing slight delays",
        timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        status: "resolved",
        severity: "low",
        estimatedClearTime: "Cleared"
    },
    {
        id: 4,
        type: "weather",
        title: "Heavy Rain Alert",
        location: "All Areas",
        description: "Heavy rainfall affecting visibility and road conditions",
        timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
        status: "active",
        severity: "high",
        estimatedClearTime: "1 hour"
    }
];

export const analyticsData = {
    dailyTraffic: [
        { hour: "00:00", vehicles: 45 },
        { hour: "01:00", vehicles: 32 },
        { hour: "02:00", vehicles: 28 },
        { hour: "03:00", vehicles: 25 },
        { hour: "04:00", vehicles: 35 },
        { hour: "05:00", vehicles: 68 },
        { hour: "06:00", vehicles: 125 },
        { hour: "07:00", vehicles: 245 },
        { hour: "08:00", vehicles: 320 },
        { hour: "09:00", vehicles: 280 },
        { hour: "10:00", vehicles: 195 },
        { hour: "11:00", vehicles: 165 },
        { hour: "12:00", vehicles: 185 },
        { hour: "13:00", vehicles: 205 },
        { hour: "14:00", vehicles: 175 },
        { hour: "15:00", vehicles: 195 },
        { hour: "16:00", vehicles: 245 },
        { hour: "17:00", vehicles: 315 },
        { hour: "18:00", vehicles: 380 },
        { hour: "19:00", vehicles: 345 },
        { hour: "20:00", vehicles: 285 },
        { hour: "21:00", vehicles: 195 },
        { hour: "22:00", vehicles: 145 },
        { hour: "23:00", vehicles: 85 }
    ],
    weeklyStats: [
        { day: "Monday", avgTraffic: 2450, incidents: 8, avgSpeed: 24.5 },
        { day: "Tuesday", avgTraffic: 2380, incidents: 6, avgSpeed: 26.2 },
        { day: "Wednesday", avgTraffic: 2520, incidents: 7, avgSpeed: 23.8 },
        { day: "Thursday", avgTraffic: 2680, incidents: 9, avgSpeed: 22.1 },
        { day: "Friday", avgTraffic: 2890, incidents: 12, avgSpeed: 20.5 },
        { day: "Saturday", avgTraffic: 2150, incidents: 5, avgSpeed: 28.7 },
        { day: "Sunday", avgTraffic: 1680, incidents: 3, avgSpeed: 32.4 }
    ],
    congestionHotspots: [
        { name: "New Market Chouraha", congestionScore: 8.5, avgDelay: 4.8 },
        { name: "DB City Mall Square", congestionScore: 7.2, avgDelay: 3.2 },
        { name: "Bittan Market Square", congestionScore: 6.8, avgDelay: 3.8 },
        { name: "ISBT Square", congestionScore: 4.5, avgDelay: 2.5 },
        { name: "Habibganj Railway Station", congestionScore: 3.2, avgDelay: 1.8 }
    ]
};

export const optimizationMetrics = {
    totalIntersections: 5,
    activeSignals: 4,
    underMaintenance: 1,
    averageOptimization: 78.5,
    fuelSaved: 1250, // liters per day
    timeSaved: 45.8, // minutes per vehicle per day
    emissionReduction: 12.5, // percentage
    throughputImprovement: 23.4 // percentage
};

export const emergencyVehicles = [
    {
        id: 1,
        type: "ambulance",
        location: "Near DB City Mall",
        status: "en-route",
        priority: "high",
        eta: "3 minutes",
        destination: "Hamidia Hospital"
    },
    {
        id: 2,
        type: "fire_truck",
        location: "ISBT Square",
        status: "responding",
        priority: "critical",
        eta: "5 minutes",
        destination: "Industrial Area"
    }
];