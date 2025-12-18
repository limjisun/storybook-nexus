import React from 'react';
import Select from '../src/components/form/Select';

const statusOptions = [
  { value: 'after_call', label: '후처리 대기' },
  { value: 'on_call', label: '통화중' },
  { value: 'break', label: '휴식' },
];

const teamOptions = [
  { value: 'inbound', label: '인바운드', count: 21 },
  { value: 'outbound', label: '아웃바운드', count: 15 },
  { value: 'support', label: '지원팀', count: 8 },
  { value: 'sales', label: '영업팀', count: 12 },
];

/**
 * Select 컴포넌트는 여러 옵션 중 하나를 선택하는 드롭다운입니다.
 *
 * - 상태 선택, 옵션 선택 등에 사용됩니다.
 * - outlined, borderless, filled 3가지 스타일 지원
 * - 드롭다운 너비 자동 조정 (다국어 지원)
 */
export default {
  title: 'Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `여러 옵션 중 하나를 선택하는 드롭다운 컴포넌트입니다.

## 사용 방법

### 기본 사용법

\`\`\`tsx
import { Select } from './components/form';
import { useState } from 'react';

function MyComponent() {
  const [agentStatus, setAgentStatus] = useState('');

  const statusOptions = [
    { value: 'after_call', label: '후처리 대기' },
    { value: 'on_call', label: '통화중' },
    { value: 'break', label: '휴식' },
  ];

  return (
    <Select
      options={statusOptions}
      value={agentStatus}
      onChange={setAgentStatus}
      placeholder="상태 선택"
      variant="outlined"
    />
  );
}
\`\`\`

### 카운트 표시 (인원 수 등)

옵션에 \`count\` 필드를 추가하면 숫자가 자동으로 표시됩니다.

\`\`\`tsx
import { Select } from './components/form';
import { useState } from 'react';

function TeamSelector() {
  const [selectedTeam, setSelectedTeam] = useState('');

  const teamOptions = [
    { value: 'inbound', label: '인바운드', count: 21 },
    { value: 'outbound', label: '아웃바운드', count: 15 },
    { value: 'support', label: '지원팀', count: 8 },
  ];

  return (
    <Select
      options={teamOptions}
      value={selectedTeam}
      onChange={setSelectedTeam}
      placeholder="팀 선택"
      variant="outlined"
    />
  );
}
\`\`\`

## 스타일 변형 (Variants)

- **outlined**: 테두리가 있는 기본 스타일
- **borderless**: 테두리 없는 깔끔한 스타일

## 드롭다운 너비

- 기본: 컨텐츠 길이에 맞춰 자동 조정
- \`dropdownWidth\` prop으로 커스텀 가능

## 언제 사용하나요?

- 상태 선택 (예: 상담원 상태, 작업 상태)
- 카테고리 선택
- 단일 옵션 선택
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: '드롭다운에 표시될 옵션 목록',
      table: {
        type: { summary: 'SelectOption[]' },
      },
    },
    value: {
      control: 'text',
      description: '현재 선택된 값',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: ['outlined', 'borderless'],
      description: '셀렉트 스타일 변형',
      table: {
        type: { summary: "'outlined' | 'borderless' | 'filled'" },
        defaultValue: { summary: 'outlined' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '셀렉트 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
};

// Outlined 스타일 (기본)
export const Outlined = {
  args: {
    options: statusOptions,
    placeholder: '상태 선택',
    variant: 'outlined',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '');
    return <Select {...args} value={value} onChange={setValue} />;
  },
};

// Borderless 스타일
export const Borderless = {
  args: {
    options: statusOptions,
    placeholder: '상태 선택',
    variant: 'borderless',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '');
    return <Select {...args} value={value} onChange={setValue} />;
  },
};

// 선택된 상태
export const Selected = {
  args: {
    options: statusOptions,
    value: 'on_call',
    placeholder: '상태 선택',
    variant: 'outlined',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '');
    return <Select {...args} value={value} onChange={setValue} />;
  },
};

// 비활성화 상태
export const Disabled = {
  args: {
    options: statusOptions,
    value: 'on_call',
    variant: 'outlined',
    disabled: true,
  },
};

// 카운트 표시 (인원 수 등)
export const WithCount = {
  args: {
    options: teamOptions,
    placeholder: '팀 선택',
    variant: 'borderless',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '');
    return <Select {...args} value={value} onChange={setValue} />;
  },
};

// 카운트 표시 + 선택된 상태
export const WithCountSelected = {
  args: {
    options: teamOptions,
    value: 'inbound',
    placeholder: '팀 선택',
    variant: 'borderless',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '');
    return <Select {...args} value={value} onChange={setValue} />;
  },
};

// 다단계 연결 (Cascading Selects)
export const CascadingSelects = {
  render: () => {
    const [selectedTeam, setSelectedTeam] = React.useState('');
    const [sortOrder, setSortOrder] = React.useState('');

    // 샘플 데이터
    const teamOptionsWithCount = [
      { value: 'all', label: '전체', count: 74 },
      { value: 'inbound', label: '인바운드', count: 21 },
      { value: 'outbound', label: '아웃바운드', count: 15 },
      { value: 'support', label: '채팅_전체', count: 8 },
      { value: 'sales', label: '채팅_진행중', count: 12 },
      { value: 'cs', label: '채팅_종료', count: 18 },
    ];

    const sortOptions = [
      { value: 'latest', label: '최신순' },
      { value: 'oldest', label: '오래된순' },
    ];

    return (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
        <Select
          options={teamOptionsWithCount}
          value={selectedTeam}
          onChange={setSelectedTeam}
          placeholder="팀 선택"
          variant="borderless"
        />

        <Select
          options={sortOptions}
          value={sortOrder}
          onChange={setSortOrder}
          placeholder="정렬 선택"
          variant="borderless"
        />
      </div>
    );
  },
};
