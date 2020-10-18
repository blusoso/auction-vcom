import React, { useState, createContext, useEffect } from "react";
import { getUserFromCookie } from "../utils/userCookies";
import fireApp from "../config/firebase-config";


export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState(getUserFromCookie())

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
};
