import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        fullname: '',
        password: '',
    });
    const [interests, setInterests] = useState([]);
    const [recommendations, setRecommendations] = useState([
        'Music',
        'Sports',
        'Travel',
        'Coding',   
        'Cooking',
        'Photography',
        'Art',
        'Writing',
        'Gaming',
        'Fitness',
        'Reading',
        'Dancing',
        'Meditation',
        'Yoga',
        'Gardening',
        'Cycling',
        'Technology',
        'Movies',
        'Fashion',
        'Volunteering'
    ]);
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            if (!interests.includes(inputValue.trim())) {
                setInterests([...interests, inputValue.trim()]);
            }
            setInputValue('');
        }
    };

    const handleAddInterest = (interest) => {
        if (!interests.includes(interest)) {
            setInterests([...interests, interest]);
        }
        setInputValue('');
    };

    const handleRemoveInterest = (interest) => {
        setInterests(interests.filter((item) => item !== interest));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                ...formData,
                interests,
            });
            setMessage(response.data.message);
            navigate('/login');
        } catch (err) {
            setMessage(err.response?.data?.error || 'Signup failed');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
            <h1 className="text-3xl font-bold mb-6">Signup</h1>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 p-8 rounded shadow-md w-96">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded dark:bg-gray-800"
                    required
                />
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded dark:bg-gray-800"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded dark:bg-gray-800"
                    required
                />
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Type an interest and press Enter"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleInputKeyPress}
                        className="w-full p-2 border rounded dark:bg-gray-800"
                    />
                    {/* Recommendations Dropdown */}
                    {inputValue && (
                        <ul className="absolute z-10 bg-white dark:bg-gray-700 border mt-2 w-full rounded shadow-md">
                            {recommendations
                                .filter((rec) => rec.toLowerCase().includes(inputValue.toLowerCase()))
                                .map((rec) => (
                                    <li
                                        key={rec}
                                        onClick={() => handleAddInterest(rec)}
                                        className="cursor-pointer px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    >
                                        {rec}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
                {/* Selected Interests */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {interests.map((interest) => (
                        <div
                            key={interest}
                            className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full"
                        >
                            <span>{interest}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveInterest(interest)}
                                className="ml-2 text-lg font-bold hover:text-gray-300"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <Button type="submit" className="w-full">Signup</Button>
                {message && <p className="text-green-500 mt-4">{message}</p>}
            </form>
        </div>
    );
};

export default Signup;
