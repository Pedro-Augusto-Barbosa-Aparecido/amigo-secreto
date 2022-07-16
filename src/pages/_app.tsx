import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { NavBar } from '../components/NavBar';
import { AuthProvider } from '../context/Auth';

import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Amigos secreto de konoha</title>
      </Head>
      <AuthProvider>
        <NavBar />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
