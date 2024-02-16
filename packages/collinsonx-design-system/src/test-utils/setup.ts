import userEvent from '@testing-library/user-event';
import render from './render';

export default function (jsx: Parameters<typeof render>[0]) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}
