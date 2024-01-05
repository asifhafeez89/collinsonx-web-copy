import OverviewMetric from './index';
import { render } from '@collinsonx/design-system/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('<OverviewMetric />', () => {
  const label = 'Test';

  it('should render', () => {
    const component = render(<OverviewMetric label={label} value={20} />);
    expect(component.getByText(label)).toBeInTheDocument();
  });
  it('should show metric value', () => {
    const content = 1337;
    const component = render(<OverviewMetric label={label} value={content} />);
    expect(component.getByText(content)).toBeInTheDocument();
  });
  it('should render children', () => {
    const content = 'foobar';
    const component = render(
      <OverviewMetric label={label} value={1337}>
        <span>{content}</span>
      </OverviewMetric>
    );
    expect(component.getByText(content)).toBeInTheDocument();
  });
});
