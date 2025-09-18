// src/components/Header.jsx
import React, { useState } from "react";
import {
    LayoutDashboard,
    Activity,
    Map,
    BarChart3,
    AlertTriangle,
    Bell,
    User,
    Search,
} from "lucide-react";

const Header = ({
    logo = { name: "TrafficAI", tagline: "Smart Traffic Management" },
    navItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "Signal Control", icon: <Activity size={18} /> },
        { name: "Map View", icon: <Map size={18} /> },
        { name: "Analytics", icon: <BarChart3 size={18} /> },
        { name: "Alerts", icon: <AlertTriangle size={18} /> },
    ],
    notifications = 3,
    user = { name: "Sarah Johnson", role: "Traffic Operator" },
}) => {
    // State to track active nav tab
    const [activeTab, setActiveTab] = useState("Dashboard");

    return (
        <header className="flex items-center justify-between px-6 py-3 shadow bg-white">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
                <div className="bg-green-500 text-white p-2 rounded-xl shadow">
                    <Activity size={20} />
                </div>
                <div>
                    <h1 className="font-semibold text-lg text-green-600">{logo.name}</h1>
                    <p className="text-xs text-gray-500">{logo.tagline}</p>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="flex items-center gap-4">
                {navItems.map((item, index) => {
                    const isActive = activeTab === item.name;
                    return (
                        <button
                            key={index}
                            onClick={() => setActiveTab(item.name)}
                            className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition ${isActive
                                ? "bg-gray-100 border-b-2 border-green-500 text-black"
                                : "text-gray-700 hover:text-black"
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </button>
                    );
                })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-6">
                {/* Search */}
                <div className="relative">
                    <Search
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded-md pl-9 pr-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Notifications */}
                <div className="relative cursor-pointer ">
                    <Bell size={20} className="text-gray-700" />
                    {notifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {notifications}
                        </span>
                    )}
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-2">
                    <div className="bg-green-500 text-white p-2 rounded-full">
                        <User size={18} />
                    </div>
                    <div>
                        <h2 className="text-sm font-medium">{user.name}</h2>
                        <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
