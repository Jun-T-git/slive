import "~/styles/style.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { ReactElement } from "react";
import { RecoilRoot } from "recoil";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <Head>
        <title>SLive</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <main className="bg-[#112233] min-w-screen min-h-screen text-gray-100">
          <Component {...pageProps} />
        </main>
      </RecoilRoot>
    </>
  );
};

export default MyApp;
