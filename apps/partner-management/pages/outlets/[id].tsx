import {
  Box,
  Divider,
  Flex,
  SimpleGrid,
  Stack,
} from '@collinsonx/design-system/core';
import { useQuery } from '@collinsonx/utils/apollo';
import getOutletByID from '@collinsonx/utils/queries/getOutletByID';
import { Outlet, OutletStatus, ProductCategory } from '@collinsonx/utils';
import Error from '@components/Error';
import LayoutCatalogue from '@components/LayoutCatalogue';
import { useRouter } from 'next/router';
import OutletHeading from '@components/OutletHeading';
import OutletDetailsSummary from '@components/OutletDetailsSummary';
import OutletImages from '@components/OutletImages';
import Spinner from '@components/Spinner';
import { ValidProductCategory } from 'config/outletIcons';
import Section from '@components/Section';
import OpeningTimes from '@components/OpeningTimes';

const capitalizedCategoryMap: { [key in ProductCategory]: string } = {
  [ProductCategory.Eat]: 'Eat',
  [ProductCategory.Lounge]: 'Lounge',
  [ProductCategory.Refresh]: 'Refresh',
  [ProductCategory.Rest]: 'Rest',
  [ProductCategory.Unwind]: 'Unwind',
};

function isValidProductCategory(
  productCategory: string | null
): productCategory is ValidProductCategory {
  const validProductCategories: ValidProductCategory[] = [
    'EAT',
    'LOUNGE',
    'REST',
    'SERVICES',
    'UNWIND',
    'REFRESH',
  ];
  return validProductCategories.includes(
    productCategory as ValidProductCategory
  );
}

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
    return <Spinner />;
  }
  if (!dataOutlet?.getOutletByID) {
    return <div>Outlet not found</div>;
  }

  const {
    name,
    location,
    category,
    status,
    legacyCode,
    code,
    products,
    productCategories,
    hasDisabledAccess,
    openingTimes,
    reservationEmail,
    meta,
    content,
  } = dataOutlet.getOutletByID;

  const primaryProducts = products.map((product) => {
    return product
      ? `${capitalizedCategoryMap[product.category]} / ${product.name}`
      : '';
  });

  const filteredProductCategories = productCategories.filter(
    isValidProductCategory
  );

  return (
    <Box id="outlet-container">
      <OutletHeading
        name={name}
        locationName={location.name}
        terminal={location.terminal}
      />
      <Error error={errorOutlet} />
      <Section>
        <Stack gap={32}>
          <SimpleGrid verticalSpacing="lg" cols={{ xs: 1, md: 2 }}>
            <Box maw={500}>
              <OutletDetailsSummary
                locationType={category}
                legacyCode={legacyCode}
                code={code}
                status={status === OutletStatus.Live ? 'ACTIVE' : 'INACTIVE'}
                productCategories={filteredProductCategories}
                primaryProducts={primaryProducts}
                disabledAccess={hasDisabledAccess}
                email={reservationEmail}
                lastEditedDate={meta?.lastEdited}
                editor={meta?.editor}
              />
            </Box>
            <OutletImages
              mediaCollection={content?.media?.mediaCollection?.items}
            />
          </SimpleGrid>
          <Divider />
          {openingTimes && <OpeningTimes openingTimes={openingTimes} />}
        </Stack>
      </Section>
    </Box>
  );
}

OutletDetail.getLayout = (page: JSX.Element) => (
  <LayoutCatalogue headerNavProps={{ section: 'catalogue' }}>
    {page}
  </LayoutCatalogue>
);
