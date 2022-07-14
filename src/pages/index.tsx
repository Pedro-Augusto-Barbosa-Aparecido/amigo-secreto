import type { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Auth';
import { useRouter } from 'next/router';
import { TailSpin } from 'react-loader-spinner';

import { parseCookies } from 'nookies';
import { verify } from "jsonwebtoken";
import { IoMdAdd } from "react-icons/io";

import Head from "next/head";
import classNames from 'classnames';
import ListRooms from '../components/EmbedPages/ListRooms';
import CreateRooms from '../components/EmbedPages/CreateRooms';
import SearchRooms from '../components/EmbedPages/SearchRooms';

function Home() {
  const { user, saveInfo, setUserInfo } = useContext(AuthContext);
  const { isReady } = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleChangeTab = (tab: number) => {
    if ([1, 2, 3].includes(tab)) {
      setActiveTab(tab);

    } 

  }

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
      <main className='bg-gray-back-500'>
          <div className='px-32 pt-16'>
            <h1 className='text-5xl font-istok-web text-dark-orange-600 font-bold'>Meus grupos</h1>
            <span className='text-2xl font-semibold'>Crie seu grupo ou participe de um</span>
          </div>
          <div className='w-full flex items-center justify-center'>
            <div className='bg-blue-hv-200 w-11/12 h-tab rounded-nl mt-8'>
              <div className='flex w-full bg-dark-blue-600 rounded-t-nl h-14'>
                <div 
                  className={classNames(
                    'hover:cursor-pointer hover:opacity-70 transition-all h-full w-72 flex items-center justify-center rounded-tl-nl',
                    { "bg-blue-hv-200": activeTab === 1 }
                  )}
                  onClick={() => handleChangeTab(1)}
                >
                  <span className='text-xl font-normal text-white'>Gripos que eu participo</span>
                </div>
                <div 
                  className={classNames(
                    'hover:cursor-pointer hover:opacity-70 transition-all h-full w-48 flex items-center justify-center',
                    { "bg-blue-hv-200": activeTab === 2 }
                  )}
                  onClick={() => handleChangeTab(2)}
                >
                  <IoMdAdd className='mr-2 text-xl text-white font-normal' /> 
                  <span className='text-xl text-white font-normal'>Criar Grupo</span>
                </div>
                <div 
                  className={classNames(
                    'hover:cursor-pointer hover:opacity-70 transition-all h-full w-52 flex items-center justify-center',
                    { "bg-blue-hv-200": activeTab === 3 }
                  )}
                  onClick={() => handleChangeTab(3)}
                >
                  <span className='text-xl text-white font-normal'>Localizar Grupo</span>
                </div>
              </div>
              { activeTab === 1 && <ListRooms /> }
              { activeTab === 2 && <CreateRooms /> }
              { activeTab === 3 && <SearchRooms /> }
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
