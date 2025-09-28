import React, { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import SignalControl from "./pages/SignalControl";
import Analytics from "./pages/Analytics";
import MapView from "./pages/MapView";
import Alerts from "./pages/Alerts";


function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isPageLoading, setIsPageLoading] = useState(true);

  const CurrentPage = useMemo(() => {
    switch (activeTab) {
      case "Dashboard":
        return Dashboard;
      case "Signal Control":
        return SignalControl;
      case "Analytics":
        return Analytics;
      case "Map View":
        return MapView;
      case "Alerts":
        return Alerts;
      default:
        return Dashboard;
    }
  }, [activeTab]);

  // Trigger page animation on tab change
  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Trigger page animation on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={`${isPageLoading ? 'opacity-0' : 'opacity-100 zoom-in'}`}>
        <CurrentPage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
