import { Stack, Pagination, Center } from '@collinsonx/design-system/core';
import Title from '@collinsonx/design-system/components/title';
import LayoutCatalogue from '@components/LayoutCatalogue';
import { Outlet, PartnerBrand, PaginatedOutlets } from '@collinsonx/utils';
import getOutlets from '@collinsonx/utils/queries/getOutlets';
import getPartnerBrandByID from '@collinsonx/utils/queries/getPartnerBrandByID';
import { useLazyQuery } from '@collinsonx/utils/apollo';
import Error from '@components/Error';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import OutletGrid from '@components/OutletGrid';
import { useSearchParams } from 'next/navigation';
import { CARDS_LIMIT } from 'config';
import { useState } from 'react';
import Spinner from '@components/Spinner';

export default function Outlets() {
  const router = useRouter();
  const { isReady } = router;
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

  const [
    fetchOutlets,
    { loading: loadingOutlets, error: errorOutlets, data: dataOutlets },
  ] = useLazyQuery<{ getOutlets: PaginatedOutlets }>(getOutlets);

  const [
    fetchPartnerBrands,
    {
      loading: loadingPartnerBrand,
      error: errorPartnerBrand,
      data: dataPartnerBrand,
    },
  ] = useLazyQuery<{ getPartnerBrandByID: PartnerBrand }>(getPartnerBrandByID);

  useEffect(() => {
    if (isReady && window) {
      window.scrollTo(0, 0);
      if (partnerId) {
        fetchPartnerBrands({
          variables: { limit: CARDS_LIMIT, id: partnerId },
        });
      } else {
        fetchOutlets({
          variables: { page: activePage, pageSize: CARDS_LIMIT },
        });
      }
    }
  }, [isReady, activePage, partnerId]);

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
    <Stack gap={24} px={24} pt={32} data-testid="outlet-listing-container">
      <Title>Outlets</Title>
      <Error error={errorOutlets} />
      <Error error={errorPartnerBrand} />
      {(loadingOutlets || loadingPartnerBrand || !router.isReady) && (
        <Spinner />
      )}
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
            data-testid="outlets-pagination"
          />
        </Center>
      )}
    </Stack>
  );
}

Outlets.getLayout = (page: JSX.Element) => (
  <LayoutCatalogue headerNavProps={{ section: 'catalogue' }}>
    {page}
  </LayoutCatalogue>
);
