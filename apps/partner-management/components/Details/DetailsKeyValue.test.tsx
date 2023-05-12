import DetailsKeyValue from './DetailsKeyValue';
import { render, screen } from '@testing-library/react';
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
        .parentElement?.parentElement?.className.includes(
          'mantine-Skeleton-visible'
        )
    ).toBe(true);
  });
});
