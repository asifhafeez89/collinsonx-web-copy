import DetailsKeyValue from './';
import { render } from '@collinsonx/design-system/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('<DetailsKeyValue />', () => {
  it('should render', () => {
    const component = render(
      <DetailsKeyValue label="Test">
        <span>foobar</span>
      </DetailsKeyValue>
    );
    expect(component.getByText('Test')).toBeInTheDocument();
  });
  it('should render children', () => {
    const component = render(
      <DetailsKeyValue label="Test">
        <span>foobar</span>
      </DetailsKeyValue>
    );
    expect(component.getByText('foobar')).toBeInTheDocument();
  });
  it('should show skeleton when loading', () => {
    const component = render(
      <DetailsKeyValue label="Test" loading>
        <span>foobar</span>
      </DetailsKeyValue>
    );
    expect(
      component
        .getByText('foobar')
        .parentElement?.parentElement?.attributes.getNamedItem('data-visible')
    ).toBeTruthy();
  });
});
