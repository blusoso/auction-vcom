import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import NavGlobal from "@/components/NavGlobal";
import PhoneLogin from "@/components/PhoneLogin";

const Register = () => {
    const router = useRouter();

    const { register, handleSubmit } = useForm();
    const [uid, setUid] = useState();

    const onSubmit = (data) => {
        data = { uid: uid, ...data };
        axios.post("http://localhost:5000/auction-vcom/us-central1/api/signup", data).then((res) => {
            console.log("Sign up Success!");
            // localStorage.setItem("FBToken", `Bearer ${res.data.token}`);
            router.push("/auction");
        });
    };

    const handleUid = (uid) => {
        setUid(uid);
        console.log(uid)
    };

    return (
        <React.Fragment>
            <NavGlobal />
            <h1>Sign up</h1>
            {uid ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>ชื่อ</label>
                        <input name="first_name" ref={register} rules={{ required: true }} />
                    </div>
                    <div>
                        <label>นามสกุล</label>
                        <input name="last_name" ref={register} rules={{ required: true }} />
                    </div>
                    <div>
                        <label>รหัสบัตรประชาชน/รหัสหนังสือเดินทาง</label>
                        <input name="id_card" ref={register} rules={{ required: true }} />
                    </div>
                    <div>
                        <label>เบอร์โทรศัพท์</label>
                        <input name="phone_number" ref={register} rules={{ required: true }} />
                    </div>
                    <div>
                        <label>อีเมลล์</label>
                        <input name="email" ref={register} rules={{ required: true }} />
                    </div>
                    <div>
                        <label>รหัสผ่าน</label>
                        <input type="password" name="password" ref={register} rules={{ required: true }} />
                    </div>
                    <div>
                        <label>ยืนยันรหัสผ่าน</label>
                        <input type="password" name="confirm_password" ref={register} rules={{ required: true }} />
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="is_consent_policy"
                                value="1"
                                ref={register}
                                rules={{ required: true }}
                            />
                            ยอมรับเงื่อนไข
                        </label>
                    </div>

                    <input type="submit" value="สมัครสมาชิก" />
                </form>
            ) : (
                <PhoneLogin handleUid={handleUid.bind(this)} />
            )}
        </React.Fragment>
    );
};

export default Register;
