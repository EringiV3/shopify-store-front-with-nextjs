import { Layout } from '@/components/layout';
import { Product } from '@/types';
import { ProductCard } from '@/components/product';
import Grid from '@material-ui/core/Grid';

type Props = {
  products: Product[];
};

const SearchResult: React.FC<Props> = ({ products }) => {
  return (
    <>
      <Layout title="商品一覧">
        <h1>商品一覧</h1>
        <Grid container spacing={1}>
          {products.map((product) => (
            <Grid item xs={6} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Layout>
    </>
  );
};

export default SearchResult;
