import React from 'react';
import DateBox, { DateBoxTypes } from 'devextreme-react/date-box';
import './DateRangePicker.css';

export interface DateRangePickerProps {
  /** 시작 날짜 */
  startDate: Date;
  /** 종료 날짜 */
  endDate: Date;
  /** 시작 날짜 변경 핸들러 */
  onStartDateChange: (date: Date) => void;
  /** 종료 날짜 변경 핸들러 */
  onEndDateChange: (date: Date) => void;
  /** 시작 시간 (옵션) */
  startTime?: Date;
  /** 종료 시간 (옵션) */
  endTime?: Date;
  /** 시작 시간 변경 핸들러 (옵션) */
  onStartTimeChange?: (time: Date) => void;
  /** 종료 시간 변경 핸들러 (옵션) */
  onEndTimeChange?: (time: Date) => void;
  /** 시간 선택 표시 여부 */
  showTime?: boolean;
  /** Today, Prev, Next 버튼 표시 여부 */
  showButtons?: boolean;
  /** 날짜 표시 형식 */
  dateFormat?: string;
  /** 시간 표시 형식 */
  timeFormat?: string;
  /** 시작 날짜 placeholder */
  startDatePlaceholder?: string;
  /** 종료 날짜 placeholder */
  endDatePlaceholder?: string;
  /** 시작 시간 placeholder */
  startTimePlaceholder?: string;
  /** 종료 시간 placeholder */
  endTimePlaceholder?: string;
  /** 전체 래퍼 클래스명 */
  wrapperClassName?: string;
  /** 날짜 그룹 클래스명 */
  groupClassName?: string;
  /** 개별 아이템 클래스명 */
  itemClassName?: string;
}

/**
 * DateRangePicker 컴포넌트
 *
 * 날짜 범위와 시간을 선택할 수 있는 컴포넌트입니다.
 * DevExtreme DateBox를 기반으로 만들어졌습니다.
 */
export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  showTime = false,
  showButtons = true,
  dateFormat = 'yyyy-MM-dd',
  timeFormat = 'HH:mm',
  startDatePlaceholder = '시작 날짜',
  endDatePlaceholder = '종료 날짜',
  startTimePlaceholder = '00',
  endTimePlaceholder = '23',
  wrapperClassName = 'date-picker-wrap',
  groupClassName = 'date-picker__group',
  itemClassName = 'date-picker__item',
}) => {
  const millisecondsInDay = 24 * 60 * 60 * 1000;

  const getDateButtons = (
    currentDate: Date,
    onDateChange: (date: Date) => void
  ) => {
    if (!showButtons) return ['dropDown'];

    return [
      {
        name: 'today',
        location: 'before' as const,
        options: {
          text: 'Today',
          stylingMode: 'text' as const,
          elementAttr: {
            class: 'today-button',
          },
          onClick: () => {
            onDateChange(new Date());
          },
        },
      },
      {
        name: 'prevDate',
        location: 'before' as const,
        options: {
          icon: 'spinprev',
          stylingMode: 'text' as const,
          elementAttr: {
            class: 'direc-button',
          },
          onClick: () => {
            onDateChange(new Date(currentDate.getTime() - millisecondsInDay));
          },
        },
      },
      {
        name: 'nextDate',
        location: 'after' as const,
        options: {
          icon: 'spinnext',
          stylingMode: 'text' as const,
          elementAttr: {
            class: 'direc-button',
          },
          onClick: () => {
            onDateChange(new Date(currentDate.getTime() + millisecondsInDay));
          },
        },
      },
      'dropDown',
    ];
  };

  return (
    <div className={wrapperClassName}>
      {/* 날짜 행 */}
      <div className={groupClassName}>
        {/* 시작 날짜 */}
        <div className={itemClassName}>
          <DateBox
            type="date"
            value={startDate}
            onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => {
              onStartDateChange(e.value);
              // 시작일이 종료일보다 늦으면 종료일 자동 조정
              if (endDate && e.value > endDate) {
                onEndDateChange(new Date(e.value.getTime() + millisecondsInDay));
              }
            }}
            displayFormat={dateFormat}
            placeholder={startDatePlaceholder}
            useMaskBehavior={true}
            buttons={getDateButtons(startDate, onStartDateChange)}
          />
        </div>

        {/* 종료 날짜 */}
        <div className={itemClassName}>
          <DateBox
            type="date"
            value={endDate}
            onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => onEndDateChange(e.value)}
            min={startDate ? new Date(startDate.getTime() + millisecondsInDay) : undefined}
            displayFormat={dateFormat}
            placeholder={endDatePlaceholder}
            useMaskBehavior={true}
            buttons={getDateButtons(endDate, onEndDateChange)}
          />
        </div>
      </div>

      {/* 시간 행 (옵션) */}
      {showTime && startTime && endTime && onStartTimeChange && onEndTimeChange && (
        <div className={groupClassName}>
          {/* 시작 시간 */}
          <div className={itemClassName}>
            <DateBox
              type="time"
              value={startTime}
              onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => onStartTimeChange(e.value)}
              displayFormat={timeFormat}
              placeholder={startTimePlaceholder}
            />
          </div>

          {/* 종료 시간 */}
          <div className={itemClassName}>
            <DateBox
              type="time"
              value={endTime}
              onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => onEndTimeChange(e.value)}
              displayFormat={timeFormat}
              placeholder={endTimePlaceholder}
            />
          </div>
        </div>
      )}
    </div>
  );
};
