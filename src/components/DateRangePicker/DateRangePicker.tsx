import React from 'react';
import DateBox, { DateBoxTypes } from 'devextreme-react/date-box';
import DateRangeBox from 'devextreme-react/date-range-box';
import SelectBox, { SelectBoxTypes } from 'devextreme-react/select-box';
import './DateRangePicker.css';

/** 휴일 설정 옵션 타입 */
export type HolidaySettingType =
  | 'none'
  | 'exclude'
  | 'only'
  | 'customExclude'
  | 'weekendOnly';

/** 휴일 설정 옵션 */
export const HOLIDAY_SETTINGS: Array<{ value: HolidaySettingType; label: string }> = [
  { value: 'none', label: '휴일설정 없음' },
  { value: 'exclude', label: '휴일 제외' },
  { value: 'only', label: '휴일만 포함' },
  { value: 'customExclude', label: '사용자지정 휴일제외' },
  { value: 'weekendOnly', label: '토/일만 제외' },
];

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
  /** 휴일 설정 값 */
  holidaySetting?: HolidaySettingType;
  /** 휴일 설정 변경 핸들러 */
  onHolidaySettingChange?: (value: HolidaySettingType) => void;
  /** 휴일 설정 표시 여부 */
  showHolidaySetting?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
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
  dateFormat = 'yyyy-MM-dd',
  timeFormat = 'HH:mm',
  startDatePlaceholder = '시작 날짜',
  endDatePlaceholder = '종료 날짜',
  startTimePlaceholder = '00',
  endTimePlaceholder = '23',
  wrapperClassName = 'date-picker-wrap',
  groupClassName = 'date-picker__group',
  itemClassName = 'date-picker__item',
  holidaySetting = 'none',
  onHolidaySettingChange,
  showHolidaySetting = false,
  disabled = false,
}) => {

  return (
    <div className={wrapperClassName}>
      {/* 날짜 범위 */}
      <div className={groupClassName}>
        <div className={itemClassName}>
          <DateRangeBox
            startDate={startDate}
            endDate={endDate}
            onValueChanged={(e: any) => {
              if (e.value) {
                onStartDateChange(e.value[0]);
                onEndDateChange(e.value[1]);
              }
            }}
            displayFormat={dateFormat}
            startDatePlaceholder={startDatePlaceholder}
            endDatePlaceholder={endDatePlaceholder}
            applyValueMode="useButtons"
            applyButtonText="저장"
            cancelButtonText="닫기"
            disabled={disabled}
          />
        </div>
      </div>

      {/* 시간 행 (옵션) */}
      {showTime && startTime && endTime && onStartTimeChange && onEndTimeChange && (
        <div className={groupClassName}>
          {/* 시작 시간 */}
          <div className={`${itemClassName} date-picker__time-item`}>
            <DateBox
              type="time"
              value={startTime}
              onValueChanged={(e: DateBoxTypes.ValueChangedEvent) => onStartTimeChange(e.value)}
              displayFormat={timeFormat}
              placeholder={startTimePlaceholder}
            />
          </div>

          {/* 종료 시간 */}
          <div className={`${itemClassName} date-picker__time-item`}>
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

      {/* 휴일 설정 (옵션) */}
      {showHolidaySetting && onHolidaySettingChange && (
        <div className={groupClassName}>
          <div className={`${itemClassName} ${itemClassName}--holiday-setting`}>
            <SelectBox
              items={HOLIDAY_SETTINGS}
              value={holidaySetting}
              valueExpr="value"
              displayExpr="label"
              onValueChanged={(e: SelectBoxTypes.ValueChangedEvent) =>
                onHolidaySettingChange(e.value as HolidaySettingType)
              }
              placeholder="휴일설정 선택"
            />
          </div>
        </div>
      )}
    </div>
  );
};
