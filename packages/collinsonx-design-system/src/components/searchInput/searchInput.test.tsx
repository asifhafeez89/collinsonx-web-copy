import renderer from 'react-test-renderer';
import SearchInput from '.';
import { render, screen, waitFor, userEvent, Provider } from 'test-utils';

const mockFn = jest.fn();
const mockClFn = jest.fn();
describe('<SearchInput />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders SearchInput', () => {
    const tree = renderer
      .create(
        <Provider>
          <SearchInput
            placeholder="Search for airport or lounge"
            value={'Hello'}
            onChange={mockFn}
            onClickClear={mockClFn}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can type ', async () => {
    render(
      <Provider>
        <SearchInput
          placeholder="Search for airport or lounge"
          value={'Hello'}
          onChange={mockFn}
          onClickClear={mockClFn}
        />
      </Provider>
    );

    const inputnode = screen.getByPlaceholderText(
      'Search for airport or lounge'
    );

    userEvent.type(inputnode, 'Los Angeles');

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(11);
    });
  });
});
