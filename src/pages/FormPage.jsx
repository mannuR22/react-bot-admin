import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
// import { useAuth } from '../contexts/useAuth';
const FormPage = () => {
const auth = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        password: ''

    });
    const [err, setErr] = useState("")
    const handleError = (e) => {
        setErr(e);
        setTimeout( ()=>{
            setErr("")
        }, 3000)
    }
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleRegister = () => {

        const url = 'http://localhost:3000/api/auth/register';
        const data = {
            name: formData.name,
            password: formData.password
        };

        axios.post(url, data)
            .then((response) => {
                console.log('Success:', response.data);
                
            })
            .catch((error) => {
                handleError(error.response.data.message)
                console.error('Error:', error);
            });

    }

    const handleLogin = () => {
        

        const url = 'http://localhost:3000/api/auth/login';
        const data = {
            name: formData.name,
            password: formData.password
        };

        axios.post(url, data)
            .then((response) => {
                auth.login(response.data.token)
            })
            .catch((error) => {
                setErr(error.response.data.message)
                console.error('Error:', error);
            });

    }
    const handleSubmit = e => {
        
        e.preventDefault();
        if(isLogin) handleLogin();
        else handleRegister();
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Switch to {isLogin ? 'Register' : 'Login'}
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Name
                            </label>
                            <input
                                name="name"
                                value={formData.name} 
                                onChange={handleChange}
                                id="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                value={formData.password} 
                                onChange={handleChange}
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    {err && <p className='text-red-500'>{err} </p>}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >

                            {isLogin ? 'Login' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormPage;
