import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import Checkbox from '../../form/Checkbox';
import type { SelectOption } from '../types';

export interface BasicFieldsProps {
  /** 선택된 팀 */
  selectedTeam: string;
  /** 팀 변경 핸들러 */
  onTeamChange: (value: string) => void;
  /** 팀 옵션 */
  teamOptions: SelectOption[];

  /** 선택된 정렬 */
  sortOrder: string;
  /** 정렬 변경 핸들러 */
  onSortOrderChange: (value: string) => void;
  /** 정렬 옵션 */
  sortOptions: SelectOption[];

  /** 시간범위 체크 여부 (옵션) */
  agreed?: boolean;
  /** 시간범위 변경 핸들러 (옵션) */
  onAgreedChange?: (value: boolean) => void;
  /** 시간범위 체크박스 표시 여부 */
  showTimeRange?: boolean;

  /** Checkbox ID (고유하게 만들기 위함) */
  checkboxId?: string;
}

/**
 * BasicFields 컴포넌트
 *
 * 기본 필터 필드들 (종류, 정렬, 시간범위)
 * DevExtreme SelectBox 사용
 */
export const BasicFields: React.FC<BasicFieldsProps> = ({
  selectedTeam,
  onTeamChange,
  teamOptions,
  sortOrder,
  onSortOrderChange,
  sortOptions,
  agreed,
  onAgreedChange,
  showTimeRange = true,
  checkboxId = 'terms',
}) => {
  return (
    <>
      <div className='search-panel__data'>
        <SelectBox
          dataSource={teamOptions}
          displayExpr="label"
          valueExpr="value"
          value={selectedTeam}
          onValueChanged={(e) => onTeamChange(e.value)}
          placeholder="종합"
        />
      </div>
      <div className='search-panel__data'>
        <SelectBox
          dataSource={sortOptions}
          displayExpr="label"
          valueExpr="value"
          value={sortOrder}
          onValueChanged={(e) => onSortOrderChange(e.value)}
          placeholder="전체"
        />
      </div>
      {showTimeRange && agreed !== undefined && onAgreedChange && (
        <div className='search-panel__data search-panel__data--auto'>
          <Checkbox
            id={checkboxId}
            label="시간범위"
            checked={agreed}
            onChange={onAgreedChange}
          />
        </div>
      )}
    </>
  );
};
