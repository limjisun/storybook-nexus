import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from '../src/components/Sidebar';
import type { MenuItem } from '../src/components/Sidebar';

/**
 * NEXUS Sidebar 컴포넌트
 *
 * 좌측 네비게이션 사이드바입니다.
 * 아이콘 기반 메뉴와 호버 시 툴팁으로 구성됩니다.
 *
 * ## Features
 * - ✅ 아이콘 기반 네비게이션
 * - ✅ 호버 시 툴팁 표시
 * - ✅ 활성 상태 표시
 * - ✅ 커스터마이징 가능한 메뉴 아이템
 *
 * ## Usage
 * ```tsx
 * import { Sidebar } from '@/components/Sidebar';
 *
 * <Sidebar menuItems={customMenuItems} />
 * ```
 */
const meta = {
  title: 'NEXUS-CUSTOM/사이드바',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '좌측 네비게이션 사이드바입니다. 아이콘 기반 메뉴와 호버 시 툴팁으로 구성됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activePath: {
      control: 'select',
      options: ['/counsel', '/quality', '/aiagent', '/monitor', '/analytics', '/settings', '/scenario', '/schedule', '/control', '/favorites'],
      description: '현재 활성화된 메뉴 경로',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    menuItems: {
      control: 'object',
      description: '메뉴 아이템 목록',
      table: {
        type: { summary: 'MenuItem[]' },
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ display: 'flex', height: '100vh' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 사용 예시
 *
 * 기본 메뉴 아이템으로 구성된 사이드바입니다.
 */
export const Default: Story = {
  args: {},
};

/**
 * 활성 상태 - 상담앱
 *
 * 첫 번째 메뉴 아이템이 활성화된 상태입니다.
 */
export const ActiveCounsel: Story = {
  args: {
    activePath: '/counsel',
  },
};

