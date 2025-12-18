/**
 * SearchCondition 컴포넌트 타입 정의
 */

// ========================================
// 레이아웃 타입
// ========================================
export type LayoutType = 'default' | 'compact' | 'full' | 'grouped' | 'inline';

// ========================================
// 조직 데이터 타입
// ========================================
export interface Center {
  id: number;
  name: string;
}

export interface Tenant {
  id: number;
  center_id: number;
  cid: string;
  name: string;
}

export interface Group {
  id: number;
  tenant_id: number;
  tid: string;
  name: string;
}

export interface Team {
  id: number;
  upper_id: number;
  tgid: string;
  name: string;
}

export interface Agent {
  id: number;
  name: string;
}

export interface Channel {
  id: number;
  name: string;
}

export interface AllDataItem {
  center_id: number;
  tenant_cid: string;
  tenant_id: number;
  group_id: number;
  team_id: number;
  team_name: string;
  agent_id: number;
  agent_name: string;
  channel_id: number;
  channel_name: string;
}

// ========================================
// 조직 데이터 컨테이너
// ========================================
export interface OrganizationData {
  centers: Center[];
  tenants: Tenant[];
  groups: Group[];
  teams: Team[];
  allData: AllDataItem[];
}

// ========================================
// 필터 옵션
// ========================================
export interface SelectOption {
  value: string;
  label: string;
}

// ========================================
// 검색 폼 값
// ========================================
export interface SearchFormValues {
  // 기본 필터
  selectedTeam: string;
  sortOrder: string;
  agreed: boolean;

  // 날짜/시간
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;

  // 조직 선택
  selectedCenters: number[];
  selectedTenants: string[];
  selectedGroups: string[];
  selectedTeams: string[];
  selectedAgents: number[];
  selectedChannels: number[];
}

// ========================================
// 필드 표시 제어
// ========================================
export interface FieldsConfig {
  /** 기본 필터 표시 (종류, 정렬, 시간범위) */
  basicFilters?: boolean;
  /** 날짜 범위 선택 표시 */
  dateRange?: boolean;
  /** 조직 계층 선택 표시 */
  organization?: boolean;
}

// ========================================
// 조직 필드 표시 제어
// ========================================
export interface OrganizationFieldsConfig {
  center?: boolean;
  tenant?: boolean;
  group?: boolean;
  team?: boolean;
  agent?: boolean;
  channel?: boolean;
}

// ========================================
// 버튼 설정
// ========================================
export interface ButtonConfig {
  /** 버튼 텍스트 */
  text: string;
  /** 버튼 타입 */
  type?: 'default' | 'normal';
  /** 클릭 핸들러 */
  onClick: () => void;
}

// ========================================
// SearchCondition Props
// ========================================
export interface SearchConditionProps {
  /** 조직 데이터 */
  organizationData?: OrganizationData;

  /** 팀 옵션 */
  teamOptions?: SelectOption[];

  /** 정렬 옵션 */
  sortOptions?: SelectOption[];

  /** 표시할 필드 제어 */
  showFields?: FieldsConfig;

  /** 조직 필드 개별 제어 (몇 개만 보여줄지) */
  organizationFields?: OrganizationFieldsConfig;

  /** 시간범위 체크박스 표시 여부 */
  showTimeRangeCheckbox?: boolean;

  /** 초기값 */
  initialValues?: Partial<SearchFormValues>;

  /** 확인 버튼 클릭 핸들러 (기본 버튼 사용 시) */
  onSubmit?: (values: SearchFormValues) => void;

  /** 취소 버튼 클릭 핸들러 (기본 버튼 사용 시) */
  onCancel?: () => void;

  /** 버튼 텍스트 커스터마이징 (기본 버튼 사용 시) */
  submitText?: string;
  cancelText?: string;

  /** 커스텀 버튼 배열 (이 prop을 사용하면 기본 버튼 대신 사용됨) */
  buttons?: ButtonConfig[];

  /** 제목 텍스트 */
  title?: string;

  /** children을 사용한 동적 행 구성 */
  children?: React.ReactNode;
}

// ========================================
// 내부 Hook 반환 타입
// ========================================
export interface UseSearchConditionReturn {
  // State values
  values: SearchFormValues;

  // Setters
  setSelectedTeam: (value: string) => void;
  setSortOrder: (value: string) => void;
  setAgreed: (value: boolean) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setStartTime: (time: Date) => void;
  setEndTime: (time: Date) => void;
  setSelectedChannels: (channels: number[]) => void;

  // 계층형 선택 핸들러 (캐스케이딩 리셋 포함)
  handleCenterChange: (value: number[]) => void;
  handleTenantChange: (value: string[]) => void;
  handleGroupChange: (value: string[]) => void;
  handleTeamChange: (value: string[]) => void;
  handleAgentChange: (value: number[]) => void;

  // Filtered data
  filteredTenants: Tenant[];
  filteredGroups: Group[];
  filteredTeams: Team[];
  filteredAgents: Agent[];
  filteredChannels: Channel[];
}
