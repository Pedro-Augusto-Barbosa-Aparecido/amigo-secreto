import { setCookie } from "nookies";
import React, { createContext, useState } from "react";

type AuthContextType = {
    user?: UserAuthContextSaveParams | null,
    saveInfo: (_user: UserAuthContextSaveParams) => void
}

type UserAuthContextSaveParams = {
    name: string
    email: string
    id: string
    token: string
    
}

const TIME_COOKIES = 60 * 60 * 2; // 2 horas

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: JSX.Element[] }) => {
    const [user, setUser] = useState<UserAuthContextSaveParams | null>(null);

    const saveInfo = (user: UserAuthContextSaveParams) => {
        setCookie(undefined, 'nextauth.token', user.token, { maxAge: TIME_COOKIES });
        setCookie(undefined, 'nextauth.email', user.email, { maxAge: TIME_COOKIES });
        setCookie(undefined, 'nextauth.id', user.id, { maxAge: TIME_COOKIES });

        setUser(user);

    }

    return (
        <AuthContext.Provider value={{ user, saveInfo }}>
            { children }
        </AuthContext.Provider>
    );

}
