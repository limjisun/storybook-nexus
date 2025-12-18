import React from 'react';
import { DateRangePicker } from '../../DateRangePicker';

export interface DateRangeFieldProps {
  /** 시작 날짜 */
  startDate: Date;
  /** 종료 날짜 */
  endDate: Date;
  /** 시작 날짜 변경 핸들러 */
  onStartDateChange: (date: Date) => void;
  /** 종료 날짜 변경 핸들러 */
  onEndDateChange: (date: Date) => void;

  /** 시작 시간 */
  startTime?: Date;
  /** 종료 시간 */
  endTime?: Date;
  /** 시작 시간 변경 핸들러 */
  onStartTimeChange?: (time: Date) => void;
  /** 종료 시간 변경 핸들러 */
  onEndTimeChange?: (time: Date) => void;

  /** 시간 선택 표시 여부 */
  showTime?: boolean;
  /** Today, Prev, Next 버튼 표시 여부 */
  showButtons?: boolean;
  /** 그룹 컨테이너 클래스명 */
  groupClassName?: string;
}

/**
 * DateRangeField 컴포넌트
 *
 * 날짜/시간 범위 선택 필드
 * DateRangePicker 컴포넌트 래퍼
 */
export const DateRangeField: React.FC<DateRangeFieldProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  showTime = true,
  showButtons = true,
  groupClassName = 'date-range-row',
}) => {
  return (
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
      startTime={startTime}
      endTime={endTime}
      onStartTimeChange={onStartTimeChange}
      onEndTimeChange={onEndTimeChange}
      showTime={showTime}
      showButtons={showButtons}
      groupClassName={groupClassName}
    />
  );
};
