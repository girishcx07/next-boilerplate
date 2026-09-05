import type { Meta, StoryObj } from '@storybook/nextjs';

import { SignupForm } from '@/components/signup-form';

const meta = {
  component: SignupForm,
  decorators: [
    Story => (
      <div className="mx-auto w-full max-w-sm p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomClassName: Story = {
  args: {
    className: 'border border-dashed p-4',
  },
};
