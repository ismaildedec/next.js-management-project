import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from '../../styles/ResponsiveSidebar.module.scss';

export default function UserProfile({ sidebarOpen }) {
    const [userInfo, setUserInfo] = useState(true);
    const [showProfileTooltip, setShowProfileTooltip] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user-info/', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('authToken')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                }
            } catch (error) {
                console.error('Kullanıcı bilgileri alınamadı:', error);
            }
        };

        fetchUserInfo();
    }, []);

    if (!userInfo) return null;

    return (
        <div
            className={styles.user_profile}
            onMouseEnter={() => setShowProfileTooltip(true)}
            onMouseLeave={() => setShowProfileTooltip(false)}
        >
            <div className={styles.user_avatar}>
                <i className="ri-user-line"></i>
            </div>
            {sidebarOpen && (
                <div className={styles.user_info}>
                    <div className={styles.user_name}>
                        {userInfo.first_name} {userInfo.last_name}
                    </div>
                    <div className={styles.user_email}>
                        {userInfo.email}
                    </div>
                </div>
            )}
            {!sidebarOpen && showProfileTooltip && (
                <div className={styles.floating_profile}>
                    <div className={styles.user_name}>
                        {userInfo.first_name} {userInfo.last_name}
                    </div>
                    <div className={styles.user_email}>
                        {userInfo.email}
                    </div>
                    <div className={styles.user_username}>
                        @{userInfo.username}
                    </div>
                </div>
            )}
        </div>
    );
}