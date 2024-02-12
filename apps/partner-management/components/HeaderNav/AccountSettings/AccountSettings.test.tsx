import AccountSettings from '.';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<AccountSettings />', () => {
  const mockData = {
    fullName: 'John Doe',
    accountRole: 'Partner',
  };
  it('should render', () => {
    const component = render(<AccountSettings {...mockData} />);
    expect(component.getByRole('button')).toBeInTheDocument();
  });
  it('should render fullName', () => {
    const component = render(<AccountSettings {...mockData} />);
    expect(component.getByText(mockData.fullName)).toBeInTheDocument();
  });
  it('should render accountRole', () => {
    const component = render(<AccountSettings {...mockData} />);
    expect(component.getByText(mockData.accountRole)).toBeInTheDocument();
  });
  it('should not render accountRole when fullName is not available', () => {
    const _mockData = { ...mockData, fullName: undefined };
    const component = render(<AccountSettings {..._mockData} />);
    expect(
      component.queryByText(_mockData.accountRole)
    ).not.toBeInTheDocument();
  });
  it('should not render fullName when accountRole is not available', () => {
    const _mockData = { ...mockData, accountRole: undefined };
    const component = render(<AccountSettings {..._mockData} />);
    expect(component.queryByText(_mockData.fullName)).not.toBeInTheDocument();
  });
});
