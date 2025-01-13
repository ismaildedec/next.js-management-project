import { createContext, useState, useEffect } from 'react';
export const ThemeContext = createContext();
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        // Sayfa yüklendiğinde localStorage'dan tema tercihini al
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}