import React, { useRef } from 'react'
import { Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { usePledges } from '../context/PledgeContext'

export default function AddContributorModal({ show, handleClose, defaultPledgeName }) {
    const nameRef = useRef()
    const amountRef = useRef()

    const { addProgramContributor, fetchContributors } = usePledges()

    function handleSubmit(e) {
        e.preventDefault()
        addProgramContributor({
            name: nameRef.current.value,
            pledge_amount: parseFloat(amountRef.current.value),
            Program: defaultPledgeName,
            Payments: 0

        })
        fetchContributors()
        handleClose()
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New {defaultPledgeName} Contributor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3' controlId='name'>
                        <Form.Label>Contributor Name</Form.Label>
                        <Form.Control type='text' required ref={nameRef} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='amount'>
                        <Form.Label>Pledge Amount</Form.Label>
                        <Form.Control type='number' required min={0} ref={amountRef} />
                    </Form.Group>

                    <div className='d-flex justify-content-end'>
                        <Button variant="primary" type='submit'>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
