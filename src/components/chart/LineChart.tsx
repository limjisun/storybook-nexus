import React, { useId, useState } from 'react';
import Chart, {
  Series,
  ArgumentAxis,
  ValueAxis,
  Legend,
  Tooltip,
  Label,
  Export,
  Size,
  CommonSeriesSettings,
  Title,
} from 'devextreme-react/chart';
import type { LegendClickEvent } from 'devextreme/viz/chart';

/**
 * 기본 라인 차트 데이터 타입
 */
export interface LineChartData {
  /** 카테고리 이름 (x축) */
  category: string;
  /** 값 (y축) */
  value: number;
  /** 색상 (옵션) */
  color?: string;
}

/**
 * 다중 시리즈 데이터 타입
 */
export interface MultiSeriesData {
  /** 카테고리 이름 (x축) */
  category: string;
  /** 동적 값 필드 (여러 시리즈) */
  [key: string]: string | number;
}

/**
 * 시리즈 키 설정
 */
export interface SeriesKey {
  /** 데이터 필드 키 */
  key: string;
  /** 표시 이름 (옵션) */
  name?: string;
  /** 색상 (옵션) */
  color?: string;
}

/**
 * 공통 Props
 */
interface BaseLineChartProps {
  /** 차트 제목 */
  title?: string;

  /** 차트 높이 (숫자 또는 CSS 단위 문자열) */
  height?: number | string;

  /** 차트 너비 (숫자 또는 CSS 단위 문자열) */
  width?: number | string;

  /** 색상 팔레트 (커스텀 색상 배열) */
  palette?: string[];

  /** Legend 표시 여부 */
  showLegend?: boolean;

  /** Legend 위치 */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';

  /** Tooltip 표시 여부 */
  showTooltip?: boolean;

  /** 포인트 마커 표시 여부 */
  showMarkers?: boolean;

  /** Export 기능 활성화 */
  enableExport?: boolean;

  /** 커스텀 클래스명 */
  className?: string;

  /** 애니메이션 활성화 */
  animation?: boolean;

  /** x축 라벨 */
  xAxisLabel?: string;

  /** y축 라벨 */
  yAxisLabel?: string;

  /** 선 두께 (픽셀 단위) */
  lineWidth?: number;

  /** X축 라벨 회전 각도 */
  xAxisLabelRotation?: number;

  /** 차트 타입 */
  type?: 'line' | 'spline' | 'area' | 'splinearea' | 'stackedarea' | 'stackedsplinearea';

  /** 범례 클릭으로 시리즈 토글 가능 여부 */
  enableLegendToggle?: boolean;
}

/**
 * LineChart Props - 유니온 타입으로 2가지 모드 지원
 */
export type LineChartProps = BaseLineChartProps & (
  // 모드 1: 기본 단일 시리즈
  | {
      data: LineChartData[];
      seriesKeys?: never;
    }
  // 모드 2: 다중 시리즈
  | {
      data: MultiSeriesData[];
      seriesKeys: SeriesKey[];
    }
);

/**
 * LineChart 컴포넌트
 *
 * DevExtreme Chart를 기반으로 한 재사용 가능한 라인 차트 컴포넌트
 * 다중 시리즈 지원 및 범례 클릭으로 시리즈 활성화/비활성화 가능
 *
 * @example
 * ```tsx
 * // 모드 1: 기본 라인 차트
 * <LineChart
 *   data={[
 *     { category: '01', value: 20 },
 *     { category: '02', value: 25 }
 *   ]}
 *   showLegend={true}
 * />
 *
 * // 모드 2: 다중 시리즈 라인 차트
 * <LineChart
 *   data={[
 *     { category: '01', series1: 20, series2: 18, series3: 15 },
 *     { category: '02', series1: 22, series2: 19, series3: 16 }
 *   ]}
 *   seriesKeys={[
 *     { key: 'series1', name: '데이터1', color: '#FF6B9D' },
 *     { key: 'series2', name: '데이터2', color: '#5B9BD5' },
 *     { key: 'series3', name: '데이터3', color: '#70AD47' }
 *   ]}
 *   showLegend={true}
 *   type="line"
 * />
 * ```
 */
export const LineChart: React.FC<LineChartProps> = (props) => {
  const {
    data,
    title,
    height = 400,
    width,
    palette,
    showLegend = true,
    legendPosition = 'right',
    showTooltip = true,
    showMarkers = true,
    enableExport = false,
    className = '',
    xAxisLabel,
    yAxisLabel,
    lineWidth = 2,
    xAxisLabelRotation,
    type = 'line',
    enableLegendToggle = false,
  } = props;

  const chartId = useId();

  // 범례 클릭으로 시리즈 표시/숨김 상태 관리
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());

  // 범례 클릭 핸들러
  const handleLegendClick = (e: LegendClickEvent) => {
    if (!enableLegendToggle) return;

    const target = e.target;
    const seriesName = target.name;

    setHiddenSeries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(seriesName)) {
        newSet.delete(seriesName);
      } else {
        newSet.add(seriesName);
      }
      return newSet;
    });
  };

  // height/width를 CSS 문자열로 변환
  const formatSize = (size: number | string | undefined): string | undefined => {
    if (size === undefined) return undefined;
    return typeof size === 'number' ? `${size}px` : size;
  };

  // Size 컴포넌트에 넘길 값 (숫자만 가능)
  const getSizeValue = (size: number | string | undefined): number | undefined => {
    if (size === undefined) return undefined;
    if (typeof size === 'number') return size;
    return undefined;
  };

  const sizeHeight = getSizeValue(height);
  const sizeWidth = getSizeValue(width);

  const containerStyle: React.CSSProperties = {
    height: formatSize(height),
    width: formatSize(width) || '100%',
    position: 'relative',
  };

  // 모드 2: 다중 시리즈
  if ('seriesKeys' in props && props.seriesKeys?.length) {
    const { seriesKeys } = props;

    return (
      <div className={`line-chart-container ${className}`} style={containerStyle}>
        <Chart
          id={`line-chart-${chartId}`}
          dataSource={data}
          palette={palette}
          onLegendClick={handleLegendClick}
        >
          {title && <Title text={title} />}

          <CommonSeriesSettings
            type={type}
            width={lineWidth}
            point={{ visible: showMarkers, size: 8 }}
          />

          {seriesKeys.map(({ key, name, color }) => (
            <Series
              key={key}
              argumentField="category"
              valueField={key}
              name={name ?? key}
              color={color}
              visible={!hiddenSeries.has(name ?? key)}
            />
          ))}

          <ArgumentAxis title={xAxisLabel}>
            <Label rotationAngle={xAxisLabelRotation} overlappingBehavior={xAxisLabelRotation ? "rotate" : "none"} />
          </ArgumentAxis>

          <ValueAxis title={yAxisLabel}>
            <Label />
          </ValueAxis>

          <Size height={sizeHeight} width={sizeWidth} />

          {enableExport && <Export enabled={true} />}

          {showLegend && (
            <Legend
              visible={true}
              verticalAlignment={legendPosition === 'top' || legendPosition === 'bottom' ? legendPosition : 'bottom'}
              horizontalAlignment={legendPosition === 'left' || legendPosition === 'right' ? legendPosition : 'center'}
            />
          )}

          {showTooltip && (
            <Tooltip
              enabled
              paddingLeftRight={12}
              paddingTopBottom={8}
              cornerRadius={8}
              opacity={1}
              color="#1f2937"
              font={{ color: "#ffffff" }}
              border={{ visible: false }}
            />
          )}
        </Chart>
      </div>
    );
  }

  // 모드 1: 기본 단일 시리즈
  const customizePoint = (pointInfo: { argument?: string }) => {
    const dataItem = (data as LineChartData[]).find(d => d.category === pointInfo.argument);
    if (dataItem?.color) {
      return { color: dataItem.color };
    }
    return {};
  };

  return (
    <div className={`line-chart-container ${className}`} style={containerStyle}>
      <Chart
        id={`line-chart-${chartId}`}
        dataSource={data}
        palette={palette}
        title={title}
        customizePoint={customizePoint}
        onLegendClick={handleLegendClick}
      >
        <CommonSeriesSettings
          type={type}
          width={lineWidth}
          point={{ visible: showMarkers, size: 8 }}
        />

        <Series
          argumentField="category"
          valueField="value"
          name=""
          showInLegend={showLegend}
          visible={!hiddenSeries.has("")}
        />

        <ArgumentAxis title={xAxisLabel} discreteAxisDivisionMode="crossLabels">
          <Label
            rotationAngle={xAxisLabelRotation}
            overlappingBehavior={xAxisLabelRotation ? "rotate" : "none"}
          />
        </ArgumentAxis>

        <ValueAxis title={yAxisLabel}>
          <Label />
        </ValueAxis>

        <Size height={sizeHeight} width={sizeWidth} />

        {enableExport && <Export enabled={true} />}

        {showLegend && (
          <Legend
            visible={true}
            verticalAlignment={legendPosition === 'top' || legendPosition === 'bottom' ? legendPosition : 'bottom'}
            horizontalAlignment={legendPosition === 'left' || legendPosition === 'right' ? legendPosition : 'center'}
          />
        )}

        {showTooltip && (
          <Tooltip
            enabled={true}
            paddingLeftRight={12}
            paddingTopBottom={8}
            cornerRadius={8}
            opacity={1}
            color="#1f2937"
            font={{ color: "#ffffff" }}
            border={{ visible: false }}
          />
        )}
      </Chart>
    </div>
  );
};

export default LineChart;