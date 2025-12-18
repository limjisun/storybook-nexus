import React from 'react';
import { TabHeader } from './TabHeader';
import { TabItem } from './DraggableTabItem';
import './Tab.css';

export type { TabItem } from './DraggableTabItem';
export { TabHeader } from './TabHeader';

export interface TabProps {
  /** 탭 목록 */
  tabs?: TabItem[];
  /** 활성화된 탭 ID */
  activeTabId?: string;
  /** 탭 클릭 핸들러 */
  onTabClick?: (tabId: string) => void;
  /** 탭 닫기 핸들러 */
  onTabClose?: (tabId: string) => void;
  /** 즐겨찾기 토글 핸들러 */
  onFavoriteToggle?: (tabId: string) => void;
  /** 현재 탭 제외하고 모두 닫기 */
  onCloseOthers?: () => void;
  /** 모든 탭 닫기 */
  onCloseAll?: () => void;
  /** 화면 분할 토글 핸들러 */
  onSplitToggle?: () => void;
  /** 분할 모드 여부 */
  isSplitMode?: boolean;
  /** 탭 순서 변경 핸들러 */
  onTabReorder?: (activeId: string, overId: string) => void;
  /** 드래그 활성화 여부 */
  enableDrag?: boolean;
  /** 패널 ID (드래그 드롭용) */
  panelId?: string;
}

/**
 * Tab 컴포넌트
 *
 * 가로 스크롤 가능한 탭 네비게이션
 * 탭 닫기, 현재 탭 찾기 등의 기능 제공
 *
 * @example
 * ```tsx
 * <Tab
 *   tabs={tabs}
 *   activeTabId="tab1"
 *   onTabClick={(id) => console.log(id)}
 *   onTabClose={(id) => console.log('close', id)}
 * />
 * ```
 */
export const Tab: React.FC<TabProps> = ({
  tabs = [],
  activeTabId,
  onTabClick,
  onTabClose,
  onFavoriteToggle,
  onCloseOthers,
  onCloseAll,
  onSplitToggle,
  isSplitMode = false,
  onTabReorder,
  enableDrag = true,
  panelId
}) => {
  return (
    <TabHeader
      tabs={tabs}
      activeTabId={activeTabId}
      onTabClick={onTabClick}
      onTabClose={onTabClose}
      onFavoriteToggle={onFavoriteToggle}
      onCloseOthers={onCloseOthers}
      onCloseAll={onCloseAll}
      onSplitToggle={onSplitToggle}
      isSplitMode={isSplitMode}
      enableDrag={enableDrag}
      panelId={panelId}
    />
  );
};
