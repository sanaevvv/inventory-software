import { Suspense } from 'react';
import { getFormattedItems, getFormattedWarehouses, getTransferById} from '../../../../_actions/get.adjustment';
import { FormWrapper } from '../../../../_components/FormWrapper';
import { FormTransferInventory } from '@/components/dashboard/FormTransferInventory';
import Loading from '@/components/Loading';

export const runtime = 'edge';

const TransferEditPage = async ({
  params: { transferId },
}: {
  params: { transferId: string };
  }) => {

  const [transfer, warehouses, items] = await Promise.all([
    getTransferById(transferId),
    getFormattedWarehouses(),
    getFormattedItems()
  ]);

  if (!transfer) {
    return (
      <FormWrapper>
        <p>登録がありません。</p>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      <Suspense fallback={<Loading />}>
        <FormTransferInventory
          warehouses={warehouses}
          items={items}
          editValue={transfer}
        />
      </Suspense>
    </FormWrapper>
  );
};

export default TransferEditPage;
