import {
  Box,
  Divider,
  SimpleGrid,
  Stack,
} from '@collinsonx/design-system/core';
import { useQuery } from '@collinsonx/utils/apollo';
import getOutletByID from '@collinsonx/utils/queries/getOutletByID';
import { Outlet, ProductCategory } from '@collinsonx/utils';
import Error from '@components/Error';
import LayoutCatalogue from '@components/LayoutCatalogue';
import { useRouter } from 'next/router';
import OutletHeading from '@components/OutletHeading';
import OutletDetailsSummary from '@components/OutletDetailsSummary';
import OutletProducts from '@components/OutletProducts';
import OutletImages from '@components/OutletImages';
import Spinner from '@components/Spinner';
import { ValidProductCategory } from 'config/outletIcons';
import Section from '@components/Section';
import OpeningTimes from '@components/OpeningTimes';
import PageTitle from '@components/PageTitle';
import getOutletPageTitle from 'lib/getOutletPageTitle';
import { useMemo } from 'react';
import Conditions from '@components/Conditions';
import { attemptRefreshingSession } from 'supertokens-auth-react/recipe/session';

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
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      attemptRefreshingSession().then((success: any) => {});
    },
  });

  const fallbackTitle = useMemo(() => <PageTitle title="Outlet" />, []);

  if (loadingOutlet) {
    return (
      <Box id="outlet-container">
        {fallbackTitle}
        <Spinner />
      </Box>
    );
  }
  if (!dataOutlet?.getOutletByID) {
    return (
      <Box id="outlet-container">
        <Box>Outlet not found</Box>
      </Box>
    );
  }

  const {
    name,
    location,
    category,
    status,
    legacyCode,
    code,
    products,
    ancillaryProducts,
    productCategories,
    hasDisabledAccess,
    openingTimes,
    reservationEmail,
    meta,
    content,
  } = dataOutlet.getOutletByID;

  const primaryProductNames = products.map((product) => {
    return product
      ? `${capitalizedCategoryMap[product.category]} / ${product.name}`
      : '';
  });

  const filteredProductCategories = productCategories.filter(
    isValidProductCategory
  );

  const ancillaryProductNames = ancillaryProducts.map((product) =>
    product ? product.name : ''
  );

  const hasProducts =
    products && (products.length > 0 || ancillaryProducts.length > 0);

  const hasOpeningTimes =
    openingTimes && (openingTimes.schedules || openingTimes.exceptions);

  const hasConditions = content?.conditions;

  return (
    <Box id="outlet-container">
      {name ? (
        <PageTitle
          customFormat
          title={getOutletPageTitle({
            name,
            mode: 'view',
            location: location.name ?? undefined,
            terminal: location.terminal ?? undefined,
            status,
          })}
        />
      ) : (
        <>{fallbackTitle}</>
      )}
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
                legacyCode={legacyCode ?? undefined}
                code={code ?? undefined}
                status={status}
                productCategories={filteredProductCategories}
                primaryProductNames={primaryProductNames}
                ancillaryProductNames={ancillaryProductNames}
                disabledAccess={hasDisabledAccess}
                email={reservationEmail ?? undefined}
                lastEditedDate={meta?.lastEdited}
                editor={meta?.editor ?? undefined}
              />
            </Box>
            <OutletImages
              mediaCollection={content?.media?.mediaCollection?.items}
            />
          </SimpleGrid>
          <Divider />
          {hasProducts && (
            <>
              <OutletProducts
                ancillaryProducts={ancillaryProducts}
                products={products}
              />
              <Divider />
            </>
          )}
          {hasOpeningTimes && (
            <>
              <OpeningTimes openingTimes={openingTimes} />
              <Divider />
            </>
          )}
          {hasConditions && <Conditions conditions={content.conditions} />}
        </Stack>
      </Section>
    </Box>
  );
}

OutletDetail.getLayout = (page: JSX.Element) => (
  <LayoutCatalogue headerNavProps={{ section: 'catalogue' }}>
    <>{page}</>
  </LayoutCatalogue>
);
