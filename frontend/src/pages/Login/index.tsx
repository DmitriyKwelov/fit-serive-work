import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {login} from "../../store/slices/authSlice";
import {IUserPromise} from "../../models/IUser";
import {Navigate} from "react-router-dom";
import Input from "../../components/Input";

const Index = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isAuth} = useSelector((state: RootState) => state.auth)

    const dispatch = useAppDispatch();

    const submit = async (name: string, password: string) => {
        const data = await dispatch(
            login({
                email,
                password
            }) as unknown as IUserPromise
        )
        if(data.payload){
            localStorage.setItem("token", data.payload.accessToken)
        }
    }

    if (isAuth) {
        return <Navigate to="/"/>
    }

    return (
        <div>
            <h3>Логин</h3>
            <Input value={email} onChange={setEmail}/>
            <h3>Пароль</h3>
            <Input value={password} onChange={setPassword} type="password"/>
            <br/>
            <div onClick={() => submit(email, password)} style={{marginTop: 30}} className="btn">Войти</div>
        </div>
    );
};

export default Index;