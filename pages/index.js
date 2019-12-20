import React from 'react'
import axios from 'axios'
import ProductList from '../components/Index/ProductList'
import baseUrl from '../utils/baseUrl'

function Home({ products }) {
  return <ProductList products={products} />
}

Home.getInitialProps = async () => {
  // fetch data on server
  const url =`${baseUrl}/api/products`
  const res = await axios.get(url)
  return {products: res.data}
  // returns response data as an object
}

export default Home;
