import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Navigate } from "react-router-dom"
import axios from 'axios';
import { getUser, isLoggedIn } from '../utils';

const ProfileScreen = () => {
  const [user, setUser] = useState(getUser())
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())
  const [details, setDetails] = useState(null)

  const fetchUsers = () => {
    console.log(user)
    axios.get('http://localhost:5000/users/profile',
      {
        headers: { "Authorization": "Bearer " + user.token }
      })
      .then(res => {
        if (res.data.name) {
          setDetails(res.data)
        } else {
          alert("user data fetch failed")
        }
      })
      .catch(err => alert(err.toString()))
  }

  useEffect(() => {
    if (user) fetchUsers()
  }, [user])

  return <>
    <h1>
      SOL
    </h1>
    {
      loggedIn ?
        <Row>
          <Col sm={12} md={6} lg={4} xl={3}>
            {
              details &&
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top"  src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png" />
                <Card.Body>
                  <Card.Title>{details.name}</Card.Title>
                  <Card.Text>{details.email}</Card.Text>
                  <Card.Text><strong>User Type:</strong> {details.isAdmin ? "Admin" : "Normal"}</Card.Text>
                  <Card.Text><strong>User Level:</strong> {details.paid ? "Paid" : "Un-paid"}</Card.Text>
                  {console.log(details)}
                </Card.Body>
              </Card>
            }
          </Col>
        </Row>
        : <Navigate replace to={"/login"}></Navigate>
    }
  </>;
}

export default ProfileScreen;
