import React, {FC, FormEvent, useState} from 'react';
import Modal from "../../Modal";
import styles from './FormModal.module.scss'
import Input from "../../Input";
import {ICity} from "../../../models/IVacancy";
import axios from "axios";

interface IProps {
    modalActive: boolean
    setModalActive: (e: boolean) => void
    city: ICity
}

const Index: FC<IProps> = ({modalActive, setModalActive, city}) => {

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false)
    const [contact, setContact] = useState('')
    const [contactError, setContactError] = useState(false)
    const [successSubmit, setSuccessSubmit] = useState(false)

    const handleSubmit = async (e:  FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(name.length > 3 && contact.length > 3){
                try {
                    const response = await axios.post<{ ok: boolean; result: any }>(
                        `https://api.telegram.org/bot6114446936:AAED7BYgEfo9sLiIpaXsjiLTWPfTXj8m2VQ/sendMessage`,
                        {
                            chat_id: '-855434695',
                            text: `Фио: ${name}\nКонтакты: ${contact}\nГород: ${city.name}`,
                        }
                    );
                    setName('');
                    setContact('');
                    setNameError(false)
                    setContactError(false)
                } catch (error) {
                    console.error(error);
                }
            setSuccessSubmit(true)
        } else{
            name.length < 3 ? setNameError(true) : setNameError(false)
            contact.length < 3 ? setContactError(true) : setContactError(false)
        }
    }
    return (
        <Modal active={modalActive} setActive={setModalActive}>
            <div className={styles.content}>
                {successSubmit
                    ? <><h2 className={styles.success}>✅ Спасибо мы свяжемся с вами</h2></>
                    : <>
                        <h2 className={styles.title}>Оставить заявку</h2>
                        <p className={styles.description}>Укажите свое имя и контакт для связи и мы вам напишем!</p>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.inputBlock}>
                                <label>Ваше имя, отчество</label>
                                <Input value={name} onChange={setName} error={nameError}/>
                            </div>
                            <div className={styles.inputBlock}>
                                <label>Ваш Telegram (через @ или номер телефона)</label>
                                <Input value={contact} onChange={setContact} error={contactError}/>
                            </div>
                            <button className="btn" type="submit">Отправить</button>
                        </form>
                    </>
                }
            </div>
        </Modal>
    );
};

export default Index;