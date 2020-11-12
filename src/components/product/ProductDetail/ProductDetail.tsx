import Grid from '@material-ui/core/Grid';
import { Layout } from '@/components/layout';
import { Product, Sku } from '@/types';
import Image from 'next/image';
import { SkuList } from '@/components/product';

type Props = {
  product: Product;
};

const ProductDetail: React.FC<Props> = ({ product }) => {
  const colors = product.options.find((option) => option.name === 'Color');
  return (
    <>
      <Layout title={product.title}>
        <h1>商品詳細</h1>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={6}>
            left aria
            <Image
              src={product.images[0].src}
              alt={product.title}
              width={500}
              height={500}
            />
            {product.images.map((image) => {
              return (
                <div key={image.id}>
                  <Image
                    src={image.src}
                    alt={product.title}
                    width={500}
                    height={500}
                  />
                </div>
              );
            })}
          </Grid>
          <Grid item xs={12} lg={6}>
            right aria
            <div>
              <div>{product.vendor}</div>
              <div>{product.title}</div>
              <div>{product.variants[0].price}</div>
            </div>
            {colors && (
              <SkuList colors={colors} skuList={product.variants as Sku[]} />
            )}
            <div>
              商品情報
              <br />
              {product.description}
            </div>
          </Grid>
        </Grid>
      </Layout>
      <div>product page</div>
    </>
  );
};

export default ProductDetail;
