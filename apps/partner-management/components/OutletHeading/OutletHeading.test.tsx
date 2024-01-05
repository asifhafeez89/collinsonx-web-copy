import OutletHeading from './index';
import { render } from '@collinsonx/design-system/test-utils';
import '@testing-library/jest-dom/extend-expect';

jest.mock('@collinsonx/design-system/assets/icons', () => {
  return {
    ChevronLeft: () => 'ChevronLeft',
  };
});

describe('<OutletHeading />', () => {
  const locationName = 'Location name';
  const terminalName = 'Terminal name';
  it('should render with all props', () => {
    const outletHeading = render(
      <OutletHeading
        name="Outlet name"
        locationName={locationName}
        terminal={terminalName}
      />
    );

    expect(outletHeading.getByText('Outlet name')).toBeInTheDocument();
    expect(
      outletHeading.getByText(`${locationName}, ${terminalName}`)
    ).toBeInTheDocument();
  });
});
