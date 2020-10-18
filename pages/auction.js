import React, { useEffect, useState, useContext } from "react";
import jwtDecode from "jwt-decode";
import NavGlobal from "@/components/NavGlobal";
import { useRouter } from "next/router";
import firebase from "../config/firebase-config";
import { UserContext } from "../store/UserProvider";


const Auction = () => {
    const router = useRouter();

    const [user] = useContext(UserContext);

    if (!user) {
        if (typeof window !== "undefined") {
            router.push("/login");
        }
    }

    if(!user) {
        return <h1>Loading...</h1>
    }

    return (
        <React.Fragment>
            <NavGlobal />
            <h1>Auction</h1>
        </React.Fragment>
    );
};

export default Auction;
