import React, { CSSProperties } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import './Tab.css';

export interface TabItem {
  id: string;
  label: string;
  closable?: boolean;
  favorite?: boolean;
}

interface DraggableTabItemProps {
  tab: TabItem;
  isActive: boolean;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onFavoriteToggle?: (tabId: string) => void;
  enableDrag?: boolean;
  panelId?: string;
}

/**
 * DraggableTabItem 컴포넌트
 *
 * 개별 탭 아이템으로 드래그 앤 드롭, 클릭, 닫기 기능을 제공합니다.
 */
export const DraggableTabItem: React.FC<DraggableTabItemProps> = ({
  tab,
  isActive,
  onTabClick,
  onTabClose,
  onFavoriteToggle,
  enableDrag = true,
  panelId
}) => {
  const {
    attributes,
    listeners,
    setNodeRef: setDragNodeRef,
    isDragging,
  } = useDraggable({
    id: tab.id,
    data: {
      type: 'tab',
      tab,
      panelId // 어느 패널에서 드래그 시작했는지
    },
    disabled: !enableDrag
  });

  const { isOver, setNodeRef: setDropNodeRef } = useDroppable({
    id: `droppable-${tab.id}`,
    data: { type: 'tab', tab },
    disabled: !enableDrag
  });

  const setNodeRef = (node: HTMLElement | null) => {
    setDragNodeRef(node);
    setDropNodeRef(node);
  };

  const style: CSSProperties = isDragging
    ? { opacity: 0.5 }
    : {};

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(tab.id);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTabClose(tab.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-tab-id={tab.id}
      className={`tab__item ${isActive ? 'tab__item--active' : ''} ${
        isOver && !isDragging ? 'tab__item--drop-over' : ''
      }`}
      onClick={() => onTabClick(tab.id)}
      {...(enableDrag ? listeners : {})}
      {...(enableDrag ? attributes : {})}
    >
      {/* 즐겨찾기 아이콘 */}
      {onFavoriteToggle && (
        <button
          className={`tab__favorite ${tab.favorite ? 'tab__favorite--active' : ''}`}
          onClick={handleFavoriteToggle}
          title={tab.favorite ? '즐겨찾기 해제' : '즐겨찾기'}
        >
          
        </button>
      )}

      {/* 탭 라벨 */}
      <span className="tab__label" style={{ cursor: enableDrag ? 'grab' : 'pointer' }}>
        {tab.label}
      </span>

      {/* 닫기 버튼 */}
      {tab.closable !== false && (
        <button
          className="tab__close"
          onClick={handleClose}
          title="닫기"
        >
          ×
        </button>
      )}
    </div>
  );
};

/**
 * TabDragOverlay 컴포넌트
 *
 * 드래그 중 표시되는 오버레이 컴포넌트
 */
export const TabDragOverlay: React.FC<{ tab: TabItem; isActive: boolean }> = ({
  tab,
  isActive
}) => {
  return (
    <div
      className={`tab__item ${isActive ? 'tab__item--active' : ''}`}
      style={{
        transform: 'rotate(2deg)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* 즐겨찾기 아이콘 */}
      {tab.favorite && (
        <button className={`tab__favorite tab__favorite--active`}>
          ★
        </button>
      )}

      <span className="tab__label">{tab.label}</span>

      {tab.closable !== false && (
        <button className="tab__close">×</button>
      )}
    </div>
  );
};
