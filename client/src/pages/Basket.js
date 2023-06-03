import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { getBasket } from '../http/deviceAPI';
import { Context } from '../index';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Basket = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        getBasket().then((data) => device.setBasket(data));
    }, [device]);

    // const handleDeleteItem = async (itemId) => {
    //     try {
    //         const response = await fetch(`/api/basket/${itemId}`, {
    //             method: 'DELETE'
    //         });
    //         const data = await response.json();
    //         device.setBasket(data.basket);
    //         console.log(data.message);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    if (!device.basket) return <div style={{ fontSize: '1.5rem', fontWeight: '500' }}>Корзина пуста</div>;

    let total = 0;
    device.basket.forEach((item) => {
        if (item.device) {
            total += Number(item.device.price);
        }
    });

    return (
        <>
            <Container className="d-flex flex-sm-column justify-content-center align-items-center mt-3">
                <h1 className="pb-2" style={{ fontSize: '1.7rem', fontWeight: '500' }}>Корзина</h1>
                <Card className="d-flex flex-row p-2 justify-content-between align-items-center mb-2">
                    <h1 className="pr-2" style={{ fontSize: '1.3rem', fontWeight: '500' }}>Итого:</h1>
                    <h3 className="pl-2" style={{ fontSize: '1.3rem', fontWeight: '400' }}>
                        {total} <span className="font-weight-light"> тенге</span>
                    </h3>
                </Card>
                {device.basket.map((item) => (
                    <Card className="d-flex w-100 p-2 justify-content-center mb-2" key={item.id}>
                        <Row className="d-flex w-100">
                            <Col>
                                <div className="d-flex flex-row align-items-center">
                                    <img src={process.env.REACT_APP_API_URL + item.device.img} width={50} alt={item.device.name} />
                                    <h1 className="pl-3" style={{ fontSize: '1.5rem', fontWeight: '400' }}>{item.device.name}</h1>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                                    <h2 className="font-weight-light" style={{ fontSize: '1.4rem', fontWeight: '400' }}>{item.device.price} тенге</h2>
                                    {/*<button className="ml-3 btn btn-outline-danger btn-sm" onClick={() => handleDeleteItem(item.id)}>Удалить</button>*/}
                                </div>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </Container>
        </>
    );
});

export default Basket;