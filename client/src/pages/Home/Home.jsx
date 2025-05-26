import React from "react";
import Layout from "components/layout/Layout";
import Body from "pages/Home/components/Body";

const Home = () => (
    <>
        <Layout location="Home">
            <div className="min-vh-100 d-flex flex-column justify-content-between">
                <Body />
            </div>
        </Layout>
    </>
);
export default Home;
