import type { Meta, StoryObj } from '@storybook/nextjs';

import { SiteFooter } from '@/components/site-footer';

const meta = { component: SiteFooter } satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
