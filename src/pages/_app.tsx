import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import { NavBar } from '../components/NavBar';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/Auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </AuthProvider>
  );
}

export default MyApp;
