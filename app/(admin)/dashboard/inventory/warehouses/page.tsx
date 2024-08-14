import { Suspense } from 'react';
import { getWarehouses } from '../_actions/get.adjustment';
import { columns } from './columns';
import { DataTable } from './data-table';
import Loading from '@/components/Loading';
import { FormWrapper } from '../_components/FormWrapper';
import { TableWrapper } from '@/components/dashboard/TableWrapper';

export const runtime = 'edge';

export default async function WarehousePage() {
  const warehouseData = await getWarehouses();

  if (!warehouseData) {
    return (
      <FormWrapper>
        <p>登録がありません。</p>
      </FormWrapper>
    );
  }
  return (
    <TableWrapper>
      <Suspense fallback={<Loading />}>
        <DataTable columns={columns} data={warehouseData} />
      </Suspense>
    </TableWrapper>
  );
}
