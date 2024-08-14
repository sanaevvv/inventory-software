import { FormWrapper } from '../../../_components/FormWrapper';
import { getSupplierById } from '../../../_actions/get.adjustment';
import { SupplierForm } from '@/components/dashboard/SupplierForm';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

const SupplierEditPage = async ({
  params: { supplierId },
}: {
  params: { supplierId: string };
}) => {
  const supplier = await getSupplierById(supplierId);

  if (!supplier) {
    return (
      <FormWrapper>
        <p>登録がありません。</p>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      <Suspense fallback={<Loading />}>
        <SupplierForm editValue={supplier} />
      </Suspense>
    </FormWrapper>
  );
};

export default SupplierEditPage;
