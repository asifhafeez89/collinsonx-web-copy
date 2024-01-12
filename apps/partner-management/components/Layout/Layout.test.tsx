import Layout from './';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';
import { HeaderNavProps } from '@components/HeaderNav';

jest.mock('hooks/experience', () => ({
  __esModule: true,
  default: jest.fn(() => ({ userDetails: {}, client: 'collinson' })),
}));

describe('<Layout />', () => {
  const content = 'Content';
  const navProps: HeaderNavProps = {
    section: 'catalogue',
  };
  it('should render', () => {
    const component = render(
      <Layout headerNavProps={navProps} hasPadding={true}>
        <span>{content}</span>
      </Layout>
    );

    expect(component.getByText(content)).toBeInTheDocument();
  });
});
