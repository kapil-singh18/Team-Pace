import TrafficStats from "../components/TrafficStats";
import IntersectionGrid from "../components/IntersectionGrid";
const Dashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <TrafficStats />
            <IntersectionGrid />

        </div>
    );
};

export default Dashboard;
