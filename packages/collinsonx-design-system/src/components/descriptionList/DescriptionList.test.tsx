import { render } from 'test-utils';
import DescriptionList from '.';

const { Term, Description } = DescriptionList;

describe('<DescriptionList />', () => {
  const term = 'Foo';
  const description = 'Bar';
  it('should render term', () => {
    const elem = render(
      <DescriptionList>
        <Term>{term}</Term>
      </DescriptionList>
    );
    expect(elem.getByText(term)).toBeInTheDocument();
  });
  it('should render description', () => {
    const elem = render(
      <DescriptionList>
        <Description>{description}</Description>
      </DescriptionList>
    );
    expect(elem.getByText(description)).toBeInTheDocument();
  });
});
