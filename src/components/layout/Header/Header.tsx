import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import { cartItemQuantityState } from '@/recoil/atoms/cartItemQuantityState';
// import { useRecoilState } from 'recoil';
// import { useEffect } from 'react';
// import { useCart } from '@/hooks/cart/useCart';

const Header: React.FC = () => {
  return (
    <header>
      {/* <nav>
      <Link href="/">
        <a>Items</a>
      </Link>{' '}
      |{' '}
      <Link href="/cart">
        <a>Cart</a>
      </Link>
    </nav> */}
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
          <Link href={'/'}>
            <Typography variant="h6">EringiV3 DemoStore</Typography>
          </Link>

          <Link href={'/cart'}>
            <Button color="inherit">Cart(quantity: 0)</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
