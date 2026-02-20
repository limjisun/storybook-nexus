import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateBox, { DateBoxTypes } from 'devextreme-react/date-box';
import DateRangeBox from 'devextreme-react/date-range-box';

/**
 * DevExtreme DateBox 컴포넌트
 *
 * - 날짜/시간 선택을 위한 입력 필드
 * - 다양한 표시 형식 지원 (날짜, 시간, 날짜+시간)
 * - 범위 제한, 비활성 날짜 설정 등
 * - Today, 전/후 버튼 등 커스텀 버튼 지원
 */
const meta = {
  title: 'DevExtreme/DatePicker',
  component: DateBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `DevExtreme DateBox는 강력한 날짜/시간 선택 컴포넌트입니다.

## 기본 사용법

\`\`\`tsx
import DateBox from 'devextreme-react/date-box';

<DateBox
  type="date"
  placeholder="날짜 선택"
  displayFormat="yyyy-MM-dd"
/>
\`\`\`

## Type 옵션
- \`date\`: 날짜만 선택
- \`time\`: 시간만 선택
- \`datetime\`: 날짜 + 시간 선택

## 주요 Props
- \`displayFormat\`: 날짜 표시 형식 (예: "yyyy-MM-dd", "MM/dd/yyyy")
- \`min\`, \`max\`: 선택 가능한 날짜 범위
- \`disabledDates\`: 비활성화할 날짜 배열 또는 함수
- \`showClearButton\`: 날짜 삭제 버튼 표시
- \`buttons\`: 커스텀 버튼 추가 (Today, 전/후 버튼 등)
`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 DateBox (날짜만)
export const BasicDateBox: Story = {
  render: () => {
    const [value, setValue] = useState<Date>(new Date());

    return (
     <div style={{ minWidth: '250px' }}>
         <div className='date-picker__item'>
          <DateBox
            type="date"
            value={value}
            onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => setValue(e.value)}
            displayFormat="yyyy-MM-dd"
            placeholder="날짜를 선택하세요"
          />
        </div>
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            선택된 날짜: {value.toLocaleDateString('ko-KR')}
          </div>
      </div>
    );
  },
};

// 전/후 버튼이 있는 DateBox
export const WithPrevNextButtons: Story = {
  render: () => {
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const [value, setValue] = useState<Date>(new Date());

    return (
       <div style={{ minWidth: '250px' }}>
        <div className='date-picker__item'>
          <DateBox
            type="date"
            value={value}
            onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => setValue(e.value)}
            displayFormat="yyyy-MM-dd"
            placeholder="날짜를 선택하세요"
            useMaskBehavior={true}
            buttons={[
              {
                name: 'today',
                location: 'before',
                options: {
                  text: 'Today',
                  stylingMode: 'text',
                  elementAttr: {
                    class: 'today-button'
                  },
                  onClick: () => {
                    setValue(new Date());
                  }
                }
              },
              {
                name: 'prevDate',
                location: 'before',
                options: {
                  icon: 'spinprev',
                  stylingMode: 'text',
                  elementAttr: {
                    class: 'direc-button'
                  },
                  onClick: () => {
                    setValue(new Date(value.getTime() - millisecondsInDay));
                  }
                }
              },
              {
                name: 'nextDate',
                location: 'after',
                options: {
                  icon: 'spinnext',
                  stylingMode: 'text',
                  elementAttr: {
                    class: 'direc-button'
                  },
                  onClick: () => {
                    setValue(new Date(value.getTime() + millisecondsInDay));
                  }
                }
              },
              'dropDown'
            ]}
          />
        </div>
       <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          선택된 날짜: {value ? value.toLocaleDateString('ko-KR') : '없음'}
        </div>
        <div style={{ marginTop: '8px', fontSize: '13px', color: '#999' }}>
          • Today 버튼: 오늘 날짜로 설정
          <br />
          • ◀ 버튼: 이전 날짜 (하루 전)
          <br />
          • ▶ 버튼: 다음 날짜 (하루 후)
          <br />
          • 드롭다운 버튼: 달력 열기
        </div>
      </div>
    );
  },
};

// 시간 선택
export const TimeBox: Story = {
  render: () => {
    const [value, setValue] = useState<Date>(new Date());

    return (
      <div style={{ minWidth: '250px' }} >
        <div className='date-picker__item'>
          <DateBox
            type="time"
            value={value}
            onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => setValue(e.value)}
            displayFormat="HH:mm"
            placeholder="시간을 선택하세요"
          />
        </div>
          <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            선택된 시간: {value ? value.toLocaleTimeString('ko-KR') : '없음'}
          </div>
      </div>
    );
  },
};

// 비활성화 상태
export const Disabled: Story = {
  render: () => {
    return (
      <div style={{ minWidth: '250px' }}>
        <div className='date-picker__item'>
          <DateBox
            type="date"
            value={new Date()}
            displayFormat="yyyy-MM-dd"
            disabled={true}
          />
        </div>
      </div>
    );
  },
};

/*
export const DateTimeBox: Story = {
  render: () => {
    const [value, setValue] = useState<Date>(new Date());

    return (
      <div style={{ minWidth: '250px' }}>
        <DateBox
          type="datetime"
          value={value}
          onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => setValue(e.value)}
          displayFormat="yyyy-MM-dd HH:mm"
          placeholder="날짜와 시간을 선택하세요"
          showClearButton={true}
        />
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          선택된 날짜/시간: {value ? value.toLocaleString('ko-KR') : '없음'}
        </div>
      </div>
    );
  },
};


export const DateRangeRestriction: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1); // 이번 달 1일
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // 이번 달 마지막 날

    return (
      <div style={{ minWidth: '250px' }}>
        <DateBox
          type="date"
          value={today}
          min={minDate}
          max={maxDate}
          displayFormat="yyyy-MM-dd"
          placeholder="이번 달 날짜만 선택 가능"
          showClearButton={true}
        />
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          선택 가능 범위: {minDate.toLocaleDateString('ko-KR')} ~ {maxDate.toLocaleDateString('ko-KR')}
        </div>
      </div>
    );
  },
};


export const DisabledWeekends: Story = {
  render: () => {
    const disableWeekends = (data: { date: Date }): boolean => {
      const day = data.date.getDay();
      return day === 0 || day === 6;
    };

    return (
      <div style={{ minWidth: '250px' }}>
        <DateBox
          type="date"
          displayFormat="yyyy-MM-dd"
          placeholder="평일만 선택 가능"
          disabledDates={disableWeekends}
          showClearButton={true}
        />
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          주말은 선택할 수 없습니다
        </div>
      </div>
    );
  },
};

export const VariousFormats: Story = {
  render: () => {
    const [value, setValue] = useState<Date>(new Date());

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333' }}>
            yyyy-MM-dd
          </label>
          <DateBox
            type="date"
            value={value}
            onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => setValue(e.value)}
            displayFormat="yyyy-MM-dd"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333' }}>
            MM/dd/yyyy
          </label>
          <DateBox
            type="date"
            value={value}
            onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => setValue(e.value)}
            displayFormat="MM/dd/yyyy"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333' }}>
            yyyy년 MM월 dd일
          </label>
          <DateBox
            type="date"
            value={value}
            onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => setValue(e.value)}
            displayFormat="yyyy년 MM월 dd일"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#333' }}>
            EEEE, MMMM d, yyyy (영문)
          </label>
          <DateBox
            type="date"
            value={value}
            onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => setValue(e.value)}
            displayFormat="EEEE, MMMM d, yyyy"
          />
        </div>
      </div>
    );
  },
};
*/

// ============================================
// DateRangeBox 스토리
// ============================================

// Today 버튼이 있는 DateRangeBox
export const DateRangeBoxWithTodayButton: Story = {
  render: () => {
    const [value, setValue] = useState<[Date, Date]>([new Date(), new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)]);

    return (
      <div>
        <div className='date-picker__item'>
          <DateRangeBox
            startDate={value[0]}
            endDate={value[1]}
            onValueChanged={(e: any) => {
              if (e.value) {
                setValue(e.value);
              }
            }}
            displayFormat="yyyy-MM-dd"
            startDatePlaceholder="시작일"
            endDatePlaceholder="종료일"
            applyValueMode="useButtons"
            applyButtonText="저장"
            cancelButtonText="닫기"
            dropDownOptions={{
              wrapperAttr: {
                class: 'custom-daterange-popup'
              }
            }}
          />
        </div>
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          <div>시작일: {value[0]?.toLocaleDateString('ko-KR')}</div>
          <div>종료일: {value[1]?.toLocaleDateString('ko-KR')}</div>
          <div style={{ marginTop: '8px', fontWeight: 'bold', color: '#0066cc' }}>
            기간: {Math.ceil((value[1].getTime() - value[0].getTime()) / (1000 * 60 * 60 * 24))}일
          </div>
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#999' }}>
            • 캘린더 하단에 "Today" 버튼이 표시됩니다
            <br />
            • "OK" 버튼을 눌러야 날짜가 적용됩니다
          </div>
        </div>
      </div>
    );
  },
};

