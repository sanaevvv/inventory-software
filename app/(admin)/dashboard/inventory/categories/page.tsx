import { TableWrapper } from '@/components/dashboard/TableWrapper';
import { getCategories } from '../_actions/get.adjustment';
import { FormWrapper } from '../_components/FormWrapper';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function CategoriesPage() {
  const categoryData = await getCategories();

  if (!categoryData) {
    <FormWrapper>
      登録がありません。
    </FormWrapper>
  }

  return (
    <TableWrapper>
      <DataTable columns={columns} data={categoryData} />
    </TableWrapper>
  );
}
