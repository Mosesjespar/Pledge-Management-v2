import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from 'react'
import { Container, Stack } from 'react-bootstrap'
import PledgeCard from './PledgeCard'
import AddProgramModal from './AddProgramModal'
import { usePledges } from '../context/PledgeContext'
import AddUserModal from './AddUser'
import MakeProgramPaymentModal from './MakeProgramPayment'
import TotalPledgeAmount from './TotalPledgeAmount'
import AddContributorModal from './AddContributor'
import NavBar from './NavBar'
import Unauthorizied from '../screens/Unauthorizied'

export default function Main() {
    const [viewPledgeForm, setViewPledgeForm] = useState(false)

    const [viewAddUserForm, setViewAddUserForm] = useState(false)

    const [viewPledgePayment, setViewPledgePayment] = useState(false)

    const [pledgeName, setPledgeName] = useState()

    const { programs, getTotalPledgePayments, fetchPrograms, fetchContributors } = usePledges()

    const [viewAddContributor, setViewAddContributor] = useState(false)
    useEffect(() => {
        fetchPrograms()
        setTimeout(() => fetchContributors(), 1000)

    }, [])


    if (localStorage.getItem('u_name')) {
        return (
            <>
                <NavBar />
                <Container className='my-4'>
                    <Stack direction='horizontal' gap={2} className='mb-4 me-auto' >
                        <h1 className='me-auto'>PLEDGE MANAGEMENT</h1>
                        <Button variant="primary" onClick={() => {
                            setViewPledgeForm(true)

                        }}> Add Program</Button>
                        {localStorage.getItem('u_type') !== 'Super Admin' ? '' : <Button variant="outline-primary" onClick={() => setViewAddUserForm(true)}>Add User</Button>}

                    </Stack>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px,1fr))', gap: '1rem', alignItems: 'flex-start' }}>
                        {programs.map(p => {

                            return (
                                <PledgeCard pledgename={p.name} collected={getTotalPledgePayments(p.name)} target={p.budget_amount} paymentAction={() => {
                                    setPledgeName(p.name)
                                    setViewPledgePayment(true)
                                }}
                                    viewConts={() => {
                                        setViewAddContributor(true)
                                        setPledgeName(p.name)
                                    }}
                                    key={p.id}
                                />
                            )

                        })
                        }
                        <TotalPledgeAmount />
                    </div>

                </Container>
                <AddProgramModal show={viewPledgeForm} handleClose={() => setViewPledgeForm(false)} />

                <AddUserModal show={viewAddUserForm}
                    handleClose={() => setViewAddUserForm(false)}
                    defaultPledgeName={pledgeName}
                />

                <MakeProgramPaymentModal show={viewPledgePayment} handleClose={() => setViewPledgePayment(false)} pledgeName={pledgeName} />

                <AddContributorModal handleClose={() => setViewAddContributor(false)}
                    defaultPledgeName={pledgeName}
                    show={viewAddContributor}

                />
            </>
        )
    }

    else {
        return (
            <Unauthorizied />
        )
    }

}
