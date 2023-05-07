import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styles from './Vacancy.module.scss'
import $api from "../../http";
import {IVacancy} from "../../models/IVacancy";
import ReactMarkdown from "react-markdown";
import remarkBreaks from 'remark-breaks';

const Index = () => {
    const params = useParams();
    const id = params.id

    const [vacancy, setVacancy] = useState<IVacancy | null>(null)

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
        <div>
            <div className={styles.mainInfo}>
                <h1 className={styles.title}>{vacancy.title}</h1>
                <p className={styles.price}>{vacancy.price}</p>
                <div className="btn">Откликнуться</div>
                <div className={styles.description}>
                    <ReactMarkdown remarkPlugins={[remarkBreaks]} children={vacancy.fullDescription}/>
                </div>
            </div>
        </div>
    );
};

export default Index;