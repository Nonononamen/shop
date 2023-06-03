import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, InputGroup} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import axios from "axios";
import {IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(String(email).toLowerCase())
    }

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/
        return regex.test(String(password))
    }

    const click = async () => {
        if (!validateEmail(email)) {
            setEmailError(true)
            return
        } else {
            setEmailError(false)
        }

        if (!validatePassword(password)) {
            setPasswordError(true)
            return
        } else {
            setPasswordError(false)
        }

        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }

            // устанавливаем токен в axios.defaults.headers.common
            const { token } = data // предполагаем, что токен приходит в ответе сервера в поле token
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            // обновляем состояние в mobx и переходим на страницу магазина
            user.setUser(data)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
            // if (email === "user1100@mail.ru"){
            //     user.setIsAdmin(true)
            // }
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                alert(e.response.data.message);
            } else {
                alert('Неправильный email или пароль.');
            }
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <div className="mt-2 d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Введите ваш email..." value={email} onChange={e => setEmail(e.target.value)} isInvalid={emailError} />
                    <Form.Control.Feedback type="invalid">Некорректный email.</Form.Control.Feedback>
                    <InputGroup className="mt-3">
                        <Form.Control placeholder="Введите ваш пароль..." value={password} onChange={e => setPassword(e.target.value)} type={passwordVisible ? "text" : "password"} isInvalid={passwordError} />
                        <InputGroup.Text onClick={() => setPasswordVisible(!passwordVisible)} style={{cursor: 'pointer'}}>
                            {passwordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid"> Пароль должен содержать хотя бы одну цифру и одну латинскую букву, и быть не менее 8 символов длиной.</Form.Control.Feedback>
                    </InputGroup>
                    <div className="d-flex justify-content-between mt-3">
                        {isLogin ? <div> Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink> </div> : <div> Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink> </div> }
                        <Button variant={"outline-success"} onClick={click} > {isLogin ? 'Войти' : 'Регистрация'} </Button>
                    </div>
                </div>
            </Card>
        </Container>
    );
});

export default Auth;









