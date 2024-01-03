import { RenderOptions, render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ReactElement, ReactNode } from 'react';

export const Provider = ({ children }: { children: ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

type Render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => ReturnType<typeof render>;

const customRender: Render = (ui, options) =>
  render(ui, {
    wrapper: Provider as unknown as RenderOptions['wrapper'],
    ...options,
  });

export default customRender;
