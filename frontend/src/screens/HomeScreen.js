import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Navigate } from "react-router-dom"
import Product from '../components/Product'
/* import products from '../products' */
import axios from 'axios';
import { getUser, isLoggedIn } from '../utils';

const HomeScreen = () => {
  const [products, setProducts] = useState([])
  const [user, setUser] = useState(getUser())
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())

  const fetchProducts = async () => {
    console.log(user)
    axios.get('http://localhost:5000/products',
      {
        headers: { "Authorization": "Bearer " + user.token }
      })
      .then(res => {
        if (res.data && res.data.status == 401) {
          alert(res.data.message)
        }
        else setProducts(res.data)
      })
      .catch(err => alert(err.toString()))
  }

  useEffect(() => {
    if (user) fetchProducts()
  }, [user])

  return <>
    <h1>
      SOL
    </h1>
    {
      loggedIn ?
        <Row>
          {products.map(product => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        : <Navigate replace to={"/login"}></Navigate>
    }
  </>;
}

export default HomeScreen;
