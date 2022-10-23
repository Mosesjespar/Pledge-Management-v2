import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { usePledges } from '../context/PledgeContext'

export default function AddUserModal({ show, handleClose }) {
    const nameRef = useRef()
    const passwordRef = useRef()

    const { AddUser } = usePledges()
    const [userType, setUserType] = useState()
    function handleSubmit(e) {
        e.preventDefault()
        AddUser({
            username: nameRef.current.value,
            password: passwordRef.current.value,
            type: userType
        })
        console.log(nameRef.current.value)
        console.log(passwordRef.current.value)
        console.log(userType)
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3' controlId='name'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' required ref={nameRef} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='amount'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='text' required ref={passwordRef} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>User Type</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={e => setUserType(e.target.value)}>
                            <option value="">User Type</option>
                            <option value="Normal User">Normal User</option>
                            <option value="Super Admin">Super Admin</option>
                        </Form.Select>
                    </Form.Group>

                    <div className='d-flex justify-content-end'>
                        <Button variant="primary" type='submit'>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
