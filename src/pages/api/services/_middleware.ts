import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function hanlder (req: NextRequest, event: NextFetchEvent) {
    const { "nextauth.token": token } = req.cookies;

    if (!token) 
        return NextResponse.redirect(`${process.env.BASE_URL}/login`);

    return NextResponse.next();

}
