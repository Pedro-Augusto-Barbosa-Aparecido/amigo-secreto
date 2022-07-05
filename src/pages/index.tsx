import type { GetServerSideProps, NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth';
import { verifyCookies } from '../utils/cookiesVerifier';

const Home: NextPage = () => {
  const { user } = useContext(AuthContext);

  if (!user) 
    Router.push("/login");


  return (
    <div>Hello</div>
  )
}

export default Home;
