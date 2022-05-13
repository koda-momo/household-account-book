import Head from "next/head";
import type { AppProps } from "next/app";
import "../styles/global.css";

//components
import { Layout } from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>家計簿</title>
        <meta name="household-account-book" content="household-account-boo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
