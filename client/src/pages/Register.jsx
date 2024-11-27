import React, { useState, useEffect } from 'react'
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({ username: "", email: "", password: "", confirmPassword: "" })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(values);
        checkValidations();
        // const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
        //     method: "POST",
        //     body: JSON.stringify({ values })
        // })
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, values)
        console.log("res:", res);


        if (res.status === 201) {
            setValues({ ...values, email: "", username: "", password: "", confirmPassword: "" });
            toast.success(res.data.message);
        }
        else {
            toast.error(res.data.message);
        }
    }

    const toastOptions = {
        position: "bottom-right",
        theme: 'dark',
    }

    const checkValidations = () => {
        const { username, email, password, confirmPassword } = values;
        if (!username) {
            toast.error("username required", toastOptions)
            return;
        }
        if (!email) {
            toast.error("email required", toastOptions)
            return;
        }
        if (!email.includes('@')) {
            toast.error("invalid email", toastOptions)
            return;
        }
        if (!password) {
            toast.error("password is required", toastOptions)
            return;
        }
        if (!confirmPassword) {
            toast.error("confirm password is required", toastOptions)
            return;
        }
        if (password !== confirmPassword) {
            toast.error("password and confirm passwords do not match", toastOptions)
            return;
        }
    }

    useEffect(() => {
        const isLoggedIn = async () => {
            const token = localStorage.getItem("userToken");
            if (token) {
                navigate("/")
            }
        }
        isLoggedIn();
    }, [])


    return (
        <div className="w-full h-screen bg-slate-900 flex justify-center items-center">
            <form onSubmit={(e) => handleSubmit(e)} className="bg-black w-[500px] h-auto flex flex-col gap-4 justify-center items-center rounded-lg py-12 px-4">

                <div className="logo font-bold text-white text-center text-4xl">ChatBudd</div>

                <div className="label font-bold text-gray-300 text-center mb-8 text-2xl">Register</div>

                <input type="text" name="username" placeholder="username" value={values.username} className="w-[90%] bg-gray-700 text-gray-200 pl-4 py-2 rounded-lg focus:outline-none" onChange={handleChange} />

                <input type="text" name="email" placeholder="email" value={values.email} className="w-[90%] bg-gray-700 text-gray-200 pl-4 py-2 rounded-lg  focus:outline-none" onChange={handleChange} />

                <div className="flex justify-between items-center w-[90%] bg-gray-700 text-gray-200 px-4 py-2 rounded-lg">

                    <input type={showPassword ? "text" : "password"} name="password" placeholder="password" value={values.password} className="w-[80%] bg-transparent focus:outline-none" onChange={handleChange} />
                    {showPassword ? (
                        <BiSolidHide className="text-2xl cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                    ) : (
                        <BiSolidShow className="text-2xl cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                    )}
                </div>

                <div className="flex justify-between items-center w-[90%] bg-gray-700 text-gray-200 px-4 py-2 rounded-lg">

                    <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="confirm password" value={values.confirmPassword} className="w-[80%] bg-transparent focus:outline-none" onChange={handleChange} />
                    {showConfirmPassword ? (
                        <BiSolidHide className="text-2xl cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                    ) : (
                        <BiSolidShow className="text-2xl cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                    )}
                </div>

                <button type="submit" className="w-[90%] py-2 text-white bg-blue-600 hover:bg-blue-500 ease-in-out transition rounded-lg">Register</button>
                <span className="text-center text-white">Already have an account ? <Link to="/login" className="underline hover:text-blue-500">Login</Link></span>

            </form>
            <ToastContainer />
        </div>
    )
}

export default Register
