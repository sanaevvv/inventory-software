import { ItemForm } from '@/components/dashboard/ItemForm';
import { FormWrapper } from '../../_components/FormWrapper';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import {
  getFormattedBrands,
  getFormattedCategories,
  getFormattedSuppliers,
  getFormattedUnits,
  getFormattedWarehouses,
} from '../../_actions/get.adjustment';

export const runtime = 'edge';

const NewItemPage = async () => {
  const [warehouses, categories, brands, units, suppliers] = await Promise.all([
    getFormattedWarehouses(),
    getFormattedCategories(),
    getFormattedBrands(),
    getFormattedUnits(),
    getFormattedSuppliers(),
  ]);

  if (
    !warehouses.length ||
    !categories.length ||
    !brands.length ||
    !units.length ||
    !suppliers.length
  ) {
    return (
      <div>
        必要なデータが不足しています。ウェアハウス、カテゴリー、ブランド、単位、サプライヤー全てが登録されていることを確認してください。
      </div>
    );
  }

  return (
    <FormWrapper>
      <Suspense fallback={<Loading />}>
        <ItemForm
          warehouses={warehouses}
          categories={categories}
          brands={brands}
          units={units}
          suppliers={suppliers}
        />
      </Suspense>
    </FormWrapper>
  );
};
export default NewItemPage;
