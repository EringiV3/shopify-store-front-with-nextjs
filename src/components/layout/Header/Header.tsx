import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useCart } from '@/hooks/cart/useCart';

const Header: React.FC = () => {
  const { cartItemQuantity } = useCart();
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Link href={'/'}>
            <Typography variant="h6">EringiV3 DemoStore</Typography>
          </Link>

          <Link href={'/cart'}>
            <Button color="inherit">
              Cart(item quantity: {cartItemQuantity})
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
