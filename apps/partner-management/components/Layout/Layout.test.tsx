import Layout from './';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<Layout />', () => {
  it('should render', () => {
    const component = render(
      <Layout subHeader={<>header</>} hasPadding={true}>
        <></>
      </Layout>
    );

    expect(component).toMatchSnapshot();
  });
});
