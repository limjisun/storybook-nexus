import React, { useState, useRef, useEffect } from 'react';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  /** 옵션 옆에 표시될 숫자 (선택사항, 예: 인원 수) */
  count?: number;
}

export type SelectVariant = 'outlined' | 'borderless' | 'filled';

interface SelectProps {
  /** 드롭다운에 표시될 옵션 목록 */
  options: SelectOption[];
  /** 현재 선택된 값 */
  value?: string;
  /** 값 변경 시 호출되는 콜백 함수 */
  onChange?: (value: string) => void;
  /** 선택되지 않았을 때 표시될 텍스트 (기본값: '선택') */
  placeholder?: string;
  /** 셀렉트 비활성화 여부 (기본값: false) */
  disabled?: boolean;
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 셀렉트 스타일 변형 (기본값: 'outlined') */
  variant?: SelectVariant;
  /** 드롭다운 너비 (예: '200px', 200, 'auto') */
  dropdownWidth?: string | number;
}

/**
 * Select 컴포넌트는 여러 옵션 중 하나를 선택하는 드롭다운입니다.
 *
 * ## 사용 예시
 * ```tsx
 * const statusOptions = [
 *   { value: 'after_call', label: '후처리 대기' },
 *   { value: 'on_call', label: '통화중' },
 *   { value: 'break', label: '휴식' },
 * ];
 *
 * <Select
 *   options={statusOptions}
 *   value={agentStatus}
 *   onChange={setAgentStatus}
 *   variant="borderless"
 * />
 * ```
 */
const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = '선택',
  disabled = false,
  className = '',
  variant = 'outlined',
  dropdownWidth,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  return (
    <div
      ref={selectRef}
      className={`select select--${variant} ${isOpen ? 'select--open' : ''} ${disabled ? 'select--disabled' : ''} ${className}`}
    >
      <div className="select__trigger" onClick={handleToggle}>
        <span className="select__value">
          {selectedOption ? (
            <>
              {selectedOption.label}
              {selectedOption.count !== undefined && (
                <span className="select__count">{selectedOption.count}</span>
              )}
            </>
          ) : placeholder}
        </span>
        <span className="select__arrow"></span>
      </div>

      {isOpen && (
        <div
          className="select__dropdown"
          style={dropdownWidth ? {
            width: typeof dropdownWidth === 'number' ? `${dropdownWidth}px` : dropdownWidth
          } : undefined}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`select__option ${value === option.value ? 'select__option--selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
              {option.count !== undefined && (
                <span className="select__count">{option.count}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
