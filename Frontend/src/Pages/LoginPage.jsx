import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from "lucide-react";
import axios from 'axios';
import { handleError, handleSuccess } from '../assets/utils';
import { useNavigate } from 'react-router-dom';
import AuthImagePattern from '../Components/AuthImagePattern';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
    const navigateTo = useNavigate();
    const { checkAuth, authUser } = useAuthStore();

    useEffect(() => {
        if (authUser) {
            navigateTo('/home', { replace: true });
        }
    }, [authUser, navigateTo])


    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const HandleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const { email, password } = loginInfo;
        if (!email || !password) {
            setErrorMessage("Please fill in both fields.");
            return;
        }

        try {
            const { data } = await axios.post(
                'http://localhost:8080/api/auth/login',
                { email, password },
                { withCredentials: true }  // 👈 this is required
            );
            if (!data.success) {
                handleError("No such user exists");
            }
            handleSuccess("Login successful");
            await checkAuth();
            setTimeout(() => {
                navigateTo("/home", { replace: true });
            }, 1800);
            setErrorMessage('');
        } catch (error) {
            console.error('Login error:', error.response?.data?.error || "Login failed");
            setErrorMessage(error.response?.data?.error || "Invalid credentials");
        }
    };


    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            {/* Left Side */}
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>
                    {/* LOGO */}
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className="size-6 text-primary" />
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Login to Your Account</h1>
                            <p className='text-base-content/60'>Enter your credentials to continue</p>
                        </div>
                    </div>

                    <form className='flex flex-col items-center gap-2 mt-4' onSubmit={HandleSubmit}>
                        {/* Email Input */}
                        <label className='self-start ml-17' htmlFor="email">Email:</label>
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input
                                name="email"
                                type="email"
                                placeholder="mail@site.com"
                                onChange={HandleChange}
                                value={loginInfo.email}
                                required
                            />
                        </label>

                        {/* Password Input */}
                        <label className='self-start ml-17' htmlFor="password">Password:</label>
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                    ></path>
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input
                                name='password'
                                type="password"
                                required
                                value={loginInfo.password}
                                onChange={HandleChange}
                                placeholder="Enter password"
                                minLength="6"
                                pattern=".{6,}"
                                title="Must be at least 6 characters"
                            />
                        </label>

                        {/* Error Message */}
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                        {/* Submit Button */}
                        <button type="submit" className="btn bg-[#7243e7] text-white border-[#7243e7] mt-2">
                            Login with Email
                        </button>
                    </form>

                    {/* Signup Link */}
                    <div className="flex flex-col items-center">
                        <p className="mt-2 text-gray-600">
                            Don't have an account?
                            <Link to="/signup" className="ml-1 text-[#7243e7] hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <AuthImagePattern
                title="Join our community"
                subtitle="Connect with friends, share moments, and stay in touch with your loved ones"
            />
        </div>
    );
};

export default LoginPage;
