import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../src/components/Tooltip';

const meta = {
  title: 'NEXUS-CUSTOM/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: '툴팁 내용',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: '툴팁 위치',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click'],
      description: '툴팁 트리거 방식',
    },
    delay: {
      control: 'number',
      description: '툴팁 표시 지연 시간 (ms)',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Tooltip입니다.
 * 아이콘에 마우스를 올리면 상단에 툴팁이 표시됩니다.
 * children이 없으면 기본 아이콘이 자동으로 표시됩니다.
 *
 * ```tsx
 * <Tooltip content="도움말 내용" />
 * ```
 */
export const Default: Story = {
  args: {
    content: '등록된 시나리오를 삭제할 경우 통계가 삭제될 수 있습니다.',
    placement: 'top',
    trigger: 'hover',
  },
};

/**
 * 텍스트에 툴팁을 적용한 예제입니다.
 * children으로 텍스트를 사용할 수 있습니다.
 *
 * ```tsx
 * <Tooltip content="도움말 내용" placement="top">
 *   <span>등록/시나리오 유형</span>
 * </Tooltip>
 * ```
 */
export const WithText: Story = {
  args: {
    content: '등록된 시나리오를 삭제할 경우 통계가 삭제될 수 있습니다.',
    placement: 'top',
    trigger: 'hover',
    children: <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>등록/시나리오 유형</span>,
  },
};



/**
 * 버튼에 툴팁을 적용한 예제입니다.
 * children으로 버튼이나 다른 컴포넌트를 사용할 수 있습니다.
 *
 * ```tsx
 * <Tooltip content="버튼을 클릭하면 삭제됩니다" placement="top">
 *   <button>삭제</button>
 * </Tooltip>
 * ```
 */
export const WithButton: Story = {
  args: {
    content: '버튼을 클릭하면 데이터가 삭제됩니다.',
    placement: 'top',
    trigger: 'hover',
    children: <button style={{ padding: '8px 16px', cursor: 'pointer' }}>삭제</button>,
  },
};

/**
 * 여러 줄의 내용을 가진 Tooltip입니다.
 * content에 JSX를 사용하여 복잡한 내용도 표시할 수 있습니다.
 *
 * ```tsx
 * <Tooltip
 *   content={
 *     <div>
 *       <div>• 첫 번째 안내 사항</div>
 *       <div>• 두 번째 안내 사항</div>
 *     </div>
 *   }
 * />
 * ```
 */
export const MultiLine: Story = {
  args: {
    content: (
      <div>
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>상담 상태 안내</div>
        <div>• 등록된 시나리오를 삭제할 경우 통계가 삭제될 수 있습니다.</div>
        <div>• 시나리오명 변경 시 먼저 등록된 시나리오명으로 데이터가 확인됩니다.</div>
        <div>• 상담 상태 마지막에 노출</div>
      </div>
    ),
    placement: 'top',
    trigger: 'hover',
  },
};

/**
 * 하단에 표시되는 Tooltip입니다.
 * placement="bottom"으로 설정하면 아래쪽에 툴팁이 표시됩니다.
 *
 * ```tsx
 * <Tooltip content="도움말 내용" placement="bottom" />
 * ```
 */
export const Bottom: Story = {
  args: {
    content: '등록된 시나리오를 삭제할 경우 통계가 삭제될 수 있습니다.',
    placement: 'bottom',
    trigger: 'hover',
  },
};

/**
 * 좌측에 표시되는 Tooltip입니다.
 * placement="left"로 설정하면 왼쪽에 툴팁이 표시됩니다.
 */
export const Left: Story = {
  args: {
    content: '등록된 시나리오를 삭제할 경우 통계가 삭제될 수 있습니다.',
    placement: 'left',
    trigger: 'hover',
  },
};

/**
 * 우측에 표시되는 Tooltip입니다.
 * placement="right"로 설정하면 오른쪽에 툴팁이 표시됩니다.
 */
export const Right: Story = {
  args: {
    content: '등록된 시나리오를 삭제할 경우 통계가 삭제될 수 있습니다.',
    placement: 'right',
    trigger: 'hover',
  },
};

/**
 * 클릭으로 표시되는 Tooltip입니다.
 * trigger="click"으로 설정하면 클릭 시 툴팁이 표시됩니다.
 * 외부 영역 클릭 시 자동으로 닫힙니다.
 *
 * ```tsx
 * <Tooltip content="도움말 내용" trigger="click" />
 * ```
 */
export const ClickTrigger: Story = {
  args: {
    content: '등록된 시나리오를 삭제할 경우 통계가 삭제될 수 있습니다.',
    placement: 'top',
    trigger: 'click',
  },
};

/**
 * 지연 시간이 있는 Tooltip입니다.
 * delay 속성으로 툴팁 표시 지연 시간을 설정할 수 있습니다 (밀리초 단위).
 *
 * ```tsx
 * <Tooltip content="도움말 내용" delay={500} />
 * ```
 */
export const WithDelay: Story = {
  args: {
    content: '등록된 시나리오를 삭제할 경우 통계가 삭제될 수 있습니다.',
    placement: 'top',
    trigger: 'hover',
    delay: 500,
  },
};
