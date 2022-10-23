import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack } from 'react-bootstrap'
export default function Unauthorizied() {
    const navigate = useNavigate()
    setTimeout(() => navigate('/', { replace: true }), 5000)
    return (
        <>
            <Stack direction='vertical' gap='3' className='my-5 d-flex justify-content-center align-items-center'>
                <h1>Unauthorizied Access</h1>
                <h3>Redirecting......</h3>
            </Stack>
        </>
    )
}
