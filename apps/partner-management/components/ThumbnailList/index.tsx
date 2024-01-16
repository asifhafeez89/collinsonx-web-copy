import React from 'react';
import { Image, List } from '@collinsonx/design-system/core';
import classes from './ThumbnailList.module.css';

interface ThumbnailProps {
  url?: string | null;
  description?: string | null;
  title?: string | null;
}

type ThumbnailListProps = {
  thumbnails: ThumbnailProps[];
  onThumbnailClick: (index: number) => void;
  activeIndex: number;
};

const ThumbnailList: React.FC<ThumbnailListProps> = ({
  thumbnails,
  onThumbnailClick,
  activeIndex,
}) => {
  return (
    <List className={classes.thumbnailList}>
      {thumbnails.map((thumbnail, index) => (
        <List.Item
          key={thumbnail.url}
          className={classes.listItem}
          onClick={() => onThumbnailClick(index)}
          tabIndex={0}
          role="button"
          aria-label={`Thumbnail ${index + 1}`}
        >
          <Image
            src={thumbnail.url}
            alt={thumbnail.description || thumbnail.title || 'Outlet image'}
            className={classes.thumbnail}
            data-active={index === activeIndex ? 'true' : 'false'}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default ThumbnailList;
