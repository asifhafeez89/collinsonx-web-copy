import React from 'react';
import {
  render,
  screen,
  userEvent,
} from '@collinsonx/design-system/test-utils';
import CarouselControls from './';
import '@testing-library/jest-dom';

jest.mock('@collinsonx/design-system/assets/icons', () => ({
  __esModule: true,
  ChevronRight: () => {
    return 'icon';
  },
  ChevronLeft: () => {
    return 'icon';
  },
}));

describe('CarouselControls Component', () => {
  it('toggles visibility based on isHovered prop', () => {
    const { rerender } = render(
      <CarouselControls
        canScrollNext={true}
        canScrollPrev={true}
        onPrev={() => {}}
        onNext={() => {}}
        showControls={false}
      />
    );
    expect(screen.getByLabelText('Previous image').parentNode).toHaveClass(
      'hidden'
    );
    expect(screen.getByLabelText('Next image').parentNode).toHaveClass(
      'hidden'
    );

    rerender(
      <CarouselControls
        canScrollNext={true}
        canScrollPrev={true}
        onPrev={() => {}}
        onNext={() => {}}
        showControls={true}
      />
    );
    expect(screen.getByLabelText('Previous image').parentNode).not.toHaveClass(
      'hidden'
    );
    expect(screen.getByLabelText('Next image').parentNode).not.toHaveClass(
      'hidden'
    );
  });

  it('disables/enables buttons based on canScrollPrev and canScrollNext', () => {
    render(
      <CarouselControls
        canScrollNext={false}
        canScrollPrev={true}
        onPrev={() => {}}
        onNext={() => {}}
        showControls={true}
      />
    );
    expect(screen.getByLabelText('Previous image')).toBeEnabled();
    expect(screen.getByLabelText('Next image')).toBeDisabled();
  });

  it('calls onPrev and onNext when buttons are clicked', async () => {
    const handlePrev = jest.fn();
    const handleNext = jest.fn();

    render(
      <CarouselControls
        canScrollNext={true}
        canScrollPrev={true}
        onPrev={handlePrev}
        onNext={handleNext}
        showControls={true}
      />
    );

    await userEvent.click(screen.getByLabelText('Previous image'));
    expect(handlePrev).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByLabelText('Next image'));
    expect(handleNext).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-labels for buttons', () => {
    render(
      <CarouselControls
        canScrollNext={true}
        canScrollPrev={true}
        onPrev={() => {}}
        onNext={() => {}}
        showControls={true}
      />
    );
    expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
    expect(screen.getByLabelText('Next image')).toBeInTheDocument();
  });

  it('renders correctly', () => {
    render(
      <CarouselControls
        canScrollNext={true}
        canScrollPrev={true}
        onPrev={() => {}}
        onNext={() => {}}
        showControls={true}
      />
    );
    expect(screen.getByLabelText('Previous image')).toBeVisible();
    expect(screen.getByLabelText('Next image')).toBeVisible();
  });
});
