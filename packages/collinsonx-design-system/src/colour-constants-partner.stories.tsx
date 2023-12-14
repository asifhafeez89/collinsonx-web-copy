import type { Meta, StoryObj } from '@storybook/nextjs';
import colors from './colour-constants-partner';
import { Box, Flex, Table, Title, Notification } from '@mantine/core';

const Component = () => (
  <Flex p={40} bg={colors.white} direction="column" gap={24}>
    <Title>Colors</Title>
    <Notification variant="info" withCloseButton={false} w={300}>
      Click on any row to copy hex value
    </Notification>
    <Table highlightOnHover maw={300} withBorder withColumnBorders>
      <thead>
        <tr>
          <th>Key</th>
          <th>Hex</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(colors).map((key) => (
          <tr
            key={key}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (navigator) {
                navigator.clipboard.writeText(colors[key]);
              }
            }}
          >
            <td>{key}</td>
            <td>{colors[key]}</td>
            <td>
              <Box h={24} w={'100%'} bg={colors[key]} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Flex>
);

const meta: Meta<typeof Component> = {
  title: 'Partner/Theme/Colors',
  component: Component,
  parameters: { docs: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Colors: Story = {
  args: {},
};
