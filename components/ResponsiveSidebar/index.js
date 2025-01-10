import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import SidebarToggleButton from './ToggleButton';
import ThemeToggleButton from './ThemeToggleButton';
import LogoSection from './LogoSection';
import SidebarMenu from './SidebarMenu';
import UserProfile from './UserProfile';
import styles from '../../styles/ResponsiveSidebar.module.scss';
export default function ResponsiveSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [openMenus, setOpenMenus] = useState([]);
    const { theme } = useContext(ThemeContext);
    useEffect(() => {
        const mainElement = document.querySelector('.main');
        if (mainElement) {
            mainElement.style.left = sidebarOpen ? '15%' : '7%';
            mainElement.style.width = sidebarOpen ? '85%' : '92%';
        }
    }, [sidebarOpen]);
    useEffect(() => {
        const saved = localStorage.getItem('sidebarState');
        setSidebarOpen(saved !== null ? JSON.parse(saved) : true);
        setMounted(true);
    }, []);
    useEffect(() => {
        if (mounted && sidebarOpen !== undefined) {
            localStorage.setItem('sidebarState', JSON.stringify(sidebarOpen));
        }
    }, [sidebarOpen, mounted]);
    if (!mounted || sidebarOpen === undefined) {
        return null;
    }
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        setOpenMenus([]);
    };
    
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" rel="stylesheet" />
            <div className={`${styles.sidebar} ${sidebarOpen ? '' : styles.collapsed}`}>
                <SidebarToggleButton
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
                <ThemeToggleButton />
                <LogoSection />
                <SidebarMenu
                    sidebarOpen={sidebarOpen}
                    openMenus={openMenus}
                    setOpenMenus={setOpenMenus}
                />
                <UserProfile sidebarOpen={sidebarOpen} />
            </div>
        </>
    );
}