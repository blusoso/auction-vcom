const { admin, db } = require("./admin");

module.exports = (req, res, next) => {
    let idToken;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
        console.log("No token found");
        return res.status(403).json({ error: "Unauthorized" });
    }

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            req.user = decodedToken;
            let phoneNumberFormat;
            if (req.user.phone_number.charAt(0) == "+") {
                const slicePhoneNumber = req.user.phone_number.substring(3);
                phoneNumberFormat = "0" + slicePhoneNumber;
            }
            return db.collection("users").where("phone_number", "==", phoneNumberFormat).limit(1).get();
        })
        .then((data) => {
            req.user.phone_number = data.docs[0].data().phone_number;

            return next();
        })
        .catch((err) => {
            console.error("Error while verifying token", err);
            return res.status(403).json(err);
        });
};
