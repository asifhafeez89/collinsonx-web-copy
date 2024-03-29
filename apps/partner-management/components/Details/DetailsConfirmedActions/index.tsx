import {
  Box,
  Title,
  Text,
  Button,
  Checkbox,
} from '@collinsonx/design-system/core';

import classes from './DetailsConfirmedActions.module.css';

export interface DetailsConfirmedActionsProps {
  checkIn: boolean;
  onChangeCheckIn: (checkIn: boolean) => void;
  onClickConfirmCheckIn: () => void;
}
const DetailsConfirmedActions = ({
  checkIn,
  onChangeCheckIn,
  onClickConfirmCheckIn,
}: DetailsConfirmedActionsProps) => {
  return (
    <Box p={32} bg="#FFF3BF" className={classes.container}>
      <Title w={600} size={16}>
        Ask the below before check in
      </Title>
      <Text mt={4}>&#x2022; Check customer boarding pass and passport</Text>
      <Checkbox
        mt={4}
        py={17}
        checked={checkIn}
        onChange={(e) => onChangeCheckIn(e.target.checked)}
        label="Confirmed I have checked"
        classNames={{ label: classes.checkboxLabel }}
      />
      <Button
        variant="default"
        disabled={!checkIn}
        onClick={onClickConfirmCheckIn}
      >
        Check in
      </Button>
    </Box>
  );
};

export default DetailsConfirmedActions;
