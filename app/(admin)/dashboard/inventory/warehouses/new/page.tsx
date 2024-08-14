import { WarehouseForm } from '@/components/dashboard/WarehouseForm';
import { FormWrapper } from '../../_components/FormWrapper';

export const runtime = 'edge';

const WarehouseNewPage = async () => {

  return (
    <FormWrapper>
      <WarehouseForm />
    </FormWrapper>
  );
};

export default WarehouseNewPage;
