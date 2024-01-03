import DetailsSection from '.';
import { render } from '@collinsonx/design-system/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('<DetailsSection />', () => {
  it('should render', () => {
    const component = render(
      <DetailsSection label="Foobar">
        <></>
      </DetailsSection>
    );
    expect(component.getByText('Foobar')).toBeInTheDocument();
  });
  it('should render children', () => {
    const component = render(
      <DetailsSection label="Foobar">
        <>Baz</>
      </DetailsSection>
    );
    expect(component.getByText('Baz')).toBeInTheDocument();
  });
});
