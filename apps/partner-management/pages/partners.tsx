import {
  Anchor,
  Button,
  SimpleGrid,
  Stack,
  Title,
  Text,
} from '@collinsonx/design-system/core';
import Layout from '@components/Layout';
import { useQuery } from '@collinsonx/utils/apollo';
import Error from '@components/Error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPartnerBrands } from '@collinsonx/utils/queries';
import { PartnerBrand } from '@collinsonx/utils';
import Card, { Status } from '@collinsonx/design-system/components/card';
import CardTitle from '@collinsonx/design-system/components/card/cardTitle';
import colors from '@collinsonx/design-system/colour-constants-partner';

export default function Partners() {
  const router = useRouter();
  const {
    loading: loadingPartners,
    error: errorPartners,
    data: dataPartners,
  } = useQuery<{ getPartnerBrands: PartnerBrand[] }>(getPartnerBrands, {
    variables: { limit: 10 },
  });

  return (
    <Stack spacing={32} pb={24}>
      <Title>Partners</Title>
      <Error error={errorPartners} />
      <SimpleGrid
        spacing={24}
        sx={{
          'grid-template-columns': 'repeat(auto-fill, minmax(350px, 1fr))',
        }}
      >
        {!loadingPartners &&
          dataPartners &&
          dataPartners.getPartnerBrands.map(({ name, outlets }, index) => (
            <Card
              key={index}
              status={Status.Active}
              hasImagePadding
              onClick={() => {
                router.push('#');
              }}
            >
              <Stack spacing={24}>
                <Stack spacing={6}>
                  <Anchor
                    sx={{ textDecoration: 'none' }}
                    underline={false}
                    component={Link}
                    href="#"
                  >
                    <CardTitle>{name}</CardTitle>
                  </Anchor>
                  <Text size={16} color={colors['partner-text-grey']}>
                    {`${outlets.length} ${
                      outlets.length > 1 ? 'outlets' : 'outlet'
                    }`}
                  </Text>
                </Stack>
                <Button aria-hidden="true" variant="outline" tabIndex={-1}>
                  View outlets
                </Button>
              </Stack>
            </Card>
          ))}
      </SimpleGrid>
    </Stack>
  );
}

Partners.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
