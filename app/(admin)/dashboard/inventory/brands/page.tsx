import { TableWrapper } from '@/components/dashboard/TableWrapper';
import { getBrands } from '../_actions/get.adjustment';
import { FormWrapper } from '../_components/FormWrapper';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

export default async function BrandsPage() {
  const brandsData = await getBrands();

  if (!brandsData) {
    <FormWrapper>
      登録がありません。
    </FormWrapper>
  }

  return (
    <TableWrapper>
      <Suspense fallback={<Loading />}>
        <DataTable columns={columns} data={brandsData} />
      </Suspense>
    </TableWrapper>
  );
}
