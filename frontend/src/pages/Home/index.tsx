import styles from './Home.module.scss'
import carPicture from '../../assets/car-picture.png'
import schedulePicture from '../../assets/schedule.png'
import {Link} from "react-router-dom";
import people from './../../assets/people.png'

const Index = () => {
    return (
        <div>
            <div className={styles.firstSection}>
                <div className={styles.leftContent}>
                    <h1>FIT SERVICE — <br/>
                        самая быстро растущая сеть автосервисов
                        по всей России</h1>
                    <p className={styles.description}>Это дружная команда людей, вдохновленных<br/>
                        общей идеей и общим делом.</p>
                    <Link className="btn" to="/vacancies">К вакансиям</Link>
                </div>
                <div className={styles.rightContent}>
                    <img src={carPicture} alt=""/>
                </div>
            </div>
            <div className={styles.secondSection}>
                <div className={styles.leftContent}>
                    <h2>Не упустите свой шанс вакансии на все вкусы
                        и специализации</h2>
                    <p className={styles.description}>
                        Новые возможности для карьерного роста:
                        вакансии на все случаи жизни
                    </p>
                    <Link className="btn" to="/vacancies">К вакансиям</Link>
                </div>
                <div className={styles.rightContent}>
                    <img src={people} alt=""/>
                </div>
            </div>
            <div className={styles.thirdSection}>
                <div className={styles.leftContent}>
                    <h2>Динамика развития сети</h2>
                    <span className={styles.year}>FIT SERVICE — 2023</span>
                    <div className={styles.statistics}>
                        <div className={styles.leftStatistic}>
                            <span className={styles.count}>146</span><span className={styles.countName}>городов</span>
                            <ul className={styles.list}>
                                <li>Москва</li>
                                <li>Санкт-Петербург</li>
                                <li>Астана</li>
                                <li>Новосибирск</li>
                                <li>ещё 142 города </li>
                            </ul>
                        </div>
                        <div className={styles.rightStatistic}>
                            <span className={styles.count}>2</span><span className={styles.countName}>страны</span>
                            <ul className={styles.list}>
                                <li>Россия</li>
                                <li>Казахстан-Петербург</li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn" to="/vacancies">К вакансиям</Link>
                </div>
                <div className={styles.rightContent}>
                    <img src={schedulePicture} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Index;