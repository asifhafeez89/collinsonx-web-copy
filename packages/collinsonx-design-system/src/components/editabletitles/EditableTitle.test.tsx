import renderer from 'react-test-renderer';
import EditableTitle from './EditableTitle';
import { Provider } from 'test-utils';

describe('<EditableField />', () => {
  it('renders Details', () => {
    const tree = renderer
      .create(
        <Provider>
          <EditableTitle title="This is a title" as="h2" to="">
            <div>Test</div>
          </EditableTitle>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
