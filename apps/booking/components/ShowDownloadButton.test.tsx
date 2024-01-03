import { render } from '@collinsonx/design-system/test-utils';
import '@testing-library/jest-dom/extend-expect';
import ShowDownloadButton from './ShowDownloadButton';
import { Button } from '@collinsonx/design-system/core';

describe('<ShowDownloadButton/>', () => {
  it('render with higher version', () => {
    const { getByText } = render(
      <ShowDownloadButton currentVersion={'6'} minVersion={'5'}>
        <Button>Hello World</Button>
      </ShowDownloadButton>
    );
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  it('render with lower version', () => {
    const screen = render(
      <ShowDownloadButton currentVersion={'5'} minVersion={'6'}>
        <Button>Hello World</Button>
      </ShowDownloadButton>
    );

    const submitButton = screen.queryByText('Hello World');

    expect(submitButton).not.toBeInTheDocument();
  });
});
