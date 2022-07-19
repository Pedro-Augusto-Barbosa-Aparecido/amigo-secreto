import prismaClient from "../../../utils/client";

export interface RoomParams {
    roomName: string
    typeRoom: string
    dateSorter: Date
    createdBy: string

}

export default class CreateRoomController {
    create = async (room: RoomParams) => {
        try {
            const roomExist = await prismaClient.room.findUnique({
                where: {
                    name: room.roomName
                }
            });

            if (roomExist)
                return {
                    success: false,
                    exist: true
                }

            await prismaClient.room.create({
                data: {
                    name: room.roomName,
                    roomType: room.typeRoom,
                    createdBy: room.createdBy,
                    sorterDate: new Date(room.dateSorter)
                }
            });

            return {
                success: true
            }

        } catch (err) {
            return {
                success: false,
                err
            }

        }
    }

}