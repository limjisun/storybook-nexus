import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchCondition } from '../src/components/SearchCondition';
import { DateRangePicker } from '../src/components/DateRangePicker';
import type { HolidaySettingType } from '../src/components/DateRangePicker';
import DrillDown from '../src/components/form/DrillDown';
import { SelectBox } from 'devextreme-react/select-box';

/**
 * ## KindAndPeriod 조회조건 패턴
 *
 * 통계 페이지에서 자주 사용되는 **종류(KindAndPeriod) + 기간 + 자원범위** 조합 패턴입니다.
 *
 * ### 구조
 * KindAndPeriod 내부에 **종류(DrillDown) + 시간범위(Checkbox) + 기간(DateRangePicker)**이 모두 포함되어 있습니다.
 * 추가 조건(자원범위, 인입구분 등)은 children으로 전달합니다.
 *
 * ### 모드별 구분
 * | 모드 | 설명 | DrillDown 단계 | kind2 SelectBox |
 * |------|------|----------------|-----------------|
 * | `2-level` | 종류 → 상세 | 2단계 | 없음 |
 * | `3-level-queue` | 종류 → 큐분류 → 상세 | 2단계 | 큐/큐중분류/큐대분류/합계 |
 * | `3-level-agent` | 종류 → 상담사분류 → 상세 | 2단계 | 상담사/상담팀/상담그룹/총합 |
 * | `3-level-dn` | 종류 → DN분류 → 상세 | 2단계 | DN/DN중분류/DN대분류/합계 |
 *
 * ### 사용 방법
 *
 * ```tsx
 * // mode를 변경하면 종류 옆에 분류 SelectBox가 나타납니다.
 * // - 큐 통계:    mode="3-level-queue"  → 큐/큐중분류/큐대분류/합계
 * // - 상담사 통계: mode="3-level-agent"  → 상담사/상담팀/상담그룹/총합
 * // - 내선 통계:   mode="3-level-dn"     → DN/DN중분류/DN대분류/합계
 * // - 기본 통계:   mode="2-level"        → SelectBox 없음
 *
 * <SearchCondition title="조회조건" onSubmit={handleSearch}>
 *   <SearchCondition.KindAndPeriod
 *     mode="3-level-dn"
 *     startDate={startDate}
 *     endDate={endDate}
 *     onStartDateChange={setStartDate}
 *     onEndDateChange={setEndDate}
 *     onCategoryChange={handleKindAndPeriodChange}
 *     showHolidaySetting={true}
 *     holidaySetting={holidaySetting}
 *     onHolidaySettingChange={setHolidaySetting}
 *   >
 *     // 추가 조건은 children으로 전달
 *     <SearchCondition.Row columns={2}>
 *       <SearchCondition.Col label="자원범위">
 *         <SearchCondition.Data>
 *           <DrillDown data={orgData} mode="multi" />
 *         </SearchCondition.Data>
 *       </SearchCondition.Col>
 *       <SearchCondition.Col label="인입구분">
 *         <SearchCondition.Data>
 *           <SelectBox dataSource={inboundOptions} />
 *         </SearchCondition.Data>
 *       </SearchCondition.Col>
 *     </SearchCondition.Row>
 *   </SearchCondition.KindAndPeriod>
 * </SearchCondition>
 * ```
 *
 * ### onCategoryChange 콜백
 *
 * ```tsx
 * const handleKindAndPeriodChange = (data) => {
 *   // data.category       - 선택된 카테고리 태그 배열
 *   // data.timeRangeEnabled - 시간범위 체크 여부
 *   // data.timeInterval    - 시간 간격 (5/10/15/30/60분)
 *   // data.startTime       - 시작 시간
 *   // data.endTime         - 종료 시간
 *   console.log(data);
 * };
 * ```
 *
 * ### 시간범위 체크박스 동작
 * - 카테고리 선택에 따라 시간범위 체크박스가 자동으로 체크/해제/비활성화됩니다.
 * - 체크박스 해제 시 요일별/일별/월별/년도별 하위 선택은 자동으로 "전체"로 변경됩니다.
 */
const meta = {
  title: 'NEXUS-CUSTOM/조회조건 패턴 (KindAndPeriod)',
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

/** 자원범위 (센터 > 테넌트) 조직 계층 데이터 */
const organizationData = [
  {
    id: 'center-1',
    text: '[1] NEXUS',
    items: [
      { id: 'tenant-11', text: '[11] qat' },
      { id: 'tenant-12', text: '[12] production' },
    ],
  },
];

/** 인입구분 옵션 */
const inboundTypeOptions = ['전체', '실제인입', '큐이관', '큐회수'];

// ========================================
// 종류(2-level) + 기간
// ========================================

/**
 * ### 종류(2단계) + 기간
 *
 * 가장 기본적인 패턴입니다.
 * - **종류**: 2단계 DrillDown (총합, 분대별, 시간대별, 요일별, 일별, 월별, 년도별)
 * - **시간범위**: 종류 선택에 따라 자동 제어
 * - **기간**: DateRangePicker (시간범위 ON이면 시간 선택 표시, 휴일설정 포함)
 *
 * 종류와 기간이 같은 Row에 2열로 배치됩니다.
 */
export const TwoLevel: Story = {
  render: () => {
    const TwoLevelExample = () => {
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date());
      const [holidaySetting, setHolidaySetting] = useState<HolidaySettingType>('none');

      return (
        <SearchCondition
          title="종류(2단계) + 기간"
          buttons={[
            { text: '초기화', type: 'normal', onClick: () => alert('초기화') },
            { text: '조회', type: 'default', onClick: () => alert('조회') },
          ]}
        >
          <SearchCondition.KindAndPeriod
            mode="2-level"
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onCategoryChange={(data) => {
              console.log('Category:', data.category);
              console.log('TimeRange:', data.timeRangeEnabled, 'Interval:', data.timeInterval);
              console.log('Time:', data.startTime, '~', data.endTime);
            }}
            showHolidaySetting={true}
            holidaySetting={holidaySetting}
            onHolidaySettingChange={setHolidaySetting}
          />
        </SearchCondition>
      );
    };

    return <TwoLevelExample />;
  },
};

// ========================================
// 종류(3-level-queue) + 기간 + 자원범위 + 인입구분
// ========================================

/**
 * ### 종류(3단계-큐) + 기간 + 자원범위 + 인입구분
 *
 * 콜센터 큐(Queue) 기반 통계에서 사용하는 패턴입니다.
 * - **종류**: DrillDown(2단계) + SelectBox(큐/큐중분류/큐대분류/합계) 조합
 * - **기간**: DateRangePicker (시간범위 ON이면 시간 선택 표시, 휴일설정 포함)
 * - **자원범위**: 센터 > 테넌트 계층 선택 (multi DrillDown)
 * - **인입구분**: 전체/실제인입/큐이관/큐회수 (SelectBox)
 *
 * 자원범위와 인입구분은 children으로 추가합니다.
 */
export const ThreeLevelQueue: Story = {
  render: () => {
    const ThreeLevelQueueExample = () => {
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date());
      const [holidaySetting, setHolidaySetting] = useState<HolidaySettingType>('none');
      const [inboundType, setInboundType] = useState('전체');

      return (
        <SearchCondition
          title="종류(3단계-큐) + 기간 + 자원범위 + 인입구분"
          buttons={[
            { text: '초기화', type: 'normal', onClick: () => alert('초기화') },
            { text: '조회', type: 'default', onClick: () => alert('조회') },
          ]}
        >
          <SearchCondition.KindAndPeriod
            mode="3-level-queue"
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onCategoryChange={(data) => {
              console.log('Category:', data.category);
              console.log('TimeRange:', data.timeRangeEnabled, 'Interval:', data.timeInterval);
            }}
            showHolidaySetting={true}
            holidaySetting={holidaySetting}
            onHolidaySettingChange={setHolidaySetting}
          >
            {/* 자원범위 + 인입구분 Row */}
            <SearchCondition.Row columns={2}>
              <SearchCondition.Col label="자원범위">
                <SearchCondition.Data>
                  <DrillDown
                    data={organizationData}
                    levelLabels={['센터', '테넌트']}
                    mode="multi"
                    onChange={(tags) => console.log('자원범위:', tags)}
                    placeholder="센터 > 테넌트 선택"
                    variant="outlined"
                  />
                </SearchCondition.Data>
              </SearchCondition.Col>
              <SearchCondition.Col label="인입구분">
                <SearchCondition.Data>
                  <SelectBox
                    dataSource={inboundTypeOptions}
                    value={inboundType}
                    onValueChanged={(e) => setInboundType(e.value)}
                    searchEnabled={false}
                    stylingMode="outlined"
                  />
                </SearchCondition.Data>
              </SearchCondition.Col>
            </SearchCondition.Row>
          </SearchCondition.KindAndPeriod>
        </SearchCondition>
      );
    };

    return <ThreeLevelQueueExample />;
  },
};

// ========================================
// 종류(3-level-agent) + 기간 + 자원범위
// ========================================

/**
 * ### 종류(3단계-상담사) + 기간 + 자원범위
 *
 * 상담사(Agent) 기반 통계에서 사용하는 패턴입니다.
 * - **종류**: DrillDown(2단계) + SelectBox(상담사/상담팀/상담그룹/총합) 조합
 * - **기간**: DateRangePicker (시간범위 ON이면 시간 선택 표시, 휴일설정 포함)
 * - **자원범위**: 센터 > 테넌트 계층 선택 (multi DrillDown)
 */
export const ThreeLevelAgent: Story = {
  render: () => {
    const ThreeLevelAgentExample = () => {
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date());
      const [holidaySetting, setHolidaySetting] = useState<HolidaySettingType>('none');

      return (
        <SearchCondition
          title="종류(3단계-상담사) + 기간 + 자원범위"
          buttons={[
            { text: '초기화', type: 'normal', onClick: () => alert('초기화') },
            { text: '조회', type: 'default', onClick: () => alert('조회') },
          ]}
        >
          <SearchCondition.KindAndPeriod
            mode="3-level-agent"
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onCategoryChange={(data) => {
              console.log('Category:', data.category);
              console.log('TimeRange:', data.timeRangeEnabled, 'Interval:', data.timeInterval);
            }}
            showHolidaySetting={true}
            holidaySetting={holidaySetting}
            onHolidaySettingChange={setHolidaySetting}
          >
            {/* 자원범위 Row */}
            <SearchCondition.Row>
              <SearchCondition.Col label="자원범위">
                <SearchCondition.Data>
                  <DrillDown
                    data={organizationData}
                    levelLabels={['센터', '테넌트']}
                    mode="multi"
                    onChange={(tags) => console.log('자원범위:', tags)}
                    placeholder="센터 > 테넌트 선택"
                    variant="outlined"
                  />
                </SearchCondition.Data>
              </SearchCondition.Col>
            </SearchCondition.Row>
          </SearchCondition.KindAndPeriod>
        </SearchCondition>
      );
    };

    return <ThreeLevelAgentExample />;
  },
};

// ========================================
// 종류(3-level-dn) + 기간 + 자원범위
// ========================================

/**
 * ### 종류(3단계-DN) + 기간 + 자원범위
 *
 * DN(전화번호) 기반 통계에서 사용하는 패턴입니다.
 * - **종류**: DrillDown(2단계) + SelectBox(DN/DN중분류/DN대분류/합계) 조합
 * - **기간**: DateRangePicker (시간범위 ON이면 시간 선택 표시, 휴일설정 포함)
 * - **자원범위**: 센터 > 테넌트 계층 선택 (multi DrillDown)
 */
export const ThreeLevelDN: Story = {
  render: () => {
    const ThreeLevelDNExample = () => {
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date());
      const [holidaySetting, setHolidaySetting] = useState<HolidaySettingType>('none');

      return (
        <SearchCondition
          title="종류(3단계-DN) + 기간 + 자원범위"
          buttons={[
            { text: '초기화', type: 'normal', onClick: () => alert('초기화') },
            { text: '조회', type: 'default', onClick: () => alert('조회') },
          ]}
        >
          <SearchCondition.KindAndPeriod
            mode="3-level-dn"
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onCategoryChange={(data) => {
              console.log('Category:', data.category);
              console.log('TimeRange:', data.timeRangeEnabled, 'Interval:', data.timeInterval);
            }}
            showHolidaySetting={true}
            holidaySetting={holidaySetting}
            onHolidaySettingChange={setHolidaySetting}
          >
            {/* 자원범위 Row */}
            <SearchCondition.Row>
              <SearchCondition.Col label="자원범위">
                <SearchCondition.Data>
                  <DrillDown
                    data={organizationData}
                    levelLabels={['센터', '테넌트']}
                    mode="multi"
                    onChange={(tags) => console.log('자원범위:', tags)}
                    placeholder="센터 > 테넌트 선택"
                    variant="outlined"
                  />
                </SearchCondition.Data>
              </SearchCondition.Col>
            </SearchCondition.Row>
          </SearchCondition.KindAndPeriod>
        </SearchCondition>
      );
    };

    return <ThreeLevelDNExample />;
  },
};

// ========================================
// 기간 + 자원범위 (KindAndPeriod 없이)
// ========================================

/**
 * ### 기간(시간포함) + 자원범위
 *
 * KindAndPeriod 없이 기간과 자원범위만 사용하는 패턴입니다.
 * SearchCondition.Row/Col/Data를 직접 사용합니다.
 */
export const PeriodWithResource: Story = {
  render: () => {
    const PeriodExample = () => {
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date());
      const [startTime, setStartTime] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
      const [endTime, setEndTime] = useState(new Date(new Date().setHours(23, 59, 0, 0)));
      const [holidaySetting, setHolidaySetting] = useState<HolidaySettingType>('none');

      return (
        <SearchCondition
          title="기간(시간포함) + 자원범위"
          buttons={[
            { text: '초기화', type: 'normal', onClick: () => alert('초기화') },
            { text: '조회', type: 'default', onClick: () => alert('조회') },
          ]}
        >
          <SearchCondition.Row columns={2}>
            <SearchCondition.Col label="기간">
              <SearchCondition.Data>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                  startTime={startTime}
                  endTime={endTime}
                  onStartTimeChange={setStartTime}
                  onEndTimeChange={setEndTime}
                  showTime={true}
                  showHolidaySetting={true}
                  holidaySetting={holidaySetting}
                  onHolidaySettingChange={setHolidaySetting}
                />
              </SearchCondition.Data>
            </SearchCondition.Col>
            <SearchCondition.Col label="자원범위">
              <SearchCondition.Data>
                <DrillDown
                  data={organizationData}
                  levelLabels={['센터', '테넌트']}
                  mode="multi"
                  onChange={(tags) => console.log('자원범위:', tags)}
                  placeholder="센터 > 테넌트 선택"
                  variant="outlined"
                />
              </SearchCondition.Data>
            </SearchCondition.Col>
          </SearchCondition.Row>
        </SearchCondition>
      );
    };

    return <PeriodExample />;
  },
};

// ========================================
// 모드 비교 (All Modes)
// ========================================

/**
 * ### 모드 비교
 *
 * 2-level, 3-level-queue, 3-level-agent, 3-level-dn 모드를 나란히 비교합니다.
 * 각 모드별 DrillDown + SelectBox 조합 차이를 확인할 수 있습니다.
 *
 * - **2-level**: DrillDown만 (SelectBox 없음)
 * - **3-level-queue**: DrillDown + 큐분류 SelectBox
 * - **3-level-agent**: DrillDown + 상담사분류 SelectBox
 * - **3-level-dn**: DrillDown + DN분류 SelectBox
 */
export const AllModesComparison: Story = {
  render: () => {
    const AllModesExample = () => {
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date());

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 2-level */}
          <SearchCondition
            title="2-level (종류 → 상세)"
            buttons={[
              { text: '조회', type: 'default', onClick: () => alert('조회') },
            ]}
          >
            <SearchCondition.KindAndPeriod
              mode="2-level"
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onCategoryChange={(data) => console.log('2-level:', data)}
            />
          </SearchCondition>

          {/* 3-level-queue */}
          <SearchCondition
            title="3-level-queue (종류 + 큐분류 SelectBox)"
            buttons={[
              { text: '조회', type: 'default', onClick: () => alert('조회') },
            ]}
          >
            <SearchCondition.KindAndPeriod
              mode="3-level-queue"
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onCategoryChange={(data) => console.log('3-level-queue:', data)}
            />
          </SearchCondition>

          {/* 3-level-agent */}
          <SearchCondition
            title="3-level-agent (종류 + 상담사분류 SelectBox)"
            buttons={[
              { text: '조회', type: 'default', onClick: () => alert('조회') },
            ]}
          >
            <SearchCondition.KindAndPeriod
              mode="3-level-agent"
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onCategoryChange={(data) => console.log('3-level-agent:', data)}
            />
          </SearchCondition>

          {/* 3-level-dn */}
          <SearchCondition
            title="3-level-dn (종류 + DN분류 SelectBox)"
            buttons={[
              { text: '조회', type: 'default', onClick: () => alert('조회') },
            ]}
          >
            <SearchCondition.KindAndPeriod
              mode="3-level-dn"
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onCategoryChange={(data) => console.log('3-level-dn:', data)}
            />
          </SearchCondition>
        </div>
      );
    };

    return <AllModesExample />;
  },
};
