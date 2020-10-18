import React, { useEffect } from "react";
import Link from "next/link";
import jwtDecode from "jwt-decode";

const NavGlobal = () => {
    return (
        <React.Fragment>
            <Link href="/signup">
                <a>Sign up</a>
            </Link>

            <Link href="/login">
                <a>Sign in</a>
            </Link>
        </React.Fragment>
    );
};

export default NavGlobal;
