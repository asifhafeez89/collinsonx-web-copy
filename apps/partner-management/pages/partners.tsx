import {
  Anchor,
  Button,
  SimpleGrid,
  Stack,
  Text,
} from '@collinsonx/design-system/core';
import Title from '@collinsonx/design-system/components/title';
import LayoutCatalogue from '@components/LayoutCatalogue';
import { useQuery } from '@collinsonx/utils/apollo';
import Error from '@components/Error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPartnerBrands } from '@collinsonx/utils/queries';
import { PartnerBrand } from '@collinsonx/utils';
import Card, { Status } from '@collinsonx/design-system/components/card';
import CardTitle from '@collinsonx/design-system/components/card/cardTitle';
import colors from '@collinsonx/design-system/colour-constants-partner';
import { CARDS_LIMIT } from 'config';

export default function Partners() {
  const router = useRouter();
  const {
    loading: loadingPartners,
    error: errorPartners,
    data: dataPartners,
  } = useQuery<{ getPartnerBrands: PartnerBrand[] }>(getPartnerBrands, {
    variables: { limit: CARDS_LIMIT },
  });

  return (
    <Stack gap={32} pb={24}>
      <Title>Partners</Title>
      <Error error={errorPartners} />
      <SimpleGrid
        spacing={24}
        style={{
          'grid-template-columns': 'repeat(auto-fill, minmax(350px, 1fr))',
        }}
      >
        {!loadingPartners &&
          dataPartners &&
          dataPartners.getPartnerBrands.map(({ name, outlets, id }, index) => {
            const href = `/outlets?partner=${id}`;
            return (
              <Card
                key={index}
                data-testid="partner-card"
                status={Status.Active}
                hasImagePadding
                onClick={() => {
                  router.push(href);
                }}
              >
                <Stack gap={24}>
                  <Stack gap={6}>
                    <Anchor
                      style={{ textDecoration: 'none' }}
                      component={Link}
                      href={href}
                    >
                      <CardTitle data-testid={`partner-card-title-${index}`}>
                        {name}
                      </CardTitle>
                    </Anchor>
                    <Text
                      size="md"
                      color={colors['text-grey']}
                      data-testid={`outlet-count-${index}`}
                    >
                      {`${outlets.length} ${
                        outlets.length > 1 ? 'outlets' : 'outlet'
                      }`}
                    </Text>
                  </Stack>
                  <Button
                    aria-hidden="true"
                    variant="outline"
                    tabIndex={-1}
                    data-testid={`view-outlets-button-${index}`}
                  >
                    View outlets
                  </Button>
                </Stack>
              </Card>
            );
          })}
      </SimpleGrid>
    </Stack>
  );
}

Partners.getLayout = (page: JSX.Element) => (
  <LayoutCatalogue>{page}</LayoutCatalogue>
);
