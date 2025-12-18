import React from 'react';
import './Checkbox.css';

interface CheckboxProps {
  /** 체크박스의 고유 ID (필수) */
  id: string;
  /** 체크박스 옆에 표시될 라벨 텍스트 (선택) */
  label?: string;
  /** 체크박스의 체크 상태 (기본값: false) */
  checked?: boolean;
  /** 상태 변경 시 호출되는 콜백 함수 */
  onChange?: (checked: boolean) => void;
  /** 체크박스 비활성화 여부 (기본값: false) */
  disabled?: boolean;
  /** 추가 CSS 클래스명 */
  className?: string;
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
 * ```
 */
const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked = false,
  onChange,
  disabled = false,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className={`checkbox-wrapper ${className}`}>
      <input
        type="checkbox"
        id={id}
        className="checkbox-input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <label htmlFor={id} className="checkbox-label">
        {label && <span className="checkbox-label-text">{label}</span>}
      </label>
    </div>
  );
};

export default Checkbox;
