import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to Finder</h1>
            <p className="mb-8 text-center max-w-md">
                Finder is a platform to connect with friends and discover new ones! Sign up to create your
                profile and start connecting today.
            </p>
            <div className="flex gap-4">
                <Link to="/login">
                    <Button variant="default">Login</Button>
                </Link>
                <Link to="/signup">
                    <Button variant="default">Signup</Button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
