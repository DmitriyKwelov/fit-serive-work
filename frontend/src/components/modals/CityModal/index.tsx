import React, {FC, useEffect, useState} from 'react';
import styles from './CityModal.module.scss'
import Modal from "../../Modal";
import SelectCity from "../../SelectCity";
import {RootState, useAppDispatch} from "../../../store/store";
import {setSelectedCity} from "../../../store/slices/citySlice";
import {useSelector} from "react-redux";

interface IProps {
    modalActive: boolean
    setModalActive: (e: boolean) => void
}

interface IOption {
    label: string
    value: string
}

const Index: FC<IProps> = ({modalActive, setModalActive}) => {
    const {selectCity} = useSelector((state: RootState) => state.city)
    const [city, setCity] = useState<IOption | null>(null)

    useEffect(() => {
        if(selectCity){
            setCity({label: selectCity.name, value: selectCity.id})
        }
    }, [selectCity])

    const dispatch = useAppDispatch();
    const submit = () => {
        if(city){
            dispatch(
                setSelectedCity({id: city.value, name: city.label})
            )
            setModalActive(false)
        }
    }

    return (
        <Modal active={modalActive} setActive={setModalActive}>
            <div className={styles.content}>
                <h2>Сменить город</h2>
                <SelectCity setOptionValue={setCity} value={city}/>
                <div onClick={submit} className={`btn ${styles.submit}`}>Отправить</div>
            </div>
        </Modal>
    );
};

export default Index;