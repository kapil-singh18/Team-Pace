import React, { useState } from "react";
import {
    TrendingUp,
    TrendingDown,
    BarChart3,
    Clock,
    Car,
    AlertTriangle,
    MapPin,
    Activity,
    Zap
} from "lucide-react";
import { analyticsData, optimizationMetrics } from "../data/trafficData";

const Analytics = ({ user }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('today');

    const periods = [
        { id: 'today', label: 'Today' },
        { id: 'week', label: 'This Week' },
        { id: 'month', label: 'This Month' }
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Traffic Analytics</h1>
                    <p className="text-gray-400">Comprehensive traffic analysis and insights for Bhopal</p>
                </div>
                <div className="flex gap-2">
                    {periods.map(period => (
                        <button
                            key={period.id}
                            onClick={() => setSelectedPeriod(period.id)}
                            className={`px-4 py-2 rounded-lg transition ${selectedPeriod === period.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-900/20 p-2 rounded-lg">
                            <Car className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex items-center gap-1 text-green-400">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm">+12%</span>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white">47.2K</div>
                    <div className="text-gray-400 text-sm">Total Vehicles Today</div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-900/20 p-2 rounded-lg">
                            <Activity className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex items-center gap-1 text-green-400">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm">+8%</span>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white">{optimizationMetrics.averageOptimization}%</div>
                    <div className="text-gray-400 text-sm">System Efficiency</div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-yellow-900/20 p-2 rounded-lg">
                            <Clock className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div className="flex items-center gap-1 text-red-400">
                            <TrendingDown className="w-4 h-4" />
                            <span className="text-sm">-15%</span>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white">{optimizationMetrics.timeSaved}</div>
                    <div className="text-gray-400 text-sm">Avg Time Saved (min)</div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-900/20 p-2 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-red-400" />
                        </div>
                        <div className="flex items-center gap-1 text-green-400">
                            <TrendingDown className="w-4 h-4" />
                            <span className="text-sm">-23%</span>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white">18</div>
                    <div className="text-gray-400 text-sm">Active Incidents</div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traffic Volume Chart */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">Traffic Volume Trends</h3>
                        <BarChart3 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {selectedPeriod === 'today' && analyticsData.dailyTraffic.slice(6, 24).map((hour, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="text-sm text-gray-400 w-16">{hour.hour}</div>
                                <div className="flex-1 bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(hour.vehicles / 400) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="text-sm text-white w-16 text-right">{hour.vehicles}</div>
                            </div>
                        ))}
                        {selectedPeriod === 'week' && analyticsData.weeklyStats.map((day, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="text-sm text-gray-400 w-16">{day.day.slice(0, 3)}</div>
                                <div className="flex-1 bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(day.avgTraffic / 3000) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="text-sm text-white w-16 text-right">{day.avgTraffic}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Congestion Hotspots */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">Congestion Hotspots</h3>
                        <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {analyticsData.congestionHotspots.map((spot, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                                <div>
                                    <div className="font-medium text-white">{spot.name}</div>
                                    <div className="text-sm text-gray-400">Avg Delay: {spot.avgDelay} min</div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-lg font-bold ${spot.congestionScore >= 7 ? 'text-red-400' :
                                            spot.congestionScore >= 5 ? 'text-yellow-400' : 'text-green-400'
                                        }`}>
                                        {spot.congestionScore}/10
                                    </div>
                                    <div className="text-xs text-gray-400">Score</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-6">Environmental Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">{optimizationMetrics.fuelSaved}L</div>
                        <div className="text-gray-400">Fuel Saved Today</div>
                        <div className="text-green-400 text-sm mt-1">+19% from yesterday</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">{optimizationMetrics.emissionReduction}%</div>
                        <div className="text-gray-400">CO₂ Reduction</div>
                        <div className="text-green-400 text-sm mt-1">+5.2% this month</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">847kg</div>
                        <div className="text-gray-400">CO₂ Prevented</div>
                        <div className="text-green-400 text-sm mt-1">Daily average</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;