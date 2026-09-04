import type { Meta, StoryObj } from '@storybook/nextjs';

import DashboardPage from '@/app/(auth)/(protected)/dashboard/page';

const meta = { component: DashboardPage } satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
