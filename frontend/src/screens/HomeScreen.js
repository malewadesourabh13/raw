import React, {useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product'
/* import products from '../products' */
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([])
  const [user,setUser] = useState(null)

  const fetchProducts = async () => {
    const {data} = await axios.get('http://localhost:5000/products');
    /* const data = res; */
    setProducts(data)
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
    if(user)fetchProducts()
  }, [])

  return <>
    <h1>
        SOL
    </h1>
    {
      user &&
<Row>
{products.map(product => (
    <Col sm={12} md={6} lg={4} xl={3}>
        <Product product={product} />
    </Col>
))}
</Row>
    }
    
  </>;
}

export default HomeScreen;
