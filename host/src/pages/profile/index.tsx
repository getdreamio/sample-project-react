import React, { Suspense } from "react";
import { importRemote } from '@dream.mf/react';
import Layout from "../../layout";
import { DreamMFAuthGuard } from "@dream.mf/oidc";
import PageLoader from "../../components/page-loader";
import PageBreadcrumbs from "../../components/breadcrumb";
import { Paper, Typography, Divider } from "@mui/material";

const ProfileRemote = React.lazy(() =>
    importRemote({
        remoteUrl: 'http://localhost:3003/remote.js',
        scope: 'remote_profile',
        module: 'Application',
        remoteUrlFallback: null
    })
);

const ProfileHealthRemote = React.lazy(() =>
    importRemote({
        remoteUrl: 'http://localhost:3003/remote.js',
        scope: 'remote_profile',
        module: 'Health',
        remoteUrlFallback: null
    })
);

const ProfilePage = () => {
    return (
        <Layout>
            <PageBreadcrumbs items={[
                { label: 'Profile', href: '/profile' },
                { label: 'Details' }
            ]} />
            <DreamMFAuthGuard fallback={
                <Paper elevation={2} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h5" color="text.secondary">
                        Hold tight, Logging you in...
                    </Typography>
                </Paper>
            }>
                <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                    <Suspense fallback={<PageLoader />}>
                        <ProfileRemote />
                        <Divider sx={{ my: 3 }} />
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Package Details
                        </Typography>
                        <ProfileHealthRemote />
                    </Suspense>
                </Paper>
            </DreamMFAuthGuard>
        </Layout>
    );
};

export default ProfilePage;
