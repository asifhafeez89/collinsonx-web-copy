import { render, screen } from 'test-utils';
import '@testing-library/jest-dom';
import CardList from './';
import { List } from '@mantine/core';

describe('<CardList />', () => {
  const text = 'foo';
  const ariaLabel = 'my-list';
  it('should render', () => {
    render(
      <CardList aria-label={ariaLabel}>
        <List.Item>{text}</List.Item>
      </CardList>
    );
    expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
  });
  it('should items', () => {
    render(
      <CardList>
        <List.Item>{text}</List.Item>
      </CardList>
    );
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
