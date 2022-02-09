import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios from "axios"

const RegisterScreen = ({ /* location, history */ }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [paid, setPaid] = useState(false)
  const [message, setMessage] = useState(null)

  const userRegisterFunc = () => {
    if (name && email && password && confirmPassword) {
    axios.post("http://localhost:5000/users", {
        name, email, password, paid
    })
    .then(res => {
          if (res.data.status !== 401) {
            alert("user registered, please login now.")
            window.location.href = "/login"
    }
  })
  .catch((err) => {
          alert(err.toString())
  })
    }
    else {
      alert("please fill the form properly")
    }
  }

  const paidToggle = () => {
    if (paid) setPaid(false)
    else setPaid(true)
}


  useEffect(() => {
    
  }, []);

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      userRegisterFunc()
    }
  }

  return (
    <FormContainer>
        {message}
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='paidCheck'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Check
            type='checkbox'
            label="Paid User"
            id="paidCheckId"
            value={paid}
            onChange={(e) => paidToggle()}
          ></Form.Check>
        </Form.Group>

        <Button type='submit ' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3 '>
        <Col>
          Have an Account?{' '}
          <Link to={`/login`}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen