import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthService } from '../../services/logout/logutAuthService';
import styles from '../../styles/ResponsiveSidebar.module.scss';
// Menu konfigürasyonu
const menuConfig = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: 'ri-dashboard-line',
        href: '/',
    },
    {
        id: 'management',
        title: 'Management',
        icon: 'ri-settings-line',
        subItems: [
            { title: 'Add Server', href: '/manage/add-server/' },
            { title: 'Configuration', href: '/manage/config/' },
        ],
    },
    {
        id: 'rulesets',
        title: 'Rulesets',
        icon: 'ri-code-s-slash-line',
        subItems: [
            { title: 'CDB List', href: '/manage/cdb' },
            { title: 'Rules', href: '/manage/cdb' },
            { title: 'Decoders', href: '/manage/cdb' },
        ],
    },
    {
        id: 'backup',
        title: 'Backup Integrity',
        icon: 'ri-shield-check-line',
        href: '/integrity',
    },
    {
        id: 'terminal',
        title: 'Terminal',
        icon: 'ri-terminal-box-line',
        href: '/terminal',
    },
];
export default function SidebarMenu({ sidebarOpen, openMenus, setOpenMenus }) {
    const [hoveredItem, setHoveredItem] = useState(null);
    const router = useRouter();
    const toggleMenu = (itemId) => {
        setOpenMenus(prev => {
            if (prev.includes(itemId)) {
                return prev.filter(id => id !== itemId);
            } else {
                return [...prev, itemId];
            }
        });
    };
    const handleLogout = async () => {
        try {
            await AuthService.logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    const renderMenuItem = (item) => {
        // Logout için özel işlem
        if (item.id === 'logout') {
            return (
                <li
                    key={item.id}
                    onClick={handleLogout}
                    className={styles.logout}
                >
                    <i className={item.icon}></i>
                    <span className={styles.text}>{item.title}</span>
                </li>
            );
        }
        // Alt menüsü olan item'lar
        if (item.subItems) {
            return (
                <li
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={openMenus.includes(item.id) ? styles.open : ''}
                >
                    <div
                        className={styles.menu_item}
                        onClick={() => toggleMenu(item.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <i className={item.icon}></i>
                        <span className={styles.text}>{item.title}</span>
                        {sidebarOpen && (
                            <i className={`ri-arrow-${openMenus.includes(item.id) ? 'up' : 'down'}-s-line ${styles.arrow}`}></i>
                        )}
                        {/* Yan kapalıyken açılır menü */}
                        {!sidebarOpen && hoveredItem === item.id && (
                            <div className={styles.floating_menu}>
                                <div className={styles.menu_title}>{item.title}</div>
                                {item.subItems.map((subItem, index) => (
                                    <Link
                                        key={index}
                                        href={subItem.href}
                                        className={styles.sub_item}
                                    >
                                        {subItem.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Yan açıkken alt menü */}
                    {sidebarOpen && item.subItems && (
                        <ul className={styles.sub_menu}>
                            {item.subItems.map((subItem, index) => (
                                <li key={index}>
                                    <Link href={subItem.href}>{subItem.title}</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            );
        }
        // Normal link'ler
        return (
            <li key={item.id}>
                <Link
                    href={item.href}
                    className={styles.menu_link}
                >
                    <i className={item.icon}></i>
                    <span className={styles.text}>{item.title}</span>
                    {!sidebarOpen && <span className={styles.tooltip}>{item.title}</span>}
                </Link>
            </li>
        );
    };
    return (
        <ul className={styles.nav_links}>
            {[...menuConfig, {
                id: 'logout',
                title: 'Logout',
                icon: 'ri-login-box-line',
                href: '#'
            }].map(renderMenuItem)}
        </ul>
    );
}