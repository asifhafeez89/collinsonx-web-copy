import Layout from './';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<Layout />', () => {
  const content = 'Content';
  it('should render', () => {
    const component = render(
      <Layout subHeader={<>header</>} hasPadding={true}>
        <span>{content}</span>
      </Layout>
    );

    expect(component.getByText(content)).toBeInTheDocument();
  });
});
