import React, { useId } from 'react';
import Chart, {
  Series,
  ArgumentAxis,
  ValueAxis,
  Legend,
  Tooltip,
  Label,
  Export,
  Size,
  SeriesTemplate,
  CommonSeriesSettings,
  Title,
} from 'devextreme-react/chart';

/**
 * 기본 막대 차트 데이터 타입
 */
export interface BarChartData {
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
 * Long format 데이터 타입
 */
export interface LongFormatData {
  /** 카테고리 이름 (x축) */
  category: string;
  /** 시리즈 이름 */
  name: string;
  /** 값 */
  value: number;
}

/**
 * SeriesTemplate 데이터 타입 (원본 JavaScript waitCall.js 방식)
 * nameField로 지정된 필드값이 각 막대의 이름(시리즈)이 됨
 */
export interface SeriesTemplateData {
  /** 동적 필드: nameField로 지정한 필드 이름 */
  [nameField: string]: string | number;
}

/**
 * 진행률/달성률 차트 데이터 타입
 */
export interface ProgressData {
  /** 카테고리 이름 (x축) */
  category: string;
  /** 현재 값 */
  value: number;
}

/**
 * 진행률 차트 설정
 */
export interface StackedToMaxConfig {
  /** 최대값 (기본: 100) */
  max?: number;
  /** 값 영역 색상 (기본: #22c55e) */
  valueColor?: string;
  /** 남은 영역 색상 (기본: #e5e7eb) */
  remainderColor?: string;
  /** 막대 너비 */
  barWidth?: number;
  /** x축 라벨 폰트 크기 */
  xAxisLabelFontSize?: number;
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
interface BaseBarChartProps {
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

  /** 라벨 표시 여부 */
  showLabel?: boolean;

  /** Export 기능 활성화 */
  enableExport?: boolean;

  /** 커스텀 클래스명 */
  className?: string;

  /** 애니메이션 활성화 */
  animation?: boolean;

  /** 막대 방향 (horizontal: 가로, vertical: 세로) */
  orientation?: 'horizontal' | 'vertical';

  /** x축 라벨 */
  xAxisLabel?: string;

  /** y축 라벨 */
  yAxisLabel?: string;

  /** 막대 너비 (픽셀 단위) */
  barWidth?: number;

  /** X축 라벨 회전 각도 */
  xAxisLabelRotation?: number;
}

/**
 * BarChart Props - 유니온 타입으로 5가지 모드 지원
 */
export type BarChartProps = BaseBarChartProps & (
  // 모드 1: 기본 단일 시리즈
  | {
      data: BarChartData[];
      type?: 'bar' | 'stackedbar' | 'fullstackedbar';
      seriesKeys?: never;
      useNameField?: never;
      seriesNameField?: never;
      argumentField?: never;
      valueField?: never;
      stackedToMax?: never;
    }
  // 모드 2: 다중 시리즈
  | {
      data: MultiSeriesData[];
      type?: 'bar' | 'stackedbar' | 'fullstackedbar';
      seriesKeys: SeriesKey[];
      useNameField?: never;
      seriesNameField?: never;
      argumentField?: never;
      valueField?: never;
      stackedToMax?: never;
    }
  // 모드 3: Long format (SeriesTemplate 사용)
  | {
      data: LongFormatData[];
      type?: 'bar' | 'stackedbar' | 'fullstackedbar';
      seriesKeys?: never;
      useNameField: true;
      seriesNameField?: never;
      argumentField?: never;
      valueField?: never;
      stackedToMax?: never;
    }
  // 모드 4: SeriesTemplate with custom fields (원본 JavaScript 방식)
  | {
      data: SeriesTemplateData[];
      type?: 'bar' | 'stackedbar' | 'fullstackedbar';
      seriesKeys?: never;
      useNameField?: never;
      seriesNameField: string;
      argumentField: string;
      valueField: string;
      stackedToMax?: never;
    }
  // 모드 5: 진행률/달성률 차트
  | {
      data: ProgressData[];
      type?: never;
      seriesKeys?: never;
      useNameField?: never;
      seriesNameField?: never;
      argumentField?: never;
      valueField?: never;
      stackedToMax: StackedToMaxConfig;
    }
);

/**
 * BarChart 컴포넌트
 *
 * DevExtreme Chart를 기반으로 한 재사용 가능한 막대 차트 컴포넌트
 * 5가지 모드 지원: 기본 단일 시리즈, 다중 시리즈, Long format, SeriesTemplate, 진행률 차트
 *
 * @example
 * ```tsx
 * // 모드 1: 기본 막대 차트
 * <BarChart
 *   data={[
 *     { category: '인바운드', value: 6500, color: '#3b82f6' },
 *     { category: '아웃바운드', value: 4200, color: '#10b981' }
 *   ]}
 *   showLegend={true}
 * />
 *
 * // 모드 2: 다중 시리즈 비교
 * <BarChart
 *   data={[
 *     { category: '1월', inbound: 100, outbound: 80 },
 *     { category: '2월', inbound: 120, outbound: 90 }
 *   ]}
 *   seriesKeys={[
 *     { key: 'inbound', name: '인바운드', color: '#3b82f6' },
 *     { key: 'outbound', name: '아웃바운드', color: '#10b981' }
 *   ]}
 *   showLegend={true}
 * />
 *
 * // 모드 3: Long format
 * <BarChart
 *   data={[
 *     { category: '1월', name: '인바운드', value: 100 },
 *     { category: '1월', name: '아웃바운드', value: 80 }
 *   ]}
 *   useNameField={true}
 *   showLegend={true}
 * />
 *
 * // 모드 5: 진행률/달성률 차트
 * <BarChart
 *   data={[
 *     { category: '영업팀', value: 750 },
 *     { category: '마케팅팀', value: 900 }
 *   ]}
 *   stackedToMax={{
 *     max: 1000,
 *     valueColor: '#22c55e',
 *     remainderColor: '#e5e7eb'
 *   }}
 * />
 * ```
 */
export const BarChart: React.FC<BarChartProps> = (props) => {
  const {
    data,
    title,
    height = 400,
    width,
    palette,
    showLegend = false,
    legendPosition = 'bottom',
    showTooltip = true,
    showLabel = false,
    enableExport = false,
    className = '',
    orientation = 'vertical',
    xAxisLabel,
    yAxisLabel,
    barWidth,
    xAxisLabelRotation,
  } = props;

  const chartId = useId();

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

  const rotated = orientation === 'horizontal';

  // 모드 4: SeriesTemplate with custom fields (원본 JavaScript 방식)
  if ('seriesNameField' in props && props.seriesNameField) {
    const { seriesNameField, argumentField, valueField } = props;
    const chartType = 'type' in props ? props.type || 'bar' : 'bar';

    return (
      <div className={`bar-chart-container ${className}`} style={containerStyle}>
        <Chart
          id={`bar-chart-${chartId}`}
          dataSource={data}
          palette={palette}
          title={title}
          rotated={rotated}
        >
          <CommonSeriesSettings
            type={chartType}
            argumentField={argumentField}
            valueField={valueField}
            barWidth={barWidth}
            ignoreEmptyPoints={true}
          />
          <SeriesTemplate nameField={seriesNameField} />

          <ArgumentAxis title={xAxisLabel}>
            <Label visible={true} rotationAngle={xAxisLabelRotation} />
          </ArgumentAxis>

          <ValueAxis title={yAxisLabel}>
            <Label visible={true} />
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

          {showTooltip && <Tooltip enabled />}
        </Chart>
      </div>
    );
  }

  // 모드 5: 진행률/달성률 차트 (stackedToMax)
  if ('stackedToMax' in props && props.stackedToMax) {
    const { stackedToMax } = props;
    const max = stackedToMax.max ?? 100;
    const valueColor = stackedToMax.valueColor ?? '#22c55e';
    const remainderColor = stackedToMax.remainderColor ?? '#e5e7eb';
    const barWidth = stackedToMax.barWidth;
    const xAxisLabelFontSize = stackedToMax.xAxisLabelFontSize;

    const chartData = (data as ProgressData[]).map((d) => {
      const value = Math.min(d.value, max);
      return {
        category: d.category,
        value,
        remainder: Math.max(0, max - value),
      };
    });

    return (
      <div className={`bar-chart-container ${className}`} style={containerStyle}>
        <Chart
          id={`bar-chart-${chartId}`}
          dataSource={chartData}
          palette={palette}
          title={title}
          rotated={rotated}
        >
          {barWidth != null && <CommonSeriesSettings barWidth={barWidth} />}

          <Series
            argumentField="category"
            valueField="value"
            type="stackedbar"
            stack="stack1"
            name=""
            color={valueColor}
            showInLegend={false}
          />
          <Series
            argumentField="category"
            valueField="remainder"
            type="stackedbar"
            stack="stack1"
            name=""
            color={remainderColor}
            showInLegend={false}
          />

          <ArgumentAxis
            title={xAxisLabel}
            label={
              xAxisLabelFontSize != null
                ? { font: { size: xAxisLabelFontSize } }
                : undefined
            }
          />

          <ValueAxis
            title={yAxisLabel}
            wholeRange={[0, max]}
            label={{
              customizeText: (e) => {
                const n = Number(e.value);
                return Number.isFinite(n) ? n.toLocaleString() : String(e.valueText);
              },
            }}
          />

          <Size height={sizeHeight} width={sizeWidth} />

          {enableExport && <Export enabled={true} />}

          {showTooltip && (
            <Tooltip
              enabled
              customizeTooltip={({ point }) => {
                const value = (point?.data as { value?: number })?.value ?? 0;
                return {
                  text: `${point?.argumentText ?? ''}: ${value.toLocaleString()} / ${max.toLocaleString()}`,
                };
              }}
            />
          )}
        </Chart>
      </div>
    );
  }

  // 모드 3: Long format (useNameField)
  if ('useNameField' in props && props.useNameField) {
    const chartType = 'type' in props ? props.type || 'bar' : 'bar';

    return (
      <div className={`bar-chart-container ${className}`} style={containerStyle}>
        <Chart
          id={`bar-chart-${chartId}`}
          dataSource={data}
          palette={palette}
          title={title}
          rotated={rotated}
        >
          {barWidth != null && <CommonSeriesSettings barWidth={barWidth} />}

          <SeriesTemplate nameField="name" />
          <Series
            argumentField="category"
            valueField="value"
            type={chartType}
          >
            {showLabel && <Label visible={true} />}
          </Series>

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

          {showTooltip && <Tooltip enabled />}
        </Chart>
      </div>
    );
  }

  // 모드 2: 다중 시리즈 (seriesKeys)
  if ('seriesKeys' in props && props.seriesKeys?.length) {
    const { seriesKeys } = props;
    const chartType = 'type' in props ? props.type || 'bar' : 'bar';

    return (
      <div className={`bar-chart-container ${className}`} style={containerStyle}>
        <Chart
          id={`bar-chart-${chartId}`}
          dataSource={data}
          palette={palette}
          rotated={rotated}
        >
          {title && <Title text={title} />}
          {barWidth != null && <CommonSeriesSettings barWidth={barWidth} />}

          {seriesKeys.map(({ key, name, color }) => (
            <Series
              key={key}
              argumentField="category"
              valueField={key}
              name={name ?? key}
              type={chartType}
              color={color}
            >
              {showLabel && <Label visible={true} />}
            </Series>
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

          {showTooltip && <Tooltip enabled />}
        </Chart>
      </div>
    );
  }

  // 모드 1: 기본 단일 시리즈
  const chartType = 'type' in props ? props.type || 'bar' : 'bar';

  // 색상 커스터마이징 (기본 모드만)
  const customizePoint = (pointInfo: { argument?: string }) => {
    const dataItem = (data as BarChartData[]).find(d => d.category === pointInfo.argument);
    if (dataItem?.color) {
      return { color: dataItem.color };
    }
    return {};
  };

  // Tooltip 커스터마이징
  const customizeTooltip = (arg: { argumentText?: string; valueText?: string }) => {
    return {
      text: `${arg.argumentText}: ${arg.valueText}`,
    };
  };

  return (
    <div className={`bar-chart-container ${className}`} style={containerStyle}>
      <Chart
        id={`bar-chart-${chartId}`}
        dataSource={data}
        palette={palette}
        title={title}
        rotated={rotated}
        customizePoint={customizePoint}
      >
        {barWidth != null && <CommonSeriesSettings barWidth={barWidth} />}

        <Series
          argumentField="category"
          valueField="value"
          type={chartType}
          name=""
          showInLegend={showLegend}
        >
          {showLabel && (
            <Label visible={true} />
          )}
        </Series>

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
            customizeTooltip={customizeTooltip}
          />
        )}
      </Chart>
    </div>
  );
};

export default BarChart;
