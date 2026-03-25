import React, { useId } from 'react';
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export,
  Legend,
  Tooltip,
  Font,
} from 'devextreme-react/pie-chart';

/**
 * 원형 차트 데이터 타입
 */
export interface CircularChartData {
  /** 카테고리 이름 */
  category: string;
  /** 값 */
  value: number;
  /** 색상 (옵션) */
  color?: string;
}

/**
 * 중앙 텍스트 설정 타입
 */
export interface CenterTextConfig {
  /** 표시할 텍스트 (예: "응답률", "총합") */
  label?: string;
  /** 표시할 값 (숫자 또는 문자열) */
  value?: string | number;
  /** 값에 % 기호 추가 여부 */
  showPercentSign?: boolean;
  /** 라벨 폰트 크기 (숫자 또는 CSS 단위 문자열: '14px', '1rem', '2vw' 등) */
  labelFontSize?: number | string;
  /** 값 폰트 크기 (숫자 또는 CSS 단위 문자열: '32px', '2rem', '4vw' 등) */
  valueFontSize?: number | string;
  /** 값 폰트 굵기 (100-900, 기본값: 500) */
  valueFontWeight?: number;
  /** % 기호 폰트 크기 (숫자 또는 CSS 단위 문자열, 기본값: valueFontSize와 동일) */
  percentSignFontSize?: number | string;
  /** 라벨 색상 */
  labelColor?: string;
  /** 값 색상 */
  valueColor?: string;
}

/**
 * CircularChart 컴포넌트 Props
 */
export interface CircularChartProps {
  /** 차트 데이터 */
  data: CircularChartData[];

  /** 차트 타입 */
  type?: 'pie' | 'doughnut';

  /** 도넛 차트의 내부 반지름 (0-1 사이, type이 'doughnut'일 때만 적용) */
  innerRadius?: number;

  /** 차트 제목 */
  title?: string;

  /** 차트 높이 (숫자 또는 CSS 단위 문자열: 400, '400px', '100%', '50vh' 등) */
  height?: number | string;

  /** 차트 너비 (숫자 또는 CSS 단위 문자열: 400, '400px', '100%', '50vw' 등) */
  width?: number | string;

  /** 색상 팔레트 (커스텀 색상 배열) */
  palette?: string[];

  /** Legend 표시 여부 */
  showLegend?: boolean;

  /** Legend 위치 */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';

  /** Legend 수평 정렬 */
  legendHorizontalAlignment?: 'left' | 'center' | 'right';

  /** Legend 수직 정렬 */
  legendVerticalAlignment?: 'top' | 'bottom';

  /** 커스텀 Legend 렌더링 함수 (data를 받아서 JSX 반환) */
  renderCustomLegend?: (data: CircularChartData[]) => React.ReactNode;

  /** 커스텀 Legend 레이아웃 위치 ('right' | 'bottom' | 'left' | 'top') */
  customLegendLayout?: 'right' | 'bottom' | 'left' | 'top';

  /** Tooltip 표시 여부 */
  showTooltip?: boolean;

  /** 라벨 표시 여부 */
  showLabel?: boolean;

  /** 라벨 위치 */
  labelPosition?: 'inside' | 'outside' | 'columns';

  /** 라벨 포맷 */
  labelFormat?: 'fixedPoint' | 'percent' | 'currency';

  /** 라벨 커스터마이징 함수 */
  customizeLabelText?: (arg: any) => string;

  /** 라벨 겹침 해결 방법 ('shift' | 'hide' | 'none') */
  labelOverlapping?: 'shift' | 'hide' | 'none';

  /** Export 기능 활성화 */
  enableExport?: boolean;

  /** 중앙 텍스트 설정 (도넛 차트일 때 사용) */
  centerText?: CenterTextConfig;

  /** 커스텀 클래스명 */
  className?: string;

  /** 애니메이션 활성화 */
  animation?: boolean;
}

/**
 * CircularChart 컴포넌트
 *
 * DevExtreme PieChart를 기반으로 한 재사용 가능한 원형/도넛 차트 컴포넌트
 *
 * @example
 * ```tsx
 * // 기본 원형 차트
 * <CircularChart
 *   data={[
 *     { category: '인바운드', value: 6500, color: '#3b82f6' },
 *     { category: '아웃바운드', value: 4200, color: '#10b981' }
 *   ]}
 *   type="pie"
 *   showLegend={true}
 * />
 *
 * // 중앙 텍스트가 있는 도넛 차트
 * <CircularChart
 *   data={data}
 *   type="doughnut"
 *   innerRadius={0.65}
 *   centerText={{
 *     label: '응답률',
 *     value: 48.1,
 *     showPercentSign: true,
 *     valueFontSize: 32
 *   }}
 *   showLegend={false}
 * />
 * ```
 */
export const CircularChart: React.FC<CircularChartProps> = ({
  data,
  type = 'pie',
  innerRadius = 0.65,
  title,
  height = 400,
  width,
  palette,
  showLegend = true,
  legendPosition = 'bottom',
  legendHorizontalAlignment = 'center',
  legendVerticalAlignment = 'bottom',
  renderCustomLegend,
  customLegendLayout = 'right',
  showTooltip = true,
  showLabel = true,
  labelPosition = 'outside',
  labelFormat = 'fixedPoint',
  customizeLabelText,
  labelOverlapping = 'shift',
  enableExport = false,
  centerText,
  className = '',
  animation = true,
}) => {
  const chartId = useId();

  // 중앙 텍스트 렌더링 (centerTemplate 사용)
  const centerTemplate = () => {
    if (!centerText || type !== 'doughnut') return null;

    const {
      label = '',
      value = '',
      showPercentSign = false,
      labelFontSize = 13,
      valueFontSize = 20,
      valueFontWeight = 500,
      percentSignFontSize,
      labelColor = '#6b7280',
      valueColor = '#111827',
    } = centerText;

    const hasLabel = label !== '';
    const hasValue = value !== '';

    // 폰트 크기를 CSS 문자열로 변환 (숫자면 px 추가, 문자열이면 그대로 사용)
    const formatFontSize = (size: number | string): string => {
      return typeof size === 'number' ? `${size}px` : size;
    };

    const labelFontSizeStr = formatFontSize(labelFontSize);
    const valueFontSizeStr = formatFontSize(valueFontSize);
    const percentSignFontSizeStr = formatFontSize(percentSignFontSize || valueFontSize);

    // 프로젝트 전역 폰트 (Pretendard)
    const fontFamily = 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif';

    // SVG를 사용하여 정확한 중앙 정렬
    // em 단위를 사용하여 폰트 크기에 비례한 위치 지정 (반응형 대응)
    if (hasLabel && hasValue) {
      // 둘 다 있을 때
      return (
        <svg style={{ overflow: 'visible' }}>
          <g>
            <text
              textAnchor="middle"
              dominantBaseline="central"
              x="0"
              y="-0.8em"
              style={{
                fontSize: labelFontSizeStr,
                fill: labelColor,
                fontFamily: fontFamily,
              }}
            >
              {label}
            </text>
            <text
              textAnchor="middle"
              dominantBaseline="central"
              x="0"
              y="0.6em"
              style={{
                fontSize: valueFontSizeStr,
                fill: valueColor,
                fontFamily: fontFamily,
                fontWeight: valueFontWeight,
              }}
            >
              {value}
              {showPercentSign && (
                <tspan style={{ fontSize: percentSignFontSizeStr }}>%</tspan>
              )}
            </text>
          </g>
        </svg>
      );
    } else if (hasValue) {
      // value만 있을 때
      return (
        <svg style={{ overflow: 'visible' }}>
          <text
            textAnchor="middle"
            dominantBaseline="central"
            x="0"
            y="0"
            style={{
              fontSize: valueFontSizeStr,
              fill: valueColor,
              fontFamily: fontFamily,
              fontWeight: valueFontWeight,
            }}
          >
            {value}
            {showPercentSign && (
              <tspan style={{ fontSize: percentSignFontSizeStr }}>%</tspan>
            )}
          </text>
        </svg>
      );
    } else if (hasLabel) {
      // label만 있을 때
      return (
        <svg style={{ overflow: 'visible' }}>
          <text
            textAnchor="middle"
            dominantBaseline="central"
            x="0"
            y="0"
            style={{
              fontSize: labelFontSizeStr,
              fill: labelColor,
              fontFamily: fontFamily,
            }}
          >
            {label}
          </text>
        </svg>
      );
    }

    return null;
  };

  // Tooltip 커스터마이징
  const customizeTooltip = (arg: any) => {
    return {
      text: `${arg.argumentText}: ${arg.valueText} (${arg.percentText})`,
    };
  };

  // 라벨 텍스트 커스터마이징
  const getLabelCustomization = () => {
    if (customizeLabelText) {
      return customizeLabelText;
    }

    // 기본 라벨 텍스트
    return (arg: any) => `${arg.argumentText}\n${arg.percentText}`;
  };

  // 색상 커스터마이징
  const customizePoint = (pointInfo: any) => {
    const dataItem = data.find(d => d.category === pointInfo.argument);
    if (dataItem?.color) {
      return { color: dataItem.color };
    }
    return {};
  };

  // height/width를 CSS 문자열로 변환 (숫자면 px 추가, 문자열이면 그대로 사용)
  const formatSize = (size: number | string | undefined): string | undefined => {
    if (size === undefined) return undefined;
    return typeof size === 'number' ? `${size}px` : size;
  };

  // Size 컴포넌트에 넘길 값 (숫자만 가능)
  const getSizeValue = (size: number | string | undefined): number | undefined => {
    if (size === undefined) return undefined;
    if (typeof size === 'number') return size;
    // 문자열인 경우 undefined 반환 (CSS로 처리)
    return undefined;
  };

  const sizeHeight = getSizeValue(height);
  const sizeWidth = getSizeValue(width);

  // 문자열 크기가 있으면 컨테이너 스타일로 처리
  const hasStringSize = (typeof height === 'string') || (typeof width === 'string');

  const containerStyle: React.CSSProperties = hasStringSize ? {
    height: formatSize(height),
    width: formatSize(width),
    position: 'relative',
  } : {};

  // 커스텀 Legend가 있을 때 레이아웃 스타일
  const getLayoutStyle = (): React.CSSProperties => {
    if (!renderCustomLegend) return {};

    const isHorizontal = customLegendLayout === 'left' || customLegendLayout === 'right';

    return {
      display: 'flex',
      flexDirection: isHorizontal ? 'row' : 'column',
      alignItems: isHorizontal ? 'center' : 'flex-start',
      gap: '24px',
    };
  };

  const chartElement = (
    <div className={`circular-chart-container ${className}`} style={containerStyle}>
      <PieChart
        id={`circular-chart-${chartId}`}
        dataSource={data}
        palette={palette}
        type={type}
        innerRadius={type === 'doughnut' ? innerRadius : undefined}
        title={title}
        animation={{ enabled: animation }}
        customizePoint={customizePoint}
        startAngle={90}
        segmentsDirection="clockwise"
        centerRender={centerTemplate}
        resolveLabelOverlapping={labelOverlapping}
      >

        <Series
          argumentField="category"
          valueField="value"
        >
          {showLabel && (
            <Label
              visible={true}
              position={labelPosition}
              format={labelFormat}
              customizeText={customizeLabelText}
            >
              <Connector visible={labelPosition !== 'inside'} width={1} />
              <Font size={12} />
            </Label>
          )}
        </Series>

        <Size height={sizeHeight} width={sizeWidth} />

        {enableExport && <Export enabled={true} />}

        <Legend
          visible={showLegend && !renderCustomLegend}
          verticalAlignment={legendVerticalAlignment}
          horizontalAlignment={legendHorizontalAlignment}
          itemTextPosition={legendPosition === 'left' || legendPosition === 'right' ? 'right' : 'bottom'}
        />

        {showTooltip && (
          <Tooltip
            enabled={true}
            customizeTooltip={customizeTooltip}
          />
        )}
      </PieChart>
    </div>
  );

  const customLegendElement = renderCustomLegend ? renderCustomLegend(data) : null;

  // 커스텀 Legend가 없으면 차트만 반환
  if (!renderCustomLegend) {
    return chartElement;
  }

  // 커스텀 Legend가 있으면 레이아웃과 함께 반환
  return (
    <div style={getLayoutStyle()}>
      {(customLegendLayout === 'left' || customLegendLayout === 'top') && customLegendElement}
      {chartElement}
      {(customLegendLayout === 'right' || customLegendLayout === 'bottom') && customLegendElement}
    </div>
  );
};

export default CircularChart;
