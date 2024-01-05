import DetailsSection from '.';
import { render } from '@collinsonx/design-system/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('<DetailsSection />', () => {
  const label = 'Foobar';
  const content = 'Baz';
  it('should render', () => {
    const component = render(
      <DetailsSection label={label}>
        <>{content}</>
      </DetailsSection>
    );
    expect(component.getByText(label)).toBeInTheDocument();
  });
  it('should render children', () => {
    const component = render(
      <DetailsSection label={label}>
        <>{content}</>
      </DetailsSection>
    );
    expect(component.getByText(content)).toBeInTheDocument();
  });
});
