import React from 'react';
import MultiSelect from '../src/components/form/MultiSelect';

const channelOptions = [
  { value: 'phone', label: '전화' },
  { value: 'chat', label: '채팅' },
  { value: 'email', label: '이메일' },
  { value: 'sms', label: 'SMS' },
];

/**
 * MultiSelect 컴포넌트는 여러 옵션을 동시에 선택할 수 있는 드롭다운입니다.
 *
 * - 채널 선택, 필터 옵션 등에 사용됩니다.
 * - OK/Cancel 버튼으로 확정/취소
 * - Select All 기능 지원
 * - 선택된 항목을 툴팁으로 표시
 */
export default {
  title: 'Form/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `여러 옵션을 동시에 선택할 수 있는 멀티셀렉트 드롭다운입니다.

## 사용 방법

\`\`\`tsx
import { MultiSelect } from './components/form';
import { useState } from 'react';

function MyComponent() {
  const [selectedChannels, setSelectedChannels] = useState([]);

  const channelOptions = [
    { value: 'phone', label: '전화' },
    { value: 'chat', label: '채팅' },
    { value: 'email', label: '이메일' },
    { value: 'sms', label: 'SMS' },
  ];

  return (
    <MultiSelect
      options={channelOptions}
      value={selectedChannels}
      onChange={setSelectedChannels}
      placeholder="채널 선택"
      showSelectAll={true}
    />
  );
}
\`\`\`

## 주요 기능

- **OK/Cancel 버튼**: 선택 확정 또는 취소
- **Select All**: 전체 선택/해제
- **Tooltip**: 선택된 항목 미리보기
- **임시 선택**: OK 전까지 실제 값 변경 안됨

## 스타일 변형 (Variants)

- **outlined**: 테두리가 있는 기본 스타일
- **borderless**: 테두리 없는 깔끔한 스타일
- **filled**: 배경색이 있는 스타일

## 언제 사용하나요?

- 여러 채널 동시 선택
- 필터 옵션 (다중 필터링)
- 권한/역할 선택
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: '드롭다운에 표시될 옵션 목록',
      table: {
        type: { summary: 'MultiSelectOption[]' },
      },
    },
    value: {
      description: '현재 선택된 값들의 배열',
      table: {
        type: { summary: 'string[]' },
      },
    },
    variant: {
      control: 'select',
      options: ['outlined', 'borderless', 'filled'],
      description: '멀티셀렉트 스타일 변형',
      table: {
        type: { summary: "'outlined' | 'borderless' | 'filled'" },
        defaultValue: { summary: 'outlined' },
      },
    },
    showSelectAll: {
      control: 'boolean',
      description: 'Select All 버튼 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    disabled: {
      control: 'boolean',
      description: '멀티셀렉트 비활성화 여부',
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
    options: channelOptions,
    placeholder: '채널 선택',
    variant: 'outlined',
    showSelectAll: true,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value || []);
    return <MultiSelect {...args} value={value} onChange={setValue} />;
  },
};

// Borderless 스타일
export const Borderless = {
  args: {
    options: channelOptions,
    placeholder: '채널 선택',
    variant: 'borderless',
    showSelectAll: true,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value || []);
    return <MultiSelect {...args} value={value} onChange={setValue} />;
  },
};

// Filled 스타일
export const Filled = {
  args: {
    options: channelOptions,
    placeholder: '채널 선택',
    variant: 'filled',
    showSelectAll: true,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value || []);
    return <MultiSelect {...args} value={value} onChange={setValue} />;
  },
};

// Select All 없음
export const WithoutSelectAll = {
  args: {
    options: channelOptions,
    placeholder: '채널 선택',
    variant: 'outlined',
    showSelectAll: false,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value || []);
    return <MultiSelect {...args} value={value} onChange={setValue} />;
  },
};

// 비활성화 상태
export const Disabled = {
  args: {
    options: channelOptions,
    value: ['phone', 'email'],
    variant: 'outlined',
    showSelectAll: true,
    disabled: true,
  },
};
