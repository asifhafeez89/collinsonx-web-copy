import { Title, Box } from '@mantine/core';
import Link from 'next/link';
import { ChevronLeft } from '../../assets/icons/index';

interface IPageTitle {
  title: string;
  url: string;
  variant?: 'white' | 'default';
  fullwhite?: boolean;
}

export default function PageTitle({
  title,
  url,
  variant,
  fullwhite = false,
}: IPageTitle) {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        paddingTop: '5px',
        alignItems: 'center',
        fontSize: '1.2rem',
        borderBottom: '1px solid black',
        margin: '0 -30px',
        padding: '10px 30px',
      }}
    >
      <Link href={url}>
        <Box
          sx={{
            background: `${fullwhite ? '#FFFFFF' : 'transparent'}`,
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
      <Title
        size={14}
        color={variant === 'white' ? '#FFFFF' : '#000000'}
        sx={{ width: '200px', margin: '0 auto' }}
      >
        {title}
      </Title>
    </Box>
  );
}
