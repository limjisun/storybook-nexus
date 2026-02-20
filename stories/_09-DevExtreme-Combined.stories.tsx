import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker, TimeRangePicker, HolidaySettingType } from '../src/components/DateRangePicker';

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

### 휴일 설정 포함 사용법

\`\`\`tsx
<DateRangePicker
  startDate={startDate}
  endDate={endDate}
  onStartDateChange={setStartDate}
  onEndDateChange={setEndDate}
  showHolidaySetting={true}
  holidaySetting={holidaySetting}
  onHolidaySettingChange={setHolidaySetting}
/>
\`\`\`

## 주요 Props

- \`showTime\`: 시간 선택 표시 여부
- \`showButtons\`: Today, Prev, Next 버튼 표시 여부
- \`showHolidaySetting\`: 휴일 설정 표시 여부
- \`holidaySetting\`: 휴일 설정 값 ('none' | 'exclude' | 'only' | 'customExclude' | 'weekendOnly')
- \`onHolidaySettingChange\`: 휴일 설정 변경 핸들러
- \`dateFormat\`: 날짜 표시 형식 (기본값: "yyyy-MM-dd")
- \`timeFormat\`: 시간 표시 형식 (기본값: "HH:mm")
- \`wrapperClassName\`: 전체 래퍼 클래스명 (기본값: "date-picker-wrap")
- \`groupClassName\`: 그룹 컨테이너 클래스명 (기본값: "date-picker-group")
- \`itemClassName\`: 개별 아이템 클래스명 (기본값: "date-picker__item")
  - 휴일 설정 아이템은 자동으로 \`--holiday-setting\` modifier 추가

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

// 휴일 설정 포함
export const WithHolidaySetting: Story = {
  render: () => {
    const today = new Date();
    const [startDate, setStartDate] = useState<Date>(today);
    const [endDate, setEndDate] = useState<Date>(
      new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    );
    const [holidaySetting, setHolidaySetting] = useState<HolidaySettingType>('none');

    const calculateDays = (): number => {
      if (!startDate || !endDate) return 0;
      const diff = endDate.getTime() - startDate.getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const getHolidaySettingLabel = (value: HolidaySettingType): string => {
      const labels: Record<HolidaySettingType, string> = {
        none: '휴일설정 없음',
        exclude: '휴일 제외',
        only: '휴일만 포함',
        customExclude: '사용자지정 휴일제외',
        weekendOnly: '토/일만 제외',
      };
      return labels[value];
    };

    return (
      <div style={{ minWidth: '600px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333' }}>
          기간 선택 (휴일 설정 포함)
        </label>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          showButtons={true}
          showHolidaySetting={true}
          holidaySetting={holidaySetting}
          onHolidaySettingChange={setHolidaySetting}
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
          <div>휴일 설정: {getHolidaySettingLabel(holidaySetting)}</div>
          <div style={{ marginTop: '8px', fontWeight: 'bold', color: '#0066cc' }}>
            기간: {calculateDays()}일
          </div>
        </div>
        <div style={{
          marginTop: '12px',
          padding: '10px',
          backgroundColor: '#e3f2fd',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#1565c0'
        }}>
          <strong>휴일 설정 옵션:</strong>
          <ul style={{ marginTop: '6px', marginBottom: 0, paddingLeft: '18px', lineHeight: '1.6' }}>
            <li><strong>휴일설정 없음</strong>: 모든 날짜 포함</li>
            <li><strong>휴일 제외</strong>: 법정 공휴일을 제외한 날짜만 선택</li>
            <li><strong>휴일만 포함</strong>: 법정 공휴일만 선택</li>
            <li><strong>사용자지정 휴일제외</strong>: 사용자가 지정한 휴일 제외</li>
            <li><strong>토/일만 제외</strong>: 주말(토요일, 일요일)만 제외</li>
          </ul>
        </div>
      </div>
    );
  },
};

// 날짜 + 시간 + 휴일 설정 (풀 옵션)
export const FullFeatured: Story = {
  render: () => {
    const today = new Date();
    const [startDate, setStartDate] = useState<Date>(today);
    const [endDate, setEndDate] = useState<Date>(
      new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    );
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(new Date());
    const [holidaySetting, setHolidaySetting] = useState<HolidaySettingType>('weekendOnly');

    const calculateDays = (): number => {
      if (!startDate || !endDate) return 0;
      const diff = endDate.getTime() - startDate.getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const getHolidaySettingLabel = (value: HolidaySettingType): string => {
      const labels: Record<HolidaySettingType, string> = {
        none: '휴일설정 없음',
        exclude: '휴일 제외',
        only: '휴일만 포함',
        customExclude: '사용자지정 휴일제외',
        weekendOnly: '토/일만 제외',
      };
      return labels[value];
    };

    return (
      <div style={{ minWidth: '700px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333', fontWeight: 'bold' }}>
          전체 기능 예제 (날짜 + 시간 + 휴일설정)
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
          showHolidaySetting={true}
          holidaySetting={holidaySetting}
          onHolidaySettingChange={setHolidaySetting}
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
          <div><strong>시작:</strong> {startDate.toLocaleDateString('ko-KR')} {startTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</div>
          <div><strong>종료:</strong> {endDate.toLocaleDateString('ko-KR')} {endTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</div>
          <div><strong>휴일 설정:</strong> {getHolidaySettingLabel(holidaySetting)}</div>
          <div style={{ marginTop: '8px', fontWeight: 'bold', color: '#0066cc' }}>
            기간: {calculateDays()}일
          </div>
        </div>
        <div style={{
          marginTop: '12px',
          padding: '10px',
          backgroundColor: '#fff3e0',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#e65100'
        }}>
          <strong>💡 Tip:</strong> 이 컴포넌트는 날짜 범위, 시간, 휴일 설정을 모두 지원합니다.
          각 기능은 props를 통해 선택적으로 활성화할 수 있습니다.
        </div>
      </div>
    );
  },
};

