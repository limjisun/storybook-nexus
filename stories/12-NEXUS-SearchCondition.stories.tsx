import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchCondition } from '../src/components/SearchCondition';
import type { OrganizationData, SelectOption } from '../src/components/SearchCondition';
import { SelectBox } from 'devextreme-react/select-box';
import { TagBox } from 'devextreme-react/tag-box';
import { DateRangePicker } from '../src/components/DateRangePicker';
import DrillDown from '../src/components/form/DrillDown';
import CheckBox from '../src/components/form/CheckBox';

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

// 계층형 필터 데이터 (DrillDown용)
const mockFilterData = [
  {
    id: 'inbound',
    text: '인바운드',
    items: [
      { id: 'inbound_asc', text: '오름차순' },
      { id: 'inbound_desc', text: '내림차순' },
    ],
  },
  {
    id: 'outbound',
    text: '아웃바운드',
    items: [
      { id: 'outbound_asc', text: '오름차순' },
      { id: 'outbound_desc', text: '내림차순' },
    ],
  },
  {
    id: 'support',
    text: '지원팀',
    items: [
      { id: 'support_asc', text: '오름차순' },
      { id: 'support_desc', text: '내림차순' },
    ],
  },
];

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
 * 기본 예시 - 빈 SearchCondition
 *
 * Children 패턴으로 완전히 변경되었습니다.
 * 모든 내용은 children으로 자유롭게 구성할 수 있습니다.
 */
export const Default: Story = {
  args: {
    title: '조회 조건',
    onSubmit: () => alert('조회 실행!'),
    onCancel: () => alert('취소'),
  },
};

// ========================================
// Children 기반 예시
// ========================================

/**
 * Children 패턴 - 여러 필드 예시
 *
 * SearchCondition.Row, Col, Data를 사용하여 자유롭게 구성합니다.
 */
export const WithMultipleFields: Story = {
  render: () => {
    const MultipleFieldsExample = () => {
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
      const [startTime, setStartTime] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
      const [endTime, setEndTime] = useState(new Date(new Date().setHours(23, 59, 59, 999)));
      const [holidaySetting, setHolidaySetting] = useState<'none' | 'exclude' | 'only' | 'customExclude' | 'weekendOnly'>('none');
      const [useTimeRange, setUseTimeRange] = useState(false);

      return (
        <SearchCondition
          title="조회 조건 - 여러 필드"
          buttons={[
            { text: '취소', type: 'normal', onClick: () => alert('취소') },
            { text: '조회', type: 'default', onClick: () => alert('조회!') },
          ]}
        >
          <SearchCondition.Row twoColumns>
            <SearchCondition.Col label="종류">
              <SearchCondition.Data>
                <DrillDown
                  data={mockFilterData}
                  mode="single"
                  levelLabels={['종류', '정렬']}
                  placeholder="종류와 정렬을 선택하세요"
                  onChange={(selected) => {
                    console.log('DrillDown changed:', selected);
                  }}
                />
              </SearchCondition.Data>
              <SearchCondition.Data autoWidth>
                <CheckBox
                  label="시간범위"
                  checked={useTimeRange}
                  onChange={(checked) => {
                    console.log('Checkbox changed:', checked);
                    setUseTimeRange(checked);
                  }}
                />
              </SearchCondition.Data>
            </SearchCondition.Col>
            <SearchCondition.Col label="기간">
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                showTime={useTimeRange}
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
                showHolidaySetting={true}
                holidaySetting={holidaySetting}
                onHolidaySettingChange={setHolidaySetting}
              />
            </SearchCondition.Col>
          </SearchCondition.Row>

          <SearchCondition.Row>
            <SearchCondition.Col label="자원범위">
              <SearchCondition.Data>
                <DrillDown
                  data={mockFilterData}
                  mode="multi"
                  levelLabels={['종류', '정렬']}
                  placeholder="자원 선택"
                  onChange={(selected) => {
                    console.log('자원범위 DrillDown changed:', selected);
                  }}
                />
              </SearchCondition.Data>
            </SearchCondition.Col>
          </SearchCondition.Row>
        </SearchCondition>
      );
    };

    return <MultipleFieldsExample />;
  },
};

/**
 * 2-Column 레이아웃
 *
 * twoColumns prop으로 2열 레이아웃을 만들 수 있습니다.
 */
export const TwoColumnLayout: Story = {
  render: () => (
    <SearchCondition
      title="조회 조건 - 2열 레이아웃"
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
        </SearchCondition.Col>
        <SearchCondition.Col label="정렬">
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
 * 다국어 지원 - 한국어
 *
 * `lang="ko"` 속성을 사용하여 한국어 레이블 너비(70px)를 적용합니다.
 * CSS 변수 `--label-width`를 통해 레이블 너비가 자동으로 조정됩니다.
 */
export const I18nKorean: Story = {
  render: () => (
    <div lang="ko">
      <SearchCondition
        title="조회 조건"
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
          </SearchCondition.Col>
          <SearchCondition.Col label="정렬순서">
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
    </div>
  ),
};

/**
 * 다국어 지원 - 영어
 *
 * `lang="en"` 속성을 사용하여 영어 레이블 너비(120px)를 적용합니다.
 * 영어는 한국어보다 텍스트가 길어지므로 더 넓은 레이블 공간을 제공합니다.
 */
export const I18nEnglish: Story = {
  render: () => (
    <div lang="en">
      <SearchCondition
        title="Search Conditions"
        buttons={[
          { text: 'Cancel', type: 'normal', onClick: () => alert('Cancel') },
          { text: 'Search', type: 'default', onClick: () => alert('Search!') },
        ]}
      >
        <SearchCondition.Row twoColumns>
          <SearchCondition.Col label="Category">
            <SearchCondition.Data>
              <SelectBox
                dataSource={[
                  { value: 'inbound', label: 'Inbound' },
                  { value: 'outbound', label: 'Outbound' },
                  { value: 'support', label: 'Support Team' },
                ]}
                valueExpr="value"
                displayExpr="label"
                placeholder="Select team"
                stylingMode="outlined"
              />
            </SearchCondition.Data>
          </SearchCondition.Col>
          <SearchCondition.Col label="Sort Order">
            <SearchCondition.Data>
              <SelectBox
                dataSource={[
                  { value: 'asc', label: 'Ascending' },
                  { value: 'desc', label: 'Descending' },
                ]}
                valueExpr="value"
                displayExpr="label"
                placeholder="Select order"
                stylingMode="outlined"
              />
            </SearchCondition.Data>
          </SearchCondition.Col>
        </SearchCondition.Row>

        <SearchCondition.Row>
          <SearchCondition.Col label="Organization">
            <SearchCondition.Data>
              <TagBox
                dataSource={mockOrganizationData.centers}
                valueExpr="id"
                displayExpr="name"
                placeholder="Select center"
                stylingMode="outlined"
                showSelectionControls={true}
              />
            </SearchCondition.Data>
            <SearchCondition.Data>
              <TagBox
                dataSource={mockOrganizationData.tenants}
                valueExpr="cid"
                displayExpr="name"
                placeholder="Select tenant"
                stylingMode="outlined"
                showSelectionControls={true}
              />
            </SearchCondition.Data>
          </SearchCondition.Col>
        </SearchCondition.Row>
      </SearchCondition>
    </div>
  ),
};

/**
 * 다국어 비교 - 한영 나란히
 *
 * 한국어와 영어 버전을 나란히 배치하여 레이블 너비 차이를 시각적으로 비교할 수 있습니다.
 * CSS 변수가 언어별로 올바르게 적용되는지 확인할 수 있습니다.
 */
export const I18nComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>
          한국어 (label-width: 70px)
        </h3>
        <div lang="ko">
          <SearchCondition
            title="조회 조건"
            buttons={[
              { text: '취소', type: 'normal', onClick: () => {} },
              { text: '조회', type: 'default', onClick: () => {} },
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
              </SearchCondition.Col>
              <SearchCondition.Col label="정렬순서">
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
            </SearchCondition.Row>
          </SearchCondition>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>
          English (label-width: 120px)
        </h3>
        <div lang="en">
          <SearchCondition
            title="Search Conditions"
            buttons={[
              { text: 'Cancel', type: 'normal', onClick: () => {} },
              { text: 'Search', type: 'default', onClick: () => {} },
            ]}
          >
            <SearchCondition.Row twoColumns>
              <SearchCondition.Col label="Category">
                <SearchCondition.Data>
                  <SelectBox
                    dataSource={[
                      { value: 'inbound', label: 'Inbound' },
                      { value: 'outbound', label: 'Outbound' },
                      { value: 'support', label: 'Support Team' },
                    ]}
                    valueExpr="value"
                    displayExpr="label"
                    placeholder="Select team"
                    stylingMode="outlined"
                  />
                </SearchCondition.Data>
              </SearchCondition.Col>
              <SearchCondition.Col label="Sort Order">
                <SearchCondition.Data>
                  <SelectBox
                    dataSource={[
                      { value: 'asc', label: 'Ascending' },
                      { value: 'desc', label: 'Descending' },
                    ]}
                    valueExpr="value"
                    displayExpr="label"
                    placeholder="Select order"
                    stylingMode="outlined"
                  />
                </SearchCondition.Data>
              </SearchCondition.Col>
            </SearchCondition.Row>
          </SearchCondition>
        </div>
      </div>
    </div>
  ),
};

/**
 * 버튼 여러 개
 *
 * buttons prop으로 다양한 액션 버튼을 추가할 수 있습니다.
 */
export const MultipleButtons: Story = {
  args: {
    title: '조회 조건 - 다중 액션',
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

/**
 * DrillDown + Checkbox + DateRangePicker 연동
 *
 * Children 패턴을 사용한 실전 예시:
 * - DrillDown (single mode)로 종류/정렬 선택
 * - "시간범위" 체크박스
 * - 체크박스 상태에 따라 DateRangePicker 활성화/비활성화
 */
export const WithDrillDownAndCheckbox: Story = {
  render: () => {
    const DrillDownExample = () => {
      const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
      const [useTimeRange, setUseTimeRange] = useState(false);
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

      return (
        <SearchCondition
          title="조회 조건 - DrillDown + Checkbox"
          buttons={[
            { text: '취소', type: 'normal', onClick: () => console.log('취소') },
            { text: '조회', type: 'default', onClick: () => {
              console.log('조회:', { selectedFilter, useTimeRange, startDate, endDate });
              alert(`조회!\n필터: ${selectedFilter.join(' > ')}\n시간범위 사용: ${useTimeRange}`);
            }},
          ]}
        >
          {/* Row 1: DrillDown 필터 */}
          <SearchCondition.Row>
            <SearchCondition.Col label="필터">
              <SearchCondition.Data>
                <DrillDown
                  data={mockFilterData}
                  mode="single"
                  levelLabels={['종류', '정렬']}
                  placeholder="종류와 정렬을 선택하세요"
                  onChange={(selected) => {
                    console.log('DrillDown changed:', selected);
                    setSelectedFilter(selected);
                  }}
                />
              </SearchCondition.Data>
            </SearchCondition.Col>
          </SearchCondition.Row>

          {/* Row 2: 시간범위 체크박스 + DateRangePicker */}
          <SearchCondition.Row>
            <SearchCondition.Col label="기간">
              <SearchCondition.Data autoWidth>
                <CheckBox
                  label="시간범위"
                  checked={useTimeRange}
                  onChange={(checked) => {
                    console.log('Checkbox changed:', checked);
                    setUseTimeRange(checked);
                  }}
                />
              </SearchCondition.Data>
              <SearchCondition.Data>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                  disabled={!useTimeRange}
                />
              </SearchCondition.Data>
            </SearchCondition.Col>
          </SearchCondition.Row>
        </SearchCondition>
      );
    };

    return <DrillDownExample />;
  },
};

