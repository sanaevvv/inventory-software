import { TableWrapper } from '@/components/dashboard/TableWrapper';
import { getItems } from '../_actions/get.adjustment';
import { FormWrapper } from '../_components/FormWrapper';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Suspense } from 'react';
import Loading from '@/components/Loading';


export default async function ItemsPage() {
  const itemData = await getItems();

  if (!itemData) {
    <FormWrapper>
      登録がありません。
    </FormWrapper>
  }

  return (
    <>
      <TableWrapper>
        <Suspense fallback={<Loading />}>
          <DataTable columns={columns} data={itemData} />
        </Suspense>
      </TableWrapper>
    </>
  );
}
