import React, { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import SignalControl from "./pages/SignalControl";
import Analytics from "./pages/Analytics";
import MapView from "./pages/MapView";
import Alerts from "./pages/Alerts";
import LoginPage from "./pages/LoginPage";
import { AuthService } from "./services/authService";


function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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

  // Check authentication on app load
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsCheckingAuth(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    setActiveTab("Dashboard");
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />
      <div className={`${isPageLoading ? 'opacity-0' : 'opacity-100 zoom-in'}`}>
        <CurrentPage user={user} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
