import type { Meta, StoryObj } from '@storybook/nextjs';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const meta = {
  component: Field,
  args: {
    orientation: 'vertical',
  },
  render: args => (
    <Field {...args}>
      <FieldLabel htmlFor="storybook-field">Project name</FieldLabel>
      <Input id="storybook-field" placeholder="My project" />
      <FieldDescription>Choose a name that your team will recognize.</FieldDescription>
    </Field>
  ),
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};

export const Responsive: Story = {
  args: { orientation: 'responsive' },
};
