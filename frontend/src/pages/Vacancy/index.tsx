import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import styles from './Vacancy.module.scss'
import $api from "../../http";
import {IVacancy} from "../../models/IVacancy";
import ReactMarkdown from "react-markdown";
import remarkBreaks from 'remark-breaks';
import FormModal from "../../components/modals/FormModal";
import ContactModal from "../../components/modals/ContactModal";

const Index = () => {
    const params = useParams();
    const id = params.id

    const [vacancy, setVacancy] = useState<IVacancy | null>(null)
    const [isActiveModalForm, setIsActiveModalForm] = useState(false)
    const [isActiveModalFormInfo, setIsActiveModalInfo] = useState(false)

    useEffect(() => {
        const getVacancy = async () => {
            try {
                const {data} = await $api.get(`/vacancy/${id}`)
                setVacancy(data)
                console.log(data)
            } catch (e){
                alert(e)
            }
        }
        getVacancy()
    }, [])

    if(!vacancy){
        return null
    }

    return (
        <>
            <div className={styles.mainInfo}>
                <h1 className={styles.title}>{vacancy.title}</h1>
                <p className={styles.price}>{vacancy.price}</p>
                <div className={styles.buttonsBlock}>
                    <div className="btn" onClick={() => setIsActiveModalForm(true)}>Откликнуться</div>
                    <div className="btn" onClick={() => setIsActiveModalInfo(true)}>Наши контакты</div>
                </div>
                <div className={styles.description}>
                    <ReactMarkdown remarkPlugins={[remarkBreaks]} children={vacancy.fullDescription}/>
                </div>
            </div>
            <ContactModal modalActive={isActiveModalFormInfo} setModalActive={setIsActiveModalInfo}/>
            <FormModal modalActive={isActiveModalForm} setModalActive={setIsActiveModalForm}/>
        </>
    );
};

export default Index;