import TrafficStats from "../components/TrafficStats";
import IntersectionGrid from "../components/IntersectionGrid";
const Dashboard = () => {
    return (
        <div className="p-6">
            <div className="slide-in-up stagger-1">
                <TrafficStats />
            </div>
            <div className="slide-in-up stagger-2">
                <IntersectionGrid />
            </div>
        </div>
    );
};

export default Dashboard;
