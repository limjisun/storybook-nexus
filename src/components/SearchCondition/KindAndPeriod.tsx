import React, { useState, useCallback, useMemo, useEffect, useLayoutEffect, useRef } from 'react';
import DrillDown from '../form/DrillDown';
import type { DrillDownItem, SelectedTag } from '../form/DrillDown';
import { DateRangePicker } from '../DateRangePicker';
import type { HolidaySettingType } from '../DateRangePicker';
import Checkbox from '../form/Checkbox';
import { SelectBox } from 'devextreme-react/select-box';

function snapshotKindTime(d: Date | string | number | undefined, buildFallback: () => Date): Date {
  if (d === undefined) return buildFallback();
  if (d instanceof Date && !Number.isNaN(d.getTime())) return new Date(d.getTime());
  const parsed = new Date(d as string | number);
  if (!Number.isNaN(parsed.getTime())) return parsed;
  return buildFallback();
}

/**
 * 기본 카테고리 데이터 생성 함수 (2단계 계층 구조)
 *
 * @example
 * ```tsx
 * const categoryData = getDefaultCategoryData();
 * ```
 */
export const getDefaultCategoryData = (): DrillDownItem[] => [
  {
    id: 'total',
    text: '총합',
  },
  {
    id: 'minute',
    text: '분대별',
    items: [
      { id: 'minute-5', text: '5분대별' },
      { id: 'minute-10', text: '10분대별' },
      { id: 'minute-15', text: '15분대별' },
      { id: 'minute-30', text: '30분대별' },
    ]
  },
  {
    id: 'hour',
    text: '시간대별',
  },
  {
    id: 'dayofweek',
    text: '요일별',
    items: [
      { id: 'dayofweek-all', text: '전체' },
      { id: 'dayofweek-5', text: '5분대별' },
      { id: 'dayofweek-10', text: '10분대별' },
      { id: 'dayofweek-15', text: '15분대별' },
      { id: 'dayofweek-30', text: '30분대별' },
      { id: 'dayofweek-hourly', text: '시간대별' },
    ]
  },
  {
    id: 'day',
    text: '일별',
    items: [
      { id: 'day-all', text: '전체' },
      { id: 'day-5', text: '5분대별' },
      { id: 'day-10', text: '10분대별' },
      { id: 'day-15', text: '15분대별' },
      { id: 'day-30', text: '30분대별' },
      { id: 'day-hourly', text: '시간대별' },
    ]
  },
  {
    id: 'month',
    text: '월별',
    items: [
      { id: 'month-all', text: '전체' },
      { id: 'month-5', text: '5분대별' },
      { id: 'month-10', text: '10분대별' },
      { id: 'month-15', text: '15분대별' },
      { id: 'month-30', text: '30분대별' },
      { id: 'month-hourly', text: '시간대별' },
      { id: 'month-dayofweek', text: '요일별' },
    ]
  },
  {
    id: 'year',
    text: '년도별',
    items: [
      { id: 'year-all', text: '전체' },
      { id: 'year-5', text: '5분대별' },
      { id: 'year-10', text: '10분대별' },
      { id: 'year-15', text: '15분대별' },
      { id: 'year-30', text: '30분대별' },
      { id: 'year-hourly', text: '시간대별' },
      { id: 'year-dayofweek', text: '요일별' },
      { id: 'year-month', text: '월별' },
    ]
  },
];

/**
 * Kind2 옵션 타입 정의
 */
export interface Kind2Option {
  id: string;
  text: string;
}

/**
 * KindAndPeriod 모드 타입
 * - '2-level': 2단계 구조 (종류 → 상세)
 * - '3-level-queue': 3단계 큐 분류 (종류 → 큐 분류 → 상세)
 * - '3-level-agent': 3단계 상담사 분류 (종류 → 상담사 분류 → 상세)
 * - '3-level-dn': 3단계 DN 분류 (종류 → DN 분류 → 상세)
 */
export type KindAndPeriodMode = '2-level' | '3-level-queue' | '3-level-agent' | '3-level-dn';

/**
 * 3단계 계층 구조 카테고리 데이터 생성 함수
 * kind1 (총합, 분대별, ...) → kind2 (큐, 큐중분류, ... 또는 상담사, 상담팀, ...) → kind3 (전체, 5분대별, ...)
 *
 * @param kind2Options - kind2 단계 옵션 배열 (예: 큐 분류 또는 상담사 분류)
 *
 * @example
 * ```tsx
 * // 큐 분류 사용
 * const queueKind2 = [
 *   { id: 'queue', text: '큐' },
 *   { id: 'queue-medium', text: '큐중분류' },
 *   { id: 'queue-large', text: '큐대분류' },
 *   { id: 'total', text: '합계' },
 * ];
 * const categoryData = get3LevelCategoryData(queueKind2);
 * ```
 */
export const get3LevelCategoryData = (
  kind2Options?: Kind2Option[]
): DrillDownItem[] => {
  // kind2: 기본값은 큐 분류 옵션 (4가지)
  const defaultKind2Options: Kind2Option[] = [
    { id: 'queue', text: '큐' },
    { id: 'queue-medium', text: '큐중분류' },
    { id: 'queue-large', text: '큐대분류' },
    { id: 'total', text: '합계' },
  ];

  const kind2Types = kind2Options || defaultKind2Options;

  // kind3 생성 헬퍼 함수
  const createKind3Options = (prefix: string): DrillDownItem[] => {
    const options: DrillDownItem[] = [
      { id: `${prefix}-all`, text: '전체' },
      { id: `${prefix}-5`, text: '5분대별' },
      { id: `${prefix}-10`, text: '10분대별' },
      { id: `${prefix}-15`, text: '15분대별' },
      { id: `${prefix}-30`, text: '30분대별' },
      { id: `${prefix}-hourly`, text: '시간대별' },
    ];

    // 월별, 년도별에는 추가 옵션
    if (prefix.startsWith('month-')) {
      options.push({ id: `${prefix}-dayofweek`, text: '요일별' });
    }
    if (prefix.startsWith('year-')) {
      options.push({ id: `${prefix}-dayofweek`, text: '요일별' });
      options.push({ id: `${prefix}-month`, text: '월별' });
    }

    return options;
  };

  // kind2를 kind3와 연결하는 헬퍼
  const createQueueWithKind3 = (kind1Prefix: string): DrillDownItem[] => {
    return kind2Types.map((kind2Type: Kind2Option) => ({
      id: `${kind1Prefix}-${kind2Type.id}`,
      text: kind2Type.text,
      items: createKind3Options(`${kind1Prefix}-${kind2Type.id}`),
    }));
  };

  return [
    {
      id: 'total',
      text: '총합',
      items: kind2Types.map((kind2Type: Kind2Option) => ({
        id: `total-${kind2Type.id}`,
        text: kind2Type.text,
      })),
    },
    {
      id: 'minute',
      text: '분대별',
      items: kind2Types.map((kind2Type: Kind2Option) => ({
        id: `minute-${kind2Type.id}`,
        text: kind2Type.text,
        items: [
          { id: `minute-${kind2Type.id}-5`, text: '5분대별' },
          { id: `minute-${kind2Type.id}-10`, text: '10분대별' },
          { id: `minute-${kind2Type.id}-15`, text: '15분대별' },
          { id: `minute-${kind2Type.id}-30`, text: '30분대별' },
        ],
      })),
    },
    {
      id: 'hour',
      text: '시간대별',
      items: kind2Types.map((kind2Type: Kind2Option) => ({
        id: `hour-${kind2Type.id}`,
        text: kind2Type.text,
      })),
    },
    {
      id: 'dayofweek',
      text: '요일별',
      items: createQueueWithKind3('dayofweek'),
    },
    {
      id: 'day',
      text: '일별',
      items: createQueueWithKind3('day'),
    },
    {
      id: 'month',
      text: '월별',
      items: createQueueWithKind3('month'),
    },
    {
      id: 'year',
      text: '년도별',
      items: createQueueWithKind3('year'),
    },
  ];
};

/**
 * KindAndPeriod 컴포넌트 Props
 */
export interface KindAndPeriodProps {
  /**
   * 모드 선택
   * - '2-level': 2단계 구조 (종류 → 상세)
   * - '3-level-queue': 3단계 큐 분류 (종류 → 큐/큐중분류/큐대분류/합계 → 상세)
   * - '3-level-agent': 3단계 상담사 분류 (종류 → 상담사/상담팀/상담그룹/총합 → 상세)
   * - '3-level-dn': 3단계 DN 분류 (종류 → DN/DN중분류/DN대분류/합계 → 상세)
   *
   * @default '2-level'
   */
  mode?: KindAndPeriodMode;
  /** 시작 날짜 */
  startDate: Date;
  /** 종료 날짜 */
  endDate: Date;
  /** 시작 날짜 변경 핸들러 */
  onStartDateChange: (date: Date) => void;
  /** 종료 날짜 변경 핸들러 */
  onEndDateChange: (date: Date) => void;
  /** 카테고리 변경 핸들러 - 선택된 카테고리와 시간 범위 정보 반환 */
  onCategoryChange?: (data: {
    category: SelectedTag[];
    timeRangeEnabled: boolean;
    timeInterval: number;
    startTime: Date;
    endTime: Date;
  }) => void;
  /** 날짜 포맷 */
  dateFormat?: string;
  /** DrillDown 레벨 레이블 (자동 설정되지만 커스텀 가능) */
  levelLabels?: string[];
  /** 휴일 설정 표시 여부 */
  showHolidaySetting?: boolean;
  /** 휴일 설정 값 */
  holidaySetting?: HolidaySettingType;
  /** 휴일 설정 변경 핸들러 */
  onHolidaySettingChange?: (value: HolidaySettingType) => void;
  /** 초기 카테고리 값 (기본값: 총합 선택) */
  defaultCategory?: SelectedTag[];
  /** 복원용 시간대(하루 내 시작·종료 시각 등) — key로 리마운트할 때와 함께 쓰면 사용자설정과 UI가 맞습니다 */
  defaultKindPeriod?: {
    timeRangeEnabled: boolean;
    timeInterval: number;
    startTime: Date;
    endTime: Date;
  };
  /** 자식 요소 (추가 Row들) */
  children?: React.ReactNode;
}

/**
 * KindAndPeriod 복합 컴포넌트
 *
 * 종류(DrillDown) + 시간 범위 체크박스 + 기간(DateRangePicker)를 하나로 묶은 컴포넌트.
 * 통계 페이지에서 자주 사용되는 패턴을 캡슐화했습니다.
 *
 * ## 내부 동작:
 * - 카테고리 선택에 따라 시간 범위 체크박스 자동 제어
 * - 시간 간격(5/10/15/30/60분)에 따라 DateRangePicker 동작 변경
 * - 체크박스 해제 시 카테고리를 "전체"로 자동 변경
 *
 * ## 3-level 모드:
 * - DrillDown은 항상 2단계로 표시 (종류 → 상세)
 * - kind2(큐분류/상담사분류/DN분류)는 별도 SelectBox로 선택
 * - 내부적으로 2-level 태그 + kind2를 합성하여 3-level 태그로 변환
 *
 * ## 사용 예:
 * ```tsx
 * <SearchCondition>
 *   <SearchCondition.KindAndPeriod
 *     mode="2-level"
 *     startDate={startDate}
 *     endDate={endDate}
 *     onStartDateChange={setStartDate}
 *     onEndDateChange={setEndDate}
 *     onCategoryChange={(data) => console.log(data)}
 *     showHolidaySetting={true}
 *     holidaySetting={holidaySetting}
 *     onHolidaySettingChange={setHolidaySetting}
 *   >
 *     <SearchCondition.Row>
 *       <SearchCondition.Col label="자원범위">
 *         <SearchCondition.Data>
 *           <DrillDown ... />
 *         </SearchCondition.Data>
 *       </SearchCondition.Col>
 *     </SearchCondition.Row>
 *   </SearchCondition.KindAndPeriod>
 * </SearchCondition>
 * ```
 */
export const KindAndPeriod: React.FC<KindAndPeriodProps> = ({
  mode = '2-level',
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onCategoryChange,
  dateFormat = 'yyyy-MM-dd',
  levelLabels,
  showHolidaySetting = false,
  holidaySetting = 'none',
  onHolidaySettingChange,
  defaultCategory,
  defaultKindPeriod,
  children,
}) => {
  // mode에 따라 kind2 옵션 결정
  const kind2Options = useMemo((): Kind2Option[] | undefined => {
    if (mode === '3-level-queue') {
      return [
        { id: 'queue', text: '큐' },
        { id: 'queue-medium', text: '큐중분류' },
        { id: 'queue-large', text: '큐대분류' },
        { id: 'total', text: '합계' },
      ];
    } else if (mode === '3-level-agent') {
      return [
        { id: 'agent', text: '상담사' },
        { id: 'team', text: '상담팀' },
        { id: 'group', text: '상담그룹' },
        { id: 'total', text: '총합' },
      ];
    } else if (mode === '3-level-dn') {
      return [
        { id: 'dn', text: 'DN' },
        { id: 'dn-medium', text: 'DN중분류' },
        { id: 'dn-large', text: 'DN대분류' },
        { id: 'total', text: '합계' },
      ];
    }
    return undefined;
  }, [mode]);

  const is3Level = mode === '3-level-queue' || mode === '3-level-agent' || mode === '3-level-dn';

  // 항상 2-level 데이터 사용 — 3-level 모드에서는 kind2를 SelectBox로 분리
  const finalCategoryData = useMemo(() => getDefaultCategoryData(), []);

  // 항상 2-level 레이블 — 3-level 모드에서도 DrillDown은 2단계
  const defaultLevelLabels = useMemo(() => ['종류', '종류'], []);

  // ========================================
  // State
  // ========================================
  const [selectedCategory, setSelectedCategory] = useState<SelectedTag[]>(() => {
    if (defaultCategory) {
      return defaultCategory;
    }

    // 3단계 모드: 총합 > 큐/상담사/DN 선택
    if (mode === '3-level-queue') {
      return [
        { id: 'total', text: '총합', path: ['총합'] },
        { id: 'total-queue', text: '큐', path: ['총합', '큐'] },
      ];
    } else if (mode === '3-level-agent') {
      return [
        { id: 'total', text: '총합', path: ['총합'] },
        { id: 'total-agent', text: '상담사', path: ['총합', '상담사'] },
      ];
    } else if (mode === '3-level-dn') {
      return [
        { id: 'total', text: '총합', path: ['총합'] },
        { id: 'total-dn', text: 'DN', path: ['총합', 'DN'] },
      ];
    }

    // 2단계 모드: 총합만 선택
    return [{ id: 'total', text: '총합', path: ['총합'] }];
  });

  const [timeRangeEnabled, setTimeRangeEnabled] = useState<boolean>(
    () => defaultKindPeriod?.timeRangeEnabled ?? true
  );
  const [timeRangeDisabled, setTimeRangeDisabled] = useState<boolean>(false);
  const [timeInterval, setTimeInterval] = useState<number>(() => defaultKindPeriod?.timeInterval ?? 60);

  // 시간 초기화
  const [startTime, setStartTime] = useState<Date>(() =>
    snapshotKindTime(defaultKindPeriod?.startTime, () => {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      return start;
    })
  );

  /** 간격 변경 시 기본 종료 시각 */
  const computeDefaultEndTime = useCallback((interval: number) => {
    let endHour = 23;
    let endMinute = 0;

    if (interval === 60) {
      endHour = 23;
      endMinute = 0;
    } else if (interval === 5) {
      endHour = 23;
      endMinute = 55;
    } else if (interval === 10) {
      endHour = 23;
      endMinute = 50;
    } else if (interval === 15) {
      endHour = 23;
      endMinute = 45;
    } else if (interval === 30) {
      endHour = 23;
      endMinute = 0;
    }

    const d = new Date();
    d.setHours(endHour, endMinute, 0, 0);
    return d;
  }, []);

  const [endTime, setEndTime] = useState<Date>(() =>
    snapshotKindTime(defaultKindPeriod?.endTime, () => {
      const d = new Date();
      d.setHours(23, 0, 0, 0);
      return d;
    })
  );

  // kind2 SelectBox 상태 (3-level 모드에서만 사용)
  const [selectedKind2, setSelectedKind2] = useState<string>(() => {
    if (defaultCategory && defaultCategory.length >= 2 && kind2Options) {
      const kind1Id = defaultCategory[0].id;
      const extracted = defaultCategory[1].id.slice(kind1Id.length + 1);
      if (kind2Options.some((o) => o.id === extracted)) return extracted;
    }
    if (mode === '3-level-queue') return 'queue';
    if (mode === '3-level-agent') return 'agent';
    if (mode === '3-level-dn') return 'dn';
    return '';
  });

  const onCategoryChangeRef = useRef(onCategoryChange);
  useEffect(() => {
    onCategoryChangeRef.current = onCategoryChange;
  }, [onCategoryChange]);

  useEffect(() => {
    onCategoryChangeRef.current?.({
      category: selectedCategory,
      timeRangeEnabled,
      timeInterval,
      startTime,
      endTime,
    });
  }, [selectedCategory, timeRangeEnabled, timeInterval, startTime, endTime]);

  // ========================================
  // 카테고리 변경 핸들러
  // ========================================
  const handleCategoryChange = useCallback(
    (tags: SelectedTag[]) => {
      setSelectedCategory(tags);

      if (tags.length === 0) {
        setTimeRangeEnabled(false);
        setTimeRangeDisabled(false);
        setTimeInterval(60);
        setEndTime(computeDefaultEndTime(60));
        return;
      }

      // DrillDown returns array with both parent and child - use the last (deepest) selection
      const subCategory = tags[tags.length - 1].id;

      // 시간 간격 설정
      let interval = 60;
      if (subCategory.endsWith('-30')) {
        interval = 30;
      } else if (subCategory.endsWith('-15')) {
        interval = 15;
      } else if (subCategory.endsWith('-10')) {
        interval = 10;
      } else if (subCategory.endsWith('-5')) {
        interval = 5;
      }
      setTimeInterval(interval);
      setEndTime(computeDefaultEndTime(interval));

      // 시간 범위 체크박스 상태 결정
      let enabled = false;
      let disabled = false;

      const parts = subCategory.split('-');

      // 2단계 선택 (kind1-kind2)
      if (tags.length === 2) {
        const kind1 = parts[0];

        if (kind1 === 'hour' || kind1 === 'minute') {
          enabled = true;
          disabled = true;
        } else if (kind1 === 'total') {
          enabled = true;
          disabled = false;
        } else if (kind1 === 'dayofweek' || kind1 === 'day' || kind1 === 'month' || kind1 === 'year') {
          if (subCategory.endsWith('-all')) {
            enabled = false;
            disabled = true;
          } else if (subCategory.endsWith('-hourly')) {
            enabled = true;
            disabled = false;
          } else if (subCategory.endsWith('-dayofweek') || subCategory.endsWith('-month')) {
            enabled = false;
            disabled = true;
          } else if (subCategory.endsWith('-5') || subCategory.endsWith('-10') ||
                     subCategory.endsWith('-15') || subCategory.endsWith('-30')) {
            enabled = true;
            disabled = false;
          } else {
            enabled = false;
            disabled = false;
          }
        } else {
          enabled = false;
          disabled = false;
        }
      }
      // 1단계 선택 (kind1만)
      else if (tags.length === 1) {
        if (subCategory === 'total') {
          enabled = true;
          disabled = false;
        } else if (subCategory === 'minute') {
          enabled = false;
          disabled = false;
        } else if (subCategory === 'hour') {
          enabled = true;
          disabled = true;
        } else {
          enabled = false;
          disabled = false;
        }
      }
      // 3단계 선택 (kind1-kind2-kind3)
      else if (tags.length === 3) {
        const kind1 = parts[0];

        if (subCategory.endsWith('-all')) {
          enabled = false;
          disabled = true;
        } else if (subCategory.endsWith('-hourly')) {
          enabled = true;
          disabled = (kind1 === 'minute');
        } else if (subCategory.endsWith('-dayofweek') || subCategory.endsWith('-month')) {
          enabled = false;
          disabled = true;
        } else if (subCategory.endsWith('-5') || subCategory.endsWith('-10') ||
                   subCategory.endsWith('-15') || subCategory.endsWith('-30')) {
          enabled = true;
          disabled = (kind1 === 'minute');
        } else {
          enabled = false;
          disabled = false;
        }
      }
      // fallback (2단계 구조 호환)
      else {
        if (subCategory === 'total') {
          enabled = true;
          disabled = false;
        } else if (subCategory.startsWith('minute-')) {
          enabled = true;
          disabled = true;
        } else if (subCategory === 'hour') {
          enabled = true;
          disabled = true;
        } else if (subCategory.endsWith('-all')) {
          enabled = false;
          disabled = true;
        } else if (subCategory.endsWith('-hourly')) {
          enabled = true;
          disabled = false;
        } else if (subCategory.endsWith('-dayofweek') || subCategory.endsWith('-month')) {
          enabled = false;
          disabled = true;
        } else if (subCategory.endsWith('-5') || subCategory.endsWith('-10') ||
                   subCategory.endsWith('-15') || subCategory.endsWith('-30')) {
          enabled = true;
          disabled = false;
        } else {
          enabled = false;
          disabled = false;
        }
      }

      setTimeRangeEnabled(enabled);
      setTimeRangeDisabled(disabled);
    },
    [computeDefaultEndTime]
  );

  // ========================================
  // 3-level: DrillDown 2단계 + SelectBox(kind2) 조합 헬퍼
  // ========================================
  /** 2-level 태그 + kind2 → 3-level 합성 태그 */
  const combineTagsWithKind2 = useCallback((tags: SelectedTag[], kind2Id: string): SelectedTag[] => {
    if (!kind2Id || !kind2Options || tags.length === 0) return tags;
    const kind2Text = kind2Options.find((o) => o.id === kind2Id)?.text ?? kind2Id;
    const kind1 = tags[0];
    if (tags.length === 1) {
      return [
        kind1,
        { id: `${kind1.id}-${kind2Id}`, text: kind2Text, path: [...kind1.path, kind2Text] },
      ];
    }
    if (tags.length === 2) {
      const kind3Suffix = tags[1].id.slice(kind1.id.length + 1);
      const kind3Text = tags[1].text;
      return [
        kind1,
        { id: `${kind1.id}-${kind2Id}`, text: kind2Text, path: [...kind1.path, kind2Text] },
        { id: `${kind1.id}-${kind2Id}-${kind3Suffix}`, text: kind3Text, path: [...kind1.path, kind2Text, kind3Text] },
      ];
    }
    return tags;
  }, [kind2Options]);

  /** selectedCategory(합성)에서 DrillDown 표시용 2-level 태그 역추출 */
  const drillDownValue = useMemo((): SelectedTag[] => {
    if (!is3Level) return selectedCategory;
    if (selectedCategory.length <= 1) return selectedCategory;
    const kind1 = selectedCategory[0];
    if (selectedCategory.length === 2) {
      return [kind1];
    }
    if (selectedCategory.length === 3) {
      const kind2FullId = selectedCategory[1].id;
      const kind3Tag = selectedCategory[2];
      const kind3Suffix = kind3Tag.id.slice(kind2FullId.length + 1);
      return [
        kind1,
        { id: `${kind1.id}-${kind3Suffix}`, text: kind3Tag.text, path: [kind1.text, kind3Tag.text] },
      ];
    }
    return selectedCategory;
  }, [is3Level, selectedCategory]);

  const drillDownValueRef = useRef(drillDownValue);
  useLayoutEffect(() => { drillDownValueRef.current = drillDownValue; }, [drillDownValue]);

  /** DrillDown onChange → kind2와 합성 후 카테고리 변경 */
  const handleDrillDownChange = useCallback((tags: SelectedTag[]) => {
    if (is3Level && selectedKind2) {
      handleCategoryChange(combineTagsWithKind2(tags, selectedKind2));
    } else {
      handleCategoryChange(tags);
    }
  }, [is3Level, selectedKind2, combineTagsWithKind2, handleCategoryChange]);

  /** SelectBox onChange → 현재 DrillDown 선택과 합성 */
  const handleKind2Change = useCallback((kind2Id: string) => {
    setSelectedKind2(kind2Id);
    handleCategoryChange(combineTagsWithKind2(drillDownValueRef.current, kind2Id));
  }, [combineTagsWithKind2, handleCategoryChange]);

  useLayoutEffect(() => {
    if (defaultCategory && defaultCategory.length > 0) {
      handleCategoryChange(defaultCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!defaultKindPeriod) return;
    setTimeRangeEnabled(defaultKindPeriod.timeRangeEnabled);
    setTimeInterval(defaultKindPeriod.timeInterval);
    setStartTime(
      snapshotKindTime(defaultKindPeriod.startTime, () => {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        return start;
      })
    );
    setEndTime(
      snapshotKindTime(defaultKindPeriod.endTime, () => {
        const d = new Date();
        d.setHours(23, 0, 0, 0);
        return d;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ========================================
  // 시간 범위 체크박스 변경 핸들러
  // ========================================
  const handleTimeRangeChange = useCallback(
    (checked: boolean) => {
      if (!timeRangeDisabled) {
        setTimeRangeEnabled(checked);

        // 체크박스 해제 시: 요일별/일별/월별/년도별의 하위 선택이면 "전체"로 변경
        if (!checked && selectedCategory.length > 0) {
          const subCategory = selectedCategory[selectedCategory.length - 1].id;

          let newTags: SelectedTag[] | null = null;

          // 3단계 구조 (kind1-kind2-kind3)
          if (selectedCategory.length === 3) {
            const kind1Tag = selectedCategory[0];
            const kind2Tag = selectedCategory[1];

            if ((subCategory.startsWith('dayofweek-') || subCategory.startsWith('day-') ||
                 subCategory.startsWith('month-') || subCategory.startsWith('year-')) &&
                !subCategory.endsWith('-all')) {
              newTags = [
                kind1Tag,
                kind2Tag,
                { id: `${kind2Tag.id}-all`, text: '전체', path: [...kind2Tag.path, '전체'] },
              ];
            }
          }
          // 2단계 구조
          else if (selectedCategory.length === 2) {
            const kind1Id = selectedCategory[0].id;
            const prefixes = ['dayofweek', 'day', 'month', 'year'] as const;
            for (const prefix of prefixes) {
              if (subCategory.startsWith(`${prefix}-`) && subCategory !== `${prefix}-all`) {
                const kind1Text = selectedCategory[0].text;
                newTags = [
                  { id: kind1Id, text: kind1Text, path: [kind1Text] },
                  { id: `${kind1Id}-all`, text: '전체', path: [kind1Text, '전체'] },
                ];
                break;
              }
            }
          }

          if (newTags) {
            setSelectedCategory(newTags);
            handleCategoryChange(newTags);
          }
        }
      }
    },
    [timeRangeDisabled, selectedCategory, handleCategoryChange]
  );

  // ========================================
  // 렌더링
  // ========================================
  return (
    <>
      {/* 종류 + 기간 Row */}
      <div className="search-panel__row grid--cols-2">
        {/* 종류 컬럼 */}
        <div className="search-panel__col">
          <div className="search-panel__label">종류</div>
          <div className="search-panel__field">
            <div className="search-panel__data">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <DrillDown
                  value={is3Level ? drillDownValue : selectedCategory}
                  data={finalCategoryData}
                  levelLabels={levelLabels || defaultLevelLabels}
                  mode="single"
                  onChange={is3Level ? handleDrillDownChange : handleCategoryChange}
                  placeholder="종류 선택"
                  variant="outlined"
                />
                {is3Level && kind2Options && (
                  <SelectBox
                    dataSource={kind2Options}
                    displayExpr="text"
                    valueExpr="id"
                    value={selectedKind2}
                    onValueChanged={(e) => handleKind2Change(e.value)}
                    width={200}
                  />
                )}
                <Checkbox
                  label="시간범위"
                  checked={timeRangeEnabled}
                  onChange={handleTimeRangeChange}
                  disabled={timeRangeDisabled}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 기간 컬럼 */}
        <div className="search-panel__col">
          <div className="search-panel__label">기간</div>
          <div className="search-panel__field">
            <div className="search-panel__data">
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={onStartDateChange}
                onEndDateChange={onEndDateChange}
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
                showTime={timeRangeEnabled}
                timeFormat={timeInterval === 60 ? 'HH' : 'HH:mm'}
                dateFormat={dateFormat}
                showHolidaySetting={showHolidaySetting}
                holidaySetting={holidaySetting}
                onHolidaySettingChange={onHolidaySettingChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Children 렌더링 (추가 Row들) */}
      {children}
    </>
  );
};
