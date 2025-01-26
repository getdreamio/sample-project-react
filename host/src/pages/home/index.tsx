import React, { Suspense } from "react";
import { importRemote } from '@dream.mf/react';
import Layout from "../../layout";
import PageLoader from "../../components/page-loader";
import PageBreadcrumbs from "../../components/breadcrumb";
import { Paper } from "@mui/material";

// @ts-ignore
const HomeRemote = React.lazy(() =>
    importRemote({
        remoteUrl: 'http://localhost:3001/remote.js',
        scope: 'remote_home',
        module: 'Application',
        remoteUrlFallback: null
    })
);

const HomePage = () => {
    return (
        <Layout>
            <PageBreadcrumbs items={[{ label: 'Remote App - Home' }]} />
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                <Suspense fallback={<PageLoader />}>
                    <HomeRemote />
                </Suspense>
            </Paper>
        </Layout>
    );
}

export default HomePage;