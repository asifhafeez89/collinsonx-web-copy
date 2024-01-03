import LayoutLogin from './LayoutLogin';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<LayoutLogin />', () => {
  it('should render', () => {
    const component = render(
      <LayoutLogin subHeader={<>header</>} hasPadding={true}>
        <></>
      </LayoutLogin>
    );

    expect(component).toMatchSnapshot();
  });
});
