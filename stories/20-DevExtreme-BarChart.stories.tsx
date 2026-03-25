import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  BarChart,
  BarChartData,
  MultiSeriesData,
  LongFormatData,
  ProgressData,
} from '../src/components/chart/BarChart';

// ========================================
// 샘플 데이터
// ========================================

const salesData: BarChartData[] = [
  { category: '1월', value: 6500, color: '#36CDC1' },
  { category: '2월', value: 7200, color: '#36CDC1' },
  { category: '3월', value: 5800, color: '#36CDC1' },
  { category: '4월', value: 8900, color: '#36CDC1' },
  { category: '5월', value: 9200, color: '#36CDC1' },
  { category: '6월', value: 7600, color: '#36CDC1' },
];

const progressData: ProgressData[] = [
  { category: '영업팀', value: 850 },
  { category: '마케팅팀', value: 720 },
  { category: '개발팀', value: 950 },
  { category: 'CS팀', value: 680 },
];

const categoryData: BarChartData[] = [
  { category: '인바운드', value: 12500, color: '#36CDC1' },
  { category: '아웃바운드', value: 8900, color: '#FF8095' },
  { category: '문자', value: 15600, color: '#CF8FFF' },
  { category: '이메일', value: 6200, color: '#7AAAFB' },
];

const multiSeriesData: MultiSeriesData[] = [
  { category: '1월', inbound: 1200, outbound: 800 },
  { category: '2월', inbound: 1500, outbound: 950 },
  { category: '3월', inbound: 1100, outbound: 700 },
  { category: '4월', inbound: 1800, outbound: 1200 },
  { category: '5월', inbound: 2000, outbound: 1400 },
  { category: '6월', inbound: 1700, outbound: 1100 },
];

const longFormatData: LongFormatData[] = [
  { category: '1분기', name: '영업팀', value: 8500 },
  { category: '1분기', name: '마케팅팀', value: 6200 },
  { category: '1분기', name: '개발팀', value: 7800 },
  { category: '2분기', name: '영업팀', value: 9200 },
  { category: '2분기', name: '마케팅팀', value: 7100 },
  { category: '2분기', name: '개발팀', value: 8400 },
  { category: '3분기', name: '영업팀', value: 8800 },
  { category: '3분기', name: '마케팅팀', value: 6800 },
  { category: '3분기', name: '개발팀', value: 8100 },
];

const stackedData: MultiSeriesData[] = [
  { category: '1월', product1: 100, product2: 80, product3: 60 },
  { category: '2월', product1: 120, product2: 90, product3: 70 },
  { category: '3월', product1: 110, product2: 85, product3: 65 },
];

// ========================================
// Meta
// ========================================

const meta = {
  title: 'DevExtreme/BarChart',
  component: BarChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `DevExtreme Chart를 기반으로 한 재사용 가능한 막대 차트 컴포넌트입니다.

## 특징

- **5가지 모드**: 기본 단일 시리즈, 다중 시리즈, Long format, SeriesTemplate, 진행률 차트
- **방향 전환**: 세로/가로 막대 차트 지원
- **타입 안전성**: 유니온 타입으로 잘못된 사용 방지
- **스택형 차트**: stackedbar, fullstackedbar 지원
- **진행률 시각화**: 목표 대비 달성률 표시
- **커스터마이징**: 축 라벨, 회전, 색상, Export 등

## 사용 방법

\`\`\`tsx
import { BarChart } from './components/chart/BarChart';

// 모드 1: 기본 막대 차트
<BarChart
  data={[
    { category: '1월', value: 6500 },
    { category: '2월', value: 7200 }
  ]}
  orientation="vertical"
  showLabel={true}
/>

// 모드 2: 다중 시리즈 비교
<BarChart
  data={[
    { category: '1월', inbound: 100, outbound: 80 },
    { category: '2월', inbound: 120, outbound: 90 }
  ]}
  seriesKeys={[
    { key: 'inbound', name: '인바운드', color: '#3b82f6' },
    { key: 'outbound', name: '아웃바운드', color: '#10b981' }
  ]}
  showLegend={true}
/>

// 모드 5: 진행률/달성률
<BarChart
  data={[{ category: '영업팀', value: 850 }]}
  stackedToMax={{
    max: 1000,
    valueColor: '#22c55e',
    remainderColor: '#e5e7eb'
  }}
/>
\`\`\`
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '막대 방향',
      table: { defaultValue: { summary: 'vertical' } },
    },
    showLegend: {
      control: 'boolean',
      description: '범례 표시 여부',
      table: { defaultValue: { summary: 'false' } },
    },
    showTooltip: {
      control: 'boolean',
      description: '툴팁 표시 여부',
      table: { defaultValue: { summary: 'true' } },
    },
    showLabel: {
      control: 'boolean',
      description: '데이터 라벨 표시 여부',
      table: { defaultValue: { summary: 'false' } },
    },
    barWidth: {
      control: { type: 'range', min: 10, max: 100, step: 5 },
      description: '막대 너비 (픽셀)',
    },
  },
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// 스토리
// ========================================

/** 기본 세로 막대 차트 (Basic Vertical Bar) */
export const BasicVertical: Story = {
  args: {
    data: salesData,
    orientation: 'vertical',
    showTooltip: true,
    showLabel: false,
    barWidth: 30,
    palette: salesData.map(d => d.color || ''),
    height: 400,
  },
};

/** 가로 막대 차트 (Horizontal Bar) */
export const Horizontal: Story = {
  render: () => (
    <div style={{ width: '800px', padding: '20px', background: 'white' }}>
      <BarChart
        data={categoryData}
        orientation="horizontal"
        showTooltip={true}
        showLabel={true}
        palette={categoryData.map(d => d.color || '')}
        height={400}
        xAxisLabel="통화량"
        yAxisLabel="채널"
      />
    </div>
  ),
};

/** 진행률/달성률 차트 - 세로 (Progress Chart - Vertical) */
export const ProgressVertical: Story = {
  render: () => (
    <div style={{ width: '600px', padding: '20px', background: 'white' }}>
      <BarChart
        data={progressData}
        stackedToMax={{
          max: 1000,
          valueColor: '#36CDC1',
          remainderColor: '#e5e7eb',
          barWidth: 24,
        }}
        orientation="vertical"
        showTooltip={true}
        height={400}
      />
      <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
        목표: 1,000 | 초록색: 달성량, 회색: 남은 목표
      </p>
    </div>
  ),
};

/** 진행률/달성률 차트 - 가로 (Progress Chart - Horizontal) */
export const ProgressHorizontal: Story = {
  render: () => (
    <div style={{ width: '700px', padding: '20px', background: 'white' }}>
      <BarChart
        data={progressData}
        stackedToMax={{
          max: 1000,
          valueColor: '#3b82f6',
          remainderColor: '#f3f4f6',
          barWidth: 50,
        }}
        orientation="horizontal"
        showTooltip={true}
        height={400}
        xAxisLabel="달성률"
        yAxisLabel="팀"
      />
    </div>
  ),
};

/** 다중 시리즈 비교 (Multi-Series Comparison) */
export const MultiSeries: Story = {
  render: () => (
    <div style={{ width: '800px', padding: '20px', background: 'white' }}>
      <BarChart
        data={multiSeriesData}
        seriesKeys={[
          { key: 'inbound', name: '인바운드', color: '#3b82f6' },
          { key: 'outbound', name: '아웃바운드', color: '#10b981' },
        ]}
        orientation="vertical"
        showTooltip={true}
        showLabel={true}
        showLegend={true}
        legendPosition="top"
        height={400}
        xAxisLabel="월"
        yAxisLabel="통화량"
      />
    </div>
  ),
};

/** Long Format 데이터 (Long Format Data) */
export const LongFormat: Story = {
  render: () => (
    <div style={{ width: '800px', padding: '20px', background: 'white' }}>
      <BarChart
        data={longFormatData}
        useNameField={true}
        orientation="vertical"
        showTooltip={true}
        showLabel={false}
        showLegend={true}
        legendPosition="top"
        height={400}
        xAxisLabel="분기"
        yAxisLabel="실적"
      />
    </div>
  ),
};

/** 스택형 막대 차트 (Stacked Bar) */
export const StackedBar: Story = {
  render: () => (
    <div style={{ width: '700px', padding: '20px', background: 'white' }}>
      <BarChart
        data={stackedData}
        type="stackedbar"
        seriesKeys={[
          { key: 'product1', name: '제품 A', color: '#3b82f6' },
          { key: 'product2', name: '제품 B', color: '#10b981' },
          { key: 'product3', name: '제품 C', color: '#f59e0b' },
        ]}
        orientation="vertical"
        showTooltip={true}
        showLegend={true}
        legendPosition="top"
        height={400}
      />
    </div>
  ),
};

/** 100% 스택형 막대 차트 (Full Stacked Bar) */
export const FullStackedBar: Story = {
  render: () => (
    <div style={{ width: '700px', padding: '20px', background: 'white' }}>
      <BarChart
        data={stackedData}
        type="fullstackedbar"
        seriesKeys={[
          { key: 'product1', name: '제품 A', color: '#3b82f6' },
          { key: 'product2', name: '제품 B', color: '#10b981' },
          { key: 'product3', name: '제품 C', color: '#f59e0b' },
        ]}
        orientation="vertical"
        showTooltip={true}
        showLegend={true}
        legendPosition="top"
        height={400}
      />
    </div>
  ),
};

/** 라벨 회전 (Rotated Labels) */
export const RotatedLabels: Story = {
  render: () => (
    <div style={{ width: '800px', padding: '20px', background: 'white' }}>
      <BarChart
        data={[
          { category: '매우 긴 카테고리 이름 1', value: 100 },
          { category: '매우 긴 카테고리 이름 2', value: 150 },
          { category: '매우 긴 카테고리 이름 3', value: 120 },
          { category: '매우 긴 카테고리 이름 4', value: 180 },
        ]}
        orientation="vertical"
        showTooltip={true}
        xAxisLabelRotation={-45}
        height={400}
      />
    </div>
  ),
};

/** 작은 사이즈 (Small Size) */
export const SmallSize: Story = {
  render: () => (
    <div style={{ width: '400px', padding: '20px', background: 'white' }}>
      <BarChart
        data={salesData.slice(0, 3)}
        orientation="vertical"
        showTooltip={true}
        showLabel={false}
        palette={salesData.map(d => d.color || '')}
        height={250}
        width="100%"
      />
    </div>
  ),
};

/** 반응형 크기 (Responsive Size) */
export const ResponsiveSize: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '1000px', padding: '20px', background: 'white' }}>
      <BarChart
        data={salesData}
        orientation="vertical"
        showTooltip={true}
        showLabel={true}
        palette={salesData.map(d => d.color || '')}
        height={400}
        width="100%"
      />
    </div>
  ),
};

/** Export 기능 활성화 */
export const WithExport: Story = {
  args: {
    data: salesData,
    orientation: 'vertical',
    showTooltip: true,
    enableExport: true,
    palette: salesData.map(d => d.color || ''),
    height: 400,
  },
};
