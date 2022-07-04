import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import { NavBar } from '../components/NavBar';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
