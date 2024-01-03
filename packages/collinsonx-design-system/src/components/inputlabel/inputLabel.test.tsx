import renderer from 'react-test-renderer';
import { render, screen, waitFor, Provider } from 'test-utils';
import userEvent from '@testing-library/user-event';
import InputLabel from '.';

const mockFn = jest.fn();

describe('<InputLabel />', () => {
  it('renders textinput', () => {
    const tree = renderer
      .create(
        <Provider>
          <InputLabel placeholder="Your name" label="Full name" withAsterisk />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('gets clicked once ', async () => {
    render(
      <>
        <InputLabel
          placeholder="Your name"
          label="Full name"
          withAsterisk
          onChange={mockFn}
        />
      </>
    );

    const inputnode = screen.getByPlaceholderText('Your name');

    userEvent.type(inputnode, 'Hello');

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(5);
    });
  });
});
