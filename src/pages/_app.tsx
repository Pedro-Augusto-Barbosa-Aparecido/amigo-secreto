import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { NavBar } from '../components/NavBar';
import { AuthProvider } from '../context/Auth';

import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Konan Amigo Secreto' />
        <meta property='og:description' content={`Venha brincar com seus amigos no velho amigo secreto!`} />
        <meta property='og:image' content="" />
        <meta property='og:image:width' content='' />
        <meta property='og:image:height' content="" />
        <meta property='og:locale' content="pt_BR" />
        <meta property='og:url' content={`https://Konan.vercel.app/room/register-me`} />
        <meta property='og:site_name' content='Konan' />
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
