import { FormWrapper } from '../../_components/FormWrapper';
import { CategoryForm } from '@/components/dashboard/CategoryForm';

export const runtime = 'edge';

const CategoryNewPage = () => {
  return (
    <FormWrapper>
      <CategoryForm />
    </FormWrapper>
  );
};

export default CategoryNewPage;
