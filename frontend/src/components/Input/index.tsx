import React, {FC} from 'react';
import styles from './Input.module.scss'

interface IProps {
    value: string
    onChange: (e: string) => void
    type?: string
}

const Index: FC<IProps> = ({value, onChange, type}) => {
    return (
        <input className={styles.input} value={value} onChange={(e) => onChange(e.target.value)} type={type ? type : "text"}/>
    );
};

export default Index;