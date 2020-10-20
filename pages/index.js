import { useEffect, useState } from "react";
import axios from "axios";
import firebase from "@/config/firebase-config";

const Home = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                console.log(user.uid);
                firebase.firestore().collection("users").doc(user.uid).get().then( doc => {
                    console.log("xxx", doc.data())
                });
            } else {
                console.log("User not found!");
            }
        });
    }, []);

    return (
        <div>
            {/* {users?.map((user) => (
                <div>
                    <p>{user.id}</p>
                    <p>{user.first_name}</p>
                </div>
            ))} */}
        </div>
    );
};

export default Home;
