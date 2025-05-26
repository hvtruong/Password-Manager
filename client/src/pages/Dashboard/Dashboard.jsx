import Layout from "components/layout/Layout";
import Table from "./Table";

const Dashboard = () => (
    <Layout location="Dashboard">
        <div className="min-vh-100 d-flex flex-column justify-content-between">
            <Table />
        </div>
    </Layout>
);

export default Dashboard;
