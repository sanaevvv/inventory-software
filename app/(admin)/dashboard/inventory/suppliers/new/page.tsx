import { FormWrapper } from "../../_components/FormWrapper";
import { SupplierForm } from '@/components/dashboard/SupplierForm';

export const runtime = 'edge';

const SupplierNewPage = async () => {

  return (
    <FormWrapper>
     <SupplierForm />
    </FormWrapper>
  );
}

export default SupplierNewPage;
