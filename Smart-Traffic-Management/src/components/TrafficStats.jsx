import React, { useMemo } from "react";
import { Clock, Activity, Car, RefreshCcw, Leaf } from "lucide-react";
import StatsCard from "./StatsCard";
import { optimizationMetrics } from "../data/trafficData";

const TrafficStats = ({ data = [] }) => {
    const statsData = useMemo(() => {
        const totalVehicles = data.reduce((sum, intersection) => sum + intersection.vehicleCount, 0);
        const avgSpeed = data.length > 0 ?
            (data.reduce((sum, intersection) => sum + intersection.averageSpeed, 0) / data.length).toFixed(1) : 0;
        const totalThroughput = data.reduce((sum, intersection) => sum + intersection.throughput, 0);
        const avgCommute = data.length > 0 ?
            (data.reduce((sum, intersection) => sum + intersection.averageWaitTime, 0) / data.length).toFixed(1) : 0;

        return [
            {
                title: "Average Wait Time",
                value: avgCommute,
                unit: "min",
                change: -12.3,
                icon: <Clock size={20} className="text-green-600" />,
            },
            {
                title: "System Efficiency",
                value: optimizationMetrics.averageOptimization,
                unit: "%",
                change: 8.2,
                icon: <Activity size={20} className="text-blue-600" />,
            },
            {
                title: "Active Vehicles",
                value: (totalVehicles / 1000).toFixed(1),
                unit: "K",
                change: 15.3,
                icon: <Car size={20} className="text-yellow-600" />,
            },
            {
                title: "Avg Throughput",
                value: Math.floor(totalThroughput / data.length) || 0,
                unit: "veh/hr",
                change: optimizationMetrics.throughputImprovement,
                icon: <RefreshCcw size={20} className="text-purple-600" />,
            },
            {
                title: "CO₂ Reduction",
                value: optimizationMetrics.emissionReduction,
                unit: "%",
                change: 19.4,
                icon: <Leaf size={20} className="text-green-500" />,
            },
        ];
    }, [data]);

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
