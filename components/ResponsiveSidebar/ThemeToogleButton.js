import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from '../../styles/ResponsiveSidebar.module.scss';
export default function ThemeToggleButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    
    return (
        <button
            className={styles.theme_toggle_btn}
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Light Moda Geç' : 'Dark Moda Geç'}
        >
            <i className={`ri-${theme === 'dark' ? 'sun' : 'moon'}-line`}></i>
        </button>
    );
}