import TrafficStats from "../components/TrafficStats";
import IntersectionGrid from "../components/IntersectionGrid";
const Dashboard = () => {
    return (
        <div className="p-6">

            <TrafficStats />
            <IntersectionGrid />

        </div>
    );
};

export default Dashboard;
