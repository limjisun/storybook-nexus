import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchCondition } from '../src/components/SearchCondition';
import type { OrganizationData, SelectOption } from '../src/components/SearchCondition';
import { SelectBox } from 'devextreme-react/select-box';
import { TagBox } from 'devextreme-react/tag-box';
import { DateRangePicker } from '../src/components/DateRangePicker';

/**
 * NEXUS SearchCondition 컴포넌트
 *
 * 검색 조건 패널 컴포넌트입니다.
 * Props로 표시할 필드와 조직 계층 깊이를 동적으로 제어할 수 있습니다.
 *
 * ## Features
 * - ✅ 시간범위 체크박스 표시/숨김 제어
 * - ✅ 조직 필드 개수 동적 제어 (2개~6개)
 * - ✅ 날짜/시간 범위 선택
 * - ✅ Props 기반 동적 제어
 *
 * ## Usage
 * ```tsx
 * import { SearchCondition } from '@/components/SearchCondition';
 *
 * <SearchCondition
 *   organizationData={mockData}
 *   showTimeRangeCheckbox={false}
 *   organizationFields={{ center: true, tenant: true }}
 *   onSubmit={(values) => console.log(values)}
 * />
 * ```
 */
const meta = {
  title: 'NEXUS-CUSTOM/조회조건',
  component: SearchCondition,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchCondition>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// Mock 데이터
// ========================================

const mockOrganizationData: OrganizationData = {
  centers: [
    { id: 1, name: 'NEXUS' }
  ],
  tenants: [
    { id: 1, center_id: 1, cid: '1,1', name: 'DEFAULT' },
    { id: 11, center_id: 1, cid: '1,11', name: 'qat' },
    { id: 12, center_id: 1, cid: '1,12', name: 'test' },
  ],
  groups: [
    { id: 111, tenant_id: 11, tid: '1,11,111', name: 'QA그룹' },
    { id: 1201, tenant_id: 12, tid: '1,12,1201', name: '1201' },
  ],
  teams: [
    { id: 1, upper_id: 111, tgid: '1,11,111,1', name: '상담파트' },
    { id: 2, upper_id: 111, tgid: '1,11,111,2', name: '기술파트' },
  ],
  allData: [
    { center_id: 1, tenant_cid: '1,11', tenant_id: 11, group_id: 111, team_id: 1111, team_name: 'call', agent_id: 120111, agent_name: '김상담', channel_id: 1201111, channel_name: '전화' },
    { center_id: 1, tenant_cid: '1,11', tenant_id: 11, group_id: 111, team_id: 1111, team_name: 'call', agent_id: 120111, agent_name: '김상담', channel_id: 1201112, channel_name: '채팅' },
    { center_id: 1, tenant_cid: '1,12', tenant_id: 12, group_id: 1201, team_id: 12011, team_name: '영업팀', agent_id: 120112, agent_name: '이상담', channel_id: 1201211, channel_name: '이메일' },
  ],
};

const mockTeamOptions: SelectOption[] = [
  { value: 'inbound', label: '인바운드' },
  { value: 'outbound', label: '아웃바운드' },
  { value: 'support', label: '지원팀' },
];

const mockSortOptions: SelectOption[] = [
  { value: 'asc', label: '오름차순' },
  { value: 'desc', label: '내림차순' },
];

// ========================================
// Stories
// ========================================

/**
 * 기본 사용 예시
 *
 * 모든 필드를 표시하는 기본 구성입니다.
 */
export const Default: Story = {
  args: {
    organizationData: mockOrganizationData,
    teamOptions: mockTeamOptions,
    sortOptions: mockSortOptions,
    onSubmit: (values) => {
      console.log('Submit:', values);
      alert('조회 실행!\n' + JSON.stringify(values, null, 2));
    },
    onCancel: () => {
      console.log('Cancel');
      alert('취소');
    },
  },
};

/**
 * 시간범위 체크박스 없음
 *
 * `showTimeRangeCheckbox={false}`로 시간범위 체크박스를 숨길 수 있습니다.
 */
export const WithoutTimeRangeCheckbox: Story = {
  args: {
    organizationData: mockOrganizationData,
    teamOptions: mockTeamOptions,
    sortOptions: mockSortOptions,
    showTimeRangeCheckbox: false,
    onSubmit: (values) => console.log('Submit:', values),
    onCancel: () => console.log('Cancel'),
  },
};

/**
 * 조직 필드 2개만 (센터 + 테넌트)
 *
 * `organizationFields`로 필요한 조직 필드만 선택적으로 표시합니다.
 */
export const OrganizationTwoLevels: Story = {
  args: {
    title: '조회 조건 - 2단계',
    organizationData: mockOrganizationData,
    teamOptions: mockTeamOptions,
    sortOptions: mockSortOptions,
    organizationFields: {
      center: true,
      tenant: true,
      group: false,
      team: false,
      agent: false,
      channel: false,
    },
    onSubmit: (values) => console.log('Submit:', values),
    onCancel: () => console.log('Cancel'),
  },
};

/**
 * 조직 필드 3개 (센터 + 테넌트 + 그룹)
 *
 * 3단계 조직 계층 선택 예시입니다.
 */
export const OrganizationThreeLevels: Story = {
  args: {
    title: '조회 조건 - 3단계',
    organizationData: mockOrganizationData,
    teamOptions: mockTeamOptions,
    sortOptions: mockSortOptions,
    organizationFields: {
      center: true,
      tenant: true,
      group: true,
      team: false,
      agent: false,
      channel: false,
    },
    onSubmit: (values) => console.log('Submit:', values),
    onCancel: () => console.log('Cancel'),
  },
};

/**
 * 조직만 표시
 *
 * 기본 필터와 날짜 범위 없이 조직 선택만 표시합니다.
 */
export const OrganizationOnly: Story = {
  args: {
    title: '조직 선택',
    organizationData: mockOrganizationData,
    showFields: {
      basicFilters: false,
      dateRange: false,
      organization: true,
    },
    onSubmit: (values) => console.log('Submit:', values),
    onCancel: () => console.log('Cancel'),
  },
};

/**
 * 날짜 범위만 표시
 *
 * 조직 없이 날짜 범위 선택만 표시합니다.
 */
export const DateRangeOnly: Story = {
  args: {
    title: '기간 선택',
    showFields: {
      basicFilters: false,
      dateRange: true,
      organization: false,
    },
    onSubmit: (values) => console.log('Submit:', values),
    onCancel: () => console.log('Cancel'),
  },
};

/**
 * 버튼 1개만
 *
 * 확인 버튼만 표시하는 예시입니다.
 */
export const SingleButton: Story = {
  args: {
    organizationData: mockOrganizationData,
    teamOptions: mockTeamOptions,
    sortOptions: mockSortOptions,
    buttons: [
      {
        text: '조회',
        type: 'default',
        onClick: () => alert('조회 실행!'),
      },
    ],
  },
};

/**
 * 버튼 3개
 *
 * 초기화, 취소, 확인 버튼 3개를 표시합니다.
 */
export const ThreeButtons: Story = {
  args: {
    organizationData: mockOrganizationData,
    teamOptions: mockTeamOptions,
    sortOptions: mockSortOptions,
    buttons: [
      {
        text: '초기화',
        type: 'normal',
        onClick: () => alert('초기화'),
      },
      {
        text: '취소',
        type: 'normal',
        onClick: () => alert('취소'),
      },
      {
        text: '조회',
        type: 'default',
        onClick: () => alert('조회!'),
      },
    ],
  },
};

/**
 * 버튼 여러 개
 *
 * 다양한 액션 버튼들을 표시할 수 있습니다.
 */
export const MultipleButtons: Story = {
  args: {
    title: '조회 조건 - 다중 액션',
    organizationData: mockOrganizationData,
    teamOptions: mockTeamOptions,
    sortOptions: mockSortOptions,
    buttons: [
      {
        text: '초기화',
        type: 'normal',
        onClick: () => console.log('Reset'),
      },
      {
        text: '저장',
        type: 'normal',
        onClick: () => console.log('Save'),
      },
      {
        text: '불러오기',
        type: 'normal',
        onClick: () => console.log('Load'),
      },
      {
        text: '취소',
        type: 'normal',
        onClick: () => console.log('Cancel'),
      },
      {
        text: '조회',
        type: 'default',
        onClick: () => console.log('Search'),
      },
    ],
  },
};

// ========================================
// Children 기반 예시
// ========================================

/**
 * 기존 필드 + 동적 행 추가
 *
 * 기본 필드(종류, 기간, 조직)는 자동으로 보여주고,
 * 그 아래에 추가로 동적인 행을 더할 수 있습니다.
 */
export const WithAdditionalRows: Story = {
  render: () => (
    <SearchCondition
      title="조회 조건 - 기본 + 추가"
      organizationData={mockOrganizationData}
      teamOptions={mockTeamOptions}
      sortOptions={mockSortOptions}
      buttons={[
        { text: '취소', type: 'normal', onClick: () => alert('취소') },
        { text: '조회', type: 'default', onClick: () => alert('조회!') },
      ]}
    >
      {/* 기존 필드는 자동 생성되고, 여기에 추가 행들 */}
      <SearchCondition.Row>
        <SearchCondition.Col label="상태">
          <SearchCondition.Data>
            <SelectBox
              dataSource={[
                { value: 'active', label: '활성' },
                { value: 'inactive', label: '비활성' },
                { value: 'pending', label: '대기중' },
              ]}
              valueExpr="value"
              displayExpr="label"
              placeholder="상태 선택"
              stylingMode="outlined"
            />
          </SearchCondition.Data>
        </SearchCondition.Col>
        
      </SearchCondition.Row>

      <SearchCondition.Row>
        <SearchCondition.Col label="우선순위">
          <SearchCondition.Data>
            <SelectBox
              dataSource={[
                { value: 'high', label: '높음' },
                { value: 'medium', label: '보통' },
                { value: 'low', label: '낮음' },
              ]}
              valueExpr="value"
              displayExpr="label"
              placeholder="우선순위 선택"
              stylingMode="outlined"
            />
          </SearchCondition.Data>
        </SearchCondition.Col>
      </SearchCondition.Row>

      <SearchCondition.Row>
        <SearchCondition.Col label="담당자">
          <SearchCondition.Data>
            <TagBox
              dataSource={[
                { id: 1, name: '김철수' },
                { id: 2, name: '이영희' },
                { id: 3, name: '박민수' },
              ]}
              valueExpr="id"
              displayExpr="name"
              placeholder="담당자 선택"
              stylingMode="outlined"
              showSelectionControls={true}
            />
          </SearchCondition.Data>
        </SearchCondition.Col>
      </SearchCondition.Row>
    </SearchCondition>
  ),
};

/**
 * Children만 사용 - 완전 커스텀
 *
 * `SearchCondition.Row`만 사용하여 완전히 자유롭게 구성합니다.
 * showFields를 빈 객체로 주면 기본 필드 없이 children만 보여집니다.
 */
export const ChildrenOnly: Story = {
  render: () => (
    <SearchCondition
      title="조회 조건 - 완전 커스텀"
      showFields={{}} // 기본 필드 없음
      buttons={[
        { text: '취소', type: 'normal', onClick: () => alert('취소') },
        { text: '조회', type: 'default', onClick: () => alert('조회!') },
      ]}
    >
      <SearchCondition.Row twoColumns>
        <SearchCondition.Col label="종류">
          <SearchCondition.Data>
            <SelectBox
              dataSource={mockTeamOptions}
              valueExpr="value"
              displayExpr="label"
              placeholder="팀 선택"
              stylingMode="outlined"
            />
          </SearchCondition.Data>
          <SearchCondition.Data>
            <SelectBox
              dataSource={mockSortOptions}
              valueExpr="value"
              displayExpr="label"
              placeholder="정렬 선택"
              stylingMode="outlined"
            />
          </SearchCondition.Data>
        </SearchCondition.Col>
        <SearchCondition.Col label="기간">
          <DateRangePicker
            startDate={new Date()}
            endDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
            onStartDateChange={(date) => console.log('Start:', date)}
            onEndDateChange={(date) => console.log('End:', date)}
          />
        </SearchCondition.Col>
      </SearchCondition.Row>


      <SearchCondition.Row>
        <SearchCondition.Col label="조직">
          <SearchCondition.Data>
            <TagBox
              dataSource={mockOrganizationData.centers}
              valueExpr="id"
              displayExpr="name"
              placeholder="센터 선택"
              stylingMode="outlined"
              showSelectionControls={true}
            />
          </SearchCondition.Data>
          <SearchCondition.Data>
            <TagBox
              dataSource={mockOrganizationData.tenants}
              valueExpr="cid"
              displayExpr="name"
              placeholder="테넌트 선택"
              stylingMode="outlined"
              showSelectionControls={true}
            />
          </SearchCondition.Data>
        </SearchCondition.Col>
      </SearchCondition.Row>
    </SearchCondition>
  ),
};



/**
 * 2컬럼 레이아웃 사용
 *
 * twoColumns prop을 사용하여 2컬럼 그리드 레이아웃을 만들 수 있습니다.
 * 한 Row 안에 2개의 Col이 좌우로 배치됩니다.
 */
export const TwoColumnsLayout: Story = {
  render: () => (
    <SearchCondition
      title="2컬럼 레이아웃"
      showFields={{}}
      buttons={[
        { text: '취소', type: 'normal', onClick: () => alert('취소') },
        { text: '조회', type: 'default', onClick: () => alert('조회!') },
      ]}
    >
      {/* 2컬럼 레이아웃 - 좌우로 나란히 */}
      <SearchCondition.Row twoColumns>
        <SearchCondition.Col label="종류">
          <SearchCondition.Data>
            <SelectBox
              dataSource={mockTeamOptions}
              valueExpr="value"
              displayExpr="label"
              placeholder="팀 선택"
              stylingMode="outlined"
            />
          </SearchCondition.Data>
        </SearchCondition.Col>
        <SearchCondition.Col label="차원단위">
          <SearchCondition.Data>
            <SelectBox
              dataSource={mockSortOptions}
              valueExpr="value"
              displayExpr="label"
              placeholder="센터 선택"
              stylingMode="outlined"
            />
          </SearchCondition.Data>
        </SearchCondition.Col>
      </SearchCondition.Row>

      {/* 1컬럼 레이아웃 (기본값) */}
      <SearchCondition.Row>
        <SearchCondition.Col label="기간">
          <DateRangePicker
            startDate={new Date()}
            endDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
            onStartDateChange={(date) => console.log('Start:', date)}
            onEndDateChange={(date) => console.log('End:', date)}
          />
        </SearchCondition.Col>
      </SearchCondition.Row>
    </SearchCondition>
  ),
};

/**
 * 복합 예시 - 모든 기능 활용
 *
 * Data 컴포넌트, autoWidth, twoColumns 등 모든 기능을 함께 사용한 예시입니다.
 */
export const ComplexExample: Story = {
  render: () => (
    <SearchCondition
      title="복합 예시"
      showFields={{}}
      buttons={[
        { text: '초기화', type: 'normal', onClick: () => alert('초기화') },
        { text: '취소', type: 'normal', onClick: () => alert('취소') },
        { text: '조회', type: 'default', onClick: () => alert('조회!') },
      ]}
    >
      {/* 2컬럼: 좌우로 2개의 Col */}
      <SearchCondition.Row twoColumns>
        <SearchCondition.Col label="종류">
          <SearchCondition.Data>
            <SelectBox
              dataSource={mockTeamOptions}
              valueExpr="value"
              displayExpr="label"
              placeholder="팀 선택"
              stylingMode="outlined"
            />
          </SearchCondition.Data>
        </SearchCondition.Col>
        <SearchCondition.Col label="차원단위">
          <SearchCondition.Data>
            <SelectBox
              dataSource={mockSortOptions}
              valueExpr="value"
              displayExpr="label"
              placeholder="센터 선택"
              stylingMode="outlined"
            />
          </SearchCondition.Data>
        </SearchCondition.Col>
      </SearchCondition.Row>

      {/* 1컬럼: 날짜 범위 + 체크박스 (autoWidth) */}
      <SearchCondition.Row>
        <SearchCondition.Col label="기간">
          <DateRangePicker
            startDate={new Date()}
            endDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
            onStartDateChange={(date) => console.log('Start:', date)}
            onEndDateChange={(date) => console.log('End:', date)}
          />
          <SearchCondition.Data autoWidth>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input type="checkbox" />
              <span>시간 포함</span>
            </label>
          </SearchCondition.Data>
        </SearchCondition.Col>
      </SearchCondition.Row>

      {/* 1컬럼: 여러 개의 태그박스 */}
      <SearchCondition.Row>
        <SearchCondition.Col label="조직">
          <SearchCondition.Data>
            <TagBox
              dataSource={mockOrganizationData.centers}
              valueExpr="id"
              displayExpr="name"
              placeholder="센터 선택"
              stylingMode="outlined"
            />
          </SearchCondition.Data>
          <SearchCondition.Data>
            <TagBox
              dataSource={mockOrganizationData.tenants}
              valueExpr="cid"
              displayExpr="name"
              placeholder="테넌트 선택"
              stylingMode="outlined"
            />
          </SearchCondition.Data>
          <SearchCondition.Data>
            <TagBox
              dataSource={mockOrganizationData.groups}
              valueExpr="tid"
              displayExpr="name"
              placeholder="그룹 선택"
              stylingMode="outlined"
            />
          </SearchCondition.Data>
          <SearchCondition.Data autoWidth>
            <button
              style={{
                padding: '6px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => alert('전체 선택')}
            >
              전체 선택
            </button>
          </SearchCondition.Data>
        </SearchCondition.Col>
      </SearchCondition.Row>
    </SearchCondition>
  ),
};
