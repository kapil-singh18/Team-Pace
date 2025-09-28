// src/components/Header.jsx
import React from "react";
import {
    LayoutDashboard,
    Activity,
    Map,
    BarChart3,
    AlertTriangle,
    Search,
    User,
    Settings,
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
    user = { name: "Sarah Johnson", role: "Traffic Operator" },
    activeTab = "Dashboard",
    onTabChange,
}) => {

    return (
        <header className="flex items-center justify-between px-6 py-3 shadow bg-gray-800 bounce-in-left">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
                <div className="bg-green-500 text-white p-2 rounded-xl shadow hover-scale glow">
                    <Activity size={20} />
                </div>
                <div className="slide-in-left">
                    <h1 className="font-semibold text-lg text-green-600">{logo.name}</h1>
                    <p className="text-xs text-gray-400">{logo.tagline}</p>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="flex items-center gap-4">
                {navItems.map((item, index) => {
                    const isActive = activeTab === item.name;
                    return (
                        <button
                            key={index}
                            onClick={() => onTabChange && onTabChange(item.name)}
                            className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition hover-lift stagger-${index + 1}
                                ${isActive
                                    ? "bg-green-900 border-b-2 border-green-500 text-green-300 pulse-animation"
                                    : "text-gray-300 hover:bg-green-800 hover:text-green-400"
                                }`}
                        >
                            <span className="hover-rotate">{item.icon}</span>
                            {item.name}
                        </button>
                    );
                })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-6 bounce-in-right">
                {/* Search */}
                <div className="relative">
                    <Search
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-600 bg-gray-700 text-white rounded-md pl-9 pr-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 hover-scale placeholder-gray-400"
                    />
                </div>

                <div className="text-gray-300 p-2 rounded-full cursor-pointer shadow hover:bg-gray-700 transition hover-rotate hover-glow">
                    <Settings size={18} />
                </div>

                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="bg-green-500 text-white p-2 rounded-full shadow hover:bg-green-600 transition hover-scale float">
                        <User size={18} />
                    </div>
                    <div>
                        <h2 className="text-sm font-medium">{user.name}</h2>
                        <p className="text-xs text-gray-400">{user.role}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
