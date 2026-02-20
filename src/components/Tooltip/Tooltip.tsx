import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Tooltip.css';

export interface TooltipProps {
  /** 툴팁 내용 */
  content: React.ReactNode;
  /** 툴팁을 트리거할 자식 요소 (없으면 기본 아이콘 표시) */
  children?: React.ReactNode;
  /** 툴팁 위치 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** 툴팁 트리거 방식 */
  trigger?: 'hover' | 'click';
  /** 툴팁 표시 지연 시간 (ms) */
  delay?: number;
  /** 커스텀 클래스명 */
  className?: string;
  /** 아이콘 표시 여부 (children이 없을 때 기본 아이콘 사용) */
  showIcon?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  trigger = 'hover',
  delay = 0,
  className = '',
  showIcon = true,
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = rect.top + window.scrollY - 8;
        left = rect.left + window.scrollX + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + window.scrollY + 8;
        left = rect.left + window.scrollX + rect.width / 2;
        break;
      case 'left':
        top = rect.top + window.scrollY + rect.height / 2;
        left = rect.left + window.scrollX - 8;
        break;
      case 'right':
        top = rect.top + window.scrollY + rect.height / 2;
        left = rect.right + window.scrollX + 8;
        break;
    }

    setPosition({ top, left });
  };

  const showTooltip = () => {
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setVisible(true);
      }, delay);
    } else {
      setVisible(true);
    }
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(false);
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setVisible(!visible);
    }
  };

  useEffect(() => {
    if (visible) {
      calculatePosition();
    }
  }, [visible]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        trigger === 'click' &&
        visible &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        hideTooltip();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [trigger, visible]);

  return (
    <>
      <span
        ref={triggerRef}
        className="nexus-tooltip-trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children || (showIcon && <span className="tooltip-icon" />)}
      </span>
      {visible &&
        createPortal(
          <div
            className={`nexus-tooltip nexus-tooltip-${placement} ${className}`}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
