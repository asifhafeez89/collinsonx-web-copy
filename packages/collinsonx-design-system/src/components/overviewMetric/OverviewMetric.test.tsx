import OverviewMetric from './';
import { render } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('<OverviewMetric />', () => {
  it('should render', () => {
    const component = render(<OverviewMetric label="Test" value={20} />);
    expect(component.getByText('Test')).toBeInTheDocument();
  });
  it('should show metric value', () => {
    const component = render(<OverviewMetric label="Test" value={1337} />);
    expect(component.getByText('1337')).toBeInTheDocument();
  });
  it('should render children', () => {
    const component = render(
      <OverviewMetric label="Test" value={1337}>
        <span>foobar</span>
      </OverviewMetric>
    );
    expect(component.getByText('foobar')).toBeInTheDocument();
  });
});
