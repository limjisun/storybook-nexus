import React, { useState, useCallback, useMemo } from 'react';
import DrillDown from '../form/DrillDown';
import type { DrillDownItem, SelectedTag } from '../form/DrillDown';
import Checkbox from '../form/Checkbox';

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
 */
export type KindAndPeriodMode = '2-level' | '3-level-queue' | '3-level-agent';

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

    // 요일별, 일별, 월별, 년도별에는 추가 옵션
    if (prefix === 'month' || prefix === 'year') {
      options.push({ id: `${prefix}-dayofweek`, text: '요일별' });
    }
    if (prefix === 'year') {
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
   *
   * @default '2-level'
   */
  mode?: KindAndPeriodMode;
  /** 카테고리 변경 핸들러 */
  onCategoryChange?: (data: {
    category: SelectedTag[];
    timeRangeEnabled: boolean;
    timeInterval: number;
  }) => void;
  /** DrillDown 레벨 레이블 (자동 설정되지만 커스텀 가능) */
  levelLabels?: string[];
  /** 자식 요소 (추가 Row들) */
  children?: React.ReactNode;
}

/**
 * KindAndPeriod 복합 컴포넌트
 *
 * 종류(DrillDown) + 시간 범위 체크박스를 포함한 컴포넌트.
 * 통계 페이지에서 자주 사용되는 패턴을 캡슐화했습니다.
 */
export const KindAndPeriod: React.FC<KindAndPeriodProps> = ({
  mode = '2-level',
  onCategoryChange,
  levelLabels,
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
    }
    return undefined;
  }, [mode]);

  // mode에 따라 카테고리 데이터 자동 생성
  const finalCategoryData = useMemo(() => {
    if (kind2Options) {
      return get3LevelCategoryData(kind2Options);
    }
    return getDefaultCategoryData();
  }, [kind2Options]);

  // mode에 따라 기본 레벨 레이블 설정
  const defaultLevelLabels = useMemo(() => {
    if (mode === '3-level-queue') {
      return ['종류', '큐 분류', '상세'];
    } else if (mode === '3-level-agent') {
      return ['종류', '상담사 분류', '상세'];
    }
    return ['종류', '종류'];
  }, [mode]);

  // ========================================
  // State
  // ========================================
  const [selectedCategory, setSelectedCategory] = useState<SelectedTag[]>([]);
  const [timeRangeEnabled, setTimeRangeEnabled] = useState<boolean>(false);
  const [timeRangeDisabled, setTimeRangeDisabled] = useState<boolean>(false);
  const [timeInterval, setTimeInterval] = useState<number>(60);

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
        if (onCategoryChange) {
          onCategoryChange({
            category: tags,
            timeRangeEnabled: false,
            timeInterval: 60,
          });
        }
        return;
      }

      // DrillDown returns array with both parent and child - use the last (deepest) selection
      const subCategory = tags[tags.length - 1].id;

      // 시간 간격 설정
      let interval = 60;
      if (subCategory.endsWith('-5')) {
        interval = 5;
      } else if (subCategory.endsWith('-10')) {
        interval = 10;
      } else if (subCategory.endsWith('-15')) {
        interval = 15;
      } else if (subCategory.endsWith('-30')) {
        interval = 30;
      }
      setTimeInterval(interval);

      // 시간 범위 체크박스 상태 결정
      let enabled = false;
      let disabled = false;

      // 3단계 구조 체크 (kind1-kind2 또는 kind1-kind2-kind3)
      const parts = subCategory.split('-');

      // 2단계 선택 (kind1-kind2): 시간대별인 경우만 체크 + disabled
      if (tags.length === 2) {
        const kind1 = parts[0];
        // 시간대별(hour)이거나 분대별(minute)일 때 2단계 선택
        if (kind1 === 'hour' || kind1 === 'minute') {
          enabled = true;
          disabled = true;
        } else if (kind1 === 'total') {
          // 총합-큐분류: 체크 + 활성화
          enabled = true;
          disabled = false;
        }
        // 요일별, 일별, 월별, 년도별의 2단계는 아직 미완성 상태이므로 disabled만
        else {
          enabled = false;
          disabled = false;
        }
      }
      // 1단계 선택 (kind1만) - 2단계 구조 호환
      else if (tags.length === 1) {
        // 1. 총합(total): 시간범위 체크 + 활성화
        if (subCategory === 'total') {
          enabled = true;
          disabled = false;
        }
        // 2. 분대별(minute): 아직 하위 선택 안함
        else if (subCategory === 'minute') {
          enabled = false;
          disabled = false;
        }
        // 3. 시간대별(hour): 시간범위 체크 + disabled
        else if (subCategory === 'hour') {
          enabled = true;
          disabled = true;
        }
        // 나머지는 기본값
        else {
          enabled = false;
          disabled = false;
        }
      }
      // 3단계 선택 (kind1-kind2-kind3)
      else if (tags.length === 3) {
        // 4. "전체"(*-all): 시간범위 해제 + disabled
        if (subCategory.endsWith('-all')) {
          enabled = false;
          disabled = true;
        }
        // 5. "시간대별"(*-hourly): 시간범위 체크 + disabled (3단계에서 시간대별은 disabled)
        else if (subCategory.endsWith('-hourly')) {
          enabled = true;
          disabled = true;
        }
        // 6. "요일별"(*-dayofweek), "월별"(*-month): 시간범위 해제 + disabled
        else if (subCategory.endsWith('-dayofweek') || subCategory.endsWith('-month')) {
          enabled = false;
          disabled = true;
        }
        // 7. 나머지 (n분대별): 시간범위 체크 + 활성화
        else {
          enabled = true;
          disabled = false;
        }
      }

      setTimeRangeEnabled(enabled);
      setTimeRangeDisabled(disabled);

      if (onCategoryChange) {
        onCategoryChange({
          category: tags,
          timeRangeEnabled: enabled,
          timeInterval: interval,
        });
      }
    },
    [onCategoryChange]
  );

  // ========================================
  // 시간 범위 체크박스 변경 핸들러
  // ========================================
  const handleTimeRangeChange = useCallback(
    (checked: boolean) => {
      if (!timeRangeDisabled) {
        setTimeRangeEnabled(checked);

        if (onCategoryChange) {
          onCategoryChange({
            category: selectedCategory,
            timeRangeEnabled: checked,
            timeInterval,
          });
        }
      }
    },
    [timeRangeDisabled, selectedCategory, timeInterval, onCategoryChange]
  );

  // ========================================
  // 렌더링
  // ========================================
  return (
    <>
      {/* 종류 + 시간범위 Row */}
      <div className="search-panel__row">
        <div className="search-panel__col">
          <div className="search-panel__label">종류</div>
          <div className="search-panel__field">
            <div className="search-panel__data">
              <DrillDown
                value={selectedCategory}
                data={finalCategoryData}
                levelLabels={levelLabels || defaultLevelLabels}
                mode="single"
                onChange={handleCategoryChange}
                placeholder="종류 선택"
                variant="outlined"
              />
            </div>
            <div className="search-panel__data search-panel__data--auto">
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

      {/* Children 렌더링 (추가 Row들) */}
      {children}
    </>
  );
};
