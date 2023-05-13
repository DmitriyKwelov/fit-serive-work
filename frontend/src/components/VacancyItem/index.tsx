import React, {FC} from 'react';
import styles from "./VacancyItem.module.scss";
import logo from "../../assets/logo.svg";
import ReactMarkdown from "react-markdown";
import {Link} from "react-router-dom";
import trashIcon from '../../assets/trash.svg'
import editIcon from '../../assets/edit.svg'
import remarkBreaks from 'remark-breaks';
import config from "../../config";

interface IProps {
    id: string
    title: string;
    price: string
    shortDescription: string
    img: string
    isAdminPage: boolean
    deleteItem?: () => void
    edit?: () => void
}

const Index: FC<IProps> = ({shortDescription, title, img, price, id, isAdminPage, deleteItem, edit}) => {
    return (
        <div className={styles.vacanciesItem}>
            <div className={styles.leftContent}>
                <img src={logo} alt=""/>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.mainInfo}>
                    <p className={styles.price}>{price}</p>
                </div>
                <ReactMarkdown remarkPlugins={[remarkBreaks]} children={shortDescription}/>
                <Link className="btn" style={{marginTop: 20}} to={`/vacancy/${id}`}>Подробнее</Link>
            </div>
            <div className={styles.rightContent}>
                <img className={styles.picture} src={`${config.API_BASE_URL}/uploads/images/${img}`} alt=""/>
            </div>
            {isAdminPage &&
                <div className={styles.btnControl}>
                    <div onClick={edit} className={styles.edit}><img src={editIcon} alt=""/></div>
                    <div onClick={deleteItem} className={styles.delete}><img src={trashIcon} alt=""/></div>
                </div>
            }
        </div>
    );
};

export default Index;