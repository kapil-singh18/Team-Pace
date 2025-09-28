import React from "react";

const Alerts = () => {
    return (
        <div className="p-6">
            <div className="bounce-in stagger-1">
                <h2 className="text-xl font-semibold mb-2">Alerts</h2>
                <p className="text-gray-600">Review critical alerts and notifications.</p>
            </div>
            <div className="slide-in-up stagger-2 mt-6">
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-md hover-lift border-l-4 border-red-500 pulse-animation">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div>
                                <h3 className="font-medium text-red-700">High Priority</h3>
                                <p className="text-sm text-gray-600">Emergency vehicle detected at Main St & Oak Ave</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md hover-lift border-l-4 border-yellow-500">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div>
                                <h3 className="font-medium text-yellow-700">Medium Priority</h3>
                                <p className="text-sm text-gray-600">Traffic congestion building at Central Blvd</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md hover-lift border-l-4 border-green-500">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div>
                                <h3 className="font-medium text-green-700">Low Priority</h3>
                                <p className="text-sm text-gray-600">System maintenance scheduled for tonight</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alerts;


