import DetailsKeyValue from './';
import { render } from '@collinsonx/design-system/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('<DetailsKeyValue />', () => {
  const label = 'Test';
  const value = 'foobar';
  it('should render', () => {
    const component = render(
      <DetailsKeyValue label={label}>
        <span>{value}</span>
      </DetailsKeyValue>
    );
    expect(component.getByText(label)).toBeInTheDocument();
  });
  it('should render children', () => {
    const component = render(
      <DetailsKeyValue label={label}>
        <span>{value}</span>
      </DetailsKeyValue>
    );
    expect(component.getByText(value)).toBeInTheDocument();
  });
  it('should show skeleton when loading', () => {
    const component = render(
      <DetailsKeyValue label={label} loading>
        <span>{value}</span>
      </DetailsKeyValue>
    );
    expect(
      component
        .getByText(value)
        .parentElement?.parentElement?.attributes.getNamedItem('data-visible')
    ).toBeTruthy();
  });
});
