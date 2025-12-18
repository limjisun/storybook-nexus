import React, { useRef, useState, useEffect } from 'react';
import './SplitPanel.css';

export interface SplitPanelProps {
  /** 왼쪽 패널 내용 */
  leftPanel: React.ReactNode;
  /** 오른쪽 패널 내용 */
  rightPanel: React.ReactNode;
  /** 초기 분할 비율 (0-1) */
  initialRatio?: number;
  /** 최소 패널 너비 (px) */
  minPanelWidth?: number;
  /** 분할 모드 해제 콜백 */
  onUnsplit?: () => void;
}

/**
 * SplitPanel 컴포넌트
 *
 * 좌우로 분할 가능한 패널 레이아웃
 * 가운데 divider를 드래그하여 너비 조정 가능
 *
 * @example
 * ```tsx
 * <SplitPanel
 *   leftPanel={<div>Left Content</div>}
 *   rightPanel={<div>Right Content</div>}
 *   initialRatio={0.5}
 * />
 * ```
 */
export const SplitPanel: React.FC<SplitPanelProps> = ({
  leftPanel,
  rightPanel,
  initialRatio = 0.5,
  minPanelWidth = 200,
  onUnsplit
}) => {
  const [ratio, setRatio] = useState(initialRatio);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 마우스 이동 핸들러
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;

    // 마우스 위치를 비율로 계산
    const mouseX = e.clientX - containerRect.left;
    let newRatio = mouseX / containerWidth;

    // 최소/최대 너비 제한
    const minRatio = minPanelWidth / containerWidth;
    const maxRatio = 1 - minRatio;

    newRatio = Math.max(minRatio, Math.min(maxRatio, newRatio));
    setRatio(newRatio);
  };

  // 마우스 업 핸들러
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 드래그 이벤트 등록/해제
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  // Divider 마우스 다운
  const handleDividerMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <div className="split-panel" ref={containerRef}>
      {/* 왼쪽 패널 */}
      <div
        className="split-panel__left"
        style={{ width: `${ratio * 100}%` }}
      >
        {leftPanel}
      </div>

      {/* Divider */}
      <div
        className="split-panel__divider"
        onMouseDown={handleDividerMouseDown}
      >
        <div className="split-panel__divider-handle" />
      </div>

      {/* 오른쪽 패널 */}
      <div
        className="split-panel__right"
        style={{ width: `${(1 - ratio) * 100}%` }}
      >
        {rightPanel}
      </div>
    </div>
  );
};
