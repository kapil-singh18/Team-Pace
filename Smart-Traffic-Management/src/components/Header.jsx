// src/components/Header.jsx
import React, { useState } from "react";
import {
    LayoutDashboard,
    Activity,
    Map,
    BarChart3,
    AlertTriangle,
    Search,
    User,
    Settings,
    LogOut,
    ChevronDown,
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
    user,
    activeTab = "Dashboard",
    onTabChange,
    onLogout,
}) => {
    const [showUserMenu, setShowUserMenu] = useState(false);

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

                {/* User Menu */}
                <div className="relative">
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <div className="bg-green-500 text-white p-2 rounded-full shadow hover:bg-green-600 transition hover-scale float">
                            <User size={18} />
                        </div>
                        <div className="text-left">
                            <h2 className="text-sm font-medium text-white">{user?.name}</h2>
                            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                        </div>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>

                    {/* Dropdown Menu */}
                    {showUserMenu && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                            <div className="p-3 border-b border-gray-700">
                                <p className="text-sm font-medium text-white">{user?.name}</p>
                                <p className="text-xs text-gray-400">{user?.email}</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowUserMenu(false);
                                    onLogout && onLogout();
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition"
                            >
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
