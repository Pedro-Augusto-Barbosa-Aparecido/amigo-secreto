import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import GetRoomController, { RoomGetReturn } from "../../database/controllers/Room/GetRoomController";

export default function RoomDetail (props: { room: RoomGetReturn }) {
    return <></>

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
    room._room.sorterDate = (new Date(room._room?.sorterDate || "")).toString();

    return {
      props: {
        room: room._room
      }
    }

}
