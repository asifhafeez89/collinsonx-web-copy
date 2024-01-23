import React from 'react';
import {
  render,
  screen,
  userEvent,
} from '@collinsonx/design-system/test-utils';
import Carousel, { CarouselSlide } from './index';

const slides = Array.from({ length: 4 }, (_, index) => (
  <CarouselSlide key={index} numSlides={4} slideIndex={index + 1}>
    {index + 1}
  </CarouselSlide>
));

const defaultProps = {
  children: <>{slides}</>,
  activeIndex: 0,
  onSlideChange: jest.fn(),
};

describe('carousel', () => {
  it('calls onSlideChange when next/previous buttons are clicked', async () => {
    const onSlideChange = jest.fn();

    render(<Carousel {...defaultProps} onSlideChange={onSlideChange} />);

    await userEvent.click(screen.getByLabelText('Next image'));
    expect(onSlideChange).toHaveBeenCalledWith(1);

    await userEvent.click(screen.getByLabelText('Previous image'));
    expect(onSlideChange).toHaveBeenCalledWith(1);
  });

  it('renders the carousel with correct number of slides', () => {
    render(<Carousel {...defaultProps} />);
    expect(screen.getAllByText(/\d/)).toHaveLength(4);
  });

  it('updates carousel position when activeIndex changes', () => {
    const { rerender } = render(<Carousel {...defaultProps} activeIndex={1} />);
    expect(screen.getByLabelText('2 of 4')).toBeInTheDocument();

    rerender(<Carousel {...defaultProps} activeIndex={2} />);
    expect(screen.getByLabelText('3 of 4')).toBeInTheDocument();
  });

  it('shows or hides carousel controls based on scroll ability', () => {
    render(<Carousel {...defaultProps} />);
    const nextButton = screen.getByLabelText('Next image');
    const prevButton = screen.getByLabelText('Previous image');

    expect(nextButton).toBeEnabled();
    expect(prevButton).toBeDisabled();
  });
});
