import React, { useEffect, useState } from "react";
import { FaCar, FaClock, FaExclamationTriangle, FaCog, FaPlay, FaStop } from "react-icons/fa";

const IntersectionCard = ({
    name = "Unknown Intersection",
    statusColor = "green", // "red" | "yellow" | "green"
    mode = "Manual",
    alert = null,
    currentPhase = "-",
    remainingTime = 0,
    totalVehicles = 0,
    queues = {},
    avgTripTime = 0,
    improvement = 0,
    aiEnabled = false,
    onToggleAI = () => { },
}) => {
    const [timer, setTimer] = useState(remainingTime);

    // Countdown timer
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    // Light color palette
    const statusBgColor = {
        red: "bg-red-100",
        yellow: "bg-yellow-100",
        green: "bg-green-100",
    };
    const statusDotColor = {
        red: "bg-red-400",
        yellow: "bg-yellow-400",
        green: "bg-green-400",
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 w-full sm:w-[360px] transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full ${statusDotColor[statusColor]}`} />
                    <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
                </div>
                <span
                    className={`px-3 py-1 text-xs rounded-full font-medium transition ${aiEnabled ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {aiEnabled ? "AI Active" : "Manual"}
                </span>
            </div>

            {/* Alert */}
            {alert && (
                <div className="flex items-center gap-2 bg-red-100 text-red-700 border border-red-200 p-2 rounded-lg mb-4 text-sm animate-pulse truncate">
                    <FaExclamationTriangle /> {alert}
                </div>
            )}

            {/* Phase & Vehicles */}
            <div className="flex justify-between mb-4 text-sm text-gray-600">
                <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1"><FaClock /> Phase</span>
                    <span className="font-semibold text-gray-800">
                        {currentPhase} <span className="text-gray-500">({timer}s)</span>
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1"><FaCar /> Vehicles</span>
                    <span className="font-semibold text-gray-800">{totalVehicles}</span>
                </div>
            </div>

            {/* Queue Lengths */}
            {queues && Object.keys(queues).length > 0 && (
                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Queues</h3>
                    <div className="space-y-2">
                        {Object.entries(queues).map(([dir, val]) => (
                            <div key={dir} className="flex items-center gap-2">
                                <span className="w-14 text-gray-600 text-sm">{dir}</span>
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${val > 10 ? "bg-red-300" : "bg-blue-300"
                                            }`}
                                        style={{ width: `${Math.min(val * 10, 100)}%` }}
                                    />
                                </div>
                                <span
                                    className={`text-sm font-medium ${val > 10 ? "text-red-500" : "text-gray-800"
                                        }`}
                                >
                                    {val}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Performance */}
            <div className="flex justify-between items-center text-sm mb-4">
                <span className="text-gray-600">
                    Avg Trip: <span className="font-semibold text-gray-800">{avgTripTime}s</span>
                </span>
                <span
                    className={`font-semibold transition-colors duration-300 ${improvement >= 0 ? "text-green-500" : "text-red-400"
                        }`}
                >
                    {improvement >= 0 ? `+${improvement}%` : `${improvement}%`}
                </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleAI}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition duration-300 ${aiEnabled ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                        }`}
                >
                    {aiEnabled ? <FaStop /> : <FaPlay />}
                    {aiEnabled ? "Disable AI" : "Enable AI"}
                </button>
                <button className="p-2 rounded-lg border hover:bg-gray-100 transition">
                    <FaCog />
                </button>
            </div>
        </div>
    );
};

export default IntersectionCard;
