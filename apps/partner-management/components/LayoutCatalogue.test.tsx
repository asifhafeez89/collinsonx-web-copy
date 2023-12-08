import LayoutCatalogue from './LayoutCatalogue';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

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
