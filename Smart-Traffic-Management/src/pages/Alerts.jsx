import React, { useState, useEffect } from "react";
import {
    AlertTriangle,
    CheckCircle,
    XCircle,
    Clock,
    MapPin,
    Search,
    Bell,
    Trash2,
    RefreshCw
} from "lucide-react";
import { alerts as initialAlerts, emergencyVehicles } from "../data/trafficData";

const Alerts = ({ user }) => {
    const [alerts, setAlerts] = useState(initialAlerts);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showEmergencyVehicles, setShowEmergencyVehicles] = useState(true);

    const filteredAlerts = alerts.filter(alert => {
        const matchesFilter = filter === 'all' || alert.status === filter || alert.severity === filter;
        const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alert.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return 'border-red-500 bg-red-900/10';
            case 'medium': return 'border-yellow-500 bg-yellow-900/10';
            case 'low': return 'border-green-500 bg-green-900/10';
            default: return 'border-gray-500 bg-gray-900/10';
        }
    };

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'high': return <AlertTriangle className="w-5 h-5 text-red-400" />;
            case 'medium': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
            case 'low': return <CheckCircle className="w-5 h-5 text-green-400" />;
            default: return <AlertTriangle className="w-5 h-5 text-gray-400" />;
        }
    };

    const resolveAlert = (alertId) => {
        setAlerts(prev => prev.map(alert =>
            alert.id === alertId
                ? { ...alert, status: 'resolved', estimatedClearTime: 'Resolved' }
                : alert
        ));
    };

    const deleteAlert = (alertId) => {
        setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const alertTime = new Date(timestamp);
        const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        return `${Math.floor(diffInMinutes / 60)}h ago`;
    };

    const activeAlerts = alerts.filter(a => a.status === 'active').length;
    const highPriorityAlerts = alerts.filter(a => a.severity === 'high' && a.status === 'active').length;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Alert Management</h1>
                    <p className="text-gray-400">Monitor and manage traffic alerts across Bhopal</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-red-900/20 border border-red-500 rounded-lg px-4 py-2 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-red-400" />
                        <span className="text-red-400 font-semibold">{highPriorityAlerts} High Priority</span>
                    </div>
                    <div className="text-gray-400">
                        {activeAlerts} Active Alerts
                    </div>
                </div>
            </div>

            {/* Emergency Vehicles Panel */}
            {showEmergencyVehicles && emergencyVehicles.length > 0 && (
                <div className="bg-red-900/20 border border-red-500 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-6 h-6 text-red-400 animate-pulse" />
                            <h2 className="text-lg font-semibold text-white">Active Emergency Vehicles</h2>
                        </div>
                        <button
                            onClick={() => setShowEmergencyVehicles(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            <XCircle className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {emergencyVehicles.map(vehicle => (
                            <div key={vehicle.id} className="bg-gray-800/50 rounded-lg p-4 border border-red-500/30">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-red-400 font-semibold capitalize">
                                        {vehicle.type.replace('_', ' ')}
                                    </span>
                                    <span className={`px-2 py-1 text-xs rounded-full ${vehicle.priority === 'critical'
                                            ? 'bg-red-500 text-white'
                                            : 'bg-yellow-500 text-black'
                                        }`}>
                                        {vehicle.priority.toUpperCase()}
                                    </span>
                                </div>
                                <div className="text-sm space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Location:</span>
                                        <span className="text-white">{vehicle.location}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">ETA:</span>
                                        <span className="text-green-400">{vehicle.eta}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex gap-4 flex-wrap">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search alerts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex gap-2">
                        {['all', 'active', 'resolved', 'high', 'medium', 'low'].map(filterOption => (
                            <button
                                key={filterOption}
                                onClick={() => setFilter(filterOption)}
                                className={`px-3 py-2 rounded-lg text-sm transition ${filter === filterOption
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
                {filteredAlerts.map(alert => (
                    <div
                        key={alert.id}
                        className={`bg-gray-800 rounded-lg p-6 border-l-4 transition hover:bg-gray-750 ${getSeverityColor(alert.severity)
                            } ${alert.status === 'resolved' ? 'opacity-60' : ''}`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                                <div className="mt-1">
                                    {getSeverityIcon(alert.severity)}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                                        <span className={`px-2 py-1 text-xs rounded-full ${alert.status === 'active'
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-gray-500/20 text-gray-400'
                                            }`}>
                                            {alert.status.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{alert.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{formatTimeAgo(alert.timestamp)}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-300 mb-3">{alert.description}</p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400">
                                            Clear time: <span className="text-white">{alert.estimatedClearTime}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 ml-4">
                                {alert.status === 'active' && (
                                    <button
                                        onClick={() => resolveAlert(alert.id)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition"
                                    >
                                        Resolve
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteAlert(alert.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition flex items-center gap-1"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Alerts;