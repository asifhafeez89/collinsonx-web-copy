import LayoutCatalogue from '.';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<LayoutCatalogue />', () => {
  it('should render', () => {
    const component = render(
      <LayoutCatalogue subHeader={<>header</>} heading={<>heading</>}>
        <></>
      </LayoutCatalogue>
    );

    expect(component).toMatchSnapshot();
  });
});
