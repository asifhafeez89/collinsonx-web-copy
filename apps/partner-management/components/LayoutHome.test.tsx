import LayoutHome from './LayoutHome';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

describe('<LayoutHome />', () => {
  it('should render', () => {
    const component = render(
      <LayoutHome subHeader={<>header</>} heading={<>heading</>}>
        <></>
      </LayoutHome>
    );

    expect(component).toMatchSnapshot();
  });
});
