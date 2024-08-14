import { UnitForm } from '@/components/dashboard/UnitForm';
import { getUnit } from '../../../_actions/get.adjustment';
import { FormWrapper } from '../../../_components/FormWrapper';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

const UnitEditPage = async ({
  params: { unitId },
}: {
  params: { unitId: string };
}) => {
  const unit = await getUnit(unitId);

  if (!unit) {
    return (
      <FormWrapper>
        <p>登録がありません。</p>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      <Suspense fallback={<Loading />}>
        <UnitForm editValue={unit} />
      </Suspense>
    </FormWrapper>
  );
};

export default UnitEditPage;
