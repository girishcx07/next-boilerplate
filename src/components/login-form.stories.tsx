import type { Meta, StoryObj } from '@storybook/nextjs';

import { LoginForm } from '@/components/login-form';

const meta = {
  component: LoginForm,
  decorators: [
    Story => (
      <div className="mx-auto w-full max-w-sm p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
