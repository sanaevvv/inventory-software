import {
  getAddById,
  getFormattedItems,
  getFormattedSuppliers,
  getFormattedWarehouses,
} from '../../../../_actions/get.adjustment';
import { FormWrapper } from '../../../../_components/FormWrapper';
import { FormAddInventory } from '@/components/dashboard/FormAddInventory';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

const AddEditPage = async ({
  params: { addId },
}: {
  params: { addId: string };
}) => {
  const [addInventory, warehouses, items, suppliers] = await Promise.all([
    getAddById(addId),
    getFormattedWarehouses(),
    getFormattedItems(),
    getFormattedSuppliers(),
  ]);

  if (
    !addInventory ||
    !warehouses.length ||
    !items.length ||
    !suppliers.length
  ) {
    return (
      <FormWrapper>
        <p>登録がありません。</p>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      <Suspense fallback={<Loading />}>
        <FormAddInventory
          editValue={addInventory}
          warehouses={warehouses}
          items={items}
          suppliers={suppliers}
        />
      </Suspense>
    </FormWrapper>
  );
};

export default AddEditPage;
