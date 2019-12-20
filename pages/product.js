import axios from 'axios'
import ProductAttributes from '../components/Product/ProductAttributes'
import ProductSummary from '../components/Product/ProductSummary'
import baseUrl from '../utils/baseUrl'

function Product({ product }) {
  return (
    <>
      <ProductSummary {...product} />
      <ProductAttributes {...product} />
    </>
  )
}

Product.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/product`
  const payload = { params: { _id } }
  const res = await axios.get(url, payload)
  return { product: res.data }
}

export default Product;
