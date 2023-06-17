import React, {useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
// import {set} from "mobx";
import {createType} from "../../http/deviceAPI";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const inputRef = useRef(null)

    const addType = () => {
        if (value.trim()) {
            createType({name: value.trim()})
                .then(() => {
                    setValue('')
                    onHide()
                })
                .catch((e) => console.log(e))
        } else {
            setError(true)
            inputRef.current.focus()
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            ref={inputRef}
                            type="text"
                            placeholder="Введите название типа"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value)
                                setError(false)
                            }}
                            isInvalid={error}
                        />
                        <Form.Control.Feedback type="invalid">
                            Название типа не может быть пустым.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
