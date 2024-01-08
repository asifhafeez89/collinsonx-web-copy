import { Flex, Stack } from '@collinsonx/design-system/core';
import { useQuery } from '@collinsonx/utils/apollo';
import getOutletByID from '@collinsonx/utils/queries/getOutletByID';
import { Outlet, ProductCategory } from '@collinsonx/utils';
import Error from '@components/Error';
import LayoutCatalogue from '@components/LayoutCatalogue';
import { useRouter } from 'next/router';
import OutletHeading from '@components/OutletHeading';
import ContentWrapper from '@components/ContentWrapper';
import colors from '@collinsonx/design-system/colour-constants-partner';
import OutletDetailsSummary from '@components/OutletDetailsSummary';
import { ValidTag } from 'config/outletIcons';

const capitalizedCategoryMap: { [key in ProductCategory]: string } = {
  [ProductCategory.Eat]: 'Eat',
  [ProductCategory.Lounge]: 'Lounge',
  [ProductCategory.Refresh]: 'Refresh',
  [ProductCategory.Rest]: 'Rest',
  [ProductCategory.Unwind]: 'Unwind',
};

function isValidTag(tag: string | null): tag is ValidTag {
  const validTags: ValidTag[] = [
    'EAT',
    'LOUNGE',
    'REST',
    'SERVICES',
    'UNWIND',
    'REFRESH',
  ];
  return validTags.includes(tag as ValidTag);
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
    return <div>Loading...</div>;
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
    tags,
    hasDisabledAccess,
    reservationEmail,
    meta,
  } = dataOutlet.getOutletByID;

  const primaryProducts = products.map((product) => {
    return product
      ? `${capitalizedCategoryMap[product.category]} / ${product.name}`
      : '';
  });

  const filteredTags = tags.filter(isValidTag);

  return (
    <Stack
      gap={12}
      styles={{ root: { backgroundColor: colors['bg-surface'] } }}
    >
      <OutletHeading
        name={name}
        locationName={location.name}
        terminal={location.terminal}
      />
      <Error error={errorOutlet} />
      <ContentWrapper>
        <Flex gap={10} mb={400}>
          <OutletDetailsSummary
            locationType={category}
            legacyCode={legacyCode}
            code={code}
            status={status === 'LIVE' ? 'ACTIVE' : 'INACTIVE'}
            tags={filteredTags}
            primaryProducts={primaryProducts}
            disabledAccess={hasDisabledAccess}
            email={reservationEmail}
            lastEditedDate={meta?.lastEdited}
            editor={meta?.editor}
          />
        </Flex>
      </ContentWrapper>
    </Stack>
  );
}

OutletDetail.getLayout = (page: JSX.Element) => (
  <LayoutCatalogue disableWrapper>{page}</LayoutCatalogue>
);
