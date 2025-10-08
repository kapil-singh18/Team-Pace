import React, { useState, useEffect } from "react";
import {
    Play,
    Pause,
    RotateCcw,
    Settings,
    Zap,
    Clock,
    Car,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Activity
} from "lucide-react";
import { bhopalIntersections } from "../data/trafficData";

const SignalControl = ({ user }) => {
    const [intersections, setIntersections] = useState(bhopalIntersections);
    const [selectedIntersection, setSelectedIntersection] = useState(bhopalIntersections[0]);
    const [manualMode, setManualMode] = useState(false);
    const [emergencyMode, setEmergencyMode] = useState(false);

    // Real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setIntersections(prev => prev.map(intersection => ({
                ...intersection,
                vehicleCount: Math.max(0, intersection.vehicleCount + Math.floor(Math.random() * 10 - 5)),
                signalTiming: {
                    ...intersection.signalTiming,
                    red: Math.max(intersection.signalTiming.red - 1, 0)
                }
            })));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleTimingChange = (phase, value) => {
        const updatedIntersection = {
            ...selectedIntersection,
            signalTiming: {
                ...selectedIntersection.signalTiming,
                [phase]: parseInt(value)
            }
        };
        setSelectedIntersection(updatedIntersection);
        setIntersections(prev =>
            prev.map(int => int.id === updatedIntersection.id ? updatedIntersection : int)
        );
    };

    const enableEmergencyMode = () => {
        setEmergencyMode(true);
        // Override all signals to green for emergency vehicle
        setIntersections(prev => prev.map(int => ({
            ...int,
            signalTiming: { red: 0, yellow: 5, green: 120 }
        })));

        // Auto disable after 2 minutes
        setTimeout(() => {
            setEmergencyMode(false);
        }, 120000);
    };

    const resetToOptimal = () => {
        const optimalTiming = { red: 45, yellow: 5, green: 60 };
        setIntersections(prev => prev.map(int => ({
            ...int,
            signalTiming: optimalTiming
        })));
        setSelectedIntersection(prev => ({
            ...prev,
            signalTiming: optimalTiming
        }));
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4 text-green-400" />;
            case 'maintenance': return <XCircle className="w-4 h-4 text-red-400" />;
            default: return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
        }
    };

    const getCongestionColor = (level) => {
        switch (level) {
            case 'critical': return 'text-red-400 bg-red-900/20';
            case 'high': return 'text-orange-400 bg-orange-900/20';
            case 'medium': return 'text-yellow-400 bg-yellow-900/20';
            case 'low': return 'text-green-400 bg-green-900/20';
            default: return 'text-gray-400 bg-gray-900/20';
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Signal Control Center</h1>
                    <p className="text-gray-400">Manage traffic signals across Bhopal intersections</p>
                </div>
                <div className="flex gap-4">
                    {emergencyMode && (
                        <div className="flex items-center gap-2 bg-red-900/20 border border-red-500 rounded-lg px-4 py-2">
                            <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
                            <span className="text-red-400 font-semibold">Emergency Mode Active</span>
                        </div>
                    )}
                    <button
                        onClick={enableEmergencyMode}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                    >
                        <Zap className="w-4 h-4" />
                        Emergency Override
                    </button>
                    <button
                        onClick={resetToOptimal}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset to Optimal
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Intersection List */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h2 className="text-xl font-semibold text-white mb-4">Intersections</h2>
                        <div className="space-y-3">
                            {intersections.map(intersection => (
                                <div
                                    key={intersection.id}
                                    onClick={() => setSelectedIntersection(intersection)}
                                    className={`p-4 rounded-lg border cursor-pointer transition ${selectedIntersection?.id === intersection.id
                                            ? 'border-blue-500 bg-blue-900/20'
                                            : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium text-white text-sm">{intersection.name}</h3>
                                        {getStatusIcon(intersection.status)}
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`text-xs px-2 py-1 rounded-full ${getCongestionColor(intersection.congestionLevel)}`}>
                                            {intersection.congestionLevel.toUpperCase()}
                                        </span>
                                        <span className="text-gray-400 text-sm">{intersection.vehicleCount} vehicles</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>Avg Speed: {intersection.averageSpeed} km/h</span>
                                        <span>Wait: {intersection.averageWaitTime}min</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Signal Control Panel */}
                <div className="lg:col-span-2 space-y-6">
                    {selectedIntersection && (
                        <>
                            {/* Current Status */}
                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-white">{selectedIntersection.name}</h2>
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-blue-400" />
                                        <span className="text-blue-400">Live Control</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                        <Car className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-white">{selectedIntersection.vehicleCount}</div>
                                        <div className="text-gray-400 text-sm">Vehicles</div>
                                    </div>
                                    <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                        <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-white">{selectedIntersection.averageWaitTime}</div>
                                        <div className="text-gray-400 text-sm">Avg Wait (min)</div>
                                    </div>
                                    <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                        <Activity className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-white">{selectedIntersection.averageSpeed}</div>
                                        <div className="text-gray-400 text-sm">Speed (km/h)</div>
                                    </div>
                                    <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                        <Settings className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-white">{selectedIntersection.throughput}</div>
                                        <div className="text-gray-400 text-sm">Throughput</div>
                                    </div>
                                </div>

                                {/* Signal Timing Controls */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-red-400 font-semibold">RED</span>
                                            <span className="text-white">{selectedIntersection.signalTiming.red}s</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="20"
                                            max="120"
                                            value={selectedIntersection.signalTiming.red}
                                            onChange={(e) => handleTimingChange('red', e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-yellow-400 font-semibold">YELLOW</span>
                                            <span className="text-white">{selectedIntersection.signalTiming.yellow}s</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="3"
                                            max="10"
                                            value={selectedIntersection.signalTiming.yellow}
                                            onChange={(e) => handleTimingChange('yellow', e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="bg-green-900/20 border border-green-500 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-green-400 font-semibold">GREEN</span>
                                            <span className="text-white">{selectedIntersection.signalTiming.green}s</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="30"
                                            max="150"
                                            value={selectedIntersection.signalTiming.green}
                                            onChange={(e) => handleTimingChange('green', e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Control Actions */}
                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Control Actions</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <button
                                        onClick={() => setManualMode(!manualMode)}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-lg transition ${manualMode
                                                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                            }`}
                                    >
                                        {manualMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                        {manualMode ? 'Manual Mode' : 'Auto Mode'}
                                    </button>

                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center gap-2 transition">
                                        <Settings className="w-4 h-4" />
                                        Configure
                                    </button>

                                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg flex items-center gap-2 transition">
                                        <CheckCircle className="w-4 h-4" />
                                        Apply Changes
                                    </button>

                                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg flex items-center gap-2 transition">
                                        <RotateCcw className="w-4 h-4" />
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignalControl;


