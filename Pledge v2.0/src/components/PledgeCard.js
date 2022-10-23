import { Card, ProgressBar, Stack } from 'react-bootstrap'
import { CurrencyFormater } from './Utils'
import Button from 'react-bootstrap/Button'
import { usePledges } from '../context/PledgeContext'



export default function PledgeCard({ pledgename, collected, target, paymentAction, bg = 'bg-light',viewConts }) {
    const { getMinimumPayment } = usePledges()
    return (
        <Card className={bg}>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className='me-2'>{pledgename}</div>

                    <div className='d-flex align-items-baseline'>{CurrencyFormater.format(collected)} /
                        <span className='text-muted fs-6 ms-1'>{CurrencyFormater.format(target)}</span></div>

                </Card.Title>
                <ProgressBar className='rounded-pill ' variant={collected}
                    min={0}
                    max={target}
                    now={collected}
                />
                <Stack direction='horizontal' gap={2} className='mt-4'>
                    <Button variant="outline-primary" className='ms-auto' onClick={paymentAction}>Add A Payment</Button>

                    <Button variant="outline-secondary" onClick={viewConts}>Add Contributor</Button>
                    {/* <Button variant="outline-secondary" onClick={()=>console.log(getMinimumPayment(pledgename))}>Add Contor</Button> */}
                    
                </Stack>
            </Card.Body>
        </Card>
    )
}


