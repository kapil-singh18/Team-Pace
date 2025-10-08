import React, { useState, useEffect } from "react";
import {
    Map,
    MapPin,
    Layers,
    AlertTriangle,
    Camera,
    Activity,
    Car,
    Navigation,
    ZoomIn,
    ZoomOut,
    Maximize,
    Eye,
    Settings,
    Filter
} from "lucide-react";
import { bhopalIntersections, alerts, emergencyVehicles } from "../data/trafficData";

const MapView = ({ user }) => {
    const [activeLayer, setActiveLayer] = useState('traffic');
    const [selectedIntersection, setSelectedIntersection] = useState(null);
    const [mapZoom, setMapZoom] = useState(12);
    const [showIncidents, setShowIncidents] = useState(true);
    const [showCameras, setShowCameras] = useState(true);
    const [showEmergency, setShowEmergency] = useState(true);

    // Simulated map center coordinates (Bhopal city center)
    const mapCenter = { lat: 23.2599, lng: 77.4126 };

    const layers = [
        { id: 'traffic', name: 'Traffic Flow', icon: Car, color: 'text-blue-400' },
        { id: 'incidents', name: 'Incidents', icon: AlertTriangle, color: 'text-red-400' },
        { id: 'cameras', name: 'Cameras', icon: Camera, color: 'text-green-400' },
        { id: 'signals', name: 'Signals', icon: Activity, color: 'text-yellow-400' }
    ];

    const getIntersectionStatusColor = (status, congestion) => {
        if (status === 'maintenance') return 'bg-gray-500';
        switch (congestion) {
            case 'critical': return 'bg-red-500 animate-pulse';
            case 'high': return 'bg-orange-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Live Traffic Map</h1>
                    <p className="text-gray-400">Real-time traffic monitoring across Bhopal</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                        <Settings className="w-4 h-4" />
                        Settings
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                        <Maximize className="w-4 h-4" />
                        Fullscreen
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Map Controls */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Layer Controls */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-4">Map Layers</h3>
                        <div className="space-y-3">
                            {layers.map(layer => (
                                <label key={layer.id} className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={activeLayer === layer.id ||
                                            (layer.id === 'incidents' && showIncidents) ||
                                            (layer.id === 'cameras' && showCameras)}
                                        onChange={(e) => {
                                            if (layer.id === 'incidents') setShowIncidents(e.target.checked);
                                            else if (layer.id === 'cameras') setShowCameras(e.target.checked);
                                            else setActiveLayer(layer.id);
                                        }}
                                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                    />
                                    <layer.icon className={`w-4 h-4 ${layer.color}`} />
                                    <span className="text-gray-300">{layer.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Map Controls */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-4">Map Controls</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setMapZoom(Math.min(mapZoom + 1, 18))}
                                    className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition"
                                >
                                    <ZoomIn className="w-4 h-4 text-white" />
                                </button>
                                <span className="text-gray-300 text-sm flex-1 text-center">Zoom: {mapZoom}</span>
                                <button
                                    onClick={() => setMapZoom(Math.max(mapZoom - 1, 8))}
                                    className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition"
                                >
                                    <ZoomOut className="w-4 h-4 text-white" />
                                </button>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition flex items-center justify-center gap-2">
                                <Navigation className="w-4 h-4" />
                                Center on Bhopal
                            </button>
                        </div>
                    </div>

                    {/* Emergency Vehicles */}
                    {showEmergency && emergencyVehicles.length > 0 && (
                        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 animate-pulse" />
                                Emergency Vehicles
                            </h3>
                            <div className="space-y-2">
                                {emergencyVehicles.map(vehicle => (
                                    <div key={vehicle.id} className="text-sm">
                                        <div className="text-white font-medium capitalize">
                                            {vehicle.type.replace('_', ' ')}
                                        </div>
                                        <div className="text-gray-400">{vehicle.location}</div>
                                        <div className="text-green-400">ETA: {vehicle.eta}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick Stats */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Active Signals</span>
                                <span className="text-green-400">{bhopalIntersections.filter(i => i.status === 'active').length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Critical Areas</span>
                                <span className="text-red-400">{bhopalIntersections.filter(i => i.congestionLevel === 'critical').length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Active Incidents</span>
                                <span className="text-yellow-400">{alerts.filter(a => a.status === 'active').length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Display */}
                <div className="lg:col-span-3">
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 relative">
                        <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
                            {/* Simulated Map Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800">
                                {/* Grid pattern to simulate map */}
                                <div className="absolute inset-0 opacity-10">
                                    <svg width="100%" height="100%">
                                        <defs>
                                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#grid)" />
                                    </svg>
                                </div>

                                {/* Intersection Markers */}
                                {bhopalIntersections.map((intersection, index) => (
                                    <div
                                        key={intersection.id}
                                        onClick={() => setSelectedIntersection(intersection)}
                                        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                                        style={{
                                            left: `${25 + (index % 3) * 25}%`,
                                            top: `${25 + Math.floor(index / 3) * 20}%`
                                        }}
                                    >
                                        <div className={`w-4 h-4 rounded-full ${getIntersectionStatusColor(intersection.status, intersection.congestionLevel)} border-2 border-white shadow-lg`}>
                                        </div>
                                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                            <div className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                                {intersection.name}
                                            </div>
                                        </div>

                                        {/* Vehicle count indicator */}
                                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 rounded-full">
                                            {intersection.vehicleCount}
                                        </div>
                                    </div>
                                ))}

                                {/* Incident Markers */}
                                {showIncidents && alerts.filter(a => a.status === 'active').map((alert, index) => (
                                    <div
                                        key={alert.id}
                                        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                                        style={{
                                            left: `${35 + (index % 2) * 30}%`,
                                            top: `${45 + index * 15}%`
                                        }}
                                    >
                                        <AlertTriangle className={`w-6 h-6 ${alert.severity === 'high' ? 'text-red-400 animate-pulse' :
                                                alert.severity === 'medium' ? 'text-yellow-400' : 'text-orange-400'
                                            }`} />
                                    </div>
                                ))}

                                {/* Emergency Vehicle Markers */}
                                {showEmergency && emergencyVehicles.map((vehicle, index) => (
                                    <div
                                        key={vehicle.id}
                                        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                                        style={{
                                            left: `${60 + index * 15}%`,
                                            top: `${30 + index * 10}%`
                                        }}
                                    >
                                        <div className="w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-lg animate-ping"></div>
                                        <div className="absolute w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-lg"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Map Legend */}
                            <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white text-xs p-3 rounded">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span>Low Traffic</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <span>Medium Traffic</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                        <span>Heavy Traffic</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-3 h-3 text-red-400" />
                                        <span>Incidents</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Intersection Details Panel */}
                        {selectedIntersection && (
                            <div className="absolute top-6 left-6 bg-gray-900 border border-gray-600 rounded-lg p-4 w-80 z-10">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="text-white font-semibold">{selectedIntersection.name}</h4>
                                    <button
                                        onClick={() => setSelectedIntersection(null)}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Status:</span>
                                        <span className={`capitalize ${selectedIntersection.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                                            {selectedIntersection.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Vehicles:</span>
                                        <span className="text-white">{selectedIntersection.vehicleCount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Avg Speed:</span>
                                        <span className="text-white">{selectedIntersection.averageSpeed} km/h</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Wait Time:</span>
                                        <span className="text-white">{selectedIntersection.averageWaitTime} min</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Congestion:</span>
                                        <span className={`capitalize ${selectedIntersection.congestionLevel === 'critical' ? 'text-red-400' :
                                                selectedIntersection.congestionLevel === 'high' ? 'text-orange-400' :
                                                    selectedIntersection.congestionLevel === 'medium' ? 'text-yellow-400' : 'text-green-400'
                                            }`}>
                                            {selectedIntersection.congestionLevel}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Cameras:</span>
                                        <span className="text-white">{selectedIntersection.cameras}</span>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition">
                                        Control
                                    </button>
                                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition">
                                        Details
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapView;


