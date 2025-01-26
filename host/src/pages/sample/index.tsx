import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { importRemote } from '@dream.mf/react';
import Layout from "../../layout";
import PageLoader from "../../components/page-loader";
import PageBreadcrumbs from "../../components/breadcrumb";
import { Paper } from "@mui/material";

// @ts-ignore
const SampleRemote = React.lazy(() =>
    importRemote({
        remoteUrl: 'http://localhost:3002/remote.js',
        scope: 'remote_sample',
        module: 'Application',
        remoteUrlFallback: null
    })
);

const SamplePage = () => {
    let { id } = useParams();
    return (
        <Layout>
            <PageBreadcrumbs items={[
                { label: 'Sample', href: '/sample/123456' },
                { label: id }
            ]} />
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                <Suspense fallback={<PageLoader />}>
                    <SampleRemote id={id} />
                </Suspense>
            </Paper>
        </Layout>
    );
};

export default SamplePage;