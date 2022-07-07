import type { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from "nookies";
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/Auth';
import Head from "next/head";
import GetUserController from '../database/controllers/User/GetUserController';

function Home(props: { user: { name: string; email: string; id: string; token: string; } }) {
  const { setUserInfo, user } = useContext(AuthContext);
  useEffect(() => {
    setUserInfo({ 
      email: props.user.email, 
      name: props.user.name,
      id: props.user.id,
      token: props.user.token
    });

  }, []);

  return (
    <Head>
      <title>Amigos secreto de konoha</title>
    </Head>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'nextauth.token': token, 'nextauth.id': id } = parseCookies(ctx);

  if (!token) 
    return {
        redirect: {
          destination: '/login',
          permanent: false
        }
    }

  const controller = new GetUserController();
  const user = await controller.get({ id });

  return {
    props: {
      user: {
        name: user.user?.name,
        email: user.user?.email,
        id,
        token
      }
    }
  }

}
