import React from 'react';
import DrillDown from '../../form/DrillDown';
import type { DrillDownItem, SelectedTag } from '../../form/DrillDown';
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

// SelectOption을 계층형 DrillDownItem으로 변환하는 헬퍼 함수
const convertToHierarchicalDrillDown = (
  teamOptions: SelectOption[],
  sortOptions: SelectOption[]
): DrillDownItem[] => {
  return teamOptions.map(team => ({
    id: team.value,
    text: team.label,
    items: sortOptions.map(sort => ({
      id: `${team.value}_${sort.value}`,
      text: sort.label,
    })),
  }));
};

/**
 * BasicFields 컴포넌트
 *
 * 기본 필터 필드들 (종류 > 정렬, 시간범위)
 * 계층형 DrillDown 컴포넌트 사용 (single select 모드)
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
  // 계층형 DrillDown 데이터 생성
  const hierarchicalData = convertToHierarchicalDrillDown(teamOptions, sortOptions);

  // DrillDown onChange 핸들러
  const handleChange = (tags: SelectedTag[]) => {
    if (tags.length > 0) {
      const selectedTag = tags[0];

      // path 길이로 어느 레벨이 선택되었는지 확인
      if (selectedTag.path.length === 1) {
        // 1단계 (종류)만 선택
        onTeamChange(selectedTag.id);
      } else if (selectedTag.path.length === 2) {
        // 2단계 (종류 > 정렬) 선택
        const teamId = selectedTag.path[0];
        const sortId = selectedTag.id.split('_')[1]; // "inbound_asc" -> "asc"

        // teamId를 찾아서 value로 변환
        const team = teamOptions.find(t => t.label === teamId);
        if (team) {
          onTeamChange(team.value);
        }
        onSortOrderChange(sortId);
      }
    }
  };

  return (
    <>
      <div className='search-panel__data'>
        <DrillDown
          data={hierarchicalData}
          onChange={handleChange}
          placeholder="종류 선택"
          mode="single"
          variant="outlined"
          levelLabels={['종류', '정렬']}
          columnMinWidth={160}
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
