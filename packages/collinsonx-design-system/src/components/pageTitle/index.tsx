import { Title, Box } from '@mantine/core';
import Link from 'next/link';
import { ChevronLeft } from '../../assets/icons/index';

interface IPageTitle {
  title: string;
  url: string;
  variant?: 'white' | 'default';
}

export default function PageTitle({ title, url, variant }: IPageTitle) {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        paddingTop: '16px',
        alignItems: 'center',
      }}
    >
      <Link href={url}>
        <Box
          sx={{
            border: `${
              variant === 'white' ? '1px solid #FFFFFF' : '1px solid #112132'
            }`,
            borderRadius: 8,
            width: 40,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 16,
          }}
        >
          <ChevronLeft color={variant === 'white' ? '#FFFFFF' : '#000000'} />
        </Box>
      </Link>
      <Title size={20} color={variant === 'white' ? '#FFFFF' : '#000000'}>
        {title}
      </Title>
    </Box>
  );
}
