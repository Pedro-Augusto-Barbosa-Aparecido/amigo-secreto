import { parseCookies } from "nookies";

export function verifyCookies (ctx: any) {
    const { 'nextauth.token': token } = parseCookies(ctx);

    if (token)
        return true;
    return false;

}
