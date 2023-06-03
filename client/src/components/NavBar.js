import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
// import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
                <Container>
                    <Button variant={"outline-light"} onClick={() => navigate(SHOP_ROUTE)}>КупиДевайс</Button>
                {user.isAuth ?
                    <Nav className="ms-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            className="ms-2"
                            onClick={() => navigate(BASKET_ROUTE)}
                        >
                            Корзина
                        </Button>
                        {/*{user.isAdmin ?*/}
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                            className="ms-2"
                        >
                            Админ панель
                        </Button>
                        {/*    :*/}
                        {/*    <div></div>*/}
                        {/*}*/}
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ms-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ms-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
                </Container>
        </Navbar>
    );
});

export default NavBar;







