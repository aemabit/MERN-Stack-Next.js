import React from 'react'
import { Button, Form, Icon , Message, Segment } from 'semantic-ui-react'
import Link from 'next/link'
import axios from 'axios'
import catchError from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl'
import { handleLogin } from '../utils/auth'

const INITIAL_USER = {
  email: "",
  password: "",
}
function Login() {
  const [user, setUser] = React.useState(INITIAL_USER)
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false) 
  const [error, setError] = React.useState('')

  React.useEffect(()=> {
    const isUser = Object.values(user).every( el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  function handleChange(e){
    const {name, value} = e.target
    setUser(prevState => ({ ...prevState, [name]:value }))
  }

  async function handleSubmit(){
    try {
      setLoading(true)
      setError('')
      const url = `${baseUrl}/api/login`
      const payload = {...user}
      const res = await axios.post(url, payload)
      handleLogin(res.data)
    }catch (error) {
      catchError(error, setError)
    }finally{
      setLoading(false)
    }

  }

  return (
    <>
      <Message
        attached
        icon="key"
        header="GoldTree Membership!"
        content="Welcome Back!"
        color="yellow"
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message 
          error
          header="Oops!"
          content={error}
        />
        <Segment>
          <Form.Input 
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            type="email"
          />
          <Form.Input 
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
          />
          <Button 
            icon="sign in"
            type="submit"
            color="orange"
            content="Login"
            disabled={disabled || loading}
          />
        </Segment>
      </Form>
      <Message attached='bottom' info>
        New user?{}
        <Link href="/signup">
          <a> Sign up here </a>
        </Link>{" "}
        instead.
      </Message>
    </>
  )
}

export default Login;
