import React, {FC, useEffect, useState} from 'react';
import $api from "../../http";
//@ts-ignore
import Select from "react-select";

interface IOption {
    label: string
    value: string
}

interface DropdownYearProps {
    setOptionValue: (e: IOption) => void
    value: IOption | null
}

const Index: FC<DropdownYearProps> = ({setOptionValue, value}) => {

    const [options, setOption] = useState()
    useEffect(() => {
        const getCities = async () => {
            try {
                const {data} = await $api.get('/city');
                setOption(data.map((city: {id: string, name: string} ) => ({label: city.name, value: city.id})))
            } catch (e) {
                alert(e)
            }
        }
        getCities()
    }, [])

    const onChange = (e: IOption | any) => {
        if(e){
            setOptionValue(e)
        }
    }

    if(!options){
        return null
    }
    return (
        <Select
            classNamePrefix="custom-dropdown"
            options={options}
            onChange={onChange}
            value={value}
            isSearchable={false}
            placeholder="Выберите город"
        />
    );
};

export default Index;