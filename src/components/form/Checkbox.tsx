import React, { useRef, useEffect } from 'react';
import './Checkbox.css';

interface CheckboxProps {
  /** 체크박스의 고유 ID (선택 - 접근성 등 외부 연결이 필요한 경우에만 사용) */
  id?: string;
  /** 체크박스 옆에 표시될 라벨 텍스트 (선택) */
  label?: string;
  /** 체크박스의 체크 상태 (기본값: false) */
  checked?: boolean;
  /**
   * 중간 선택 상태 (일부만 선택됨)
   * true이면 checked 값과 무관하게 ━ 표시됩니다.
   * 예: 하위 항목 중 일부만 선택된 부모 체크박스
   */
  indeterminate?: boolean;
  /** 상태 변경 시 호출되는 콜백 함수 */
  onChange?: (checked: boolean) => void;
  /** 체크박스 비활성화 여부 (기본값: false) */
  disabled?: boolean;
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 클릭 이벤트 핸들러 (stopPropagation 등 native 이벤트 처리용) */
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * Checkbox 컴포넌트는 여러 항목 중 하나 이상을 선택할 수 있는 체크박스입니다.
 *
 * ## 사용 예시
 * ```tsx
 * <Checkbox
 *   id="terms"
 *   label="약관에 동의합니다"
 *   checked={agreed}
 *   onChange={setAgreed}
 * />
 *
 * // 일부 선택 상태 (indeterminate)
 * <Checkbox
 *   id="parent"
 *   label="전체"
 *   checked={false}
 *   indeterminate={true}
 *   onChange={handleChange}
 * />
 * ```
 */
const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  className = '',
  onClick,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // indeterminate는 HTML attribute로 설정 불가 → ref로 직접 설정
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick(e);
    }
  };

  return (
    <div className={`checkbox ${className}`} onClick={handleClick}>
      <label className="checkbox__label">
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          className="checkbox__input"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        {label && <span className="checkbox__label-text">{label}</span>}
      </label>
    </div>
  );
};

export default Checkbox;
