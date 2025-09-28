import React from "react";

const MapView = () => {
    return (
        <div className="p-6">
            <div className="zoom-in stagger-1">
                <h2 className="text-xl font-semibold mb-2">Map View</h2>
                <p className="text-gray-600">Explore live intersections and incidents on the map.</p>
            </div>
            <div className="slide-in-up stagger-2 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center shimmer">
                        <span className="text-gray-500 font-medium">Interactive Map Loading...</span>
                    </div>
                    <div className="mt-4 flex gap-4">
                        <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover-scale hover-glow">
                            Live View
                        </button>
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover-scale hover-glow">
                            Traffic Layer
                        </button>
                        <button className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover-scale hover-glow">
                            Incidents
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapView;


