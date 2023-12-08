import { ActionIcon, Flex, Stack, Title } from '@collinsonx/design-system/core';
import colors from '@collinsonx/design-system/colour-constants-partner';
import { useQuery } from '@collinsonx/utils/apollo';
import getOutletByID from '@collinsonx/utils/queries/getOutletByID';
import { Outlet } from '@collinsonx/utils';
import Error from '@components/Error';
import LayoutCatalogue from '@components/LayoutCatalogue';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ChevronLeft } from '@collinsonx/design-system/assets/icons';
import { useCallback, useEffect, useState } from 'react';

export default function OutletDetail() {
  const router = useRouter();
  const { id } = router.query;
  const {
    loading: loadingOutlet,
    error: errorOutlets,
    data: dataOutlet,
  } = useQuery<{ getOutletByID: Outlet }>(getOutletByID, {
    variables: { id },
  });
  const [isScrolled, setScrolled] = useState(false);
  const [initialPosition, setInitialPosition] = useState<number | null>(null);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;

    if (!initialPosition) {
      setInitialPosition(scrollY);
    }

    setScrolled(scrollY > 120);
  }, [initialPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (loadingOutlet) {
    return <div>Loading...</div>;
  }
  if (!dataOutlet?.getOutletByID) {
    return <div>Outlet not found</div>;
  }

  const { name, location } = dataOutlet.getOutletByID;

  return (
    <Stack spacing={32}>
      <Flex
        gap={16}
        mt={isScrolled ? 0 : 53}
        mb={53}
        style={{
          position: isScrolled ? 'fixed' : 'relative',
          top: isScrolled ? `18px` : 'auto',
        }}
      >
        <ActionIcon
          variant="default"
          data-testid="viewAllOutlets"
          component={Link}
          href="/outlets"
          aria-label="Back to Outlets"
          style={{
            width: '44px',
            height: '44px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChevronLeft />
        </ActionIcon>
        <Flex
          gap={8}
          style={{
            flexDirection: isScrolled ? 'row' : 'column',
          }}
        >
          <Title
            color={colors['partner-text-default']}
            mt={2}
            size={32}
            weight={700}
          >
            {name}
          </Title>
          <Title
            order={2}
            color={colors['partner-text-grey']}
            size={18}
            weight={400}
            style={{
              marginTop: isScrolled ? '12px' : '0px',
            }}
          >
            {location.name}
            {location.terminal && `, ${location.terminal}`}
          </Title>
        </Flex>
      </Flex>
      <Flex gap={10} mt={53} mb={4000}></Flex>
      <Error error={errorOutlets} />
    </Stack>
  );
}

OutletDetail.getLayout = (page: JSX.Element) => (
  <LayoutCatalogue>{page}</LayoutCatalogue>
);
