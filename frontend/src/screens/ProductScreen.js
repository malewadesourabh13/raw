import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';
import { isLoggedIn } from '../utils';


const ProductScreen = () => {
  const params = useParams();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())
  /* const product = products.find((p) => p._id === params.id); */
  /* console.log(product); */

  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:5000/products/${params.id}`);
      /* const data = res; */
      setProduct(data)
    }

    fetchProduct()
  }, [params.id])

  return <>
    {/* {product.name} */}
    <Link className='btn btn-dark my-3' to='/'>
      Home Screen
    </Link>
    {
      loggedIn ?
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup>
              <ListGroupItem>
                <h4>{product.name}</h4>
              </ListGroupItem>
              <ListGroupItem>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color='#DAA520' />
              </ListGroupItem>
              <ListGroupItem>
                Price: ₹{product.price}
              </ListGroupItem>
              <ListGroupItem>
                Description: {product.description}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col>
                      Price:
                    </Col>
                    <Col>
                      <strong>₹{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      Status:
                    </Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  {/* need to put button in center */}
                  <Button className='btn-block p-3' /* size='lg' */ /* style={{margin: 0}} */ type='button' disabled={product.countInStock === 0}>
                    Add to cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>

        </Row>
        : <Navigate replace to={"/login"}></Navigate>
    }

  </>;
};

export default ProductScreen;

/* import React from 'react';
import products from '../products';
import { Link } from 'react-router-dom';

function ProductScreen({match}) {
    const product = products.find((p) => p._id === match.params.id);
  return <div>{product.name}</div>;
}

export default ProductScreen; */

/* import React from 'react';
import products from '../products';
import { Link, useParams } from 'react-router-dom';

function ProductScreen() {
    const { id } = useParams();
    const product = products.find((p) => p._id === Number(id));
  return <div>{product.name}</div>;
}

export default ProductScreen; */

