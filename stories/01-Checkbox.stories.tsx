import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '../src/components/form/Checkbox';

/**
 * Checkbox 컴포넌트는 여러 항목 중 하나 이상을 선택할 수 있는 체크박스입니다.
 *
 * - 약관 동의, 옵션 선택 등에 사용됩니다.
 * - 폼 제출 시 선택된 값들을 한번에 처리합니다.
 * - 여러 개를 동시에 선택할 수 있습니다.
 */
const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `여러 항목 중 하나 이상을 선택할 수 있는 체크박스 컴포넌트입니다.

## 사용 방법

\`\`\`tsx
import { Checkbox } from './components/form';
import { useState } from 'react';

function MyComponent() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Checkbox
      id="terms"
      label="약관에 동의합니다"
      checked={agreed}
      onChange={setAgreed}
    />
  );
}
\`\`\`

## 언제 사용하나요?

- 약관 동의 (여러 개의 약관을 동시에 체크)
- 옵션 선택 (필터, 설정 등)
- 폼 제출이 필요한 선택 항목

## 체크박스 vs 스위치

- **Checkbox**: 폼 제출 시 처리, 여러 개 선택 가능
- **Switch**: 즉시 적용, on/off 단일 상태
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '체크박스 옆에 표시될 라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    checked: {
      control: 'boolean',
      description: '체크박스의 체크 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '체크박스 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 체크박스
export const Default: Story = {
  args: {
    id: 'checkbox-default',
    label: '약관에 동의합니다',
    checked: false,
    disabled: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
};

// 체크된 상태
export const Checked: Story = {
  args: {
    id: 'checkbox-checked',
    label: '약관에 동의합니다',
    checked: true,
    disabled: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    id: 'checkbox-disabled',
    label: '약관에 동의합니다',
    checked: false,
    disabled: true,
  },
};

// 라벨 없는 체크박스
export const WithoutLabel: Story = {
  args: {
    id: 'checkbox-no-label',
    checked: false,
    disabled: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
};
