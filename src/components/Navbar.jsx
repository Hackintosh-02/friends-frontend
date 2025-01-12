import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = ({ isAuthenticated, username, onLogout, onToggleTheme, isDarkMode }) => {
    return (
        <nav className="flex justify-between items-center p-4 bg-primary  text-white dark:bg-background-dark shadow-lg border-b-4 border-secondary">
            <Link to="/">
                <h1 className="pl-[10rem] text-4xl font-bold">Friends</h1>
            </Link>
            <div className="pr-[10rem] flex items-center gap-4">
                <button
                    className="text-lg p-2 rounded-full text-foreground-dark hover:text-primary hover:bg-background dark:text-foreground-dark dark:hover:text-black transition-transform duration-200"
                    onClick={onToggleTheme}
                >
                    {isDarkMode ? <FiSun size={20} className="" /> : <FiMoon size={20} />}
                </button>
                {!isAuthenticated ? (
                    <>
                        <Link to="/login">
                            <Button className='' variant="ghost">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button className='bg-background text-primary hover:bg-foreground-dark' variant="default">Signup</Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <span>{username}</span>
                        <Button className='bg-background text-primary hover:bg-foreground-dark' variant="destructive" onClick={onLogout}>
                            Logout
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
