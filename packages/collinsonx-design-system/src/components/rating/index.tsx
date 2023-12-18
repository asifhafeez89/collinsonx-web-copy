import { Flex, Text, Box } from '@mantine/core';
import { StarIcon } from '../../assets/icons';
import colors from '../../colour-constants-partner';

export interface RatingProps {
  stars: number;
  ratingCount?: number;
}
const MAX_RATING = 5;
function Rating({ stars = 0, ratingCount }: RatingProps) {
  if (stars > MAX_RATING || stars <= 0) {
    return null;
  }
  return (
    <Flex aria-label="rating" align="center" gap={8}>
      <Flex align="center">
        {new Array(stars).fill(null).map((_, index) => (
          <StarIcon key={index} aria-label="star" width={16} height={16} />
        ))}
      </Flex>
      {ratingCount && (
        <Text aria-label="rating-count" color={colors['text-grey']} size={12}>
          {ratingCount}
        </Text>
      )}
    </Flex>
  );
}

export default Rating;
