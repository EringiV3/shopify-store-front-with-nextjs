import Image from 'next/image';
import { Sku, Option } from '@/types';
import { client } from '@/shopify/client';
import { getCheckoutId } from '@/utils/helpers';

type Props = {
  colors: Option;
  skuList: Sku[];
};

const SkuList: React.FC<Props> = ({ colors, skuList }) => {
  const onClick = (skuId: string | number) => {
    client.checkout.addLineItems(getCheckoutId(), [
      {
        variantId: skuId,
        quantity: 1,
      },
    ]);
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
          <div key={color.value}>
            <div>{color.value}</div>
            <Image
              src={skuListGroupedByColor[0].image.src}
              alt={skuListGroupedByColor[0].image.altText ?? ''}
              width={100}
              height={100}
            />
            {skuListGroupedByColor.map((sku) => (
              <div key={sku.id}>
                <span>{sku.title}</span>
                <button onClick={() => onClick(sku.id)}>カートに入れる</button>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default SkuList;
