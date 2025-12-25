import React, { useState, useEffect } from 'react';
import '../styles/DarkModeToggle.css';

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check if user has a preference saved
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
        setIsDark(true);
        document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        
        if (newTheme) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button className="dark-mode-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
        {isDark ? '☀️' : '🌙'}
        </button>
    );
};

export default DarkModeToggle;