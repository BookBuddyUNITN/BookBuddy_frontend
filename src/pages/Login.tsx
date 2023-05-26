import React from "react";
import logo from "../assets/img/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

async function login(username: string, password: string) {
    try {
        const res = await axios.post("http://localhost:3456/auth/login", {
            username: username,
            password: password
        });
        return res.data;
    } catch (error) {
        return false;
    } 
}

export default function Login() {

    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <div className="flex flex-col w-min items-center">
                <img className="h-[200px] w-[200px]" src={logo} alt="logo" />
                <form className="flex flex-col w-[300px]">
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
                        onClick={async (e) => {
                            e.preventDefault();
                            const res = await login(username, password);
                            if (res.success) {
                                console.log("Login success");
                                localStorage.setItem("token", res.data.token);
                                navigate("/");
                            } else {
                                alert("Login failed");
                            }
                        }}
                    >Login</button>
                </form>
            </div>
        </div>
    )
}