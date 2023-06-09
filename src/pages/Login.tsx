import React from "react";
import logo from "../assets/img/logo.png";
import scritta from "../assets/img/scritta.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import conf from "../assets/config/general.json";


async function login(username: string, password: string) {
    try {
        const res = await axios.post(conf.BASE_URL + "auth/login", {
            username: username,
            password: password
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default function Login() {


    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const navigate = useNavigate();

    async function loginButton() {
        const res = await login(username, password) as any;
        if (res.success) {
            console.log("Login success");
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } else {
            alert("Login failed");
        }
    }

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <div className="flex flex-col w-screen items-center">
                <img className="h-[130px] mb-3" src={logo} alt="logo" />
                <img className="w-[70%] mb-3" src={scritta} alt="logo" />
                <form className="flex flex-col w-[300px] mb-[70px]">
                    <label className="text-xl">Username</label>
                    <input
                        defaultValue={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border-2 border-black rounded-md p-1" type="text" />
                    <label className="text-xl">Password</label>
                    <input
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 border-black rounded-md p-1" type="password" />
                    <button className="bg-black text-white rounded-md p-1 mt-2"
                        type="button"
                        onClick={loginButton}
                    >Login</button>
                </form>
            </div>
        </div>
    )
}