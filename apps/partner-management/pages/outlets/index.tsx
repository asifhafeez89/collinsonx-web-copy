import { Stack, Pagination, Center } from '@collinsonx/design-system/core';
import Title from '@collinsonx/design-system/components/title';
import LayoutCatalogue from '@components/LayoutCatalogue';
import { Outlet, PartnerBrand, PaginatedOutlets } from '@collinsonx/utils';
import getOutlets from '@collinsonx/utils/queries/getOutlets';
import getPartnerBrandByID from '@collinsonx/utils/queries/getPartnerBrandByID';
import { useQuery } from '@collinsonx/utils/apollo';
import Error from '@components/Error';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import OutletGrid from '@components/OutletGrid';
import { useSearchParams } from 'next/navigation';
import { CARDS_LIMIT } from 'config';
import { useState } from 'react';

export default function Outlets() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const partnerId = searchParams.get('partner');
  const [activePage, setPage] = useState(
    parseInt(searchParams.get('page') || '1')
  );

  const handlePaginationClick = (page: number) => {
    setPage(page);
    router.push({ query: { ...router.query, page: page } }, undefined, {
      shallow: true,
    });
  };

  const {
    loading: loadingOutlets,
    error: errorOutlets,
    data: dataOutlets,
  } = useQuery<{ getOutlets: PaginatedOutlets }>(getOutlets, {
    variables: { page: activePage, pageSize: CARDS_LIMIT },
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

  const totalPages = useMemo(() => {
    return partnerId ? 1 : dataOutlets?.getOutlets?.pageInfo?.totalPages;
  }, [partnerId, dataOutlets]);

  const data = useMemo(() => {
    return partnerId
      ? (dataPartnerBrand?.getPartnerBrandByID.outlets as Outlet[])
      : dataOutlets?.getOutlets.items;
  }, [partnerId, dataOutlets, dataPartnerBrand]);

  const handleClickOutlet = (id: string) => {
    router.push(`/outlets/${id}`);
  };

  return (
    <Stack gap={32}>
      <Title>Outlets</Title>
      <Error error={errorOutlets} />
      <Error error={errorPartnerBrand} />
      {data && data.length ? (
        <OutletGrid outlets={data} onClickOutlet={handleClickOutlet} />
      ) : null}
      {!partnerId && !loadingOutlets && !loadingPartnerBrand && (
        <Center>
          <Pagination
            total={totalPages || 1}
            value={activePage}
            onChange={handlePaginationClick}
            mb="sm"
            mt="sm"
          />
        </Center>
      )}
    </Stack>
  );
}

Outlets.getLayout = (page: JSX.Element) => (
  <LayoutCatalogue>{page}</LayoutCatalogue>
);
