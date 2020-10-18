import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import NavGlobal from "@/components/NavGlobal";
import firebase from "../config/firebase-config";
import { UserContext } from "../store/UserProvider";
import { mapUserData } from "../utils/auth/mapUserData";
import { setUserCookie } from "../utils/userCookies";

const Login = () => {
    const [user, setUser] = useContext(UserContext);

    console.log("onpageload", user);
    const router = useRouter();
    const [showPhoneForm, setShowPhoneForm] = useState(true);
    const [isLoad, setIsLoad] = useState({
        phoneNumber: false,
        otp: false,
    });
    const [errorMessage, setErrorMessage] = useState({
        phoneNumber: "",
        otp: "",
    });

    const { register, handleSubmit, errors } = useForm({
        mode: "onBlur",
    });

    const { register: otpInput, errors: errors2, handleSubmit: handleSubmit2 } = useForm({
        mode: "onBlur",
    });

    useEffect(() => {
        if (window.recaptchaVerifier) {
            return;
        }
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
            size: "invisible",
        });
        recaptchaVerifier.render();
    }, []);

    const onPhoneNumberSubmit = (data) => {
        setIsLoad({ ...isLoad, phoneNumber: true });

        let phoneNumberFormat;
        if (data.phone_number.charAt(0) == "0") {
            const slicePhoneNumber = data.phone_number.slice(1);
            phoneNumberFormat = "+66" + slicePhoneNumber;
        }

        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumberFormat || data.phone_number, window.recaptchaVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setShowPhoneForm(false);
            })
            .catch((err) => {
                console.log("ERROR", err);
                setErrorMessage({ ...errorMessage, phoneNumber: err });
            });

        setIsLoad({ ...isLoad, phoneNumber: false });
    };

    const onOtpSubmit = (data) => {
        setIsLoad({ ...isLoad, otp: true });

        confirmationResult
            .confirm(data.otp)
            .then((result) => {
                setUserCookie(mapUserData(result.user))

                return result.user.getIdToken();
                // router.push("/auction");
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage({ ...errorMessage, otp: err });
            });

        setIsLoad({ ...isLoad, otp: false });
    };

    return (
        <React.Fragment>
            <NavGlobal />
            <h1>Login</h1>
            {showPhoneForm ? (
                <form key={1} onSubmit={handleSubmit(onPhoneNumberSubmit)}>
                    <div>
                        <label>เบอร์โทรศัพท์</label>
                        <input
                            name="phone_number"
                            ref={register({
                                required: "Required",
                            })}
                        />
                    </div>

                    <div id="recaptcha-container"></div>
                    {errors.phone_number && <div>This field is required</div>}
                    <div>{errorMessage.phoneNumber?.message}</div>

                    <input type="submit" value="ส่ง OTP" disabled={isLoad.phoneNumber} />
                </form>
            ) : (
                <form key={2} onSubmit={handleSubmit2(onOtpSubmit)}>
                    <div>
                        <label>OTP</label>
                        <input
                            name="otp"
                            ref={otpInput({
                                required: "Required",
                            })}
                        />
                    </div>
                    {errors2.otp && <div>This field is required</div>}
                    <div>{errorMessage.otp?.message}</div>

                    <input type="submit" value="เข้าสู่ระบบ" disabled={isLoad.otp} />
                </form>
            )}
        </React.Fragment>
    );
};

export default Login;
