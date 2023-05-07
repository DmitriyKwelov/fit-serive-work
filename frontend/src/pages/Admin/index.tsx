import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import styles from './Admin.module.scss'
import VacancyItem from "../../components/VacancyItem";
import $api from "../../http";
import {IVacancy} from "../../models/IVacancy";

const Index = () => {

    const [vacancies, setVacancies] = useState<IVacancy[]>();
    const navigate = useNavigate()

    useEffect(() => {
        const getVacancies = async () => {
            try {
                const {data} = await $api.get('/vacancy');
                setVacancies(data)
            } catch (e){

            }
        }
        getVacancies()
    }, [])

    const deleteVacancy = async (id: string) => {
        try {
            await $api.delete(`vacancy/${id}`)
            setVacancies(vacancies?.filter(vacan => vacan.id !== id))
        } catch (e) {
            alert(e)
        }
    }
    const editVacancy = async (id: string) => {
        navigate(`vacancy/edit/${id}`)
    }

    return (
        <div>
            <h2>Добавить новый элемент</h2>
            <div className={styles.links}>
                <Link to="vacancy/add">Добавить вакансию</Link>
                <Link to="city">Добавить город</Link>
            </div>
            <h2 style={{marginTop: 100}}>Все вакансии</h2>
            {vacancies &&
                vacancies.map(vacancy =>
                    <VacancyItem
                        id={vacancy.id}
                        title={vacancy.title}
                        price={vacancy.price}
                        shortDescription={vacancy.shortDescription}
                        img={vacancy.img}
                        isAdminPage={true}
                        deleteItem={() => deleteVacancy(vacancy.id)}
                        edit={() => editVacancy(vacancy.id)}
                    />
                )}
        </div>
    );
};

export default Index;