import React from 'react';
import {
  render,
  screen,
  userEvent,
} from '@collinsonx/design-system/test-utils';
import '@testing-library/jest-dom/extend-expect';
import ThumbnailList from './';

const mockThumbnails = [
  { url: 'url1', description: 'desc1', title: 'title1' },
  { url: 'url2', description: 'desc2', title: 'title2' },
];

describe('ThumbnailList', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('renders the correct number of thumbnails', () => {
    render(
      <ThumbnailList
        thumbnails={mockThumbnails}
        onThumbnailClick={() => {}}
        activeIndex={0}
      />
    );
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockThumbnails.length);
  });

  it('calls onThumbnailClick with the correct index', async () => {
    const mockOnClick = jest.fn();
    render(
      <ThumbnailList
        thumbnails={mockThumbnails}
        onThumbnailClick={mockOnClick}
        activeIndex={0}
      />
    );
    const firstThumbnail = screen.getAllByRole('tab')[0];
    await userEvent.click(firstThumbnail);
    expect(mockOnClick).toHaveBeenCalledWith(0);
  });

  it('marks the active thumbnail correctly', () => {
    render(
      <ThumbnailList
        thumbnails={mockThumbnails}
        onThumbnailClick={() => {}}
        activeIndex={1}
      />
    );
    const activeThumbnail = screen.getByTestId('thumbnail-1');
    expect(activeThumbnail).toHaveAttribute('data-active', 'true');
  });

  it('sets the correct aria-label and role for thumbnails', () => {
    render(
      <ThumbnailList
        thumbnails={mockThumbnails}
        onThumbnailClick={() => {}}
        activeIndex={0}
      />
    );
    const thumbnails = screen.getAllByRole('tab');
    thumbnails.forEach((thumbnail, index) => {
      expect(thumbnail).toHaveAttribute('aria-label', `Thumbnail ${index + 1}`);
    });
  });

  it('sets the correct alt text for images', () => {
    render(
      <ThumbnailList
        thumbnails={mockThumbnails}
        onThumbnailClick={() => {}}
        activeIndex={0}
      />
    );
    const images = screen.getAllByRole('img');
    images.forEach((img, index) => {
      expect(img).toHaveAttribute(
        'alt',
        mockThumbnails[index].description ||
          mockThumbnails[index].title ||
          'Outlet image'
      );
    });
  });
});
