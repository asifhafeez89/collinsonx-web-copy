import * as React from 'react';
import renderer from 'react-test-renderer';
import Main from '../pages/index';

describe('<Home />', () => {
  it('renders outline variant', () => {
    const tree = renderer
      .create(
        <Main consumerNumber={''} tempBearerToken={''} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
