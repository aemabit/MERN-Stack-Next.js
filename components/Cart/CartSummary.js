import { Button, Segment, Divider } from 'semantic-ui-react'

function CartSummary() {
  return (
  <>
    <Divider/>
    <Segment clearing size="large">
      <span><strong>Sub total:</strong> $0.00</span>
      <Button
        icon="shopping cart"
        color="teal"
        floated="right"
        content="Checkout"
      />
    </Segment>
  </>
  )
}

export default CartSummary;
