import React from 'react';
import styles from '../../styles/ResponsiveSidebar.module.scss';
export default function SidebarToggleButton({ sidebarOpen, toggleSidebar }) {
    return (
        <button className={styles.toggle_btn} onClick={toggleSidebar}>
            <i className={`ri-arrow-${sidebarOpen ? 'left' : 'right'}-s-line`}></i>
        </button>
    );
}