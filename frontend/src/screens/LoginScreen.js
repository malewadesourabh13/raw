import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios from "axios"
import { getUser, saveUser } from "../utils/index"

const LoginScreen = ({ /* location, history */ }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const userLoginFunc = () => {
    axios.post("http://localhost:5000/users/login", {
      email,
      password
    })
      .then(res => {
        console.log(res.status, res.data)
        if (res.data.status !== 401) {
          const userObj = {
            email: res.data.email,
            token: res.data.token
          }
          saveUser(userObj)
          window.location.href = "/"
          return
        }
        saveUser(null)
        alert(JSON.stringify(res.data))
        return
      })
      .catch(err => {
        saveUser(null)
        alert(err.toString())
      })
  }

  useEffect(() => {
    setUser(getUser)
    if (user) {
      window.location.href = "/"
    }
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault()
    userLoginFunc()
  }

  return (
    <div>
      {
        !user
        &&
        <FormContainer>
          <h1>Sign In</h1>
          <Form onSubmit={submitHandler}>
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

            <Button type='submit' variant='primary'>
              Sign In
            </Button>
          </Form>

          <Row className='py-3'>
            <Col>
              New Customer?{' '}
              <Link to={'/register'}>
                Register
              </Link>
            </Col>
          </Row>
        </FormContainer>
      }
    </div>
  )
}

export default LoginScreen


