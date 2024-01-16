import React, { useMemo, useState } from 'react';
import { Group, Box, Title, Text, Stack } from '@collinsonx/design-system/core';
import { Asset } from '@collinsonx/utils';
import classes from './OutletImages.module.css';
import { Button } from '@collinsonx/design-system';
import ThumbnailList from '@components/ThumbnailList';

interface OutletImagesProps {
  mediaCollection?: (Asset | null)[];
}

const OutletImages: React.FC<OutletImagesProps> = ({ mediaCollection }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = useMemo(() => {
    return (
      mediaCollection
        ?.filter((media): media is Asset => media !== null)
        .map((media) => ({
          url: media.url,
          description: media.description,
          title: media.title,
        })) || []
    );
  }, [mediaCollection]);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  const imageCountText = `${images.length} ${
    images.length === 1 ? 'image' : 'images'
  }`;

  return (
    <Box px="md">
      <Group justify="space-between" align="baseline" gap="sm">
        <Stack gap="xs">
          <Title className={classes.title} order={2}>
            Images
          </Title>
          <Text className={classes.subtitle}>Last edited:</Text>
        </Stack>

        <Button variant="outline" size="md" aria-label="Edit images">
          Edit
        </Button>
      </Group>

      <ThumbnailList
        thumbnails={images}
        onThumbnailClick={handleThumbnailClick}
        activeIndex={activeIndex}
      />

      <Text>{imageCountText}</Text>
    </Box>
  );
};

export default OutletImages;
