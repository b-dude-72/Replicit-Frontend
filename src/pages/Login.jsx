import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Link,
} from "react-router-dom";

import { FaEye } from "react-icons/fa";
const Login = () => {

    // let URL = `http://localhost:5000`
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [cred, setCred] = useState({
        email: "",
        password: ""
    })

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        // console.log(cred)

        const res = await fetch(`${process.env.REACT_APP_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        const json = await res.json();
        if (json.error) {
            setError(json.error);
            setCred({
                email: "",
                password: ""
            })
            setTimeout(() => {
                setError("")
            }, 1000);
        }
        if (json.authtoken) {
            localStorage.setItem('auth-token', json.authtoken);
            navigate('/')
        }
        // console.log(json)

    }

    useEffect(() => {
        document.title = "Login - Replicit"
    })

    const [type,setType] = useState("password");

    const passwordchange = () =>{
        // let input = document.getElementById("password");
        if(type =="password"){
            setType("text")
        }else{
            setType("password")
        }

    }

    return (
        <div class="w-[100%]">
            <div class="min-h-screen bg-gradient-to-r from-purple-400 to-blue-400 py-6 flex flex-col justify-center sm:py-12 ">
                <div class="relative py-3 sm:max-w-xl sm:mx-auto flex justify-center">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 mb-[-10px]">
                        <div class="max-w-md mx-auto ml-10 mr-10">
                            <div class="flex justify-center mt-[-25px] -mb-[10px]">
                                <img class="w-50 h-20" src="/Fulllogo.png" alt="" />
                            </div>
                            <div class="divide-y divide-gray-200 -mb-8">
                                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div class="relative">
                                        <input value={cred.email} autocomplete="off" onChange={onChange
                                        } id="email" name="email" type="email" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-2" placeholder="Email address" />
                                        <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm  peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    <div class="relative">
                                        <div className="flex flex-row justify-between items-center">

                                            <input value={cred.password} autocomplete="off" id="password" name="password" type={type} class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 " placeholder="Password" onChange={onChange

                                            } />
                                            <div className="text-xl mb-2 cursor-pointer" onClick={passwordchange}>
                                                <FaEye />
                                            </div>
                                        </div>
                                        <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm  peer-focus:text-gray-600 peer-focus:text-sm ">Password</label>
                                    </div>
                                    <div class="relative flex flex-col justify-between w-full items-center">
                                        <button onClick={submitForm} class="bg-blue-700 hover:bg-blue-600 hover:font-semibold hover:easein text-white rounded-md px-4 py-1 mt-2 w-40 items-center">LOGIN</button>
                                    </div>
                                    <Link to="/forgotpassword" class="relative flex flex-col justify-between w-full items-center hover:underline text-sm text-blue-700">Forgot Password?</Link>
                                    <div className="text-red-600 font-bold" title='error!'>
                                        {error}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;