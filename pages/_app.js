import "@/styles/globals.css";
import React, {useEffect} from "react";
import firebase from "@/config/firebase-config";
import {UserProvider} from '../store/UserProvider';

function MyApp({ Component, pageProps }) {
    let authState;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log("Signed in user!")
        } else {
            console.log("No user!")
        }
      });
    //   const {uid} = firebase.auth().currentUser;

    //   console.log('current' + uid);

    return (
        <React.Fragment>
            <UserProvider >
            <Component {...pageProps} />
            </UserProvider>
        </React.Fragment>
    );
}

export default MyApp;
