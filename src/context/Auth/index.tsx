import { setCookie } from "nookies";
import React, { createContext, useState } from "react";

type AuthContextType = {
    user?: UserAuthContextSaveParams | null,
    saveInfo: (_user: UserAuthContextSaveParams, _remember: boolean) => void
    setUserInfo: (_user: UserAuthContextSaveParams) => void
}

type UserAuthContextSaveParams = {
    name: string
    email: string
    id: string
    token: string
    
}

const TIME_COOKIES_SHORT = 60 * 60 * 24 * 3; // 3 dias

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: JSX.Element[] }) => {
    const [user, setUser] = useState<UserAuthContextSaveParams | null>(null);

    const saveInfo = (user: UserAuthContextSaveParams, remember: boolean) => {
        setCookie(undefined, 'nextauth.token', user.token, { maxAge: remember ? TIME_COOKIES_SHORT : null });
        setCookie(undefined, 'nextauth.email', user.email, { maxAge: remember ? TIME_COOKIES_SHORT : null });
        setCookie(undefined, 'nextauth.id', user.id, { maxAge: remember ? TIME_COOKIES_SHORT : null });
        setUser(user);

    }

    const setUserInfo = (user: UserAuthContextSaveParams) => setUser(user);

    return (
        <AuthContext.Provider value={{ user, saveInfo, setUserInfo }}>
            { children }
        </AuthContext.Provider>
    );

}
