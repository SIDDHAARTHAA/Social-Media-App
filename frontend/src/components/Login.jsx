import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('https://mediagram-pn8o.onrender.com/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
                setInput({
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 w-[400px]">
                <h1 className="text-2xl font-bold text-center mb-6">Instagram</h1>
                <form onSubmit={signupHandler} className="flex flex-col gap-4">
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        placeholder="Email"
                        className="focus-visible:ring-transparent my-2"
                    />
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        placeholder="Password"
                        className="focus-visible:ring-transparent my-2"
                    />
                    {
                        loading ? (
                            <Button>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button type='submit' className="bg-blue-500 text-white w-full">Login</Button>
                        )
                    }
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;