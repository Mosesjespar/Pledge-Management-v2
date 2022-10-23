import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Stack } from 'react-bootstrap'
import { CurrencyFormater } from './Utils'
import { PledgeProvider } from '../context/PledgeContext'
import { usePledges } from '../context/PledgeContext'
import NavBar from './NavBar'
import Unauthorizied from '../screens/Unauthorizied'

export function ViewContributorsModal() {

    const { contributors, fetchContributors, programs, fetchPrograms } = usePledges()

   
    const [selection, setSelection] = useState()
    useEffect(() => {
        fetchContributors()
        fetchPrograms()
        const x = programs[0]
        setTimeout(()=>console.log(x.name,selection),2000)
        setSelection('yoo')
    }, [])
    
    return (
        <>
            <NavBar />
            <div className='mt-4 m-5'>
                <Stack direction='horizontal' gap='2' className='mb-4'>
                    <h3>Registered Contributors</h3>
                    <Form className="d-flex ms-auto me-3">
                        <Form.Control
                            type="search"
                            placeholder="Search Name"
                            className=""
                            aria-label="Search"
                        />&nbsp;
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Stack>

                <Stack direction='horizontal' gap='2'>
                    <p>Filter By Program</p>
                    <div style={{ width: '40vmin', marginTop: '3px' }}>
                        <Form.Select
                            className='mb-3'
                            onChange={e => setSelection(e.target.value)}
                        >
                            {
                                programs.map((program) => (

                                    <option value={program.name} key={program.id} >{program.name}</option>

                                ))
                            }
                        </Form.Select>
                    </div>
                </Stack>

                <Stack direction='vertical' gap='3'>
                    <Stack direction='horizontal' gap='2' >
                        <div className='me-auto fs-4'><b>Name</b></div>
                        <div className='fs-5 me-2'><b>Progress</b></div>
                    </Stack>
                    {
                        contributors.filter(contrib => contrib.program === selection).map(cont => {
                            let bg = ''
                            contributors.indexOf(cont) % 2 === 0 ? bg = 'bg-light pt-3 pb-3' : bg = 'p-1'

                            return (
                                <Stack direction='horizontal' gap='2' className={bg} key={cont.id}>
                                    <div className='me-auto fs-5 pt-0 pb-0 p-4'>{cont.name}</div>
                                    <div className='fs-6 pt-0 pb-0 p-4'>{CurrencyFormater.format(cont.payments)}/<span className='text-muted fs-6.5 ms-1'>{CurrencyFormater.format(cont.amount)}</span></div>
                                </Stack>
                            )
                        })
                    }
                </Stack>
            </div>
        </>
    )
}

export default function ViewContributors() {
    if (localStorage.getItem('u_name')) {
        return (
            <PledgeProvider>
                <ViewContributorsModal />
            </PledgeProvider>

        )
    }
    else {
        return (
            <Unauthorizied />
        )
    }
}
