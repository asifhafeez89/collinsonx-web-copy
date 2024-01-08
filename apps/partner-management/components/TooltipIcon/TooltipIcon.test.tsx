import { render, screen } from '@collinsonx/design-system/test-utils';
import userEvent from '@testing-library/user-event';
import TooltipIcon from './index';
import { HelpOutlineIcon } from '@collinsonx/design-system/assets/icons/index';

describe('TooltipIcon', () => {
  const mockProps = {
    icon: <HelpOutlineIcon />,
    tooltipText: 'Tool tip text',
  };

  it('renders without crashing', () => {
    render(<TooltipIcon {...mockProps} />);
  });

  it('displays correct icon', () => {
    render(<TooltipIcon {...mockProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('tooltip is displayed when hovering over icon', async () => {
    render(<TooltipIcon {...mockProps} />);
    expect(screen.queryByText(mockProps.tooltipText)).not.toBeInTheDocument();
    const icon = screen.getByRole('button');
    userEvent.hover(icon);
    expect(await screen.findByText(mockProps.tooltipText)).toBeInTheDocument();
  });
});
