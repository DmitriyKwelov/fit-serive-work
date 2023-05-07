import React from 'react';
import styles from "./Header.module.scss";
import logo from "../../assets/logo.svg";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

const Index = () => {
    const {isAuth, user} = useSelector((state: RootState) => state.auth)
    return (
        <div>
            <header>
                <div className="container">
                    <div className={styles.headerContent}>
                        <Link to="/"><img className={styles.logo} src={logo} alt=""/></Link>
                        <div className={styles.btns}>
                            {isAuth === true && user?.role === 'admin' && <Link className="btn" style={{marginRight: 20}} to='/admin'>Админ</Link>}
                            <Link className="btn" to='/vacancies'>К вакансиям</Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Index;