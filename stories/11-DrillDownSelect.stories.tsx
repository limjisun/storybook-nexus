import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DrillDown, { DrillDownSelect, DrillDownTrigger } from '../src/components/form/DrillDown';
import type { DrillDownItem, SearchResultItem, SelectedTag } from '../src/components/form/DrillDown';

// ========================================
// 샘플 데이터
// ========================================

const SAMPLE_DATA: DrillDownItem[] = [
  {
    id: 'region_1',
    text: '서울',
    items: [
      {
        id: 'branch_1',
        text: '강남센터',
        items: [
          { id: 'team_1', text: '1팀' },
          { id: 'team_2', text: '2팀' },
          { id: 'team_3', text: '3팀' },
        ],
      },
      {
        id: 'branch_2',
        text: '종로센터',
        items: [
          { id: 'team_4', text: '1팀' },
          { id: 'team_5', text: '2팀' },
        ],
      },
    ],
  },
  {
    id: 'region_2',
    text: '부산',
    items: [
      {
        id: 'branch_3',
        text: '해운대센터',
        items: [
          { id: 'team_6', text: '1팀' },
          { id: 'team_7', text: '2팀' },
        ],
      },
      {
        id: 'branch_4',
        text: '서면센터',
        items: [
          { id: 'team_8', text: '1팀' },
        ],
      },
    ],
  },
  {
    id: 'region_3',
    text: '대구',
    items: [
      {
        id: 'branch_5',
        text: '수성센터',
        items: [
          { id: 'team_9', text: '1팀' },
          { id: 'team_10', text: '2팀' },
        ],
      },
    ],
  },
];

function searchTree(keyword: string, list: DrillDownItem[], parentIds: string[] = [], parentLabels: string[] = []): SearchResultItem[] {
  const results: SearchResultItem[] = [];
  for (const item of list) {
    const currentIds = [...parentIds, item.id];
    const currentLabels = [...parentLabels, item.text];
    if (item.text.includes(keyword)) {
      results.push({ ...item, pathIds: currentIds, pathLabels: currentLabels });
    }
    if (item.items?.length) {
      results.push(...searchTree(keyword, item.items, currentIds, currentLabels));
    }
  }
  return results;
}

// ========================================
// 래퍼 컴포넌트
// ========================================

const DrillDownWrapper = ({
  levelLabels = ['지역', '센터', '팀'],
  columnMinWidth = 220,
  initialTags = [] as SelectedTag[],
  showSearch = true,
  mode = 'multi' as 'single' | 'multi',
}) => {
  const [selectedPath, setSelectedPath] = useState<DrillDownItem[]>([]);
  const [tempSelectedTags, setTempSelectedTags] = useState<SelectedTag[]>(initialTags);
  const [selectedTags, setSelectedTagsFinal] = useState<SelectedTag[]>(initialTags);
  const [isOpen, setIsOpen] = useState(true);

  const handleLevelClick = (levelIndex: number, item: DrillDownItem) => {
    setSelectedPath((prev) => {
      const next = prev.slice(0, levelIndex);
      next[levelIndex] = item;
      return next;
    });
  };

  const handleSearch = async (keyword: string): Promise<SearchResultItem[]> => {
    await new Promise((r) => setTimeout(r, 200));
    return searchTree(keyword, SAMPLE_DATA);
  };

  return (
    <div className="drilldown-story__wrapper" style={{ position: 'relative', width: '300px' }}>
      {/* 셀렉트박스 형태 트리거 */}
      <DrillDownTrigger
        selectedTags={selectedTags}
        levelLabels={levelLabels}
        isOpen={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        onClear={() => {
          setSelectedTagsFinal([]);
          setTempSelectedTags([]);
        }}
      />

      {isOpen && (
        <DrillDownSelect
          rootList={SAMPLE_DATA}
          selectedPath={selectedPath}
          onLevelClick={handleLevelClick}
          tempSelectedTags={tempSelectedTags}
          setTempSelectedTags={setTempSelectedTags}
          setSelectedTags={(tags) => {
            setSelectedTagsFinal(tags);
            setIsOpen(false);
          }}
          setIsTagDropdownOpen={setIsOpen}
          levelLabels={levelLabels}
          columnMinWidth={columnMinWidth}
          onSearch={showSearch ? handleSearch : undefined}
          mode={mode}
        />
      )}
    </div>
  );
};

// ========================================
// Meta
// ========================================

const meta = {
  title: 'Form/DrillDownSelect',
  component: DrillDownWrapper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `계층형 드릴다운 선택 컴포넌트입니다.

## 특징

- **가변 컬럼 너비**: \`levelLabels\` 개수 × \`columnMinWidth\`로 드롭다운 너비 자동 계산
- **컬럼별 Select All**: 각 컬럼 헤더의 체크박스로 해당 컬럼 전체 선택/해제 (indeterminate 지원)
- **전체 Select All**: 드롭다운 상단에서 모든 항목 일괄 선택/해제
- **계층형 컬럼 탐색**: 단계별로 좌→우 컬럼을 클릭하며 하위 항목 탐색
- **다중 선택**: 체크박스로 여러 항목 동시 선택, 상위 선택 시 하위 일괄 포함
- **검색 지원**: 검색어 입력 시 전체 트리에서 결과 표시 (비동기 지원)
- **선택 태그 툴팁**: 선택된 항목 뱃지에 hover 시 경로 테이블 팝업

## 사용 방법

\`\`\`tsx
import DrillDownSelect from './components/form/DrillDownSelect';

<DrillDownSelect
  rootList={data}
  selectedPath={selectedPath}
  onLevelClick={handleLevelClick}
  tempSelectedTags={tempSelectedTags}
  setTempSelectedTags={setTempSelectedTags}
  setSelectedTags={setSelectedTags}
  setIsTagDropdownOpen={setIsOpen}
  levelLabels={['지역', '센터', '팀']}
  columnMinWidth={150}           // 컬럼 최소 너비 (px), 기본 140
  onSearch={async (keyword) => searchTree(keyword, data)}
/>
\`\`\`

## 선택 태그 툴팁

\`\`\`tsx
<DrillDownTagTooltip
  tags={selectedTags}
  levelLabels={['지역', '센터', '팀']}
  label="6개 선택"
/>
\`\`\`
`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DrillDownWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// 스토리
// ========================================

/** 기본 사용 (3단계: 지역 > 센터 > 팀) */
export const Default: Story = {
  render: () => <DrillDownWrapper />,
};

/** 2단계 레이아웃 - 컬럼이 줄어들면 너비도 줄어듦 */
export const TwoLevel: Story = {
  render: () => <DrillDownWrapper levelLabels={['지역', '센터']} />,
};

/** 5단계 레이아웃 - 컬럼이 늘어나면 너비도 자동으로 늘어남 */
export const FiveLevel: Story = {
  render: () => (
    <DrillDownWrapper levelLabels={['지역', '센터', '팀', '그룹', '파트']} columnMinWidth={200} />
  ),
};

/** 넓은 컬럼 너비 */
export const WideColumns: Story = {
  render: () => <DrillDownWrapper columnMinWidth={200} />,
};

/** 단일 선택 모드 */
export const SingleSelect: Story = {
  render: () => <DrillDownWrapper mode="single" showSearch={false} />,
};

/** 검색 없이 사용 */
export const WithoutSearch: Story = {
  render: () => <DrillDownWrapper showSearch={false} />,
};

/** 초기 선택값이 있는 경우 - 뱃지에 hover하면 경로 테이블 확인 가능 */
export const WithInitialTags: Story = {
  render: () => (
    <DrillDownWrapper
      initialTags={[
        { id: 'team_1', text: '1팀', path: ['서울', '강남센터', '1팀'] },
        { id: 'team_2', text: '2팀', path: ['서울', '강남센터', '2팀'] },
        { id: 'team_6', text: '1팀', path: ['부산', '해운대센터', '1팀'] },
      ]}
    />
  ),
};
