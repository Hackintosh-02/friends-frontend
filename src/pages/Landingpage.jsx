import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background dark:bg-foreground text-foreground dark:text-foreground-dark">
            <h1 className="text-5xl font-extrabold mb-6">Welcome to Finder</h1>
            <p className="mb-8 text-center max-w-lg text-muted dark:text-muted-dark">
                Finder is a platform to connect with friends and discover new ones! Sign up to create your
                profile and start connecting today.
            </p>
            <div className="flex gap-4">
                <Link to="/login">
                    <Button className="px-6 py-2 bg-primary dark:bg-foreground-dark dark:text-primary text-white rounded-lg hover:bg-primary-dark-light transition-colors">
                        Login
                    </Button>
                </Link>
                <Link to="/signup">
                    <Button className="px-6 py-2 bg-foreground-dark dark:bg-secondary-dark dark:text-foreground-dark text-primary rounded-lg hover:bg-secondary-dark-light transition-colors">
                        Signup
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
