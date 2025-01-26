import { BrowserRouter } from "react-router-dom";
import Routing from "./_routing";
import { useEffect } from "react";
import { DreamMFLogClient, DreamMFLogListener, LogConfig } from '@dream.mf/logging';
import { BaseAuthConfig, DreamMFAuthConfig, DreamMFAuthProvider } from "@dream.mf/oidc";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';

const HostRouter = () => {

  const config: LogConfig = {
    logInfo: (detail) => { console.log('#General#', detail); },
    logException: (detail) => { console.log('#Exception#', detail); },
    logPageView: (detail) => { console.log('#PageView#', detail); },
    logEvent: (detail) => { console.log("#Event#", detail) },
    debug: true,
  };

  const authConfig = () => {
    return {
      ...BaseAuthConfig,
      skipSigninCallback: false,
      authority: process.env.OAUTH_AUTHORITY || '',
      client_id: process.env.OAUTH_CLIENT_ID || '',
      client_secret: process.env.OAUTH_CLIENT_SECRET || '',
      redirect_uri: process.env.OAUTH_REDIRECT_URL || '',
      scope: process.env.OAUTH_SCOPE || '',
      post_logout_redirect_uri: process.env.OAUTH_POST_LOGOUT_URL || '',
      metadataUrl: process.env.OAUTH_WELL_KNOWN_URL || '',
      useFetchInterceptor: true,
    } as DreamMFAuthConfig;
  };

  useEffect(() => {
    DreamMFLogClient.logInfo({ message: 'App Loaded' });
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DreamMFLogListener config={config} />
      <DreamMFAuthProvider config={authConfig()}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </DreamMFAuthProvider>
    </ThemeProvider>
  );
};

export default HostRouter;