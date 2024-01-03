import renderer from 'react-test-renderer';
import { render, screen, waitFor, userEvent, Provider } from 'test-utils';
import Button from '.';

const mockFn = jest.fn();

describe('<Button />', () => {
  it('renders outline variant', () => {
    const tree = renderer
      .create(
        <Provider>
          <Button
            variant="outline"
            color="dark"
            fullWidth={true}
            handleClick={mockFn}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('gets clicked once ', async () => {
    render(
      <>
        <Button
          variant="outline"
          color="dark"
          fullWidth={true}
          handleClick={mockFn}
        />
      </>
    );

    const button = screen.getByRole('button');

    userEvent.click(button);

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
