import "@/styles/globals.css";
import firebase from "@/config/firebase-config";
import {UserProvider} from '../store/UserProvider';

function MyApp({ Component, pageProps }) {

    firebase.auth().onAuthStateChanged(function (user) {
        // console.log('On AUth State Change', user)
    });

    return (
        <React.Fragment>
            <UserProvider >
            <Component {...pageProps} />
            </UserProvider>
        </React.Fragment>
    );
}

export default MyApp;
