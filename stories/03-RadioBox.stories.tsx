import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RadioBox from '../src/components/form/RadioBox';

/**
 * RadioBox 컴포넌트는 여러 옵션 중 하나만 선택할 수 있는 라디오 버튼입니다.
 *
 * - 여러 옵션 중 하나만 선택해야 할 때 사용합니다.
 * - 같은 name을 가진 라디오 버튼끼리 그룹을 형성합니다.
 * - 체크박스와 달리 한 번 선택하면 다른 옵션으로만 변경 가능합니다.
 */
const meta = {
  title: 'Form/RadioBox',
  component: RadioBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `여러 옵션 중 하나만 선택할 수 있는 라디오 버튼 컴포넌트입니다.

## 사용 방법

\`\`\`tsx
import { RadioBox } from './components/form';
import { useState } from 'react';

function MyComponent() {
  const [selected, setSelected] = useState('1');

  return (
    <>
      <RadioBox
        id="option1"
        name="options"
        value="1"
        label="옵션 1"
        checked={selected === '1'}
        onChange={setSelected}
      />
      <RadioBox
        id="option2"
        name="options"
        value="2"
        label="옵션 2"
        checked={selected === '2'}
        onChange={setSelected}
      />
    </>
  );
}
\`\`\`

## 언제 사용하나요?

- 배송 방법 선택 (택배, 방문수령 등)
- 결제 수단 선택 (카드, 계좌이체 등)
- 설문조사 단일 선택 질문
- 필터링 옵션 (정렬 방식 등)

## 체크박스 vs 라디오박스

- **RadioBox**: 여러 옵션 중 하나만 선택 (배타적 선택)
- **Checkbox**: 여러 옵션 중 여러 개 선택 가능
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '라디오 버튼 옆에 표시될 라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    checked: {
      control: 'boolean',
      description: '라디오 버튼의 선택 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '라디오 버튼 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof RadioBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 라디오 버튼
export const Default: Story = {
  args: {
    id: 'radio-default',
    name: 'default-group',
    value: '1',
    label: '옵션 1',
    checked: false,
    disabled: false,
  },
};

// 선택된 상태
export const Checked: Story = {
  args: {
    id: 'radio-checked',
    name: 'checked-group',
    value: '1',
    label: '선택된 옵션',
    checked: true,
    disabled: false,
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    id: 'radio-disabled',
    name: 'disabled-group',
    value: '1',
    label: '비활성화된 옵션',
    checked: false,
    disabled: true,
  },
};

// 라벨 없이
export const WithoutLabel: Story = {
  args: {
    id: 'radio-no-label',
    name: 'no-label-group',
    value: '1',
    label: '',
    checked: false,
    disabled: false,
  },
};

// 라디오 그룹 예제
export const RadioGroup = {
  render: () => {
    const [selected, setSelected] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <RadioBox
          id="radio-group-1"
          name="radio-group"
          value="option1"
          label="옵션 1"
          checked={selected === 'option1'}
          onChange={setSelected}
        />
        <RadioBox
          id="radio-group-2"
          name="radio-group"
          value="option2"
          label="옵션 2"
          checked={selected === 'option2'}
          onChange={setSelected}
        />
        <RadioBox
          id="radio-group-3"
          name="radio-group"
          value="option3"
          label="옵션 3"
          checked={selected === 'option3'}
          onChange={setSelected}
        />
        <div style={{ marginTop: '16px', padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          선택된 값: <strong>{selected}</strong>
        </div>
      </div>
    );
  },
};

// 가로 정렬 라디오 그룹
export const HorizontalRadioGroup = {
  render: () => {
    const [selected, setSelected] = useState('small');

    return (
      <div>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
          <RadioBox
            id="size-small"
            name="size"
            value="small"
            label="Small"
            checked={selected === 'small'}
            onChange={setSelected}
          />
          <RadioBox
            id="size-medium"
            name="size"
            value="medium"
            label="Medium"
            checked={selected === 'medium'}
            onChange={setSelected}
          />
          <RadioBox
            id="size-large"
            name="size"
            value="large"
            label="Large"
            checked={selected === 'large'}
            onChange={setSelected}
          />
        </div>
        <div style={{ padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          선택된 사이즈: <strong>{selected}</strong>
        </div>
      </div>
    );
  },
};
