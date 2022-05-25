import Head from "next/head";
import type { AppProps } from "next/app";

//CSS
import "../styles/global.css";
import { ThemeProvider } from "@mui/material/styles";

//SWR
import { SWRConfig } from "swr";
import { fetcher } from "../utils/fetcher";

//components
import { Layout } from "../components/layout/Layout";
import { theme } from "../styles/MuiColor";

//other
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>家計簿</title>
        <meta name="household-account-book" content="household-account-boo" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <ThemeProvider theme={theme}>
            <div>
              <Toaster />
            </div>
            <Component {...pageProps} />
          </ThemeProvider>
        </Layout>
      </SWRConfig>
    </>
  );
}

export default MyApp;
