import type { Meta, StoryObj } from '@storybook/nextjs';

import { NavActions } from '@/components/nav-actions';

const meta = { component: NavActions } satisfies Meta<typeof NavActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
