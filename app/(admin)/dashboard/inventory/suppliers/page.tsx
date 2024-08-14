import { TableWrapper } from '@/components/dashboard/TableWrapper';
import { getSuppliers } from '../_actions/get.adjustment';
import { FormWrapper } from '../_components/FormWrapper';
import { columns } from './columns';
import { DataTable } from './data-table';
import Loading from '@/components/Loading';
import { Suspense } from 'react';

export default async function SuppliersPage() {
  const supplierData = await getSuppliers();

  if (!supplierData) {
    <FormWrapper>登録がありません。</FormWrapper>;
  }

  return (
    <TableWrapper>
      <Suspense fallback={<Loading />}>
        <DataTable columns={columns} data={supplierData} />
      </Suspense>
    </TableWrapper>
  );
}
