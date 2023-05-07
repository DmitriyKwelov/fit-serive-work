import React from 'react';
import logo from '../../assets/logo.svg'
import styles from './Footer.module.scss'


const Index = () => {
    return (
        <footer className={styles.footer}>
            <img src={logo} alt=""/>
            <p>© FIT SERVICE 2023</p>
        </footer>
    );
};

export default Index;