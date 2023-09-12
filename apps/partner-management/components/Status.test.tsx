import React from 'react';
import { render } from '@testing-library/react';
import Status from './Status'; 
jest.mock('@collinsonx/design-system/assets/icons', () => {
    return {
      __esModule: true,
      Pending: () => (
        []
      ),
      Confirmed:()=>([]),
      Declined:()=>([])
    };
  });
test('renders Type component with warning type', () => {
    const component = render(
                <Status type={'warning'} children={'warning'}/>
              );
              expect(component).toMatchSnapshot();
});
test('renders Type component with success type', () => {
    const component = render(
                <Status type={'success'} children={'success'}/>
              );
              expect(component).toMatchSnapshot();
});
test('renders Type component with danger type', () => {
    const component = render(
                <Status type={'danger'} children={'danger'}/>
              );
              expect(component).toMatchSnapshot();
});


