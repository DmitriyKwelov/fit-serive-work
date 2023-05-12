import React, {FC} from 'react';
import Modal from "../../Modal";
import styles from './ContactModal.module.scss'
import iconTg from '../../../assets/icon_tg.svg'
import iconVk from '../../../assets/icon_vk.svg'
import iconWhatsapp from '../../../assets/icon_whatsapp.svg'

interface IProps {
    modalActive: boolean
    setModalActive: (e: boolean) => void
}

const Index: FC<IProps> = ({modalActive, setModalActive}) => {
    return (
        <Modal active={modalActive} setActive={setModalActive}>
            <div className={styles.content}>
                <h2>Наши контакты</h2>
                <p>Наш телеграм @maxvavilonov</p>
                <p>Наши WhatsApp</p>
                <p>8 981 274-23-36</p>
                <p>8 981 274-23-53</p>
                <p>Так же вы можете перейти по иконкам ниже</p>
                <div className={styles.socialMedia}>
                    <a className={styles.item} href="">
                        <div className={styles.circle}>
                            <img src={iconTg} alt=""/>
                        </div>
                    </a>
                    <a className={styles.item} href="">
                        <div className={styles.circle}>
                            <img src={iconVk} alt=""/>
                        </div>
                    </a>
                    <a className={styles.item} href="">
                        <div className={styles.circle}>
                            <img src={iconWhatsapp} alt=""/>
                        </div>
                    </a>
                </div>
            </div>
        </Modal>
    );
};

export default Index;