import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import { Product } from 'shopify-buy';
import { ProductCard } from '@/components/product';
import { useProducts } from '@/hooks/products/use-products';
import Grid from '@material-ui/core/Grid';

type Props = {
  products: Product[];
};

const ProductListPage: React.FC<Props> = ({ products }) => {
  // console.log({ products });
  return (
    <>
      <Layout title="商品一覧">
        <h1>商品一覧</h1>
        <Grid container spacing={1}>
          {products.map((product) => (
            <Grid item xs={6} lg={3}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          ))}
        </Grid>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products: Product[] = await useProducts();
  return {
    props: {
      // SerializableErrorの回避のため
      // @see https://github.com/vercel/next.js/issues/11993
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};

export default ProductListPage;
