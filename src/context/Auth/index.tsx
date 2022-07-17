import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { createContext, useState, useEffect } from "react";
import { api } from "../../api";

type AuthContextType = {
    user?: UserAuthContextSaveParams | null,
    saveInfo: (_user: UserAuthContextSaveParams, _remember: boolean) => void
    setUserInfo: (_user: UserAuthContextSaveParams) => void
    singOut: () => void
}

type UserAuthContextSaveParams = {
    name: string
    email: string
    id: string
    avatarUrl: string
    token: string
    
}

type GetUserInfoParams = {
    email: string
    token: string

}

const TIME_COOKIES_SHORT = 60 * 60 * 24 * 3; // 3 dias

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: JSX.Element[] }) => {
    const [user, setUser] = useState<UserAuthContextSaveParams | null>(null);

    const saveInfo = (user: UserAuthContextSaveParams, remember: boolean) => {
        setCookie(undefined, 'nextauth.token', user.token, { maxAge: remember ? TIME_COOKIES_SHORT : null });
        setUser(user);

    }

    const setUserInfo = (user: UserAuthContextSaveParams) => {
        setUser(user);

    };

    const singOut = () => {
        setUser(null);
        destroyCookie(undefined, "nextauth.token");

        Router.push("/login");

    }
    
    useEffect(() => {
        const { "nextauth.token": token } = parseCookies();
 
        if (token) {
            api.post("/api/auth/refresh-user", { token: `Bearer ${token}` }).then((res) => {
                if (!res.data.user)
                    Router.push("/login");

                setUser({ ...res.data.user.user, token });
                
            });

        }

    }, []);

    return (
        <AuthContext.Provider value={{ user, saveInfo, setUserInfo, singOut }}>
            { children }
        </AuthContext.Provider>
    );

}
