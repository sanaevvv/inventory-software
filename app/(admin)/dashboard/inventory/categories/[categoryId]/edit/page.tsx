import { BrandForm } from '@/components/dashboard/BrandForm';
import { FormWrapper } from '../../../_components/FormWrapper';
import { getCategoryById } from '../../../_actions/get.adjustment';
import { CategoryForm } from '@/components/dashboard/CategoryForm';

const CategoryEditPage = async ({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) => {
  const category = await getCategoryById(categoryId);

  if (!category) {
    return (
      <FormWrapper>
        <p>登録がありません。</p>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      <CategoryForm editValue={category} />
    </FormWrapper>
  );
};

export default CategoryEditPage;
