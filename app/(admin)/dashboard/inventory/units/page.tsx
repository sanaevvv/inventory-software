import { TableWrapper } from '@/components/dashboard/TableWrapper';
import { getUnits } from '../_actions/get.adjustment';
import { FormWrapper } from '../_components/FormWrapper';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

export const runtime = 'edge';

export default async function UnisPage() {
  const unitsData = await getUnits();

  if (!unitsData) {
    <FormWrapper>登録がありません。</FormWrapper>;
  }

  return (
    <TableWrapper>
      <Suspense fallback={<Loading />} >
        <DataTable columns={columns} data={unitsData} />
      </Suspense>
    </TableWrapper>
  );
}
