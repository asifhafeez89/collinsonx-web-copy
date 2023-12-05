import { Stack, Title } from '@collinsonx/design-system/core';
import Layout from '@components/Layout';
import { Outlet, PartnerBrand } from '@collinsonx/utils';
import getOutlets from '@collinsonx/utils/queries/getOutlets';
import getPartnerBrandByID from '@collinsonx/utils/queries/getPartnerBrandByID';
import { useQuery } from '@collinsonx/utils/apollo';
import Error from '@components/Error';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import OutletGrid from '@components/OutletGrid';
import { useSearchParams } from 'next/navigation';
import { CARDS_LIMIT } from 'config';

export default function Outlets() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const partnerId = searchParams.get('partner');

  const {
    loading: loadingOutlets,
    error: errorOutlets,
    data: dataOutlets,
  } = useQuery<{ getOutlets: Outlet[] }>(getOutlets, {
    variables: { limit: CARDS_LIMIT },
    skip: !!partnerId,
  });

  const {
    loading: loadingPartnerBrand,
    error: errorPartnerBrand,
    data: dataPartnerBrand,
  } = useQuery<{ getPartnerBrandByID: PartnerBrand }>(getPartnerBrandByID, {
    variables: { limit: CARDS_LIMIT, id: partnerId },
    skip: !partnerId,
  });

  const data = useMemo(() => {
    return partnerId
      ? (dataPartnerBrand?.getPartnerBrandByID.outlets as Outlet[])
      : dataOutlets?.getOutlets;
  }, [partnerId, dataOutlets, dataPartnerBrand]);

  const handleClickOutlet = (id: string) => {
    router.push(`/outlets/${id}`);
  };

  return (
    <Stack spacing={32}>
      <Title>Outlets</Title>
      <Error error={errorOutlets} />
      <Error error={errorPartnerBrand} />
      {data && data.length ? (
        <OutletGrid outlets={data} onClickOutlet={handleClickOutlet} />
      ) : null}
    </Stack>
  );
}

Outlets.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
