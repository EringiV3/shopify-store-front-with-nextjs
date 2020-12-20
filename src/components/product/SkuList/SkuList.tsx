import Image from 'next/image';
import { Sku, Option } from '@/types';
import styles from './SkuList.module.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useCart } from '@/hooks/cart/useCart';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';

type Props = {
  colors: Option;
  skuList: Sku[];
};

const SkuList: React.FC<Props> = ({ colors, skuList }) => {
  type ToastState = {
    open: boolean;
  } & SnackbarOrigin;
  const [toastState, setToastState] = useState<ToastState>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = toastState;
  const handleClose = () => {
    setToastState({ ...toastState, open: false });
  };

  const { addToCart } = useCart();
  const showToastAfterAddToCart = async (skuId: string | number) => {
    await addToCart(skuId);
    setToastState({ ...toastState, open: true });
  };
  return (
    <>
      {colors.values.map((color) => {
        const skuListGroupedByColor = skuList.filter((sku) => {
          const colorOption = sku.selectedOptions.find(
            (option) => option.name === 'Color'
          );
          return color.value === colorOption?.value;
        });
        return (
          <div key={color.value} className={styles.color}>
            <div>{color.value}</div>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Image
                  src={skuListGroupedByColor[0].image.src}
                  alt={skuListGroupedByColor[0].image.altText ?? ''}
                  width={100}
                  height={100}
                />
              </Grid>
              <Grid item xs={9}>
                {skuListGroupedByColor.map((sku) => (
                  <div className={styles.buttonWrapper} key={sku.id}>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={6}>
                        <span>{sku.title}</span>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => showToastAfterAddToCart(sku.id)}
                        >
                          <span data-test-id="add-to-cart">カートに入れる</span>
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </Grid>
            </Grid>
          </div>
        );
      })}
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <MuiAlert elevation={6} variant="filled" severity="success">
          カートに商品が追加されました
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default SkuList;
