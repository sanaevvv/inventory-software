import { FormWrapper } from '../../_components/FormWrapper';
import { BrandForm } from '@/components/dashboard/BrandForm';

export const runtime = 'edge';

const BrandNewPage = () => {
  return (
    <FormWrapper>
      <BrandForm />
    </FormWrapper>
  );
};

export default BrandNewPage;
