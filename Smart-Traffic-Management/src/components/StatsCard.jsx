// src/components/StatsCard.jsx
import React from "react";

const StatsCard = ({ icon, title, value, unit, change }) => {
    const isPositive = change >= 0;

    return (
        <div
            className="bg-white rounded-xl p-5 flex flex-col gap-2 w-60 hover:shadow-lg hover:scale-[1.02] 
                 transition-all duration-300 border border-transparent
                 hover:shadow-lg hover:border-green-500"
        >
            {/* Icon + Change */}
            <div className="flex items justify-between">
                <div className="p-2 rounded-lg bg-gray-100">{icon}</div>
                <span
                    className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-500"
                        }`}
                >
                    {isPositive ? `↑ ${change}%` : `↓ ${Math.abs(change)}%`}
                </span>
            </div>

            {/* Title */}
            <p className="text-sm text-gray-600">{title}</p>

            {/* Value */}
            <h2 className="text-2xl font-bold text-black">
                {value}{" "}
                <span className="text-sm font-normal text-gray-500">{unit}</span>
            </h2>
        </div>
    );
};

export default StatsCard;
