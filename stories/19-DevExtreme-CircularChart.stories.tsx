import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CircularChart, CircularChartData } from '../src/components/chart/CircularChart';

// ========================================
// 샘플 데이터
// ========================================

const donutData: CircularChartData[] = [
  { category: '응답', value: 30, color: '#ff85a2' },
  { category: '미응답', value: 70, color: '#e5e7eb' },
];

const multiCategoryData: CircularChartData[] = [
  { category: '대기', value: 67, color: '#36CDC1' },
  { category: '휴식', value: 67, color: '#FF8095' },
  { category: '통화중', value: 67, color: '#CF8FFF' },
  { category: '후처리', value: 67, color: '#7AAAFB' },
];

const loginStatusData: CircularChartData[] = [
  { category: '후처리', value: 1, color: '#FF8566' },
  { category: '휴식', value: 1, color: '#36CDC1' },
  { category: '대기 상담사', value: 500, color: '#4A9FE8' },
];

const pieData: CircularChartData[] = [
  { category: '인바운드', value: 6500 },
  { category: '아웃바운드', value: 4200 },
  { category: '내부통화', value: 1800 },
];

// ========================================
// Meta
// ========================================

const meta = {
  title: 'DevExtreme/CircularChart',
  component: CircularChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `DevExtreme PieChart를 기반으로 한 재사용 가능한 원형/도넛 차트 컴포넌트입니다.

## 특징

- **원형/도넛 차트**: type prop으로 pie 또는 doughnut 선택
- **중앙 텍스트**: 도넛 차트 중앙에 커스텀 텍스트 표시 가능
- **커스텀 Legend**: 기본 범례 또는 사용자 정의 범례 선택
- **반응형 크기**: 픽셀, %, vh/vw 등 다양한 크기 단위 지원
- **색상 커스터마이징**: 데이터별 색상 지정, palette prop, DevExtreme 기본 팔레트
- **라벨 위치**: inside, outside, columns 중 선택
- **애니메이션**: 차트 렌더링 시 애니메이션 효과

## 사용 방법

\`\`\`tsx
import { CircularChart } from './components/chart/CircularChart';

// 기본 원형 차트
<CircularChart
  data={[
    { category: '인바운드', value: 6500 },
    { category: '아웃바운드', value: 4200 }
  ]}
  type="pie"
  showLegend={true}
/>

// 중앙 텍스트가 있는 도넛 차트
<CircularChart
  data={data}
  type="doughnut"
  innerRadius={0.6}
  centerText={{
    label: '응답률',
    value: 48.1,
    showPercentSign: true,
    valueFontSize: 32
  }}
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
      options: ['pie', 'doughnut'],
      description: '차트 타입',
      table: { defaultValue: { summary: 'pie' } },
    },
    innerRadius: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: '도넛 차트의 내부 반지름 (0-1 사이)',
      table: { defaultValue: { summary: '0.65' } },
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
    showLabel: {
      control: 'boolean',
      description: '데이터 라벨 표시 여부',
      table: { defaultValue: { summary: 'true' } },
    },
    labelPosition: {
      control: 'select',
      options: ['inside', 'outside', 'columns'],
      description: '라벨 위치',
      table: { defaultValue: { summary: 'outside' } },
    },
    animation: {
      control: 'boolean',
      description: '애니메이션 효과',
      table: { defaultValue: { summary: 'true' } },
    },
  },
} satisfies Meta<typeof CircularChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// 스토리
// ========================================

/** 기본 원형 차트 (Basic Pie Chart) */
export const BasicPie: Story = {
  args: {
    data: pieData,
    type: 'pie',
    height: 400,
    showLegend: true,
    showTooltip: true,
    showLabel: true,
    animation: true,
  },
};

/** 도넛 차트 - 중앙 텍스트 (Doughnut with Center Text) */
export const DoughnutWithCenterText: Story = {
  render: () => (
    <div style={{ padding: '20px', background: 'white' }}>
      <CircularChart
        data={donutData}
        type="doughnut"
        innerRadius={0.6}
        showLegend={false}
        showTooltip={false}
        showLabel={false}
        centerText={{
          label: '응답률',
          value: donutData[0].value,
          showPercentSign: true,
          labelFontSize: 13,
          valueFontSize: 20,
          percentSignFontSize: 17,
          labelColor: '#222',
          valueColor: '#333',
        }}
        palette={donutData.map(d => d.color || '')}
        height={200}
        animation={true}
      />
    </div>
  ),
};

/** 도넛 차트 - columns 라벨 */
export const DoughnutWithColumnsLabel: Story = {
  render: () => (
    <div style={{ padding: '20px', background: 'white', maxWidth: '600px' }}>
      <CircularChart
        data={loginStatusData}
        type="doughnut"
        innerRadius={0.6}
        showLegend={false}
        showTooltip={false}
        showLabel={true}
        labelPosition="columns"
        customizeLabelText={(arg: any) => `${arg.argumentText}: ${arg.valueText}`}
        centerText={{
          label: '로그인',
          value: loginStatusData.reduce((sum, item) => sum + item.value, 0),
          showPercentSign: false,
          labelFontSize: 13,
          valueFontSize: 24,
          valueColor: '#111',
        }}
        palette={loginStatusData.map(d => d.color || '')}
        height={400}
        animation={true}
      />
    </div>
  ),
};

/** 도넛 차트 - 커스텀 Legend */
export const DoughnutWithCustomLegend: Story = {
  render: () => (
    <div style={{ padding: '20px', background: 'white' }}>
      <CircularChart
        data={multiCategoryData}
        type="doughnut"
        innerRadius={0.6}
        showLegend={false}
        showTooltip={false}
        showLabel={true}
        labelPosition="columns"
        customizeLabelText={(arg: any) => `${arg.argumentText}\n${arg.percentText}`}
        centerText={{
          value: 48.1,
          showPercentSign: true,
          valueFontSize: 20,
          percentSignFontSize: 17,
          valueColor: '#333',
        }}
        palette={multiCategoryData.map(d => d.color || '')}
        height={400}
        customLegendLayout="right"
        renderCustomLegend={(chartData) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {chartData.map((item) => (
              <div
                key={item.category}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  backgroundColor: item.color,
                  color: 'white',
                  padding: '6px 12px',
                  fontWeight: 500,
                  fontSize: '12px',
                  minWidth: '120px',
                }}
              >
                <span>{item.category}</span>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        )}
        animation={true}
      />
    </div>
  ),
};

/** 원형 차트 - 외부 라벨 */
export const PieWithOutsideLabel: Story = {
  args: {
    data: pieData,
    type: 'pie',
    height: 400,
    showLegend: true,
    legendPosition: 'bottom',
    showTooltip: true,
    showLabel: true,
    labelPosition: 'outside',
    animation: true,
  },
};

/** 도넛 차트 - 내부 라벨 */
export const DoughnutWithInsideLabel: Story = {
  args: {
    data: multiCategoryData,
    type: 'doughnut',
    innerRadius: 0.5,
    height: 400,
    showLegend: true,
    legendPosition: 'right',
    showTooltip: true,
    showLabel: true,
    labelPosition: 'inside',
    palette: multiCategoryData.map(d => d.color || ''),
    animation: true,
  },
};

/** 반응형 크기 (100% width) */
export const ResponsiveSize: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '800px', padding: '20px', background: 'white' }}>
      <CircularChart
        data={pieData}
        type="pie"
        width="100%"
        height={400}
        showLegend={true}
        showTooltip={true}
        showLabel={true}
        animation={true}
      />
    </div>
  ),
};

/** 작은 사이즈 (200px) */
export const SmallSize: Story = {
  render: () => (
    <div style={{ padding: '20px', background: 'white' }}>
      <CircularChart
        data={donutData}
        type="doughnut"
        innerRadius={0.6}
        width={200}
        height={200}
        showLegend={false}
        showTooltip={false}
        showLabel={false}
        centerText={{
          label: '응답률',
          value: donutData[0].value,
          showPercentSign: true,
          labelFontSize: 11,
          valueFontSize: 16,
          percentSignFontSize: 14,
        }}
        palette={donutData.map(d => d.color || '')}
        animation={true}
      />
    </div>
  ),
};

/** 애니메이션 비활성화 */
export const NoAnimation: Story = {
  args: {
    data: pieData,
    type: 'pie',
    height: 400,
    showLegend: true,
    showTooltip: true,
    showLabel: true,
    animation: false,
  },
};

/** DevExtreme 기본 팔레트 사용 */
export const WithDevExtremePalette: Story = {
  args: {
    data: [
      { category: 'A', value: 100 },
      { category: 'B', value: 200 },
      { category: 'C', value: 150 },
      { category: 'D', value: 180 },
    ],
    type: 'pie',
    height: 400,
    showLegend: true,
    showTooltip: true,
    showLabel: true,
    // palette를 지정하지 않으면 DevExtreme 기본 팔레트 사용
    animation: true,
  },
};
