import OutletHeading from './index';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('@collinsonx/design-system/assets/icons', () => {
  return {
    ChevronLeft: () => 'ChevronLeft',
  };
});

describe('<OutletHeading />', () => {
  it('should render with all props', () => {
    const outletHeading = render(
      <OutletHeading
        name="Outlet name"
        locationName="Location name"
        terminal="Terminal name"
      />
    );

    expect(outletHeading.getByText('Outlet name')).toBeInTheDocument();
    expect(
      outletHeading.getByText('Location name, Terminal name')
    ).toBeInTheDocument();
  });
});
