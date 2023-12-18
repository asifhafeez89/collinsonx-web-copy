import { Flex, Stack } from '@collinsonx/design-system/core';
import { useQuery } from '@collinsonx/utils/apollo';
import getOutletByID from '@collinsonx/utils/queries/getOutletByID';
import { Outlet } from '@collinsonx/utils';
import Error from '@components/Error';
import LayoutCatalogue from '@components/LayoutCatalogue';
import { useRouter } from 'next/router';
import OutletHeading from '@components/OutletHeading';
import ContentWrapper from '@components/ContentWrapper';
import colors from '@collinsonx/design-system/colour-constants-partner';

export default function OutletDetail() {
  const router = useRouter();
  const { id } = router.query;
  const {
    loading: loadingOutlet,
    error: errorOutlet,
    data: dataOutlet,
  } = useQuery<{ getOutletByID: Outlet }>(getOutletByID, {
    variables: { id },
  });

  if (loadingOutlet) {
    return <div>Loading...</div>;
  }
  if (!dataOutlet?.getOutletByID) {
    return <div>Outlet not found</div>;
  }

  const { name, location } = dataOutlet.getOutletByID;

  return (
    <Stack spacing={12} sx={{ backgroundColor: colors['bg-surface'] }}>
      <OutletHeading
        name={name}
        locationName={location.name}
        terminal={location.terminal}
      />
      <Error error={errorOutlet} />
      <ContentWrapper>
        <Flex gap={10} mb={4000}></Flex>
      </ContentWrapper>
    </Stack>
  );
}

OutletDetail.getLayout = (page: JSX.Element) => (
  <LayoutCatalogue disableWrapper>{page}</LayoutCatalogue>
);
