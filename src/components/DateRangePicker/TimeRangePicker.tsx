import React from 'react';
import DateBox, { DateBoxTypes } from 'devextreme-react/date-box';

export interface TimeRangePickerProps {
  /** 시작 시간 */
  startTime: Date;
  /** 종료 시간 */
  endTime: Date;
  /** 시작 시간 변경 핸들러 */
  onStartTimeChange: (time: Date) => void;
  /** 종료 시간 변경 핸들러 */
  onEndTimeChange: (time: Date) => void;
  /** 시간 표시 형식 */
  timeFormat?: string;
  /** 시작 시간 placeholder */
  startTimePlaceholder?: string;
  /** 종료 시간 placeholder */
  endTimePlaceholder?: string;
  /** 전체 래퍼 클래스명 */
  wrapperClassName?: string;
  /** 그룹 컨테이너 클래스명 */
  groupClassName?: string;
}

/**
 * TimeRangePicker 컴포넌트
 *
 * 시간 범위 선택을 위한 컴포넌트입니다.
 * DevExtreme DateBox (type="time")를 기반으로 만들어졌습니다.
 */
export const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  timeFormat = 'HH:mm',
  startTimePlaceholder = '00',
  endTimePlaceholder = '23',
  wrapperClassName = 'date-picker-wrap',
  groupClassName = 'date-range-row',
}) => {
  return (
    <div className={wrapperClassName}>
      <div className={groupClassName}>
        {/* 시작 시간 */}
        <div className="date-picker-container">
          <DateBox
            type="time"
            value={startTime}
            onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => onStartTimeChange(e.value)}
            displayFormat={timeFormat}
            placeholder={startTimePlaceholder}
          />
        </div>

        {/* 종료 시간 */}
        <div className="date-picker-container">
          <DateBox
            type="time"
            value={endTime}
            onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => onEndTimeChange(e.value)}
            displayFormat={timeFormat}
            placeholder={endTimePlaceholder}
          />
        </div>
      </div>
    </div>
  );
};
