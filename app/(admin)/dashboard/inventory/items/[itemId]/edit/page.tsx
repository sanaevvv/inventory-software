import { FormWrapper } from '../../../_components/FormWrapper';
import {
  getFormattedBrands,
  getFormattedCategories,
  getFormattedSuppliers,
  getFormattedUnits,
  getItemById,
  getFormattedWarehouses,
} from '../../../_actions/get.adjustment';
import { ItemForm } from '@/components/dashboard/ItemForm';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

export const runtime = 'edge';

const ItemEditPage = async ({
  params: { itemId },
}: {
  params: { itemId: string };
}) => {

  try {
    const [item, warehouses, categories, brands, units, suppliers] =
      await Promise.all([
        getItemById(itemId),
        getFormattedWarehouses(),
        getFormattedCategories(),
        getFormattedBrands(),
        getFormattedUnits(),
        getFormattedSuppliers(),
      ]);

    if (
      !item ||
      !warehouses.length ||
      !categories.length ||
      !brands.length ||
      !units.length ||
      !suppliers.length
    ) {
      return (
        <FormWrapper>
          必要なデータが不足しています。各項目が登録されていることを確認してください。
        </FormWrapper>
      );
    }

    return (
      <FormWrapper>
        <Suspense fallback={<Loading />}>
          <ItemForm
            editValue={item}
            warehouses={warehouses}
            categories={categories}
            brands={brands}
            units={units}
            suppliers={suppliers}
          />
        </Suspense>
      </FormWrapper>
    );

  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <FormWrapper>
        データの取得中にエラーが発生しました。しばらくしてから再試行してください。
      </FormWrapper>
    );
  }
};

export default ItemEditPage;
