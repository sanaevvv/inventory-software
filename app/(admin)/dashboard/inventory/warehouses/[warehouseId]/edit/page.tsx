import { FormWrapper } from '../../../_components/FormWrapper';
import { getWarehouseById } from '../../../_actions/get.adjustment';
import { WarehouseForm } from '@/components/dashboard/WarehouseForm';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

export const WarehouseEditPage = async ({
  params: { warehouseId },
}: {
  params: { warehouseId: string };
}) => {
  const warehouse = await getWarehouseById(warehouseId);

  if (!warehouse) {
    return (
      <FormWrapper>
        <p>登録がありません。</p>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      <Suspense fallback={<Loading />}>
        <WarehouseForm editValue={warehouse} />
      </Suspense>
    </FormWrapper>
  );
};

export default WarehouseEditPage;
