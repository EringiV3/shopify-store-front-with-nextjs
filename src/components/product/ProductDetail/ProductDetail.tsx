import Grid from '@material-ui/core/Grid';
import { Product, Sku } from '@/types';
import { SkuList, ProductImages } from '@/components/product';
import styles from './ProductDetail.module.css';

type Props = {
  product: Product;
};

const ProductDetail: React.FC<Props> = ({ product }) => {
  const colors = product.options.find((option) => option.name === 'Color');
  return (
    <>
      <h1>商品詳細</h1>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={6}>
          <ProductImages product={product} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <div>
            <div>Brand: {product.vendor}</div>
            <div>{product.title}</div>
            <div>Price: ${product.variants[0].price}</div>
          </div>
          <div className={styles.skuList}>
            {colors && (
              <SkuList colors={colors} skuList={product.variants as Sku[]} />
            )}
          </div>
          <div>
            商品情報
            <br />
            {product.description}
          </div>
        </Grid>
      </Grid>
      <div>product page</div>
    </>
  );
};

export default ProductDetail;
