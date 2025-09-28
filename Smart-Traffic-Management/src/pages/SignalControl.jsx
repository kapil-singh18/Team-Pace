import React from "react";

const SignalControl = () => {
    return (
        <div className="p-6">
            <div className="bounce-in-left stagger-1">
                <h2 className="text-xl font-semibold mb-2">Signal Control</h2>
                <p className="text-gray-600">Manage and optimize traffic signal timings.</p>
            </div>
            <div className="slide-in-up stagger-2 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
                    <h3 className="text-lg font-medium mb-4">Quick Controls</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 bg-green-100 rounded-lg hover-scale hover-glow">
                            <span className="block text-sm font-medium">Emergency Mode</span>
                        </button>
                        <button className="p-4 bg-blue-100 rounded-lg hover-scale hover-glow">
                            <span className="block text-sm font-medium">Optimize All</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignalControl;


