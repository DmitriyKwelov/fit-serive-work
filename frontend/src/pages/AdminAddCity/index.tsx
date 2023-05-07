import React, {useState} from 'react';
import $api from "../../http";
import styles from './AdminAddCity.module.scss'
import Input from "../../components/Input";
import {useNavigate} from "react-router-dom";

const Index = () => {

    const [name, setName] = useState('')

    const navigate = useNavigate();

    const submit = async () => {
        if(name.length !== 0){
            try {
                await $api.post('/city/create', {name});
                navigate('/admin')
            } catch (e) {
                alert(e)
            }
        } else {
            alert('Заполните поле name')
        }
    }

    return (
        <div>
            <h1>Добавить город</h1>
            <div className={styles.content}>
                <Input value={name} onChange={setName}/>
                <div className={`btn ${styles.submit}`} onClick={submit}>Добавить</div>
            </div>
        </div>
    );
};

export default Index;