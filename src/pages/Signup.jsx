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
        'Music', 'Sports', 'Travel', 'Coding', 'Cooking', 'Photography', 'Art',
        'Writing', 'Gaming', 'Fitness', 'Reading', 'Dancing', 'Meditation',
        'Yoga', 'Gardening', 'Cycling', 'Technology', 'Movies', 'Fashion',
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
        <div className="flex flex-col items-center justify-center h-full bg-background dark:bg-foreground text-foreground dark:text-foreground-dark">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold mb-6 border-b-4 border-primary dark:border-primary-dark pb-4">Signup</h1>
                <p className="mb-4">Create a new account</p>
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
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        value={formData.fullname}
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
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Type an interest and press Enter"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleInputKeyPress}
                            className="w-full p-2 border border-border dark:border-border-dark rounded bg-input dark:bg-input-dark"
                        />
                        {inputValue && (
                            <ul className="absolute z-10 bg-card dark:bg-card-dark border border-border dark:border-border-dark mt-2 w-full rounded shadow-md">
                                {recommendations
                                    .filter((rec) => rec.toLowerCase().includes(inputValue.toLowerCase()))
                                    .map((rec) => (
                                        <li
                                            key={rec}
                                            onClick={() => handleAddInterest(rec)}
                                            className="cursor-pointer px-2 py-2 hover:bg-primary dark:hover:bg-primary-dark hover:text-white"
                                        >
                                            {rec}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {interests.map((interest) => (
                            <div
                                key={interest}
                                className="flex items-center bg-primary dark:bg-primary-dark text-white px-3 py-1 rounded-full"
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
                    <Button type="submit" className="w-full bg-primary dark:bg-primary-dark text-white">Signup</Button>
                    {message && <p className="text-accent dark:text-accent-dark mt-4">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;
