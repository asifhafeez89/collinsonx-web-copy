import HeaderNav, { HeaderNavProps } from '.';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

import useExperience from 'hooks/experience';

jest.mock('hooks/experience', () => ({
  __esModule: true,
  default: jest.fn(() => ({ userDetails: {}, client: 'collinson' })),
}));

describe('<HeaderNav />', () => {
  const mockData: HeaderNavProps = {
    section: 'catalogue',
  };
  it('should render', () => {
    const component = render(<HeaderNav {...mockData} />);
    expect(component.getByText('Catalogue')).toBeInTheDocument();
  });
  it('should render collinson badge when corresponding section is passed', () => {
    (useExperience as jest.Mock).mockReturnValue({
      userDatails: {},
      client: 'collinson',
    });
    const component = render(<HeaderNav {...mockData} />);
    expect(component.getByText('Collinson')).toBeInTheDocument();
  });
  it('should render custom section', () => {
    const mockClient = 'Airport Dimensions';

    (useExperience as jest.Mock).mockReturnValue({
      userDatails: {},
      client: mockClient,
    });
    const component = render(<HeaderNav {...mockData} />);
    expect(component.getByText(mockClient)).toBeInTheDocument();
  });
  it('should not render client element when client is not avaiable', () => {
    (useExperience as jest.Mock).mockReturnValue({
      userDatails: {},
      client: null,
    });
    const component = render(<HeaderNav {...mockData} />);
    expect(component.queryByTestId('nav-client')).not.toBeInTheDocument();
  });
  it('should not render separator element when client is not avaiable', () => {
    (useExperience as jest.Mock).mockReturnValue({
      userDatails: {},
      client: null,
    });
    const component = render(<HeaderNav {...mockData} />);
    expect(component.queryByTestId('nav-separator')).not.toBeInTheDocument();
  });
  it('should render skip link', () => {
    (useExperience as jest.Mock).mockReturnValue({
      userDatails: {},
      client: null,
    });
    const component = render(<HeaderNav {...mockData} />);
    expect(component.getByText('Skip to main content')).toBeInTheDocument();
  });
});
