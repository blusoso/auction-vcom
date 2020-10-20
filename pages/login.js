import React, { useContext, useEffect, useState } from "react";
import NavGlobal from "@/components/NavGlobal";
import PhoneLogin from "@/components/PhoneLogin";
import { useRouter } from "next/router";

const Login = () => {
    const router = useRouter();

    const handleUid = (uid) => {
        router.push(auction);
    };

    return (
        <React.Fragment>
            <NavGlobal />
            <h1>Login</h1>
            <PhoneLogin handleUid={handleUid.bind(this)} />
        </React.Fragment>
    );
};

export default Login;
