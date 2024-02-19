import { Button, Stack, Text } from '@collinsonx/design-system/core';
import Title from '@collinsonx/design-system/components/title';
import LayoutCatalogue from '@components/LayoutCatalogue';
import { useQuery } from '@collinsonx/utils/apollo';
import Error from '@components/Error';
import { useRouter } from 'next/router';
import { getPartnerBrands } from '@collinsonx/utils/queries';
import { Maybe, PartnerBrand, PartnerBrands } from '@collinsonx/utils';
import colors from '@collinsonx/design-system/colour-constants-partner';
import { CARDS_LIMIT } from 'config';
import Table from '@components/PartnersTable';
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import Spinner from '@components/Spinner';
import Section from '@components/Section';
import PageTitle from '@components/PageTitle';

const columnHelper = createColumnHelper<Partial<PartnerBrand>>();

const isPartner = (partner: Maybe<PartnerBrand>): partner is PartnerBrand =>
  partner !== null;

export default function Partners() {
  const router = useRouter();
  const {
    loading: loadingPartners,
    error: errorPartners,
    data: dataPartners,
  } = useQuery<{ getPartnerBrands: PartnerBrands }>(getPartnerBrands, {
    variables: { limit: CARDS_LIMIT },
  });

  const partnersCount = dataPartners?.getPartnerBrands.totalItemCount || 0;
  const partners = dataPartners?.getPartnerBrands.items || [];

  const columns = useMemo(() => {
    const columns: ColumnDef<Partial<PartnerBrand>, any>[] = [
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Partner',
        cell: (props) => props.getValue() || '-',
      }),
      columnHelper.accessor('outlets', {
        id: 'outlets',
        header: 'Number of outlets',
        cell: (props) => {
          const count = props.getValue()?.length || 0;
          const text = count === 1 ? 'outlet' : 'outlets';

          return `${count} ${text}`;
        },
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: (props) => {
          const { id, outlets } = props.row.original;

          if (outlets?.length === 0) {
            return null;
          }

          const handleOnClick = () => router.push(`/outlets?partner=${id}`);

          return (
            <Button variant="outline" onClick={handleOnClick}>
              View outlets
            </Button>
          );
        },
      }),
    ];

    return columns;
  }, [router]);

  const filteredPartners = useMemo(
    () => partners.filter(isPartner),
    [partners]
  );

  const table = useReactTable<Partial<PartnerBrand>>({
    data: filteredPartners,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const title = 'Partners';

  return (
    <Section>
      <PageTitle title={title} section="Catalogue" />
      <Stack gap={24} pb={24}>
        {loadingPartners ? (
          <>
            <Title>{title}</Title>
            <Spinner />
          </>
        ) : (
          <>
            <Stack gap={16}>
              <Title>Partners</Title>
              <Text style={{ fontSize: 18, color: colors['text-grey'] }}>
                {`${partnersCount} ${
                  partnersCount === 1 ? 'partner brand' : 'partner brands'
                }`}
              </Text>
            </Stack>
            <Error error={errorPartners} />
            {!loadingPartners && dataPartners && (
              <Table
                table={table}
                columnsAlignment={{
                  name: 'left',
                  outlets: 'right',
                  action: 'center',
                }}
              />
            )}
          </>
        )}
      </Stack>
    </Section>
  );
}

Partners.getLayout = (page: JSX.Element) => (
  <LayoutCatalogue headerNavProps={{ section: 'catalogue' }}>
    {page}
  </LayoutCatalogue>
);
