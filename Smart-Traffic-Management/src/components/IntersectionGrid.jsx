import React, { useState } from "react";
import IntersectionCard from "./IntersectionCard";

const IntersectionGrid = () => {
    const [intersections, setIntersections] = useState([
        {
            name: "Main St & Broadway",
            statusColor: "red",
            alert: "Emergency vehicle detected",
            currentPhase: "EAST WEST",
            remainingTime: 38,
            totalVehicles: 45,
            queues: { North: 8, South: 5, East: 12, West: 7 },
            avgTripTime: 285,
            improvement: 12,
            aiEnabled: true,
        },
        {
            name: "5th Ave & 42nd St",
            statusColor: "yellow",
            alert: null,
            currentPhase: "NORTH SOUTH",
            remainingTime: 20,
            totalVehicles: 33,
            queues: { North: 3, South: 4, East: 6, West: 8 },
            avgTripTime: 198,
            improvement: 8,
            aiEnabled: true,
        },
        {
            name: "Park Ave & 23rd St",
            statusColor: "green",
            alert: null,
            currentPhase: "EAST WEST",
            remainingTime: 17,
            totalVehicles: 18,
            queues: { North: 2, South: 1, East: 2, West: 3 },
            avgTripTime: 156,
            improvement: 3,
            aiEnabled: false,
        },
    ]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center mt-8">
            {intersections.map((intersection, index) =>
                intersection ? (
                    <IntersectionCard
                        key={index}
                        {...intersection}
                        onToggleAI={() => toggleAI(index)}
                    />
                ) : null
            )}
        </div>
    );
};

export default IntersectionGrid;
