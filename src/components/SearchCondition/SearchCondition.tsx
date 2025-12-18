import React, { useState } from 'react';
import Button from '../form/Button';
import { useSearchCondition } from './useSearchCondition';
import { BasicFields } from './fields/BasicFields';
import { DateRangeField } from './fields/DateRangeField';
import { OrganizationFields } from './fields/OrganizationFields';
import type { SearchConditionProps, SelectOption } from './types';
import './SearchCondition.css';

// 기본 옵션 데이터
const DEFAULT_TEAM_OPTIONS: SelectOption[] = [
  { value: 'inbound', label: '인바운드' },
  { value: 'outbound', label: '아웃바운드' },
  { value: 'support', label: '지원팀' },
];

const DEFAULT_SORT_OPTIONS: SelectOption[] = [
  { value: 'asc', label: '오름차순' },
  { value: 'desc', label: '내림차순' },
];

// ========================================
// 서브 컴포넌트들
// ========================================

/** Row 컴포넌트 Props */
interface RowProps {
  /** 자식 요소 */
  children: React.ReactNode;
  /** 2컬럼 레이아웃 여부 */
  twoColumns?: boolean;
}

/** Col 컴포넌트 Props */
interface ColProps {
  /** 컬럼 레이블 */
  label?: string;
  /** 자식 요소 */
  children: React.ReactNode;
}

/** Data 컴포넌트 Props */
interface DataProps {
  /** 자식 요소 */
  children: React.ReactNode;
  /** auto 너비 사용 여부 (체크박스, 버튼 등 작은 요소에 사용) */
  autoWidth?: boolean;
}

/**
 * Row 서브 컴포넌트
 * 검색 조건의 각 행을 구성
 */
const Row: React.FC<RowProps> = ({ children, twoColumns = false }) => {
  return (
    <div className={`search-panel__row ${twoColumns ? 'grid--cols-2' : ''}`}>
      {children}
    </div>
  );
};

/**
 * Col 서브 컴포넌트
 * Row 안의 각 컬럼을 구성
 */
const Col: React.FC<ColProps> = ({ label, children }) => {
  return (
    <div className='search-panel__col'>
      {label && <div className='search-panel__label'>{label}</div>}
      <div className='search-panel__field'>{children}</div>
    </div>
  );
};

/**
 * Data 서브 컴포넌트
 * 각 필드 데이터를 감싸는 래퍼
 */
const Data: React.FC<DataProps> = ({ children, autoWidth = false }) => {
  return (
    <div className={`search-panel__data ${autoWidth ? 'search-panel__data--auto' : ''}`}>
      {children}
    </div>
  );
};

/**
 * SearchCondition 컴포넌트
 *
 * 검색 조건 패널 컴포넌트
 * Props로 표시할 필드와 동작을 동적으로 제어할 수 있습니다.
 *
 * ## 사용 예시 (Props 기반)
 * ```tsx
 * <SearchCondition
 *   organizationData={mockData}
 *   showFields={{ basicFilters: true, dateRange: true, organization: true }}
 *   organizationFields={{ center: true, tenant: true }}
 *   onSubmit={(values) => console.log(values)}
 * />
 * ```
 *
 * ## 사용 예시 (Children 기반)
 * ```tsx
 * <SearchCondition buttons={[...]} title="조회 조건">
 *   // 1컬럼 레이아웃
 *   <SearchCondition.Row>
 *     <SearchCondition.Col label="종류">
 *       <SearchCondition.Data>
 *         <SelectBox ... />
 *       </SearchCondition.Data>
 *     </SearchCondition.Col>
 *   </SearchCondition.Row>
 *
 *   // 2컬럼 레이아웃
 *   <SearchCondition.Row twoColumns>
 *     <SearchCondition.Col label="종류">
 *       <SearchCondition.Data>
 *         <SelectBox ... />
 *       </SearchCondition.Data>
 *     </SearchCondition.Col>
 *     <SearchCondition.Col label="차원단위">
 *       <SearchCondition.Data>
 *         <SelectBox ... />
 *       </SearchCondition.Data>
 *     </SearchCondition.Col>
 *   </SearchCondition.Row>
 * </SearchCondition>
 * ```
 */
export const SearchCondition: React.FC<SearchConditionProps> & {
  Row: typeof Row;
  Col: typeof Col;
  Data: typeof Data;
} = ({
  organizationData,
  teamOptions = DEFAULT_TEAM_OPTIONS,
  sortOptions = DEFAULT_SORT_OPTIONS,
  showFields = {
    basicFilters: true,
    dateRange: true,
    organization: true,
  },
  organizationFields,
  showTimeRangeCheckbox = true,
  initialValues,
  onSubmit,
  onCancel,
  submitText = '확인',
  cancelText = '취소',
  buttons,
  title = '조회 조건',
  children,
}) => {
  // ========================================
  // 아코디언 상태
  // ========================================
  const [isCollapsed, setIsCollapsed] = useState(false);

  // ========================================
  // Hook 사용
  // ========================================
  const {
    values,
    setSelectedTeam,
    setSortOrder,
    setAgreed,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    setSelectedChannels,
    handleCenterChange,
    handleTenantChange,
    handleGroupChange,
    handleTeamChange,
    handleAgentChange,
    filteredTenants,
    filteredGroups,
    filteredTeams,
    filteredAgents,
    filteredChannels,
  } = useSearchCondition(organizationData, initialValues);

  // ========================================
  // 버튼 핸들러
  // ========================================
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  // ========================================
  // 버튼 렌더링
  // ========================================
  const renderButtons = () => {
    // 커스텀 버튼이 있으면 그것 사용
    if (buttons && buttons.length > 0) {
      return buttons.map((btn, index) => (
        <Button
          key={index}
          text={btn.text}
          type={btn.type || 'normal'}
          onClick={btn.onClick}
        />
      ));
    }

    // 기본 버튼 (취소 + 확인)
    return (
      <>
        <Button text={cancelText} type="normal" onClick={handleCancel} />
        <Button text={submitText} type="default" onClick={handleSubmit} />
      </>
    );
  };

  // ========================================
  // 렌더링
  // ========================================
  return (
    <div className='search-panel'>
      <div className='search-panel__title'>
        <button
          className={`search-panel__toggle ${isCollapsed ? 'search-panel__toggle--collapsed' : ''}`}
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? '펼치기' : '접기'}
        />
        <h2>{title}</h2>
        <div className='button-wrap'>
          {renderButtons()}
        </div>
      </div>
      <div className={`search-panel__body ${isCollapsed ? 'search-panel__body--collapsed' : ''}`}>
        {/* Props 기반 필드 렌더링 */}
        {(showFields.basicFilters || showFields.dateRange) && (
          <Row twoColumns>
            {showFields.basicFilters && (
              <Col label="종류">
                <BasicFields
                  selectedTeam={values.selectedTeam}
                  onTeamChange={setSelectedTeam}
                  teamOptions={teamOptions}
                  sortOrder={values.sortOrder}
                  onSortOrderChange={setSortOrder}
                  sortOptions={sortOptions}
                  agreed={values.agreed}
                  onAgreedChange={setAgreed}
                  showTimeRange={showTimeRangeCheckbox}
                />
              </Col>
            )}
            {showFields.dateRange && (
              <Col label="기간">
                <DateRangeField
                  startDate={values.startDate}
                  endDate={values.endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                  startTime={values.startTime}
                  endTime={values.endTime}
                  onStartTimeChange={setStartTime}
                  onEndTimeChange={setEndTime}
                />
              </Col>
            )}
          </Row>
        )}

        {showFields.organization && organizationData && (
          <Row>
            <Col label="조직">
              <OrganizationFields
                centers={organizationData.centers}
                tenants={filteredTenants}
                groups={filteredGroups}
                teams={filteredTeams}
                agents={filteredAgents}
                channels={filteredChannels}
                selectedCenters={values.selectedCenters}
                selectedTenants={values.selectedTenants}
                selectedGroups={values.selectedGroups}
                selectedTeams={values.selectedTeams}
                selectedAgents={values.selectedAgents}
                selectedChannels={values.selectedChannels}
                onCenterChange={handleCenterChange}
                onTenantChange={handleTenantChange}
                onGroupChange={handleGroupChange}
                onTeamChange={handleTeamChange}
                onAgentChange={handleAgentChange}
                onChannelChange={setSelectedChannels}
                showFields={organizationFields}
              />
            </Col>
          </Row>
        )}

        {/* Children 렌더링 */}
        {children}
      </div>
    </div>
  );
};

// 서브 컴포넌트 연결
SearchCondition.Row = Row;
SearchCondition.Col = Col;
SearchCondition.Data = Data;
