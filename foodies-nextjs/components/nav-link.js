'use client'

import Link from "next/link";
import styles from "./nav-link.module.css";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
    const path = usePathname();

    const isActive = href === '/'
        ? path === '/'
        : path.startsWith(href);

    return (
        <Link className={isActive ? `${styles.link} ${styles.active}` : styles.link} href={href}>
            {children}
        </Link>
    );
}