import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LineChart,
  LineChartData,
  MultiSeriesData,
} from '../src/components/chart/LineChart';

// ========================================
// 샘플 데이터
// ========================================

const salesTrendData: LineChartData[] = [
  { category: '01', value: 6500 },
  { category: '02', value: 7200 },
  { category: '03', value: 5800 },
  { category: '04', value: 8900 },
  { category: '05', value: 9200 },
  { category: '06', value: 7600 },
  { category: '07', value: 8400 },
  { category: '08', value: 9100 },
  { category: '09', value: 8800 },
  { category: '10', value: 10200 },
  { category: '11', value: 9500 },
  { category: '12', value: 11000 },
];

const coloredData: LineChartData[] = [
  { category: 'Q1', value: 15000, color: '#36CDC1' },
  { category: 'Q2', value: 18000, color: '#36CDC1' },
  { category: 'Q3', value: 16500, color: '#36CDC1' },
  { category: 'Q4', value: 22000, color: '#36CDC1' },
];

const multiChannelData: MultiSeriesData[] = [
  { category: '01', inbound: 1200, outbound: 800, chat: 500 },
  { category: '02', inbound: 1500, outbound: 950, chat: 620 },
  { category: '03', inbound: 1100, outbound: 700, chat: 480 },
  { category: '04', inbound: 1800, outbound: 1200, chat: 750 },
  { category: '05', inbound: 2000, outbound: 1400, chat: 850 },
  { category: '06', inbound: 1700, outbound: 1100, chat: 680 },
  { category: '07', inbound: 1900, outbound: 1300, chat: 780 },
  { category: '08', inbound: 2100, outbound: 1450, chat: 900 },
  { category: '09', inbound: 1850, outbound: 1250, chat: 720 },
  { category: '10', inbound: 2200, outbound: 1500, chat: 950 },
  { category: '11', inbound: 2050, outbound: 1380, chat: 820 },
  { category: '12', inbound: 2300, outbound: 1600, chat: 1000 },
];

const performanceData: MultiSeriesData[] = [
  { category: '1월', sales: 85, marketing: 72, support: 90 },
  { category: '2월', sales: 88, marketing: 75, support: 92 },
  { category: '3월', sales: 82, marketing: 78, support: 88 },
  { category: '4월', sales: 90, marketing: 80, support: 95 },
  { category: '5월', sales: 92, marketing: 85, support: 93 },
  { category: '6월', sales: 87, marketing: 82, support: 91 },
];

// ========================================
// Meta
// ========================================

const meta = {
  title: 'DevExtreme/LineChart',
  component: LineChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `DevExtreme Chart를 기반으로 한 재사용 가능한 라인 차트 컴포넌트입니다.

## 특징

- **2가지 모드**: 기본 단일 시리즈, 다중 시리즈
- **다양한 차트 타입**: line, spline, area, splinearea, stackedarea, stackedsplinearea
- **타입 안전성**: 유니온 타입으로 잘못된 사용 방지
- **범례 토글**: 클릭으로 시리즈 표시/숨김
- **마커 커스터마이징**: 포인트 마커 표시/숨김
- **커스터마이징**: 축 라벨, 회전, 색상, Export 등

## 사용 방법

\`\`\`tsx
import { LineChart } from './components/chart/LineChart';

// 모드 1: 기본 라인 차트
<LineChart
  data={[
    { category: '01', value: 6500 },
    { category: '02', value: 7200 }
  ]}
  showLegend={false}
  showMarkers={true}
/>

// 모드 2: 다중 시리즈 비교
<LineChart
  data={[
    { category: '01', inbound: 1200, outbound: 800 },
    { category: '02', inbound: 1500, outbound: 950 }
  ]}
  seriesKeys={[
    { key: 'inbound', name: '인바운드', color: '#FF6B9D' },
    { key: 'outbound', name: '아웃바운드', color: '#5B9BD5' }
  ]}
  showLegend={true}
  type="line"
/>

// Area 차트
<LineChart
  data={data}
  type="area"
  showMarkers={false}
/>
\`\`\`
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'spline', 'area', 'splinearea', 'stackedarea', 'stackedsplinearea'],
      description: '차트 타입',
      table: { defaultValue: { summary: 'line' } },
    },
    showLegend: {
      control: 'boolean',
      description: '범례 표시 여부',
      table: { defaultValue: { summary: 'true' } },
    },
    showTooltip: {
      control: 'boolean',
      description: '툴팁 표시 여부',
      table: { defaultValue: { summary: 'true' } },
    },
    showMarkers: {
      control: 'boolean',
      description: '포인트 마커 표시 여부',
      table: { defaultValue: { summary: 'true' } },
    },
    enableLegendToggle: {
      control: 'boolean',
      description: '범례 클릭으로 시리즈 토글 가능 여부',
      table: { defaultValue: { summary: 'false' } },
    },
    lineWidth: {
      control: { type: 'range', min: 1, max: 5, step: 0.5 },
      description: '선 두께 (픽셀)',
      table: { defaultValue: { summary: '2' } },
    },
  },
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// 스토리
// ========================================

/** 기본 라인 차트 (Basic Line) */
export const BasicLine: Story = {
  args: {
    data: salesTrendData,
    showLegend: false,
    showTooltip: true,
    showMarkers: true,
    height: 400,
    width: 800,
    xAxisLabel: '월',
    yAxisLabel: '매출액 (천원)',
  },
};

/** 부드러운 곡선 (Spline) */
export const Spline: Story = {
  render: () => (
    <div style={{ width: '800px', padding: '20px', background: 'white' }}>
      <LineChart
        data={salesTrendData}
        type="spline"
        showLegend={false}
        showTooltip={true}
        showMarkers={true}
        height={400}
        xAxisLabel="월"
        yAxisLabel="매출액 (천원)"
        palette={['#36CDC1']}
      />
    </div>
  ),
};

/** 면적 차트 (Area) */
export const Area: Story = {
  render: () => (
    <div style={{ width: '800px', padding: '20px', background: 'white' }}>
      <LineChart
        data={salesTrendData}
        type="area"
        showLegend={false}
        showTooltip={true}
        showMarkers={false}
        height={400}
        xAxisLabel="월"
        yAxisLabel="매출액 (천원)"
        palette={['#5B9BD5']}
      />
    </div>
  ),
};

/** 부드러운 면적 차트 (Spline Area) */
export const SplineArea: Story = {
  render: () => (
    <div style={{ width: '800px', padding: '20px', background: 'white' }}>
      <LineChart
        data={salesTrendData}
        type="splinearea"
        showLegend={false}
        showTooltip={true}
        showMarkers={false}
        height={400}
        xAxisLabel="월"
        yAxisLabel="매출액 (천원)"
        palette={['#FF6B9D']}
      />
    </div>
  ),
};

/** 색상 커스터마이징 (Custom Colors) */
export const CustomColors: Story = {
  render: () => (
    <div style={{ width: '800px', padding: '20px', background: 'white' }}>
      <LineChart
        data={coloredData}
        showLegend={false}
        showTooltip={true}
        showMarkers={true}
        height={400}
        xAxisLabel="분기"
        yAxisLabel="매출액 (천원)"
      />
    </div>
  ),
};

/** 다중 시리즈 비교 (Multi-Series) */
export const MultiSeries: Story = {
  render: () => (
    <div style={{ width: '900px', padding: '20px', background: 'white' }}>
      <LineChart
        data={multiChannelData}
        seriesKeys={[
          { key: 'inbound', name: '인바운드', color: '#FF6B9D' },
          { key: 'outbound', name: '아웃바운드', color: '#5B9BD5' },
          { key: 'chat', name: '채팅', color: '#70AD47' },
        ]}
        showLegend={true}
        legendPosition="top"
        showTooltip={true}
        showMarkers={true}
        height={400}
        xAxisLabel="월"
        yAxisLabel="통화량"
      />
    </div>
  ),
};

/** 범례 토글 기능 (Legend Toggle) */
export const WithLegendToggle: Story = {
  render: () => (
    <div style={{ width: '900px', padding: '20px', background: 'white' }}>
      <LineChart
        data={multiChannelData}
        seriesKeys={[
          { key: 'inbound', name: '인바운드', color: '#FF6B9D' },
          { key: 'outbound', name: '아웃바운드', color: '#5B9BD5' },
          { key: 'chat', name: '채팅', color: '#70AD47' },
        ]}
        showLegend={true}
        legendPosition="top"
        showTooltip={true}
        showMarkers={true}
        enableLegendToggle={true}
        height={400}
        xAxisLabel="월"
        yAxisLabel="통화량"
      />
      <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
        💡 범례를 클릭하여 시리즈를 표시/숨김 할 수 있습니다
      </p>
    </div>
  ),
};

/** 다중 시리즈 스플라인 (Multi-Series Spline) */
export const MultiSeriesSpline: Story = {
  render: () => (
    <div style={{ width: '900px', padding: '20px', background: 'white' }}>
      <LineChart
        data={performanceData}
        seriesKeys={[
          { key: 'sales', name: '영업팀', color: '#3b82f6' },
          { key: 'marketing', name: '마케팅팀', color: '#10b981' },
          { key: 'support', name: '고객지원팀', color: '#f59e0b' },
        ]}
        type="spline"
        showLegend={true}
        legendPosition="top"
        showTooltip={true}
        showMarkers={true}
        height={400}
        xAxisLabel="월"
        yAxisLabel="성과 점수"
      />
    </div>
  ),
};

/** 누적 면적 차트 (Stacked Area) */
export const StackedArea: Story = {
  render: () => (
    <div style={{ width: '900px', padding: '20px', background: 'white' }}>
      <LineChart
        data={multiChannelData}
        seriesKeys={[
          { key: 'inbound', name: '인바운드', color: '#FF6B9D' },
          { key: 'outbound', name: '아웃바운드', color: '#5B9BD5' },
          { key: 'chat', name: '채팅', color: '#70AD47' },
        ]}
        type="stackedarea"
        showLegend={true}
        legendPosition="top"
        showTooltip={true}
        showMarkers={false}
        height={400}
        xAxisLabel="월"
        yAxisLabel="누적 통화량"
      />
    </div>
  ),
};

/** 누적 스플라인 면적 차트 (Stacked Spline Area) */
export const StackedSplineArea: Story = {
  render: () => (
    <div style={{ width: '900px', padding: '20px', background: 'white' }}>
      <LineChart
        data={multiChannelData}
        seriesKeys={[
          { key: 'inbound', name: '인바운드', color: '#FF6B9D' },
          { key: 'outbound', name: '아웃바운드', color: '#5B9BD5' },
          { key: 'chat', name: '채팅', color: '#70AD47' },
        ]}
        type="stackedsplinearea"
        showLegend={true}
        legendPosition="top"
        showTooltip={true}
        showMarkers={false}
        height={400}
        xAxisLabel="월"
        yAxisLabel="누적 통화량"
      />
    </div>
  ),
};

/** 마커 없는 라인 (Without Markers) */
export const WithoutMarkers: Story = {
  render: () => (
    <div style={{ width: '800px', padding: '20px', background: 'white' }}>
      <LineChart
        data={salesTrendData}
        type="spline"
        showLegend={false}
        showTooltip={true}
        showMarkers={false}
        height={400}
        lineWidth={3}
        palette={['#8B5CF6']}
      />
    </div>
  ),
};

/** 두꺼운 선 (Thick Line) */
export const ThickLine: Story = {
  render: () => (
    <div style={{ width: '800px', padding: '20px', background: 'white' }}>
      <LineChart
        data={salesTrendData}
        showLegend={false}
        showTooltip={true}
        showMarkers={true}
        lineWidth={4}
        height={400}
        palette={['#EF4444']}
      />
    </div>
  ),
};

/** 라벨 회전 (Rotated Labels) */
export const RotatedLabels: Story = {
  render: () => (
    <div style={{ width: '800px', padding: '20px', background: 'white' }}>
      <LineChart
        data={[
          { category: '2024년 1월', value: 100 },
          { category: '2024년 2월', value: 150 },
          { category: '2024년 3월', value: 120 },
          { category: '2024년 4월', value: 180 },
          { category: '2024년 5월', value: 200 },
          { category: '2024년 6월', value: 170 },
        ]}
        showLegend={false}
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
      <LineChart
        data={salesTrendData.slice(0, 6)}
        showLegend={false}
        showTooltip={true}
        showMarkers={true}
        height={250}
        width="100%"
        palette={['#36CDC1']}
      />
    </div>
  ),
};

/** 반응형 크기 (Responsive Size) */
export const ResponsiveSize: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '1200px', padding: '20px', background: 'white' }}>
      <LineChart
        data={salesTrendData}
        showLegend={false}
        showTooltip={true}
        showMarkers={true}
        height={400}
        width="100%"
        palette={['#36CDC1']}
      />
    </div>
  ),
};

/** Export 기능 활성화 */
export const WithExport: Story = {
  args: {
    data: salesTrendData,
    showLegend: false,
    showTooltip: true,
    showMarkers: true,
    enableExport: true,
    height: 400,
    width: 800,
  },
};
