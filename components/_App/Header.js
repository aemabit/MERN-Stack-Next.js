import { Menu, Container, Image, Icon} from 'semantic-ui-react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import Nprogress from 'nprogress'

Router.onRouteChangeStart = () => Nprogress.start()
Router.onRouteChangeComplete = () => Nprogress.done()
Router.onRouteChangeError = () => Nprogress.done()

function Header() {
  const router = useRouter()
  const user = false;

  function isActive (route) {
    return route === router.pathname
  }

  return (
    <Menu fluid={true} id="menu">
      <Container text>

        <Link href="/">
          <Menu.Item header active={isActive('/')}>
            <Image
              size="mini"
              src="https://goldtreebycs.com/img/my-shop-logo-1549476062.jpg"
              style={{ marginRight: '1em'}}
            />
            GoldTree
          </Menu.Item>
        </Link>

        <Link href="/cart">
          <Menu.Item header active={isActive('/cart')}>
            <Icon
              name="cart"
              size="small"
            />
            Cart
          </Menu.Item>
        </Link>

        <Link href="/create">
          <Menu.Item header active={isActive('/create')}>  
            <Icon
              name="add square"
              size="small"
            />
            Create
          </Menu.Item>
        </Link>
        { user ? (<> 
        <Link href="/account" active={isActive('/account')}>
          <Menu.Item header>
            <Icon
              name="user"
              size="small"
            />
            Account
          </Menu.Item>
        </Link>

          <Menu.Item header>
            <Icon
              name="sign out"
              size="small"
            />
            Logout
          </Menu.Item>
        </>)
        :
        (<>
        <Link href="/login">
          <Menu.Item header active={isActive('/login')}>
            <Icon
              name="sign in"
              size="small"
            />
            Login
          </Menu.Item>
        </Link>

        <Link href="/signup" active={isActive('/signup')}>
          <Menu.Item header>
            <Icon
              name="signup"
              size="small"
            />
            Signup
          </Menu.Item>
        </Link>
        </>)}
      </Container>
    </Menu>
  )
}

export default Header;
