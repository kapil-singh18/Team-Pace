import React from "react";

const Analytics = () => {
    return (
        <div className="p-6">
            <div className="bounce-in-right stagger-1">
                <h2 className="text-xl font-semibold mb-2">Analytics</h2>
                <p className="text-gray-600">View traffic trends, KPIs, and insights.</p>
            </div>
            <div className="slide-in-up stagger-2 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
                        <h3 className="text-lg font-medium mb-4">Traffic Trends</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Peak Hours</span>
                                <span className="font-semibold text-green-600">7-9 AM</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Average Wait</span>
                                <span className="font-semibold text-blue-600">2.3 min</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
                        <h3 className="text-lg font-medium mb-4">Performance</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Efficiency</span>
                                <span className="font-semibold text-green-600">+15%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Fuel Saved</span>
                                <span className="font-semibold text-purple-600">2,340L</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;


