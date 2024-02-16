import Lightbox from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, setup } from '@collinsonx/design-system/test-utils';

describe('<Lightbox />', () => {
  const onClose = jest.fn();
  let props = {
    onClose,
    opened: true,
    title: 'foo',
    subtitle: 'description text',
    children: 'bar',
  };
  it('should render', () => {
    const component = render(<Lightbox {...props} />);
    expect(component.getByText(props.children)).toBeInTheDocument();
  });
  it('should not render when opened is false', () => {
    const component = render(<Lightbox {...props} opened={false} />);
    expect(component.queryByText(props.children)).not.toBeInTheDocument();
  });
  it('should render title', () => {
    const component = render(<Lightbox {...props} />);
    expect(component.getByText(props.title)).toBeInTheDocument();
  });
  it('should render subtitle', () => {
    const component = render(<Lightbox {...props} />);
    expect(component.getByText(props.subtitle)).toBeInTheDocument();
  });
  it('should call onClose when close icon is clicked', async () => {
    const { user, ...component } = setup(<Lightbox {...props} />);
    await user.click(component.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
