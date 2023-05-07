import React, {useEffect, useState} from 'react';
import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Vacancies from "./pages/Vacancies";
import Vacancy from "./pages/Vacancy";
import './app.scss'
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "./store/store";
import {checkAuth} from "./store/slices/authSlice";
import Login from "./pages/Login";
import AdminRoute from "./utils/roter/AdminRoute";
import Admin from "./pages/Admin";
import AdminAddVacancy from "./pages/AdminAddVacancy";
import AdminAddCity from "./pages/AdminAddCity";
import styles from "./pages/Vacancies/Vacancies.module.scss";
import logo from "./assets/logo.svg";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {

    const [checkValue, setCheckValue] = useState(false)

    const {user, isAuth} = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const check = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                await dispatch(checkAuth())
                setCheckValue(true);
            } else {
                setCheckValue(true);
            }
        }
        check()
    }, [])

    if (checkValue === false) {
        return null
    }

    return (
        <>
            <Header/>
            <div className="container">
                <Routes>
                    <Route element={<AdminRoute/>}>
                        <Route path="/admin" element={<Admin/>}/>
                        <Route path="/admin/vacancy/add" element={<AdminAddVacancy/>}/>
                        <Route path="/admin/vacancy/edit/:id" element={<AdminAddVacancy/>}/>
                        <Route path="/admin/city" element={<AdminAddCity/>}/>
                    </Route>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/vacancies" element={<Vacancies/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/vacancy/:id" element={<Vacancy/>}/>
                </Routes>
                <Footer/>
            </div>
        </>
    );
};

export default App;