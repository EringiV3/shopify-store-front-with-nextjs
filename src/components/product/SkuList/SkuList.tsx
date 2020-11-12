import Image from 'next/image';
import { Sku, Option } from '@/types';

type Props = {
  colors: Option;
  skuList: Sku[];
};

const SkuList: React.FC<Props> = ({ colors, skuList }) => {
  console.log({ colors, skuList });
  return (
    <>
      {colors.values.map((color) => {
        const skuListGroupedByColor = skuList.filter((sku) => {
          const colorOption = sku.selectedOptions.find(
            (option) => option.name === 'Color'
          );
          return color.value === colorOption?.value;
        });
        console.log({ skuListGroupedByColor });
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
                <button>カートに入れる</button>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default SkuList;
