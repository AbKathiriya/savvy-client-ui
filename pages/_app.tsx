import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { WalletProvider } from "../src/contexts/walletContext";
import Layout from "../src/components/layout.component";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from '@mui/material/CssBaseline';
import theme from "../src/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WalletProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </WalletProvider>
    </ThemeProvider>
  );
}
