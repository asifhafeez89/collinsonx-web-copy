import renderer from 'react-test-renderer';
import AuthInput from '.';
import { render, userEvent, waitFor, Provider } from 'test-utils';

const mockFn = jest.fn();
describe('<AuthInput />', () => {
  it('renders AuthInput', () => {
    const tree = renderer
      .create(
        <Provider>
          <AuthInput handleCodeChange={mockFn} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('can type ', async () => {
    const { container } = render(
      <>
        <AuthInput handleCodeChange={mockFn} />
      </>
    );

    const inputs = container.querySelectorAll('input');

    userEvent.type(inputs[0], '123456');

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(6);
      // expect(mockFn).toHaveBeenLastCalledWith('123456');
    });
  });
});
