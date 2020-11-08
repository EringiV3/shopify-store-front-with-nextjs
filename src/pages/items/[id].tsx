import { GetStaticProps, GetStaticPaths } from 'next';
import { client } from '@/shopify/client';
import Grid from '@material-ui/core/Grid';
import Layout from '@/components/Layout';
import { Product } from 'shopify-buy';
import Image from 'next/image';
import { SkuList } from '@/components/product';

type Props = {
  product: Product;
  errors?: any;
};

const ProductDetailPage: React.FC<Props> = ({ product, errors }) => {
  console.log({ product });
  if (!product) return <div>loading...</div>;
  if (errors) return <div>error</div>;
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
            {colors && <SkuList colors={colors} skuList={product.variants} />}
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

export default ProductDetailPage;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    if (!id) throw new Error('idが取得できません');
    const product = await client.product.fetch(id as string);
    console.log({ product });
    return {
      props: { product: JSON.parse(JSON.stringify(product)) },
      revalidate: 1,
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
