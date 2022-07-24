import prismaClient from "../../../utils/client";

export interface RoomGetReturn {
    name: string
    people: Array<PeopleType>
    createdBy: Creator
    sorterDate: string
    roomType: string

}

interface PeopleType {
    name: string
    email: string
    id: string

}

interface Creator {
    id: string
    name: string
    email: string

}

export default class GetRoomController {
    async searchByName (name: string) {
        try {
            const room = await prismaClient.room.findUnique({ 
                where: {
                    name: name
                },
                select: {
                    id: true,
                    name: true
                }
            });

            if (!room)
                return {
                    notExist: true
                }

            return {
                notExist: false,
                room
            }

        } catch (err) {
            return {
                err

            }

        }   

    }

    async getList (userEmail: string, userId: string) {
        try {
            const rooms = await prismaClient.room.findMany({
                where: {
                    OR: [
                        {
                            createdBy: userId
                        },
                        {
                            people: {
                                every: {
                                    email: userEmail
                                }
                            }
                        }
                    ]
                },
                select: {
                    name: true,
                    id: true,
                    roomType: true,
                    sorterDate: true
                }
            });

            return {
                success: true,
                rooms,
                total: rooms.length
            }

        } catch (err) {
            return {
                success: false,
                rooms: [],
                total: 0,
                err

            }

        }

    }

    async getById (id: string) {
        try {
            const room = await prismaClient.room.findUnique({
                where: {
                    id
                },
                select: {
                    name: true,
                    people: {
                        select: {
                            name: true,
                            email: true,
                            id: true
                        }
                    },
                    createdBy: true,
                    sorterDate: true,
                    roomType: true
                }
            });

            if (!room)
                throw new Error("Room not exist!");

            const creator = await prismaClient.user.findUnique({
                where: {
                    id: room.createdBy
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            })

            if (!creator)
                throw new Error("Creator not found!");

            const _room = {
                ...room,
                createdBy: creator

            }

            return {
                _room
            }

        } catch (err) {
            return {
                _room: null,
                err
            }

        }

    }

}
