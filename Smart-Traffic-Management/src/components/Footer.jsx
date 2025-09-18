import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full border-t bg-gray-50/30 py-2 px-4">
            <div className="container mx-auto flex items-center justify-between text-sm text-gray-500">
                <span>© 2024 AI Traffic Management System - Prototype Implementation</span>

                <div className="flex items-center gap-2">
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                    <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span>All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;