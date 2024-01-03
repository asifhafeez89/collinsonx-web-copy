import renderer from 'react-test-renderer';
import { Provider } from 'test-utils';
import SelectInput from '.';

describe('<SelectInput />', () => {
  it('renders SelectInput', () => {
    const tree = renderer
      .create(
        <Provider>
          <SelectInput
            label="Your favorite framework/library"
            comboboxProps={{ withinPortal: false }}
            placeholder="Pick one"
            data={[
              { value: 'react', label: 'React' },
              { value: 'ng', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'vue', label: 'Vue' },
            ]}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
