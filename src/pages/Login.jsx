import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';

const Login = ({ onLogin }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.user.username);

            onLogin(response.data.user.username);
            navigate('/home');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-background dark:bg-foreground text-foreground dark:text-foreground-dark">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold mb-6 border-b-4 border-primary dark:border-primary-dark pb-4">Login</h1>
                <p className="mb-4">Login to your account account</p>
                <form onSubmit={handleSubmit} className="bg-card dark:bg-card-dark p-8 rounded-2xl border-2 border-gray-50 shadow-lg w-96">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-border dark:border-border-dark rounded bg-input dark:bg-input-dark"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-border dark:border-border-dark rounded bg-input dark:bg-input-dark"
                        required
                    />
                    <Button type="submit" className="w-full bg-primary dark:bg-primary-dark text-white">Login</Button>
                    {error && <p className="text-destructive dark:text-destructive-dark mt-4">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
