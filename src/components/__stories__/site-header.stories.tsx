import type { Meta, StoryObj } from '@storybook/nextjs';

import { SiteHeader } from '@/components/site-header';

const meta = { component: SiteHeader } satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
