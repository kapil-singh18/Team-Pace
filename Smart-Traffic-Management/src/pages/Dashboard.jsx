import React, { useState, useEffect } from 'react';
import TrafficStats from "../components/TrafficStats";
import IntersectionGrid from "../components/IntersectionGrid";
import { bhopalIntersections, optimizationMetrics, alerts } from '../data/trafficData';
import {
    Activity,
    Clock,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    Car,
    Fuel,
    Leaf
} from 'lucide-react';

const Dashboard = ({ user }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [realtimeData, setRealtimeData] = useState(bhopalIntersections);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Simulate real-time data updates
    useEffect(() => {
        const interval = setInterval(() => {
            setRealtimeData(prev => prev.map(intersection => ({
                ...intersection,
                vehicleCount: intersection.vehicleCount + Math.floor(Math.random() * 10 - 5),
                averageSpeed: Math.max(15, intersection.averageSpeed + Math.floor(Math.random() * 6 - 3)),
                lastUpdate: new Date().toISOString()
            })));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const activeSignals = realtimeData.filter(signal => signal.status === 'active').length;
    const criticalAlerts = alerts.filter(alert => alert.severity === 'high' && alert.status === 'active').length;
    const avgOptimization = optimizationMetrics.averageOptimization;

    return (
        <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="slide-in-up">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
                            <p className="text-blue-100 mt-1">
                                Bhopal Traffic Control Center - {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">{activeSignals}/{realtimeData.length}</div>
                            <div className="text-blue-100 text-sm">Active Signals</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-in-up stagger-1">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">System Status</p>
                            <p className="text-2xl font-bold text-green-400">{avgOptimization}%</p>
                            <p className="text-gray-300 text-sm">Optimization</p>
                        </div>
                        <Activity className="w-10 h-10 text-green-400" />
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Active Alerts</p>
                            <p className="text-2xl font-bold text-red-400">{criticalAlerts}</p>
                            <p className="text-gray-300 text-sm">Critical Issues</p>
                        </div>
                        <AlertTriangle className="w-10 h-10 text-red-400" />
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Time Saved</p>
                            <p className="text-2xl font-bold text-blue-400">{optimizationMetrics.timeSaved}</p>
                            <p className="text-gray-300 text-sm">min/vehicle/day</p>
                        </div>
                        <Clock className="w-10 h-10 text-blue-400" />
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Fuel Saved</p>
                            <p className="text-2xl font-bold text-yellow-400">{optimizationMetrics.fuelSaved}L</p>
                            <p className="text-gray-300 text-sm">Per Day</p>
                        </div>
                        <Fuel className="w-10 h-10 text-yellow-400" />
                    </div>
                </div>
            </div>

            {/* Traffic Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 slide-in-up stagger-2">
                    <TrafficStats data={realtimeData} />
                </div>

                {/* Quick Actions & Status */}
                <div className="space-y-6 slide-in-up stagger-3">
                    {/* System Health */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Network Status</span>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span className="text-green-400 text-sm">Online</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Database</span>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span className="text-green-400 text-sm">Connected</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">AI Processing</span>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-blue-400" />
                                    <span className="text-blue-400 text-sm">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Environmental Impact */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-4">Environmental Impact</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">CO₂ Reduction</span>
                                <span className="text-green-400 font-semibold">{optimizationMetrics.emissionReduction}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Fuel Efficiency</span>
                                <span className="text-blue-400 font-semibold">+{optimizationMetrics.throughputImprovement}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Air Quality</span>
                                <div className="flex items-center gap-2">
                                    <Leaf className="w-4 h-4 text-green-400" />
                                    <span className="text-green-400 text-sm">Improved</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Intersection Grid */}
            <div className="slide-in-up stagger-4">
                <IntersectionGrid data={realtimeData} />
            </div>
        </div>
    );
};

export default Dashboard;
