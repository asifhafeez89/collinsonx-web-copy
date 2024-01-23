import React from 'react';
import {
  render,
  screen,
  userEvent,
} from '@collinsonx/design-system/test-utils';
import Slide from '.';
import '@testing-library/jest-dom';

describe('Slide Component', () => {
  it('renders correctly', () => {
    render(
      <Slide slideIndex={1} numSlides={5}>
        {'Test Slide'}
      </Slide>
    );
    expect(screen.getByText('Test Slide')).toBeInTheDocument();
  });

  it('displays warning when provided', () => {
    render(
      <Slide slideIndex={1} numSlides={5} warning="Test Warning">
        {'Test Slide'}
      </Slide>
    );
    expect(screen.getByLabelText('Warning')).toBeInTheDocument();
  });

  it('sets correct aria attributes', () => {
    render(
      <Slide slideIndex={2} numSlides={5}>
        {'Test Slide'}
      </Slide>
    );
    const slide = screen.getByLabelText('2 of 5');
    expect(slide).toHaveAttribute('aria-description', 'slide');
  });

  it('shows tooltip with warning message on hover', async () => {
    render(
      <Slide slideIndex={1} numSlides={5} warning="Test Warning">
        {'Test Slide'}
      </Slide>
    );
    userEvent.hover(screen.getByLabelText('Warning'));
    expect(await screen.findByText('Test Warning')).toBeInTheDocument();
  });
});
