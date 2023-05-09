import { render } from '@testing-library/react';
import Bookings from '../pages/bookings';
import { MockedProvider } from '@collinsonx/utils/testing';

test('render Bookings component'),
  () => {
    const bookingsComponent = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Bookings />
      </MockedProvider>
    );
    expect(bookingsComponent).toMatchSnapshot();
  };
