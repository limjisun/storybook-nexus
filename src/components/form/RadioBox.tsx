import React from 'react';
import './RadioBox.css';

interface RadioBoxProps {
  /** 라디오 버튼의 고유 ID (필수) */
  id: string;
  /** 라디오 버튼의 name 속성 (그룹 지정용, 필수) */
  name: string;
  /** 라디오 버튼의 value (필수) */
  value: string;
  /** 라디오 버튼 옆에 표시될 라벨 텍스트 */
  label?: string;
  /** 라디오 버튼의 선택 상태 (기본값: false) */
  checked?: boolean;
  /** 상태 변경 시 호출되는 콜백 함수 */
  onChange?: (value: string) => void;
  /** 라디오 버튼 비활성화 여부 (기본값: false) */
  disabled?: boolean;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * RadioBox 컴포넌트는 여러 옵션 중 하나만 선택할 수 있는 라디오 버튼입니다.
 *
 * ## 사용 예시
 * ```tsx
 * <RadioBox
 *   id="option1"
 *   name="options"
 *   value="1"
 *   label="옵션 1"
 *   checked={selectedValue === '1'}
 *   onChange={setSelectedValue}
 * />
 * ```
 */
const RadioBox: React.FC<RadioBoxProps> = ({
  id,
  name,
  value,
  label,
  checked = false,
  onChange,
  disabled = false,
  className = '',
}) => {
  const handleChange = () => {
    if (onChange && !disabled) {
      onChange(value);
    }
  };

  return (
    <div className={`radiobox-wrapper ${className}`}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className="radiobox-input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <label htmlFor={id} className="radiobox-label">
        {label && <span className="radiobox-label-text">{label}</span>}
      </label>
    </div>
  );
};

export default RadioBox;
