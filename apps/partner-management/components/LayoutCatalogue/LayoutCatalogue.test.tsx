import LayoutCatalogue from '.';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';
import { HeaderNavProps } from '@components/HeaderNav';

jest.mock('hooks/experience', () => ({
  __esModule: true,
  default: jest.fn(() => ({ userDetails: {}, client: 'collinson' })),
}));

describe('<LayoutCatalogue />', () => {
  const content = 'Content';
  const navProps: HeaderNavProps = {
    section: 'catalogue',
  };
  it('should render', () => {
    const component = render(
      <LayoutCatalogue headerNavProps={navProps} heading={<>heading</>}>
        <span>{content}</span>
      </LayoutCatalogue>
    );

    expect(component.getByText(content)).toBeInTheDocument();
  });
});
