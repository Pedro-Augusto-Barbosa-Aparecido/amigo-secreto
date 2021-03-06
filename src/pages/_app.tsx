import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { NavBar } from '../components/NavBar';
import { AuthProvider } from '../context/Auth';

import NextNProgress from 'nextjs-progressbar';

import Head from 'next/head';
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Konan Amigo Secreto' />
        <meta property='og:description' content={`Venha brincar com seus amigos no velho amigo secreto!`} />
        <meta property='og:image' content="https://konan.vercel.app/_next/image?url=%2Fimgs%2Fimg-background.png&w=1920&q=75" />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content="700" />
        <meta property='og:locale' content="pt_BR" />
        <meta property='og:url' content={`https://Konan.vercel.app/`} />
        <meta property='og:site_name' content='Konan' />
        <title>Amigos secreto de konoha</title>
      </Head>
      <AuthProvider>
        <NextNProgress
            color="#F05321"
            startPosition={0.3}
            stopDelayMs={200}
            height={10}
            showOnShallow={true}
        />
        <NavBar />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
