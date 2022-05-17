import Head from "next/head";
import type { AppProps } from "next/app";
import "../styles/global.css";
import { ThemeProvider } from "@mui/material/styles";

//components
import { Layout } from "../components/layout/Layout";
import { theme } from "../styles/MuiColor";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>家計簿</title>
        <meta name="household-account-book" content="household-account-boo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Layout>
    </>
  );
}

export default MyApp;
