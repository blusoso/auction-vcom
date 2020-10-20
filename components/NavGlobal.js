import React, { useEffect } from "react";
import Link from "next/link";
import { removeUserCookie } from "@/utils/userCookies";
import firebase from "../config/firebase-config";

const NavGlobal = () => {
    const onSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                removeUserCookie();
                console.log('Sign-out successful.');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <React.Fragment>
            <Link href="/signup">
                <a>Sign up</a>
            </Link>

            <Link href="/login">
                <a>Sign in</a>
            </Link>

            <button onClick={onSignOut}>Sign out</button>
        </React.Fragment>
    );
};

export default NavGlobal;
