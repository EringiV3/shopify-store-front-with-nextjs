import { Cart } from '@/types';

type Props = {
  cart: Cart;
};
const CartProducts: React.FC<Props> = ({ cart }) => {
  console.log({ cart });
  return <>cart products</>;
};

export default CartProducts;
