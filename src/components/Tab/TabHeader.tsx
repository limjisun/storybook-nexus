import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import { DraggableTabItem, TabItem } from './DraggableTabItem';
import './Tab.css';

export interface TabHeaderProps {
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
  /** 드래그 활성화 여부 */
  enableDrag?: boolean;
  /** 섹션 제거 가능 여부 */
  canRemove?: boolean;
  /** 섹션 제거 핸들러 */
  onRemoveSection?: () => void;
  /** 패널 ID (드래그 드롭용) */
  panelId?: string;
}

/**
 * TabHeader 컴포넌트
 *
 * 탭 네비게이션 헤더 영역
 * - 좌우 스크롤 버튼
 * - 탭 목록
 * - 분할/메뉴 버튼
 *
 * @example
 * ```tsx
 * <TabHeader
 *   tabs={tabs}
 *   activeTabId="tab1"
 *   onTabClick={(id) => console.log(id)}
 *   onTabClose={(id) => console.log('close', id)}
 * />
 * ```
 */
export const TabHeader: React.FC<TabHeaderProps> = ({
  tabs = [],
  activeTabId,
  onTabClick,
  onTabClose,
  onFavoriteToggle,
  onCloseOthers,
  onCloseAll,
  onSplitToggle,
  isSplitMode = false,
  enableDrag = true,
  canRemove = false,
  onRemoveSection,
  panelId = 'default',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrolling, setScrolling] = useState<'left' | 'right' | null>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<number | null>(null);
  const prevTabsLengthRef = useRef<number>(tabs.length);

  // 드롭 영역 설정
  const droppableId = `tab-header-${panelId}`;
  const { isOver, setNodeRef, active } = useDroppable({
    id: droppableId,
    data: {
      type: 'tab-header',
      panelId,
    },
  });

  // 드래그 모니터 - 전역 드래그 이벤트 감지
  useDndMonitor({
    onDragOver(event) {
      const { over } = event;
      if (over && over.id === droppableId) {
        setIsDraggedOver(true);
      } else if (over && over.id !== droppableId) {
        setIsDraggedOver(false);
      }
    },
    onDragEnd() {
      setIsDraggedOver(false);
    },
    onDragCancel() {
      setIsDraggedOver(false);
    }
  });

  // 드래그 상태 계산
  const dragState = useMemo(() => {
    const isDraggingTab = active?.data?.current?.type === 'tab';
    const draggingTabPanelId = active?.data?.current?.panelId;

    // 같은 패널에서 드래그 중인지 체크
    const isFromCurrentPanel = isDraggingTab && draggingTabPanelId === panelId;

    return {
      isDraggingTab,
      isFromCurrentPanel,
      // 같은 패널이 아닐 때만 점선 표시
      showDragOverlay: (isOver || isDraggedOver) && isDraggingTab && !isFromCurrentPanel
    };
  }, [active, isOver, isDraggedOver, panelId]);

  // 스크롤 가능 여부 체크
  const checkScroll = () => {
    if (!tabsContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const container = tabsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [tabs]);

  // 스크롤 함수
  const scroll = (direction: 'left' | 'right') => {
    if (!tabsContainerRef.current) return;
    const delta = direction === 'left' ? -100 : 100;
    tabsContainerRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  // 연속 스크롤 시작
  const startScroll = (direction: 'left' | 'right') => {
    setScrolling(direction);
    if (scrollIntervalRef.current) {
      window.clearInterval(scrollIntervalRef.current);
    }
    scroll(direction);
    scrollIntervalRef.current = window.setInterval(() => scroll(direction), 150);
  };

  // 연속 스크롤 중지
  const stopScroll = () => {
    if (scrollIntervalRef.current) {
      window.clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    setScrolling(null);
  };

  // 끝으로 스크롤
  const scrollToEnd = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollLeft = tabsContainerRef.current.scrollWidth;
    }
  };

  // 탭 추가 감지 및 자동 스크롤
  useEffect(() => {
    const currentTabsLength = tabs.length;
    if (prevTabsLengthRef.current !== null && currentTabsLength > prevTabsLengthRef.current) {
      scrollToEnd();
      setTimeout(scrollToEnd, 100);
    }
    prevTabsLengthRef.current = currentTabsLength;
  }, [tabs.length]);

  // 스크롤 인터벌 정리
  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) {
        window.clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

  // 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleTabClick = (tabId: string) => {
    onTabClick?.(tabId);
  };

  const handleMenuAction = (action: 'close' | 'closeOthers' | 'closeAll') => {
    switch (action) {
      case 'close':
        if (activeTabId) {
          onTabClose?.(activeTabId);
        }
        break;
      case 'closeOthers':
        onCloseOthers?.();
        break;
      case 'closeAll':
        onCloseAll?.();
        break;
    }
    setIsMenuOpen(false);
  };

  return (
    <div
      ref={setNodeRef}
      className={`tab ${dragState.showDragOverlay ? 'tab--drag-over' : ''}`}
    >
      {/* 왼쪽 스크롤 버튼 */}
      <button
        className={`tab__scroll-btn tab__scroll-btn--left ${scrolling === 'left' ? 'tab__scroll-btn--scrolling' : ''}`}
        onMouseDown={() => startScroll('left')}
        onMouseUp={stopScroll}
        onMouseLeave={stopScroll}
        onTouchStart={() => startScroll('left')}
        onTouchEnd={stopScroll}
        disabled={!canScrollLeft}
        title="이전"
      >
      </button>

      <div className="tab__container" ref={tabsContainerRef}>
        {tabs.map((tab) => (
          <DraggableTabItem
            key={tab.id}
            tab={tab}
            isActive={activeTabId === tab.id}
            onTabClick={handleTabClick}
            onTabClose={(tabId) => onTabClose?.(tabId)}
            onFavoriteToggle={onFavoriteToggle ? (tabId) => onFavoriteToggle(tabId) : undefined}
            enableDrag={enableDrag}
            panelId={panelId}
          />
        ))}
      </div>

      {/* 오른쪽 스크롤 버튼 */}
      <button
        className={`tab__scroll-btn tab__scroll-btn--right ${scrolling === 'right' ? 'tab__scroll-btn--scrolling' : ''}`}
        onMouseDown={() => startScroll('right')}
        onMouseUp={stopScroll}
        onMouseLeave={stopScroll}
        onTouchStart={() => startScroll('right')}
        onTouchEnd={stopScroll}
        disabled={!canScrollRight}
        title="다음"
      >
      </button>

      {/* 섹션 제거 버튼 */}
      {canRemove && onRemoveSection && (
        <button
          className="tab__remove-section-btn"
          onClick={onRemoveSection}
          title="섹션 제거"
        >
          −
        </button>
      )}

      {/* 분할 버튼 */}
      {onSplitToggle && (
        <button
          className={`tab__split-btn ${isSplitMode ? 'tab__split-btn--active' : ''}`}
          onClick={onSplitToggle}
          title={isSplitMode ? '분할 해제' : '화면 분할'}
        >
          <span>
            {isSplitMode ? (
              // 분할 해제 아이콘 (단일 사각형)
              <>
               -
              </>
            ) : (
              // 분할 아이콘 (두 개의 사각형)
              <>
               +
              </>
            )}
          </span>
        </button>
      )}

      <div className="tab__menu" ref={menuRef}>
        <button
          className="tab__menu-trigger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          title="메뉴"
        >
        </button>

        {isMenuOpen && (
          <div className="tab__dropdown">
            <button
              className="tab__dropdown-item"
              onClick={() => handleMenuAction('close')}
              disabled={!activeTabId}
            >
              현재 탭 닫기
            </button>
            <button
              className="tab__dropdown-item"
              onClick={() => handleMenuAction('closeOthers')}
            >
              다른 탭 닫기
            </button>
            <button
              className="tab__dropdown-item"
              onClick={() => handleMenuAction('closeAll')}
            >
              모든 탭 닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
