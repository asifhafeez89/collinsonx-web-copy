import * as React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '.';

const mockFn = jest.fn();

describe('<Button />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders outline variant', () => {
    const tree = renderer
      .create(
        <Button
          variant="outline"
          color="dark"
          fullWidth={true}
          handleClick={mockFn}
        />
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
