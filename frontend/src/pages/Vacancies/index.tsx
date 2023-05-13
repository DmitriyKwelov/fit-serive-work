import React, {useEffect, useRef, useState} from 'react';
import styles from "./Vacancies.module.scss"
import people from './../../assets/people.png'
import $api from "../../http";
import VacancyItem from "../../components/VacancyItem";
import CityModal from "../../components/modals/CityModal";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

interface IVacancies {
    id: string;
    title: string;
    img: string;
    price: string;
    city: string
    shortDescription: string
    fullDescription: string
}

const Index = () => {

    const [vacancies, setVacancies] = useState<IVacancies[]>();
    const {selectCity} = useSelector((state: RootState) => state.city);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getVacancies = async () => {
            try {
                if(selectCity){
                    const {data} = await $api.get(`/vacancy/city/${selectCity.id}`);
                    setVacancies(data.sort(() => Math.random() - 0.5))
                } else {
                    const {data} = await $api.get('/vacancy');
                    setVacancies(data.sort(() => Math.random() - 0.5))
                }
            } catch (e) {

            }
        }
        getVacancies()
    }, [selectCity])

    const scrollToTarget = () => {
        if(targetRef.current){
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <>
            <CityModal modalActive={isModalOpen} setModalActive={setIsModalOpen} scrollToTarget={() => scrollToTarget()}/>
            <main>
                <div className={styles.firstBlock}>
                    <div className={styles.leftContent}>
                        <h1 onClick={scrollToTarget}>Вакансии</h1>
                        <p>Мы всегда рады профессионалам, которые тоже любят вызовы, стараются делать больше, чем от
                            них ждут</p>
                        <div onClick={() => setIsModalOpen(true)} className="btn">Выберите город</div>
                    </div>
                    <div className={styles.rightContent}>
                        <img className={styles.picture} src={people} alt=""/>
                    </div>
                </div>
                <div className={styles.vacancies} ref={targetRef}>
                    <h2 className={styles.sectionTitle}>Работа в FIT SERVICE</h2>
                    <div className={styles.vacanciesContent}>
                        {vacancies && vacancies.map(vacancy =>
                                <VacancyItem
                                    key={vacancy.id}
                                    id={vacancy.id}
                                    title={vacancy.title}
                                    price={vacancy.price}
                                    shortDescription={vacancy.shortDescription} img={vacancy.img}
                                    isAdminPage={false}/>
                            )
                        }
                    </div>
                </div>
            </main>
        </>
    );
};

export default Index;