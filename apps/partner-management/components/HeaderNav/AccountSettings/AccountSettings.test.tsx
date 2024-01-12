import AccountSettings from '.';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<AccountSettings />', () => {
  const mockData = {
    fullName: 'John Doe',
    role: 'Partner',
  };
  it('should render', () => {
    const component = render(<AccountSettings {...mockData} />);
    expect(component.getByRole('button')).toBeInTheDocument();
  });
  it('should render fullName', () => {
    const component = render(<AccountSettings {...mockData} />);
    expect(component.getByText(mockData.fullName)).toBeInTheDocument();
  });
  it('should render role', () => {
    const component = render(<AccountSettings {...mockData} />);
    expect(component.getByText(mockData.role)).toBeInTheDocument();
  });
  it('should not render role when fullName is not available', () => {
    const _mockData = { ...mockData, fullName: undefined };
    const component = render(<AccountSettings {..._mockData} />);
    expect(component.queryByText(_mockData.role)).not.toBeInTheDocument();
  });
  it('should not render fullName when role is not available', () => {
    const _mockData = { ...mockData, role: undefined };
    const component = render(<AccountSettings {..._mockData} />);
    expect(component.queryByText(_mockData.fullName)).not.toBeInTheDocument();
  });
});
