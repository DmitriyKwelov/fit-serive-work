import React, {ChangeEvent, FC, useRef} from 'react';
import styles from './UploadImg.module.scss'
import $api from "../../http";
import imgFileIcon from "../../assets/imgFile.svg"
import config from "../../config";

interface UploadImgProps {
    imageUrl: string,
    ChangeImageUrl: (e: string) => void
}

const Index: FC<UploadImgProps> = ({imageUrl, ChangeImageUrl}) => {

    const fileInputField = useRef<HTMLInputElement>(null);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const file = (event.dataTransfer as DataTransfer).files[0];
        try {
            const formData = new FormData();
            if (file) {
                try {
                    formData.append('image', file);
                    const {data} = await $api.post('/upload/image', formData);
                    ChangeImageUrl(data.filename);
                } catch (e) {
                    console.log(e)
                }
            }
        } catch (e) {
            alert('Ошибка при загрузке файла!')
        }
    }

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        try {
            const formData = new FormData();
            if (event.target.files) {
                const file = event.target.files[0];
                formData.append('image', file);
                const {data} = await $api.post('/upload/image', formData);
                ChangeImageUrl(data.filename);
            }
        } catch (e) {
            alert('Ошибка при загрузке файла!')
        }
    }

    return (
        <div>
            <div className={imageUrl ? `${styles.block} ${styles.uploaded}` : styles.block}
                 onClick={() => fileInputField.current?.click()}
                 onDrop={(e) => handleDrop(e)}
                 onDragOver={(e) => handleDragOver(e)}
            >{imageUrl
                ? <img className={styles.UploadedImage} src={`${config.API_BASE_URL}/uploads/images/${imageUrl}`} alt=""/>
                : <>
                    <img src={imgFileIcon} alt=""/>
                    <p>Загрузить обложку</p>
                </>
            }
            </div>
            <input type="file" onChange={handleChangeFile} ref={fileInputField} hidden/>
        </div>
    );
};

export default Index;