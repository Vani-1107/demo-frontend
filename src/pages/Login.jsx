import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
function Login() {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({email:"",password:""})

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            console.log("User already logged in");
            navigate("/search");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = JSON.stringify(formData);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://demo-backend-qlhj.onrender.com/api/login',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/search");
          })
          .catch((error) => {
            console.log(error);
          });
    }

    return (
        <div className='min-h-screen w-full flex'>
            <div className='w-[50%] bg-green-950'></div>

            <div className="flex w-1/2 items-center justify-center">
                <div className="max-w-md w-full">
                    <h1 className="text-3xl font-bold mb-6">Existing User? Login.</h1>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value = {formData.email}
                            onChange={handleChange}
                            placeholder="Enter your Email"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value = {formData.password}
                            onChange={handleChange}
                            placeholder="Enter your Password"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>

                    {/* Remember Me and Forgot Password */}
                    {/* <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-gray-700">Remember Me?</span>
                        </label>
                        <a href="/" className="text-green-700 font-medium hover:underline">
                            Forgot Password?
                        </a>
                    </div> */}

                    {/* Login Button */}
                    <button className="w-full bg-green-900 text-white font-medium py-3 rounded-lg hover:bg-green-800 transition" onClick={handleSubmit}>
                        Login
                    </button>


                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <button className="w-full border border-green-900 text-green-900 font-medium py-3 rounded-lg hover:bg-green-100 transition">
                        Login using Phone Number
                    </button>

                    <div className="text-center mt-6">
                        <Link
                            to="/signup"
                            className="text-green-700 font-medium hover:underline"
                        >
                            New Here? Signup
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
