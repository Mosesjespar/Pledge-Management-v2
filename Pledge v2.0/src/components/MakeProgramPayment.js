import React, { useRef } from 'react'
import { Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { usePledges } from '../context/PledgeContext'

export default function MakeProgramPaymentModal({ show, handleClose, defaultPledgeName, pledgeName }) {
    const amountRef = useRef()
    const contributorRef = useRef()
    const { getPledgeContributors, addPayment, getMinimumPayment, fetchPrograms } = usePledges()
    function handleSubmit(e) {
        e.preventDefault()

        addPayment({
            program: pledgeName,
            payment: parseFloat(amountRef.current.value),
            name: contributorRef.current.value
        })
        setTimeout(() => {
            fetchPrograms()
            
        }, 1500)
        handleClose()

    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment For {pledgeName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className='mb-3' controlId='name'>
                        <Form.Label>Contributor Name</Form.Label>
                        <Form.Select
                            defaultValue={defaultPledgeName}
                            required ref={contributorRef}

                        >
                            {
                                getPledgeContributors(pledgeName).map((contributor) => (

                                    <option value={contributor.name} key={contributor.id}>{contributor.name}</option>

                                ))
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type='number' required min={getMinimumPayment(pledgeName)} ref={amountRef} />
                    </Form.Group>

                    <div className='d-flex justify-content-end'>
                        <Button variant="primary" type='submit'>Make Payment</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
