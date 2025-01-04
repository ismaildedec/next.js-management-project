import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/images/logo.png';
import styles from '../../styles/ResponsiveSidebar.module.scss';
export default function LogoSection() {
    return (
        <div className={styles.logo_details}>
            <Link href="/">
                <Image src={Logo} alt="Ziraat Katılım Bankası" className={styles.logo_image} />
            </Link>
            <Link href="/">
                <span className={styles.logo_name}>SIEM</span>
            </Link>
        </div>
    );
}