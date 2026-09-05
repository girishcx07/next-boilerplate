import type { Meta, StoryObj } from '@storybook/nextjs';

import { Input } from '@/components/ui/input';

const meta = {
  component: Input,
  args: {
    placeholder: 'Type something…',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: 'Existing value' },
};

export const Invalid: Story = {
  args: { 'aria-invalid': true, defaultValue: 'Invalid value' },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled input' },
};
