import React, {useEffect, useState} from 'react';
import SimpleMdeReact from "react-simplemde-editor";
import 'easymde/dist/easymde.min.css';
import styles from './AdminAddVacancy.module.scss'
import UploadImg from "../../components/UploadImg";
import SelectCity from "../../components/SelectCity";
import $api from "../../http";
import {useNavigate, useParams} from "react-router-dom";
import Input from "../../components/Input";

interface IOption {
    label: string
    value: string
}

const Index = () => {
    const [title, setTitle] = useState('')
    const [img, setImg] = useState('')
    const [price, setPrice] = useState('')
    const [city, setCity] = useState<IOption | null>(null)
    const [shortDescription, setShortDescription] = React.useState('');
    const [fullDescription, setFullDescription] = React.useState('');

    const navigate = useNavigate();

    const {id} = useParams();
    const isEditing = Boolean(id);
    console.log(id)

    useEffect(() => {
        if(id){
            const getVacancy = async () => {
                const {data} = await $api.get(`/vacancy/${id}`)
                console.log(data.city)
                setTitle(data.title)
                setImg(data.img)
                setPrice(data.price)
                setCity({label: data.city.name, value: data.city.id})
                setShortDescription(data.shortDescription)
                setFullDescription(data.fullDescription)
                console.log(data)
            }
            getVacancy()
        }
    }, [])

    const onChange1 = React.useCallback((value: any) => {
        setShortDescription(value);
    }, []);

    const onChange2 = React.useCallback((value: any) => {
        setFullDescription(value);
    }, []);

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
        }),
        [],
    );
    const submit = async () => {
        if(title.length > 1 && img.length !== 0 && price.length !== 0 && city !== null && shortDescription.length !== 0, fullDescription.length !== 0){
            try {
                if(id){
                    await $api.post('/vacancy/update', {id, title, img, price, city: city?.value, shortDescription, fullDescription})
                } else {
                    await $api.post('/vacancy/create', {title, img, price, city: city?.value, shortDescription, fullDescription});
                }
                navigate('/admin')
            } catch (e) {
                alert(e)
            }
        } else {
            alert('Заполните поле name')
        }
    }

    return (
        <div className={styles.container}>
            <h1>Загрузить новую вакансию</h1>
            <UploadImg imageUrl={img} ChangeImageUrl={setImg}/>
            <h2>Выберете город</h2>
            <SelectCity setOptionValue={setCity} value={city}/>
            <h2>Название</h2>
            <Input value={title} onChange={setTitle}/>
            <h2>Цена</h2>
            <Input value={price} onChange={setPrice}/>
            <h2>Краткое описание</h2>
            <div style={{padding: '0 30px 0 30px'}}>
                <SimpleMdeReact className={styles.editor} onChange={onChange1} value={shortDescription} options={options}/>
            </div>
            <h2>Полное описание</h2>
            <div style={{padding: '0 30px 30px 30px'}}>
            <SimpleMdeReact className={styles.editor} onChange={onChange2} value={fullDescription} options={options}/>
            </div>
            <div className="btn" onClick={submit}>{id ? 'Обновить' : 'Создать'}</div>
        </div>
    );
};

export default Index;