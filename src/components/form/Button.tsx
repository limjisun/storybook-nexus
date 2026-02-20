import React from 'react';
import './Button.css';

interface ButtonProps {
  /** 버튼에 표시될 텍스트 */
  text: string;
  /** 버튼 타입 (기본값: 'default') */
  type?: 'default' | 'normal' | 'outlined';
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 버튼 비활성화 여부 (기본값: false) */
  disabled?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * Button 컴포넌트는 사용자 액션을 위한 기본 버튼입니다.
 *
 * ## 사용 예시
 * ```tsx
 * <Button
 *   text="확인"
 *   type="default"
 *   onClick={() => console.log('클릭!')}
 * />
 * ```
 */
const Button: React.FC<ButtonProps> = ({
  text,
  type = 'default',
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      className={`nexus-button nexus-button--${type} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
