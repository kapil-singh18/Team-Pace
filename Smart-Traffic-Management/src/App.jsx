import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import SignalControl from "./pages/SignalControl";
import Analytics from "./pages/Analytics";
import MapView from "./pages/MapView";
import Alerts from "./pages/Alerts";


function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");

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

  return (
    <div>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <CurrentPage />
      <Footer />
    </div>
  );
}

export default App;
