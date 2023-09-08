import renderer from 'react-test-renderer';
import EditableTitle from './EditableTitle';

describe('<EditableField />', () => {
  it('renders Details', () => {
    const tree = renderer
      .create(
        <EditableTitle title="This is a title" as="h2" to="">
          <div>Test</div>
        </EditableTitle>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
