const { db } = require("../util/admin");
const firebaseConfig = require("../util/firebaseConfig");
const firebase = require("firebase");

firebase.initializeApp(firebaseConfig);

exports.getUsers = (req, res) => {
    db.collection("users")
        .orderBy("created_at", "desc")
        .get()
        .then((data) => {
            let users = [];
            data.forEach((user) => {
                users.push({
                    id: user.id,
                    first_name: user.data().first_name,
                    last_name: user.data().last_name,
                    phone_number: user.data().phone_number,
                    id_card: user.data().id_card,
                    email: user.data().email,
                    password: user.data().password,
                    is_consent_policy: user.data().is_consent_policy,
                    created_at: user.data().created_at,
                });
            });

            return res.json(users);
        })
        .catch((err) => console.error(err));
};

exports.signup = (req, res) => {
    let token, userId;

    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        id_card: req.body.id_card,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        is_consent_policy: req.body.is_consent_policy,
        created_at: new Date().toISOString(),
    };

    // TODO: Validation

    db.collection("users")
        .doc()
        .get()
        .then((user) => {
            if (user.exists) {
                return res.status(400).json({ message: "This phone number is already taken" });
            } else {
                db.collection("users").add(newUser);
                return res.status(201).json({ message: "Sign up success" });
            }
        });

    // db.doc(`/users/${newUser.phone_number}`)
    //     .get()
    //     .then((user) => {
    //         if (user.exists) {
    //             return res.status(400).json({ message: "This phone number is already taken" });
    //         } else {
    //             return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
    //         }
    //     })
    //     .then((data) => {
    //         userId = data.user.uid;
    //         return data.user.getIdToken();
    //     })
    //     .then((idToken) => {
    //         token = idToken;
    //         const userCredentials = {
    //             first_name: newUser.first_name,
    //             last_name: newUser.last_name,
    //             phone_number: newUser.phone_number,
    //             id_card: newUser.id_card,
    //             email: newUser.email,
    //             password: newUser.password,
    //             confirm_password: newUser.confirm_password,
    //             is_consent_policy: newUser.is_consent_policy,
    //             created_at: new Date().toISOString(),
    //             userId,
    //         };

    //         return db.doc(`/users/${newUser.phone_number}`).set(userCredentials);
    //     })
    //     .then(() => {
    //         return res.status(201).json({ token });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         if (err.code === "auth/email-already-in-use") {
    //             return res.status(400).json({ email: "Email is already in use" });
    //         } else {
    //             return res.status(500).json({ error: err.code });
    //         }
    //     });
};

exports.phoneNumberLogin = (req, res) => {
    // const user = {
    //     email: req.body.email,
    //     password: req.body.password,
    // };
    // // TODO: Validation
    // firebase
    //     .auth()
    //     .signInWithEmailAndPassword(user.email, user.password)
    //     .then((data) => {
    //         return data.user.getIdToken();
    //     })
    //     .then((token) => {
    //         return res.json({ token });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         return res.status(500).json({ error: err.code });
    //     });
    // const data = {
    //     phone_number: req.body.phone_number,
    //     recaptcha_verifier: req.body.recaptcha_verifier
    // };
    // firebase
    //     .auth()
    //     .signInWithPhoneNumber(data.phone_number, data.recaptcha_verifier)
    //     .then((confirmationResult) => {
    //         return res.status(201).json({ confirmationResult });;
    //         // window.confirmationResult = confirmationResult;
    //         // console.log(confirmationResult);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
};
