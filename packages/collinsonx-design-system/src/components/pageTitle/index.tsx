import { Title, Box } from '@collinsonx/utils/core';
import { ChevronLeft } from '../../assets/icons/index';

interface IPageTitle {
  title: string;
  url: string;
}

export default function PageTitle({ title, url }: IPageTitle) {
  return (
    <Box
      component="header"
      sx={{ display: 'flex', paddingTop: '16px', alignItems: 'center' }}
    >
      <Box
        component="a"
        href={url}
        sx={{
          border: '1px solid #112132',
          borderRadius: 8,
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 16,
        }}
      >
        <ChevronLeft color={'#000000'} />
      </Box>
      <Title size={20} color={'#000000'}>
        {title}
      </Title>
    </Box>
  );
}
