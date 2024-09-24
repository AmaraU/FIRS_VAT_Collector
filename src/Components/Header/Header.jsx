import React, { useState, useEffect, useRef } from "react";
import { getImageUrl } from "../../../utils";
import styles from './Header.module.css';
import { useNavigate } from "react-router-dom";

export const Header = () => {

    const [ opened, setOpened ] = useState(false);
    const signpop = useRef(null)
    const navigate = useNavigate();
    const currentPath = window.location.pathname;

    const handleClickOutside = (event) => {
        if (signpop.current && !signpop.current.contains(event.target)) {
            setOpened(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div className={styles.header}>
            <img className={styles.logo} src={getImageUrl('kb_logo.png')} alt="KB" />

            <div className={styles.links}>
                <button onClick={()=>navigate('/dashboard/overview')} className={currentPath === "/dashboard/overview" ? styles.active : ''}>Overview</button>
                <button onClick={()=>navigate('/dashboard/banking')} className={currentPath === "/dashboard/banking" ? styles.active : ''}>Banking</button>
                <button onClick={()=>navigate('/dashboard/telcos')} className={currentPath === "/dashboard/telcos" ? styles.active : ''}>Telcos</button>
                <button onClick={()=>navigate('/dashboard/invoicing')} className={currentPath === "/dashboard/invoicing" ? styles.active : ''}>Invoicing</button>
                <button onClick={()=>navigate('/dashboard/auditlogs')} className={currentPath === "/dashboard/auditlogs" ? styles.active : ''}>Audit Logs</button>
                <button onClick={()=>navigate('/dashboard/reports')} className={currentPath === "/dashboard/reports" ? styles.active : ''}>Reports</button>
            </div>

            <div className={styles.buttons}>
                <button><img src={getImageUrl('filter.png')} /></button>
                <button><img src={getImageUrl('bell.png')} /></button>
                <button className={styles.profile} onClick={()=>setOpened(!opened)}>UB</button>
                <div className={`${styles.closed} ${opened && styles.signOut}`} ref={signpop}>
                    <a href="/signin">Sign out</a>
                </div>
            </div>
        </div>
    )
}