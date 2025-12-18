import React from 'react';
import './Switch.css';

interface SwitchProps {
  /** 스위치의 고유 ID (필수) */
  id: string;
  /** 스위치 옆에 표시될 라벨 텍스트 */
  label: string;
  /** 스위치의 체크 상태 (기본값: false) */
  checked?: boolean;
  /** 상태 변경 시 호출되는 콜백 함수 */
  onChange?: (checked: boolean) => void;
  /** 스위치 비활성화 여부 (기본값: false) */
  disabled?: boolean;
}

/**
 * Switch 컴포넌트는 on/off 상태를 전환하는 토글 스위치입니다.
 *
 * ## 사용 예시
 * ```tsx
 * <Switch
 *   id="notifications"
 *   label="알림 받기"
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 * />
 * ```
 */
const Switch: React.FC<SwitchProps> = ({
  id,
  label,
  checked = false,
  onChange,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className="switch-wrapper">
      <span className="switch-label">{label}</span>
      <input
        type="checkbox"
        id={id}
        className="switch-input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <label htmlFor={id} className="switch-toggle"></label>
    </div>
  );
};

export default Switch;
