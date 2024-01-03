import renderer from 'react-test-renderer';
import { render, screen, waitFor, Provider } from 'test-utils';
import userEvent from '@testing-library/user-event';
import DatePicker from '.';

const mockFn = jest.fn();
const DATE_FORMAT = 'MM/DD/YYYY';

describe('<Datepicker />', () => {
  it('renders datepicker', () => {
    const tree = renderer
      .create(
        <Provider>
          <DatePicker
            placeholder="Pick date"
            label="Date"
            withAsterisk
            clearable={false}
            valueFormat={DATE_FORMAT}
            value={undefined}
            styles={{
              label: {
                color: 'black',
                fontWeight: 600,
              },
            }}
            onChange={mockFn}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('gets clicked once ', async () => {
    render(
      <>
        <DatePicker
          placeholder="Pick date"
          label="Date"
          withAsterisk
          clearable={false}
          valueFormat={DATE_FORMAT}
          value={new Date()}
          styles={{
            label: {
              color: 'black',
              fontWeight: 600,
            },
          }}
          onChange={mockFn}
        />
      </>
    );

    const button = screen.getAllByPlaceholderText('Pick date');

    userEvent.click(button[0]);

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
