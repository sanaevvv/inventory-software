import { Suspense } from 'react';
import { getAdjustmentAdd,getTransfer } from '../_actions/get.adjustment';
import { addAdjustmentColumns } from './addAdjustmentColumns';
import { DataTable } from './data-table';
import { transferColumns } from './transferColumns';
import { TableWrapper } from '@/components/dashboard/TableWrapper';
import { FormWrapper } from '../_components/FormWrapper';
import Loading from '@/components/Loading';

export const runtime = 'edge';

export default async function AdjustmentsPage() {
  const transferData = await getTransfer();
  const addAdjustmentData = await getAdjustmentAdd();

  if (!transferData || !addAdjustmentData) {
    <FormWrapper>
      在庫調整のデータがありません。
    </FormWrapper>
  }

  return (
    <section className="space-y-8 mt-6">
      <TableWrapper>
        <h2 className="text-xl font-bold mb-4">Stock Increment Adjustments</h2>
        <Suspense fallback={<Loading />}>
          <DataTable columns={addAdjustmentColumns} data={addAdjustmentData} />
        </Suspense>
      </TableWrapper>
      <TableWrapper>
        <h2 className="text-xl font-bold mb-4">Stock Transfer Adjustment</h2>
        <Suspense fallback={<Loading />}>
          <DataTable columns={transferColumns} data={transferData} />
        </Suspense>
      </TableWrapper>
    </section>
  );
}
