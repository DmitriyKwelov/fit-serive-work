import React, {useEffect, useState} from 'react';
import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Vacancies from "./pages/Vacancies";
import Vacancy from "./pages/Vacancy";
import './app.scss';
import {useAppDispatch} from "./store/store";
import {checkAuth} from "./store/slices/authSlice";
import Login from "./pages/Login";
import AdminRoute from "./utils/roter/AdminRoute";
import Admin from "./pages/Admin";
import AdminAddVacancy from "./pages/AdminAddVacancy";
import AdminAddCity from "./pages/AdminAddCity";
import Header from "./components/Header";
import Footer from "./components/Footer";
import $api from "./http";
import {setSelectedCity} from "./store/slices/citySlice";

const App = () => {
    const [checkValue, setCheckValue] = useState(false)

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

    useEffect(() => {
        const cityId = localStorage.getItem('city')
        if(cityId){
            const check = async () => {
                try {
                    const {data} = await $api.get(`/city/${cityId}`)
                    dispatch(
                        setSelectedCity({id: data.id, name: data.name})
                    )
                } catch (e) {
                    console.log(e)
                }
            }
            check()
        }
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