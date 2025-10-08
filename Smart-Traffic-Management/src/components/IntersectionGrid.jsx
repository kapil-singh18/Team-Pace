import React, { useState, useEffect } from "react";
import IntersectionCard from "./IntersectionCard";

const IntersectionGrid = ({ data = [] }) => {
    const [intersections, setIntersections] = useState([]);

    useEffect(() => {
        // Transform the data to match the expected format
        const transformedData = data.map(intersection => {
            const getStatusColor = (congestion) => {
                switch (congestion) {
                    case 'critical': return 'red';
                    case 'high': return 'yellow';
                    case 'medium': return 'yellow';
                    case 'low': return 'green';
                    default: return 'gray';
                }
            };

            const getCurrentPhase = () => {
                const phases = ['NORTH SOUTH', 'EAST WEST'];
                return phases[Math.floor(Math.random() * phases.length)];
            };

            return {
                id: intersection.id,
                name: intersection.name,
                statusColor: intersection.status === 'maintenance' ? 'gray' : getStatusColor(intersection.congestionLevel),
                alert: intersection.status === 'maintenance' ? 'Under Maintenance' :
                    intersection.incidents > 0 ? `${intersection.incidents} incidents detected` : null,
                currentPhase: getCurrentPhase(),
                remainingTime: Math.floor(Math.random() * 60) + 15,
                totalVehicles: intersection.vehicleCount,
                queues: {
                    North: Math.floor(Math.random() * 15) + 1,
                    South: Math.floor(Math.random() * 15) + 1,
                    East: Math.floor(Math.random() * 15) + 1,
                    West: Math.floor(Math.random() * 15) + 1
                },
                avgTripTime: Math.floor(intersection.averageWaitTime * 60), // Convert to seconds
                improvement: Math.floor(Math.random() * 25) + 5,
                aiEnabled: intersection.status === 'active',
                cameras: intersection.cameras,
                sensors: intersection.sensors,
                throughput: intersection.throughput,
                averageSpeed: intersection.averageSpeed
            };
        });
        setIntersections(transformedData);
    }, [data]);

    const toggleAI = (index) => {
        setIntersections((prev) =>
            prev.map((inter, i) =>
                i === index
                    ? {
                        ...inter,
                        aiEnabled: !inter.aiEnabled,
                        mode: !inter.aiEnabled ? "AI Active" : "Manual",
                    }
                    : inter
            )
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Traffic Intersections</h2>
                <div className="text-sm text-gray-400">
                    {intersections.filter(i => i.aiEnabled).length} of {intersections.length} using AI optimization
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
                {intersections.map((intersection, index) =>
                    intersection ? (
                        <IntersectionCard
                            key={intersection.id}
                            {...intersection}
                            onToggleAI={() => toggleAI(index)}
                        />
                    ) : null
                )}
            </div>
        </div>
    );
};

export default IntersectionGrid;
