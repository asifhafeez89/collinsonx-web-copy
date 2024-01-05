import LayoutLogin from './LayoutLogin';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<LayoutLogin />', () => {
  const content = 'content';
  const subheader = 'subheader-content';
  it('should render', () => {
    const component = render(
      <LayoutLogin hasPadding={true}>
        <>{content}</>
      </LayoutLogin>
    );

    expect(component.getByText(content)).toBeInTheDocument();
  });
  it('should render subheader', () => {
    const component = render(
      <LayoutLogin subHeader={<>{subheader}</>} hasPadding={true}>
        <>{content}</>
      </LayoutLogin>
    );

    expect(component.getByText(subheader)).toBeInTheDocument();
  });
});
