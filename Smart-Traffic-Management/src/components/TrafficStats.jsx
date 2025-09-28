import React from "react";
import { Clock, Activity, Car, RefreshCcw, Leaf } from "lucide-react";
import StatsCard from "./StatsCard";

const TrafficStats = () => {
    const statsData = [
        {
            title: "Average Commute",
            value: "18.4",
            unit: "min",
            change: -12,
            icon: <Clock size={20} className="text-green-600" />,
        },
        {
            title: "Efficiency Gain",
            value: "23.7",
            unit: "%",
            change: 8.2,
            icon: <Activity size={20} className="text-blue-600" />,
        },
        {
            title: "Active Vehicles",
            value: "47.2",
            unit: "K",
            change: 15.3,
            icon: <Car size={20} className="text-yellow-600" />,
        },
        {
            title: "Throughput",
            value: "2,847",
            unit: "veh/hr",
            change: 11.7,
            icon: <RefreshCcw size={20} className="text-purple-600" />,
        },
        {
            title: "CO₂ Saved",
            value: "847",
            unit: "kg",
            change: 19.4,
            icon: <Leaf size={20} className="text-green-500" />,
        },
    ];

    return (
        <section className="px-6 py-6 bg-gray-900 ">
            {/* Section Heading */}
            <h2 className="text-green-400 font-semibold text-lg">
                Traffic Management Dashboard

            </h2>
            <p className="text-gray-400 text-sm mb-6">
                Real-time monitoring and intelligent traffic optimization
            </p>


            <div className="flex flex-wrap justify-center gap-6">
                {statsData.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>
        </section>
    );
};

export default TrafficStats;
