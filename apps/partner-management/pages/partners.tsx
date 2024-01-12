import { Button, Stack, Text } from '@collinsonx/design-system/core';
import Title from '@collinsonx/design-system/components/title';
import LayoutCatalogue from '@components/LayoutCatalogue';
import { useQuery } from '@collinsonx/utils/apollo';
import Error from '@components/Error';
import { useRouter } from 'next/router';
import { getPartnerBrands } from '@collinsonx/utils/queries';
import { PartnerBrand } from '@collinsonx/utils';
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

const columnHelper = createColumnHelper<Partial<PartnerBrand>>();

export default function Partners() {
  const router = useRouter();
  const {
    loading: loadingPartners,
    error: errorPartners,
    data: dataPartners,
  } = useQuery<{ getPartnerBrands: PartnerBrand[] }>(getPartnerBrands, {
    variables: { limit: CARDS_LIMIT },
  });

  const partnersCount = dataPartners?.getPartnerBrands.length || 0;

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

  const table = useReactTable<Partial<PartnerBrand>>({
    data: dataPartners?.getPartnerBrands || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Stack gap={32} pb={24}>
      <Title>Partners</Title>
      <Text style={{ fontSize: 18, color: colors['text-grey'] }}>
        {`${partnersCount} ${
          partnersCount === 1 ? 'partner brand' : 'partner brands'
        }`}
      </Text>
      <Error error={errorPartners} />
      {!loadingPartners && dataPartners && (
        <Table
          table={table}
          columnsAlignment={{
            outlets: 'right',
            action: 'center',
          }}
        />
      )}
    </Stack>
  );
}

Partners.getLayout = (page: JSX.Element) => (
  <LayoutCatalogue headerNavProps={{ section: 'catalogue' }}>
    {page}
  </LayoutCatalogue>
);
