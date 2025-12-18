import React, { useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import './TabContent.css';

export interface TabContentProps {
  /** 탭 ID */
  tabId: string;
  /** 활성 여부 */
  isActive: boolean;
  /** 자식 요소 */
  children: React.ReactNode;
  /** 드롭 가능 여부 */
  enableDrop?: boolean;
  /** 드롭 시 콜백 */
  onDrop?: (tabId: string) => void;
  /** 분할 모드 여부 (섹션이 1개인 경우 분할 표시) */
  canSplit?: boolean;
}

/**
 * TabContent 컴포넌트
 *
 * 탭 콘텐츠를 표시하며, 드래그 앤 드롭으로 탭을 이동/분할할 수 있습니다.
 *
 * @example
 * ```tsx
 * <TabContent
 *   tabId="tab-1"
 *   isActive={true}
 *   enableDrop={true}
 *   canSplit={true}
 * >
 *   <div>탭 내용</div>
 * </TabContent>
 * ```
 */
export const TabContent: React.FC<TabContentProps> = ({
  tabId,
  isActive,
  children,
  enableDrop = true,
  onDrop,
  canSplit = false
}) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id: `content-${tabId}`,
    data: {
      type: 'content',
      tabId
    },
    disabled: !enableDrop
  });

  // 드래그 중인 탭이 현재 탭과 같은지 확인
  const isDraggingSelf = active?.id === tabId;

  useEffect(() => {
    if (isOver && !isDraggingSelf && onDrop && active) {
      // 드롭 이벤트는 DndContext의 onDragEnd에서 처리되므로 여기서는 시각적 표시만
    }
  }, [isOver, isDraggingSelf, onDrop, active]);

  return (
    <div
      ref={setNodeRef}
      className={`tab-content ${isActive ? 'tab-content--active' : ''} ${
        isOver && !isDraggingSelf ? 'tab-content--drop-over' : ''
      }`}
    >
      {/* 실제 콘텐츠 */}
      <div className="tab-content__inner">
        {children}
      </div>

      {/* 드롭 오버레이 - 분할 가능한 경우 좌우 표시 */}
      {isOver && !isDraggingSelf && canSplit && (
        <div className="tab-content__drop-overlay">
          <div className="tab-content__drop-zone tab-content__drop-zone--left">
            <span className="tab-content__drop-label">현재 영역</span>
          </div>
          <div className="tab-content__drop-zone tab-content__drop-zone--right">
            <span className="tab-content__drop-label">새 분할 영역</span>
          </div>
        </div>
      )}

      {/* 드롭 오버레이 - 분할 불가능한 경우 (이미 분할된 경우) */}
      {isOver && !isDraggingSelf && !canSplit && (
        <div className="tab-content__drop-overlay tab-content__drop-overlay--single">
          <span className="tab-content__drop-label">탭 이동</span>
        </div>
      )}
    </div>
  );
};
