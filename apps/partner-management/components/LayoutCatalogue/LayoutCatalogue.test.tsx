import LayoutCatalogue from '.';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<LayoutCatalogue />', () => {
  const content = 'Content';
  it('should render', () => {
    const component = render(
      <LayoutCatalogue subHeader={<>header</>} heading={<>heading</>}>
        <span>{content}</span>
      </LayoutCatalogue>
    );

    expect(component.getByText(content)).toBeInTheDocument();
  });
});
