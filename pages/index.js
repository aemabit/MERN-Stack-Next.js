import React from 'react'
import axios from 'axios'
import ProductList from '../components/Index/ProductList'

function Home({ products }) {
  return <ProductList products={products} />
}

Home.getInitialProps = async () => {
  // featch data on server
  const url = 'http://localhost:3000/api/products'
  const res = await axios.get(url)
  return {products: res.data}
  // returns response data as an object
}

export default Home;
