import React, { useState, useEffect } from "react";

const Footer = ({
    systemName = "AI Traffic Management System",
    version = "Prototype Implementation",
    copyrightYear = new Date().getFullYear(),
    status = "All systems operational",
    statusColor = "green",
}) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <footer className="w-full border-t border-gray-200 bg-gray-50 text-sm text-gray-600 px-4 py-2 flex justify-between items-center">
            <div>
                © {copyrightYear} {systemName} - {version}
            </div>
            <div className="flex items-center gap-2">
                <span>Last updated: {time.toLocaleTimeString().toLowerCase()}</span>
                <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: statusColor }}
                ></span>
                <span>{status}</span>
            </div>
        </footer>
    );
};

export default Footer;
