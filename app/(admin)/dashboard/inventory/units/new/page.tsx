import { FormWrapper } from '../../_components/FormWrapper';
import UnitForm from '@/components/dashboard/UnitForm';

export const runtime = 'edge';

const UnitNewPage = () => {

  return (
    <FormWrapper>
      <UnitForm />
    </FormWrapper>
  );
};

export default UnitNewPage;
