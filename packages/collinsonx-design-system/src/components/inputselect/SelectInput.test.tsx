import renderer from 'react-test-renderer';
import SelectInput from '.';

describe('<SelectInput />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders SelectInput', () => {
    const tree = renderer
      .create(
        <SelectInput
          label="Your favorite framework/library"
          placeholder="Pick one"
          options={[
            { value: 'react', label: 'React' },
            { value: 'ng', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'vue', label: 'Vue' },
          ]}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
