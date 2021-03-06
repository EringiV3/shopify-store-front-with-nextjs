import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import { useCart } from '@/hooks/cart/useCart';
import { getValueByMatchedNameSelectedOptions } from '@/utils/helpers';
import Link from 'next/link';

const CartProducts: React.FC = () => {
  const { cart, changeQuantity, removeProduct } = useCart();
  console.log({ cart });
  return (
    cart && (
      <>
        <Grid container spacing={3}>
          {cart.lineItems.length === 0 ? (
            <div>カートが空です</div>
          ) : (
            <>
              <Grid item xs={12} lg={8}>
                {cart.lineItems.map((product) => (
                  <Grid container spacing={3} key={product.id}>
                    <Grid item xs={3}>
                      <Image
                        src={product.variant.image.src}
                        alt={product.variant.image.altText ?? ''}
                        width={300}
                        height={300}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Link href={`items/${product.variant.product.id}`}>
                        <MuiLink color="inherit">
                          <div>商品名: {product.title}</div>
                          <div>
                            カラー:{' '}
                            {getValueByMatchedNameSelectedOptions(
                              product.variant.selectedOptions,
                              'Color'
                            )}
                          </div>
                          <div>
                            サイズ:{' '}
                            {getValueByMatchedNameSelectedOptions(
                              product.variant.selectedOptions,
                              'Size'
                            )}
                          </div>
                        </MuiLink>
                      </Link>
                    </Grid>
                    <Grid item xs={3}>
                      <span>
                        ${parseInt(product.variant.price) * product.quantity}
                      </span>
                      <select
                        defaultValue={product.quantity}
                        onChange={(e) =>
                          changeQuantity(product.id, e.target.value)
                        }
                      >
                        {[...Array(5).keys()].map((number) => {
                          const value = number + 1;
                          return (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          );
                        })}
                      </select>
                    </Grid>
                    <Grid item xs={2}>
                      <MuiLink
                        component="button"
                        variant="body2"
                        onClick={() => removeProduct(product.id)}
                      >
                        削除
                      </MuiLink>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} lg={4}>
                <div>合計: ${cart.subtotalPrice}(税抜)</div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => window.open(cart.webUrl)}
                >
                  購入する
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </>
    )
  );
};

export default CartProducts;
