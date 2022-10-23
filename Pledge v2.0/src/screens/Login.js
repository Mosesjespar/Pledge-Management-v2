import React, { useState } from 'react'
import { Form, Button, Card, Container, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AccountCircle } from '@mui/icons-material'
import { Key } from '@mui/icons-material'
import { base_url } from '../components/Utils'

export default function LoginPage() {
  const [name, setName] = useState('')
  const [passw, setPass] = useState('')
  const [msg, setMsg] = useState('')

  const navigate = useNavigate()

  const [e, setE] = useState(0)


  async function Login(e) {
    e.preventDefault()
    try {
      const opts = {
        method: "POST",
        body: JSON.stringify({
          username: name,
          password: passw
        }),
        headers: { 'Content-Type': 'application/json' }
      }
      const response = await fetch(base_url + 'login', opts)
      const info = await response.json()
      console.log(info)

      if (info.isLoggedIn) {
        localStorage.setItem('u_name', info.username)
        localStorage.setItem('u_type', info.usertype)
        localStorage.setItem('jwt', info.access_tkn)
        navigate('/main', { replace: true })
      }
      else if (!info.isLoggedIn) {
        setMsg(info.msg)
        setE(1)
      }
    }

    catch {
      setE(1)
      setMsg('An Error Occurred Please try again later')
    }
  }



  return (
    <div className='bg2'>
      <Container className='my-5 d-flex justify-content-center align-items-center' >
        <div style={{ border: 'none', borderRadius: '15px' }}>
          <>
            <Form className='login-page p-3 fs-5 ' onSubmit={Login} style={{ width: '70vmin' }}>
              <Card.Header className='mb-3'>
                <Card.Title className='fs-2'>User Login</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Username</Form.Label>

                  <InputGroup className="mb-2">
                    <InputGroup.Text><AccountCircle color='primary' /></InputGroup.Text>
                    <Form.Control type="text" placeholder="Enter username" onChange={text => setName(text.target.value)} />
                  </InputGroup>

                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Text><Key color='primary' /></InputGroup.Text>
                    <Form.Control type="password" placeholder="Password" onChange={text => setPass(text.target.value)} />
                  </InputGroup>
                </Form.Group>

                <div className='d-flex justify-content-center align-items-center'>
                  <Button variant="primary" type='submit' className='w-50 fs-5'>LOGIN</Button>
                </div>
                <div className='d-flex justify-content-center align-items-center fs-6 p-3 ' style={{ color: '#020742', opacity: e }}>{msg}</div>
              </Card.Body>
            </Form>
          </>
        </div>
      </Container>
    </div>
  )
}
