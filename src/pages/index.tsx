import type { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Auth';
import Head from "next/head";
import { useRouter } from 'next/router';
import { TailSpin } from 'react-loader-spinner';

import { parseCookies } from 'nookies';
import { verify } from "jsonwebtoken";

function Home() {
  const { user, saveInfo, setUserInfo } = useContext(AuthContext);
  const { isReady } = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(!isReady);
  }, [isReady]);

  if (isLoading) {
    return <div className='flex items-center justify-center w-full h-full'>
      <div className='mt-80'>
        <TailSpin
          color='#F00'
          width={150}
          height={150}
          
        />
      </div>
    </div>

  }

  return (
    <>
      <Head>
        <title>Amigos secreto de konoha</title>
      </Head>
      <main>
          <div className='px-32 pt-16'>
            <h1 className='text-5xl font-istok-web text-dark-orange-600 font-bold'>Meus grupos</h1>
            <span className='text-2xl font-semibold'>Crie seu grupo ou participe de um</span>
          </div>
          <div className='w-full flex items-center justify-center'>
            <div className='bg-blue-hv-200 w-11/12 h-96 rounded-nl mt-8'>

            </div>
          </div>
      </main>
    </>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'nextauth.token': token } = await parseCookies(ctx);

    if (!token)
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }

    try {
      verify(token, process.env.TOKEN_KEY || "");

    } catch (err) {
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      }
    }

    return {
      props: {
      }
    }

}
