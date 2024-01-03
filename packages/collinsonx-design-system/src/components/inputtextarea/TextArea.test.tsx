import renderer from 'react-test-renderer';
import TextArea from '.';
import { render, screen, waitFor, Provider } from 'test-utils';
import userEvent from '@testing-library/user-event';

const mockFn = jest.fn();

describe('<Textarea />', () => {
  it('renders Textarea', () => {
    const tree = renderer
      .create(
        <Provider>
          <TextArea
            placeholder="Your comment"
            label="Your comment"
            withAsterisk
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can type ', async () => {
    render(
      <>
        <TextArea
          placeholder="Your comment"
          label="Your comment"
          withAsterisk
          onChange={mockFn}
        />
      </>
    );

    const inputnode = screen.getByPlaceholderText('Your comment');

    userEvent.type(inputnode, 'Hello');

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(5);
    });
  });
});
