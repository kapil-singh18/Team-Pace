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

    // Dark color palette
    const statusBgColor = {
        red: "bg-red-900",
        yellow: "bg-yellow-900",
        green: "bg-green-900",
    };
    const statusDotColor = {
        red: "bg-red-400",
        yellow: "bg-yellow-400",
        green: "bg-green-400",
    };

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-md p-6 w-full sm:w-[360px] transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full ${statusDotColor[statusColor]}`} />
                    <h2 className="text-lg font-semibold text-white truncate">{name}</h2>
                </div>
                <span
                    className={`px-3 py-1 text-xs rounded-full font-medium transition ${aiEnabled ? "bg-blue-900 text-blue-300" : "bg-gray-700 text-gray-300"
                        }`}
                >
                    {aiEnabled ? "AI Active" : "Manual"}
                </span>
            </div>

            {/* Alert */}
            {alert && (
                <div
                    className={`flex items-center gap-2 text-red-300 p-2 rounded-lg mb-4 text-sm animate-pulse truncate border ${typeof alert === "string" && alert.toLowerCase().includes("emergency vehicle")
                        ? "bg-gray-800 border-red-500"
                        : "bg-red-900 border-red-700"
                        }`}
                >
                    <FaExclamationTriangle /> {alert}
                </div>
            )}

            {/* Phase & Vehicles */}
            <div className="flex justify-between mb-4 text-sm text-gray-400">
                <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1"><FaClock /> Phase</span>
                    <span className="font-semibold text-white">
                        {currentPhase} <span className="text-gray-400">({timer}s)</span>
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1"><FaCar /> Vehicles</span>
                    <span className="font-semibold text-white">{totalVehicles}</span>
                </div>
            </div>

            {/* Queue Lengths */}
            {queues && Object.keys(queues).length > 0 && (
                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-300 mb-2">Queues</h3>
                    <div className="space-y-2">
                        {Object.entries(queues).map(([dir, val]) => (
                            <div key={dir} className="flex items-center gap-2">
                                <span className="w-14 text-gray-400 text-sm">{dir}</span>
                                <div className="flex-1 h-2 bg-gray-600 rounded-full overflow-hidden">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${val > 10 ? "bg-red-400" : "bg-blue-400"
                                            }`}
                                        style={{ width: `${Math.min(val * 10, 100)}%` }}
                                    />
                                </div>
                                <span
                                    className={`text-sm font-medium ${val > 10 ? "text-red-400" : "text-white"
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
                <span className="text-gray-400">
                    Avg Trip: <span className="font-semibold text-white">{avgTripTime}s</span>
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
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition duration-300 ${aiEnabled ? "bg-red-900 text-red-300 hover:bg-red-800" : "bg-blue-900 text-blue-300 hover:bg-blue-800"
                        }`}
                >
                    {aiEnabled ? <FaStop /> : <FaPlay />}
                    {aiEnabled ? "Disable AI" : "Enable AI"}
                </button>
                <button className="p-2 rounded-lg border border-gray-600 bg-gray-700 hover:bg-gray-600 transition text-gray-300">
                    <FaCog />
                </button>
            </div>
        </div>
    );
};

export default IntersectionCard;
