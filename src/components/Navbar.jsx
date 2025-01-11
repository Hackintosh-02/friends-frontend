import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = ({ isAuthenticated, username, onLogout, onToggleTheme, isDarkMode }) => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-900 text-white dark:bg-gray-800">
            <Link to="/">
                <h1 className="text-xl font-bold">Finder</h1>
            </Link>
            <div className="flex items-center gap-4">
                <button
                    className="text-lg p-2 rounded-full hover:text-primary hover:bg-muted transition-transform duration-200"
                    onClick={onToggleTheme}
                >
                    {isDarkMode ? <FiSun size={20} className="text-primary" /> : <FiMoon size={20} />}
                </button>
                {!isAuthenticated ? (
                    <>
                        <Link to="/login">
                            <Button variant="ghost">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="default">Signup</Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <span>{username}</span>
                        <Button variant="destructive" onClick={onLogout}>
                            Logout
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
