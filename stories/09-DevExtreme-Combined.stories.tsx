import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker, TimeRangePicker } from '../src/components/DateRangePicker';

/**
 * DevExtreme 결합 컴포넌트
 *
 * - DevExtreme 기본 컴포넌트들을 조합하여 만든 재사용 가능한 컴포넌트
 * - 실제 프로젝트에서 자주 사용되는 패턴들을 컴포넌트화
 */
const meta = {
  title: 'DevExtreme/결합 Date select 컴포넌트',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `DevExtreme 기본 컴포넌트들을 조합한 재사용 가능한 컴포넌트들입니다.

## DateRangePicker

날짜 범위 선택을 위한 컴포넌트입니다.

### 기본 사용법

\`\`\`tsx
import { DateRangePicker } from 'src/components/DateRangePicker';

<DateRangePicker
  startDate={startDate}
  endDate={endDate}
  onStartDateChange={setStartDate}
  onEndDateChange={setEndDate}
  showButtons={true}
/>
\`\`\`

### 시간 포함 사용법

\`\`\`tsx
<DateRangePicker
  startDate={startDate}
  endDate={endDate}
  onStartDateChange={setStartDate}
  onEndDateChange={setEndDate}
  startTime={startTime}
  endTime={endTime}
  onStartTimeChange={setStartTime}
  onEndTimeChange={setEndTime}
  showTime={true}
  showButtons={true}
/>
\`\`\`

## 주요 Props

- \`showTime\`: 시간 선택 표시 여부
- \`showButtons\`: Today, Prev, Next 버튼 표시 여부
- \`dateFormat\`: 날짜 표시 형식 (기본값: "yyyy-MM-dd")
- \`timeFormat\`: 시간 표시 형식 (기본값: "HH:mm")
- \`wrapperClassName\`: 전체 래퍼 클래스명 (기본값: "date-picker-wrap")
- \`groupClassName\`: 그룹 컨테이너 클래스명 (기본값: "date-picker-group")

## 너비 조절

컴포넌트의 너비는 CSS 클래스로 관리됩니다.
\`.date-picker-container\` 클래스에 width를 설정하여 해상도별 반응형 처리가 가능합니다.

\`\`\`css
.date-picker-container {
  width: 200px;
}

@media (max-width: 768px) {
  .date-picker-container {
    width: 150px;
  }
}
\`\`\`
`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 날짜 범위 선택
export const BasicDateRange: Story = {
  render: () => {
    const today = new Date();
    const [startDate, setStartDate] = useState<Date>(today);
    const [endDate, setEndDate] = useState<Date>(
      new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    );

    const calculateDays = (): number => {
      if (!startDate || !endDate) return 0;
      const diff = endDate.getTime() - startDate.getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    return (
      <div style={{ minWidth: '500px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333' }}>
          기간 선택
        </label>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          showButtons={true}
          groupClassName="date-range-row"
        />
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          fontSize: '14px',
          color: '#666'
        }}>
          <div>시작일: {startDate.toLocaleDateString('ko-KR')}</div>
          <div>종료일: {endDate.toLocaleDateString('ko-KR')}</div>
          <div style={{ marginTop: '8px', fontWeight: 'bold', color: '#0066cc' }}>
            기간: {calculateDays()}일
          </div>
        </div>
      </div>
    );
  },
};

// 날짜 + 시간 범위 선택
export const DateTimeRange: Story = {
  render: () => {
    const today = new Date();
    const [startDate, setStartDate] = useState<Date>(today);
    const [endDate, setEndDate] = useState<Date>(
      new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    );
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(new Date());

    const calculateDays = (): number => {
      if (!startDate || !endDate) return 0;
      const diff = endDate.getTime() - startDate.getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    return (
      <div style={{ minWidth: '600px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333' }}>
          기간 및 시간 선택
        </label>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          startTime={startTime}
          endTime={endTime}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
          showTime={true}
          showButtons={true}
          groupClassName="date-range-row"
        />
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          fontSize: '14px',
          color: '#666'
        }}>
          <div>시작: {startDate.toLocaleDateString('ko-KR')} {startTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</div>
          <div>종료: {endDate.toLocaleDateString('ko-KR')} {endTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</div>
          <div style={{ marginTop: '8px', fontWeight: 'bold', color: '#0066cc' }}>
            기간: {calculateDays()}일
          </div>
        </div>
      </div>
    );
  },
};

// 버튼 없는 심플 버전
export const SimpleVersion: Story = {
  render: () => {
    const today = new Date();
    const [startDate, setStartDate] = useState<Date>(today);
    const [endDate, setEndDate] = useState<Date>(
      new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    );

    return (
      <div style={{ minWidth: '400px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333' }}>
          기간 선택 (심플)
        </label>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          showButtons={false}
          groupClassName="date-range-row"
        />
        <div style={{ marginTop: '8px', fontSize: '13px', color: '#999' }}>
          Today, Prev, Next 버튼이 없는 심플한 버전
        </div>
      </div>
    );
  },
};

// 커스텀 포맷
export const CustomFormat: Story = {
  render: () => {
    const today = new Date();
    const [startDate, setStartDate] = useState<Date>(today);
    const [endDate, setEndDate] = useState<Date>(
      new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    );

    return (
      <div style={{ minWidth: '500px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333' }}>
          기간 선택 (MM/dd/yyyy 형식)
        </label>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          showButtons={true}
          dateFormat="MM/dd/yyyy"
          groupClassName="date-range-row"
        />
        <div style={{ marginTop: '8px', fontSize: '13px', color: '#999' }}>
          미국식 날짜 형식 (MM/dd/yyyy)
        </div>
      </div>
    );
  },
};

// 시간 범위만 선택
export const TimeRangeOnly: Story = {
  render: () => {
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(new Date());

    return (
      <div style={{ minWidth: '300px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333' }}>
          시간 범위 선택
        </label>
        <TimeRangePicker
          startTime={startTime}
          endTime={endTime}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
          groupClassName="date-range-row"
        />
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          fontSize: '14px',
          color: '#666'
        }}>
          <div>시작 시간: {startTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</div>
          <div>종료 시간: {endTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      </div>
    );
  },
};

