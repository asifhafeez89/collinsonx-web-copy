import React, { useEffect, useRef } from 'react';
import { ActionIcon, Box, Image, List } from '@collinsonx/design-system/core';
import classes from './ThumbnailList.module.css';
import { WarningAmber } from '@collinsonx/design-system/assets/icons';
import colors from '@collinsonx/design-system/colour-constants-partner';

interface ThumbnailProps {
  url?: string | null;
  description?: string | null;
  title?: string | null;
  warning?: string | null;
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
  const thumbnailRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const activeThumbnail = thumbnailRefs.current[activeIndex];
    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'end',
      });
    }
  }, [activeIndex]);

  return (
    <List className={classes.thumbnailList}>
      {thumbnails.map((thumbnail, index) => (
        <List.Item
          key={thumbnail.url || index}
          className={classes.listItem}
          onClick={() => onThumbnailClick(index)}
          onKeyDown={(e) => e.key === 'Enter' && onThumbnailClick(index)}
          tabIndex={0}
          role="button"
          aria-label={`Thumbnail ${index + 1}`}
          ref={(el) => {
            if (!thumbnailRefs.current[index]) {
              thumbnailRefs.current[index] = el;
            }
          }}
        >
          <Box
            className={classes.thumbnailContainer}
            data-active={index === activeIndex}
            data-testid={`thumbnail-${index}`}
          >
            {thumbnail.warning && (
              <ActionIcon className={classes.warningIcon}>
                <WarningAmber color={colors['text-default']} />
              </ActionIcon>
            )}

            <Image
              src={thumbnail.url}
              alt={thumbnail.description || thumbnail.title || 'Outlet image'}
              className={classes.thumbnail}
            />
          </Box>
        </List.Item>
      ))}
    </List>
  );
};

export default ThumbnailList;
