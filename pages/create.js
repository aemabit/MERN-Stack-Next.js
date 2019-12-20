import React from 'react'
import { Form, Input, TextArea, Button, Image, Message, Header, Icon } from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
}

function CreateProduct() {
  const [product, setProduct ] = React.useState(INITIAL_PRODUCT)
  const [mediaPreview, setMediaPreview] = React.useState("")
  const [success, setSuccess] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  function handleChange(e){
    const { name, value, files } = e.target
    if(name === 'media'){
      setProduct(prevState => ({ ...prevState, media: files[0] }))
      setMediaPreview(window.URL.createObjectURL(files[0]))
    }else{
      setProduct(prevState => ({ ...prevState, [name]: value }))
    }
  }

  async function handleImageUpload() {
    const data = new FormData()
    data.append('file', product.media)
    data.append('upload_preset', 'gtfastcart')
    data.append('cloud_name', 'aemabit')
    const res = await axios.post(process.env.CLOUDINARY_URL, data)
    const mediaUrl = res.data.url
    return mediaUrl
  }

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    const mediaUrl = await handleImageUpload()
    console.log({mediaUrl})
    const url = `${baseUrl}/api/product`
    const { name, price, description } = product
    const payload = { name, price, description, mediaUrl }
    const res = await axios.post(url, payload)
    console.log({res})
    setLoading(false)
    setProduct(INITIAL_PRODUCT)
    setSuccess(true)
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add circle" color="green" />
        Create New Product
      </Header>
      <Form loading={loading} success={success} onSubmit={handleSubmit}>
        <Message 
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            onChange={handleChange}
            value={product.name}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            onChange={handleChange}
            value={product.price}
          />
          <Form.Field
            control={Input}
            name="media"
            type="file"
            label="Media"
            content="Selet Image"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="medium"/>
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
        />
        <Form.Field
          control={Button}
          disabled={loading}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="Submit"
        />
      </Form>
    </>
  )
}

export default CreateProduct;
