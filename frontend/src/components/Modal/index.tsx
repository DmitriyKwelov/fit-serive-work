import React, {FC} from 'react';
import styles from "./Model.module.scss"

interface ModalProps {
    active: boolean
    setActive: (e: boolean) => void
    children: any;
}

const Index: FC<ModalProps> = ({active, setActive, children}) => {
    return (
        <div className={active ? `${styles.modal} ` + `${styles.active}` : styles.modal} onClick={() => setActive(false)}>
            <div className={active ? `${styles.content} ` + `${styles.active}` : styles.content} onClick={(e) => e.stopPropagation()}>
                <span className={styles.delete} onClick={() => setActive(false)}>x</span>
                {children}
            </div>
        </div>
    );
};

export default Index;