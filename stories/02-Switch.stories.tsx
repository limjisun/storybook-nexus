import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Switch from '../src/components/form/Switch';

/**
 * Switch 컴포넌트는 on/off 상태를 전환하는 토글 스위치입니다.
 *
 * - 전화 대기, 채팅 대기 등의 기능을 켜고 끄는 데 사용됩니다.
 * - 간단한 on/off 선택지에 적합합니다.
 * - 체크박스보다 시각적으로 명확한 상태 표시가 가능합니다.
 */
const meta = {
  title: 'Form/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `on/off 상태를 전환하는 토글 스위치 컴포넌트입니다.

## 사용 방법

\`\`\`tsx
import { Switch } from './components/form';
import { useState } from 'react';

function MyComponent() {
  const [callWaiting, setCallWaiting] = useState(false);

  return (
    <Switch
      id="switch1"
      label="콜대기"
      checked={callWaiting}
      onChange={setCallWaiting}
    />
  );
}
\`\`\`

## 언제 사용하나요?

- 실시간으로 기능을 켜고 끌 때 (예: 전화 대기, 채팅 대기)
- 설정을 즉시 적용할 때 (저장 버튼 없이)
- on/off 두 가지 상태만 있을 때

## 체크박스 vs 스위치

- **Switch**: 즉시 적용되는 on/off 설정
- **Checkbox**: 폼 제출이 필요한 선택 항목
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '스위치 옆에 표시될 라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    checked: {
      control: 'boolean',
      description: '스위치의 체크 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '스위치 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스위치
export const Default: Story = {
  args: {
    id: 'switch-default',
    label: '알림 받기',
    checked: false,
    disabled: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};

// 체크된 상태
export const Checked: Story = {
  args: {
    id: 'switch-checked',
    label: '알림 받기',
    checked: true,
    disabled: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    id: 'switch-disabled',
    label: '알림 받기',
    checked: false,
    disabled: true,
  },
};

// 라벨 없이 스위치만
export const WithoutLabel: Story = {
  args: {
    id: 'switch-no-label',
    label: '',
    checked: false,
    disabled: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};
