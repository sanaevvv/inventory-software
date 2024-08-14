import { getBrand } from '../../../_actions/get.adjustment';
import { BrandForm } from '@/components/dashboard/BrandForm';
import { FormWrapper } from '../../../_components/FormWrapper';

export const runtime = 'edge';

const BrandEditPage = async ({
  params: { brandId },
}: {
  params: { brandId: string };
}) => {
  const brand = await getBrand(brandId);

  if (!brand) {
    return (
      <FormWrapper>
        <p>登録がありません。</p>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      <BrandForm editValue={brand} />
    </FormWrapper>
  );
};

export default BrandEditPage;
