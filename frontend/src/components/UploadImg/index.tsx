import React, {ChangeEvent, FC, MutableRefObject, RefObject, useRef} from 'react';
import styles from './UploadImg.module.scss'
import $api from "../../http";
import imgFileIcon from "../../assets/imgFile.svg"

interface UploadImgProps {
    imageUrl: string,
    ChangeImageUrl: (e: string) => void
}

const Index: FC<UploadImgProps> = ({imageUrl, ChangeImageUrl}) => {

    const fileInputField = useRef<HTMLInputElement>(null);

    //@ts-ignore
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        console.log(event)
    }

    //@ts-ignore
    const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        console.log("cccc", event.dataTransfer.files[0])
        const file =  event.dataTransfer.files[0];
        try {
            const formData = new FormData();
            if (file) {
                formData.append('image', file);
                const {data} = await $api.post('/upload/image', formData);
                console.log(data)
                ChangeImageUrl(data.filename);
            }
        } catch (e) {
            alert('Ошибка при загрузке файла!')
        }
    }

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event)
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
                ? <img className={styles.UploadedImage} src={`http://localhost:5000/uploads/images/${imageUrl}`} alt=""/>
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