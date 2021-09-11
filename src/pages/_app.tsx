import "~/styles/style.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { ReactElement } from "react";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <Head>
        <title>Slive</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-blue-50 w-screen h-screen">
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
