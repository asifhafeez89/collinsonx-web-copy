import * as React from 'react';
import renderer from 'react-test-renderer';
import { Heading } from './Heading';

describe('<Heading />', () => {
  it('renders heading', () => {
    const tree = renderer
      .create(
        <>
          <Heading as="h2" className="foo" padding={0} margin={0}>
            Heading Title
          </Heading>
        </>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
