import OverviewCard from './';
import { render } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('<OverviewCard />', () => {
  it('should render', () => {
    const card = render(<OverviewCard title="Test" />);

    expect(card.getByText('Test')).toBeInTheDocument();
  });
  it('should render children elements', () => {
    const card = render(<OverviewCard title="Test">Foobar</OverviewCard>);
    expect(card.getByText('Foobar')).toBeInTheDocument();
  });
});
