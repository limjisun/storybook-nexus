import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { SubNavigation } from '../src/components/SubNavigation';

/**
 * NEXUS SubNavigation 컴포넌트
 *
 * 2depth 네비게이션 메뉴입니다.
 * 접을 수 있는 섹션과 배지를 지원합니다.
 *
 * ## Features
 * - ✅ 접을 수 있는 섹션
 * - ✅ 배지 표시 (알림 수)
 * - ✅ 검색 기능
 * - ✅ 활성 상태 표시
 * - ✅ 전체 접기/펼치기
 *
 * ## Usage
 * ```tsx
 * import { SubNavigation } from '@/components/SubNavigation';
 *
 * const sections = [
 *   {
 *     id: 'stats',
 *     label: '통계',
 *     defaultOpen: true,
 *     items: [
 *       { path: '/stats/overview', label: '전체 통화 통계' },
 *       { path: '/stats/agent', label: '상담원 통화 통계', badge: 5 },
 *     ]
 *   }
 * ];
 *
 * <SubNavigation title="CCaaS" sections={sections} searchable />
 * ```
 */
const meta = {
  title: 'NEXUS-CUSTOM/서브네비게이션',
  component: SubNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '2depth 네비게이션 메뉴입니다. 접을 수 있는 섹션과 배지를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ display: 'flex', height: '100vh' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof SubNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 사용 예시
 *
 * 기본 SubNavigation UI를 보여줍니다.
 */
export const Default: Story = {
  args: {},
  render: () => (
    <SubNavigation
      title="CCaaS"
      sections={[
        {
          id: 'stats',
          label: '통계',
          items: [
            { path: '/stats/overview', label: '전체 통화 통계' },
            { path: '/stats/agent', label: '상담원 통화 통계' },
            { path: '/stats/ivr', label: 'IVR 통화 통계' },
          ],
        },
        {
          id: 'qa',
          label: 'QA',
          items: [
            { path: '/qa/monitoring', label: 'QA 모니터링' },
            { path: '/qa/evaluation', label: 'QA 평가항목 설정' },
          ],
        },
      ]}
    />
  ),
};

/**
 * 검색 기능
 *
 * 검색창을 통해 메뉴를 필터링할 수 있습니다.
 */
/*
export const WithSearch: Story = {
  args: {},
  render: () => (
    <SubNavigation
      title="CCaaS"
      searchable
      sections={[
        {
          id: 'stats',
          label: '통계',
          items: [
            { path: '/stats/overview', label: '전체 통화 통계' },
            { path: '/stats/agent', label: '상담원 통화 통계' },
            { path: '/stats/ivr', label: 'IVR 통화 통계' },
            { path: '/stats/outbound', label: '아웃바운드 통계' },
          ],
        },
        {
          id: 'qa',
          label: 'QA',
          items: [
            { path: '/qa/monitoring', label: 'QA 모니터링' },
            { path: '/qa/evaluation', label: 'QA 평가항목 설정' },
            { path: '/qa/recording', label: '녹취 파일 평가' },
          ],
        },
      ]}
    />
  ),
};
*/
/**
 * 배지 표시
 *
 * 알림 개수를 배지로 표시합니다.
 */
/*
export const WithBadges: Story = {
  args: {},
  render: () => (
    <SubNavigation
      title="알림"
      sections={[
        {
          id: 'notifications',
          label: '알림',
          defaultOpen: true,
          items: [
            { path: '/notifications/urgent', label: '긴급 알림', badge: 5 },
            { path: '/notifications/pending', label: '대기 중', badge: 12 },
            { path: '/notifications/completed', label: '완료됨' },
          ],
        },
      ]}
    />
  ),
};
*/
/**
 * 활성 상태
 *
 * 현재 선택된 메뉴가 하이라이트됩니다.
 */
/*
export const WithActiveState: Story = {
  args: {},
  render: () => (
    <SubNavigation
      title="CCaaS"
      activePath="/qa/monitoring"
      sections={[
        {
          id: 'stats',
          label: '통계',
          items: [
            { path: '/stats/overview', label: '전체 통화 통계' },
            { path: '/stats/agent', label: '상담원 통화 통계' },
          ],
        },
        {
          id: 'qa',
          label: 'QA',
          defaultOpen: true,
          items: [
            { path: '/qa/monitoring', label: 'QA 모니터링' },
            { path: '/qa/evaluation', label: 'QA 평가항목 설정' },
          ],
        },
      ]}
    />
  ),
};
*/
/**
 * 섹션 접기/펼치기
 *
 * defaultOpen으로 초기 열림/닫힘 상태를 설정할 수 있습니다.
 */
/*
export const CollapsibleSections: Story = {
  args: {},
  render: () => (
    <SubNavigation
      title="관리자"
      sections={[
        {
          id: 'users',
          label: '사용자 관리',
          defaultOpen: true,
          items: [
            { path: '/users/list', label: '사용자 목록' },
            { path: '/users/roles', label: '권한 관리' },
            { path: '/users/groups', label: '그룹 관리' },
          ],
        },
        {
          id: 'system',
          label: '시스템 설정',
          defaultOpen: false,
          items: [
            { path: '/system/general', label: '일반 설정' },
            { path: '/system/security', label: '보안 설정' },
            { path: '/system/backup', label: '백업/복구' },
          ],
        },
      ]}
    />
  ),
};
*/
/**
 * 전체 접기/펼치기
 *
 * 헤더의 버튼으로 SubNavigation 전체를 접었다 펼쳤다 할 수 있습니다.
 */
export const ToggleNavigation: Story = {
  args: {},
  render: () => (
    <>
      <div style={{
        width: '60px',
        backgroundColor: 'var(--color-primary)',
        borderRight: '1px solid #e0e0e0'
      }}>
        <div style={{ color: '#fff', padding: '20px 10px', textAlign: 'center', fontSize: '12px' }}>
          
        </div>
      </div>
      <SubNavigation
        title="CCaaS"
        sections={[
          {
            id: 'stats',
            label: '통계',
            defaultOpen: true,
            items: [
              { path: '/stats/overview', label: '전체 통화 통계' },
              { path: '/stats/agent', label: '상담원 통화 통계' },
            ],
          },
        ]}
      />
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ marginTop: 0 }}>메인 컨텐츠</h1>
        <p>헤더의 ◀ 버튼을 클릭하면 SubNavigation이 접힙니다.</p>
        <p>접히면 ▶ 버튼이 나타나서 다시 펼칠 수 있습니다.</p>
      </div>
    </>
  ),
};
