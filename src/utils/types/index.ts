export type Room = {
    id?: string
    name: string
    createdBy: string 
    createdAt?: Date
    people?: People[]

}

export type People = {
    id?: string
    name: string
    email: string
    room?: Room[]

}
