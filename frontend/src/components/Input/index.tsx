import React, {FC} from 'react';
import styles from './Input.module.scss'

interface IProps {
    value: string
    onChange: (e: string) => void
    type?: string
    error?: boolean
}

const Index: FC<IProps> = ({value, onChange, type, error}) => {
    return (
        <input className={error ? `${styles.input} ${styles.error}` : styles.input} value={value} onChange={(e) => onChange(e.target.value)} type={type ? type : "text"}/>
    );
};

export default Index;