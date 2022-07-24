import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";
import { MemberCard } from "../../components/MemberCard";
import { CopyToClipboard } from "react-copy-to-clipboard";

import GetRoomController, { RoomGetReturn } from "../../database/controllers/Room/GetRoomController";
import classNames from "classnames";

import Image from "next/image";
import Link from "next/link";

export default function RoomDetail (props: { room: RoomGetReturn }) {
    const [activeTab, setActiveTab] = useState<number>(1);

    const handleChangeTab = (tab: number) => {
      if ([1, 2].includes(tab)) 
        setActiveTab(tab);

    }

    const verifyIfCanSorter = (date: string): boolean => {
      const todayDate = new Date();
      const roomDate = new Date(date);

      return (todayDate.getUTCDate() === roomDate.getUTCDate()) && ((todayDate.getUTCMonth() + 1) === (roomDate.getUTCMonth() + 1)) &&
              (todayDate.getUTCFullYear() === roomDate.getUTCFullYear());

    }
    
    return (
      <main
        className="w-full h-with-nav px-12 py-16"
      >
        <h1 className="text-6xl text-dark-orange-700 font-istok-web font-extrabold ml-8">Meus Grupos</h1>
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
                  <span className='text-xl font-normal text-white overflow-hidden text-ellipsis block'>Grupo { props.room.name }</span>
                </div>
                <div 
                  className={classNames(
                    'hover:cursor-pointer hover:opacity-70 transition-all h-full w-52 flex items-center justify-center',
                    { "bg-blue-hv-200": activeTab === 2 }
                  )}
                  onClick={() => handleChangeTab(2)}
                >
                  <span className='text-xl text-white font-normal'>
                    Membros 
                    {/* <span className="bg-dark-blue-600 ml-4 bg-opacity-90 py-2 px-3 font-bold rounded-full text-sm"> */}
                    &nbsp;({props.room.people.length + 1})
                    {/* </span> */}
                  </span>
                </div>
              </div>
              { 
                activeTab === 1 && 
                <section className="w-full h-full px-8 py-12">
                  <div className="flex">
                    <div className="w-52 h-16">
                        <Image
                            src={"/imgs/rooms-image/room-one.png"}
                            width={"100%"}
                            height={70}
                            layout="responsive"
                            className="rounded-md"
                        />
                    </div>
                    <div className="h-36 flex font-semibold flex-col justify-end items-start pl-8 font-istok-web">
                      <span className="text-2xl text-dark-orange-600 mb-4">{ props.room.name }</span>
                      <div className="flex w-full">
                        <span className="text-dark-orange-600 text-xl">Tipo: </span>
                        <span className="text-white text-xl font-normal">&nbsp;&nbsp;{ props.room.roomType }</span>
                      </div>
                      <div className="flex w-full">
                        <span className="text-dark-orange-600 text-xl">Data do Sorteio: </span>
                        <span className="text-white text-xl font-normal">
                          &nbsp;&nbsp;{ `${(new Date(props.room.sorterDate)).getUTCDate().toString().padStart(2, '0')}/${((new Date(props.room.sorterDate)).getUTCMonth() + 1).toString().padStart(2, '0')}/${(new Date(props.room.sorterDate)).getFullYear()}` }
                        </span>
                        
                      </div>
                    </div>
                  </div>
                  <div className="w-2/5 h-32 mt-12 flex flex-col py-8 px-6 bg-white rounded-md">
                    <span className="text-2xl text-dark-orange-600 font-istok-web font-extrabold">Link do Grupo</span>
                    <CopyToClipboard 
                      text={`https://konan.vercel.app/rooms/register-me/${props.room.name.replaceAll(' ', '-')}`}
                      onCopy={
                        () => {
                          alert("Link copiado à area de transferência!");
                        }
                      }
                    >
                      <button
                        className="text-blue-700 text-xl underline block overflow-hidden text-ellipsis"
                      >
                        https://konan.vercel.app/rooms/register-me/{props.room.name.replaceAll(' ', '-')}
                      </button>
                    </CopyToClipboard>
                  </div>
                  <div className="w-2/5">
                    <button 
                      className={
                        classNames(
                          "text-white font-istok-web font-semibold text-xl mt-4 w-full bg-dark-orange-700 py-2 rounded-md shadow-md shadow-gray-back-100 active:scale-90 hover:bg-opacity-80",
                          { "cursor-not-allowed": !verifyIfCanSorter(props.room.sorterDate) }
                        )
                      }
                      disabled={!verifyIfCanSorter(props.room.sorterDate)}
                      onClick={() => {
                      
                      }}
                    >
                      Sortear
                    </button>
                  </div>
                </section> 
              }
              {
                activeTab === 2 &&
                <section className="w-full h-full px-8 py-12">
                  <span className="text-3xl text-white font-istok-web font-extrabold">Participantes: </span>
                  <div>
                    <MemberCard 
                      name={props.room.createdBy.name}
                      isCreator
                    />
                    {
                      props.room.people.map(person => {
                        return <MemberCard
                          name={person.name}
                          key={person.id}
                        />

                      })
                    }
                  </div>
                </section>
              }
            </div>
          </div>
      </main>
    );

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'nextauth.token': token } = await parseCookies(ctx);

    if (!token)
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    
    const { id } = ctx.query;
    const roomController = new GetRoomController();
    const room = await roomController.getById(id?.toString() || "");

    if (!room._room)
      return {
        redirect: {
            destination: "/aslcbakc",
            permanent: false
        }
      }
    
    // @ts-ignore
    room._room.sorterDate = (new Date(room._room?.sorterDate || "")).toISOString();

    return {
      props: {
        room: room._room
      }
    }

}
