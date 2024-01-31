import React, { useEffect, useRef } from 'react';
import {
  ActionIcon,
  Button,
  Image,
  List,
} from '@collinsonx/design-system/core';
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
    <List className={classes.thumbnailList} role="tablist">
      {thumbnails.map((thumbnail, index) => (
        <List.Item
          key={thumbnail.url || index}
          className={classes.listItem}
          ref={(el) => {
            if (!thumbnailRefs.current[index]) {
              thumbnailRefs.current[index] = el;
            }
          }}
        >
          <Button
            role="tab"
            aria-label={`Thumbnail ${index + 1}`}
            aria-selected={index === activeIndex}
            aria-controls={`slide-${index}`}
            onClick={() => onThumbnailClick(index)}
            className={classes.thumbnailButton}
            classNames={{
              inner: classes.thumbnailButtonInner,
              label: classes.thumbnailButtonLabel,
            }}
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
              alt={thumbnail.title || ''}
              className={classes.thumbnail}
            />
          </Button>
        </List.Item>
      ))}
    </List>
  );
};

export default ThumbnailList;
