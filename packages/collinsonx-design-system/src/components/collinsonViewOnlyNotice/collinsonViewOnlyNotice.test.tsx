import { render, screen } from 'test-utils';
import '@testing-library/jest-dom';
import CollinsonViewOnlyNotice from './';

describe('<CollinsonViewOnlyNotice />', () => {
  it('should render', () => {
    render(<CollinsonViewOnlyNotice />);
    expect(screen.getByText('*COLLINSON VIEW ONLY')).toBeInTheDocument();
  });
});
