import React from 'react';
import Button from '../src/components/form/Button';

/**
 * Button 컴포넌트는 사용자 액션을 위한 기본 버튼입니다.
 *
 * - 폼 제출, 액션 실행 등 사용자 인터랙션을 처리합니다.
 * - Default와 Normal 두 가지 타입을 제공합니다.
 */
export default {
  title: 'Form/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `사용자 액션을 위한 기본 버튼 컴포넌트입니다.

## 사용 방법

\`\`\`tsx
import { Button } from './components/form';

function MyComponent() {
  return (
    <Button
      text="확인"
      type="default"
      onClick={() => console.log('클릭!')}
    />
  );
}
\`\`\`

## 언제 사용하나요?

- 폼 제출 버튼
- 확인/취소 액션
- 페이지 이동 트리거
- 모달 열기/닫기

## 버튼 타입

- **Default**: 주요 액션 (진한 배경)
- **Normal**: 보조 액션 (흰 배경)
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '버튼에 표시될 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      control: 'select',
      options: ['default', 'normal'],
      description: '버튼 타입',
      table: {
        type: { summary: "'default' | 'normal'" },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
};

// 기본 버튼
export const Default = {
  args: {
    text: '기본 버튼',
    type: 'default',
    disabled: false,
  },
};

// 일반 버튼
export const Normal = {
  args: {
    text: '일반 버튼',
    type: 'normal',
    disabled: false,
  },
};

// 비활성화 버튼
export const Disabled = {
  args: {
    text: '비활성화 버튼',
    type: 'default',
    disabled: true,
  },
};

// 버튼 그룹
export const ButtonGroup = {
  render: () => (
    <div className="button-wrap">
      <Button text="취소" type="normal" onClick={() => alert('취소')} />
      <Button text="확인" type="default" onClick={() => alert('확인')} />
    </div>
  ),
};
