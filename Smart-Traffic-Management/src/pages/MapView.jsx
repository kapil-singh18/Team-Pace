import React from "react";

const MapView = () => {
    return (
        <div className="p-6">
            <div className="zoom-in stagger-1">
                <h2 className="text-xl font-semibold mb-2 text-white">Map View</h2>
                <p className="text-gray-400">Explore live intersections and incidents on the map.</p>
            </div>
            <div className="slide-in-up stagger-2 mt-6">
                <div className="bg-gray-800 p-6 rounded-lg shadow-md hover-lift">
                    <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center shimmer">
                        <span className="text-gray-400 font-medium">Interactive Map Loading...</span>
                    </div>
                    <div className="mt-4 flex gap-4">
                        <button className="px-4 py-2 bg-green-900 text-green-300 rounded-lg hover-scale hover-glow">
                            Live View
                        </button>
                        <button className="px-4 py-2 bg-blue-900 text-blue-300 rounded-lg hover-scale hover-glow">
                            Traffic Layer
                        </button>
                        <button className="px-4 py-2 bg-orange-900 text-orange-300 rounded-lg hover-scale hover-glow">
                            Incidents
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapView;


