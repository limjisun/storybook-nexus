import React, { useState, useRef, useEffect } from 'react';
import './MultiSelect.css';
import Checkbox from './Checkbox';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export type MultiSelectVariant = 'outlined' | 'borderless' | 'filled';

interface MultiSelectProps {
  /** 드롭다운에 표시될 옵션 목록 */
  options: MultiSelectOption[];
  /** 현재 선택된 값들의 배열 */
  value?: string[];
  /** 값 변경 시 호출되는 콜백 함수 */
  onChange?: (value: string[]) => void;
  /** 선택되지 않았을 때 표시될 텍스트 (기본값: '선택') */
  placeholder?: string;
  /** 멀티셀렉트 비활성화 여부 (기본값: false) */
  disabled?: boolean;
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 멀티셀렉트 스타일 변형 (기본값: 'outlined') */
  variant?: MultiSelectVariant;
  /** 드롭다운 너비 (예: '200px', 200, 'auto') */
  dropdownWidth?: string | number;
  /** Select All 버튼 표시 여부 (기본값: true) */
  showSelectAll?: boolean;
}

/**
 * MultiSelect 컴포넌트는 여러 옵션을 동시에 선택할 수 있는 드롭다운입니다.
 *
 * ## 사용 예시
 * ```tsx
 * const channelOptions = [
 *   { value: 'phone', label: '전화' },
 *   { value: 'chat', label: '채팅' },
 *   { value: 'email', label: '이메일' },
 * ];
 *
 * <MultiSelect
 *   options={channelOptions}
 *   value={selectedChannels}
 *   onChange={setSelectedChannels}
 *   showSelectAll={true}
 * />
 * ```
 */
const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value = [],
  onChange,
  placeholder = '선택',
  disabled = false,
  className = '',
  variant = 'outlined',
  dropdownWidth,
  showSelectAll = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelection, setTempSelection] = useState<string[]>(value);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTempSelection(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setTempSelection(value); // 취소 시 원래 값으로 복원
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, value]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleCheckboxChange = (optionValue: string) => {
    setTempSelection((prev) => {
      if (prev.includes(optionValue)) {
        return prev.filter((v) => v !== optionValue);
      } else {
        return [...prev, optionValue];
      }
    });
  };

  const handleSelectAll = () => {
    if (tempSelection.length === options.length) {
      setTempSelection([]);
    } else {
      setTempSelection(options.map((opt) => opt.value));
    }
  };

  const handleOk = () => {
    if (onChange) {
      onChange(tempSelection);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempSelection(value);
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (value.length === 0) return placeholder;
    if (value.length === 1) {
      const option = options.find((opt) => opt.value === value[0]);
      return option?.label || placeholder;
    }
    return `${value.length}개 선택됨`;
  };

  const getSelectedLabels = () => {
    return value
      .map((v) => options.find((opt) => opt.value === v)?.label)
      .filter(Boolean);
  };

  const getTooltipText = () => {
    if (value.length === 0) return '';
    return getSelectedLabels().join('\n');
  };

  const isAllSelected = tempSelection.length === options.length && options.length > 0;

  return (
    <div
      ref={selectRef}
      className={`multiselect multiselect--${variant} ${isOpen ? 'multiselect--open' : ''} ${
        disabled ? 'multiselect--disabled' : ''
      } ${className}`}
    >
      <div className="multiselect__trigger" onClick={handleToggle} title={getTooltipText()}>
        <span className="multiselect__value">{getDisplayText()}</span>
        <span className="multiselect__arrow">▼</span>
      </div>

      {isOpen && (
        <div
          className="multiselect__dropdown"
          style={
            dropdownWidth
              ? {
                  width: typeof dropdownWidth === 'number' ? `${dropdownWidth}px` : dropdownWidth,
                }
              : undefined
          }
        >
          {showSelectAll && (
            <div className="multiselect__select-all">
              <div className="multiselect__option">
                <Checkbox
                  id="select-all"
                  label="Select All"
                  checked={isAllSelected}
                  onChange={() => handleSelectAll()}
                />
              </div>
            </div>
          )}

          <div className="multiselect__options">
            {options.map((option) => (
              <div key={option.value} className="multiselect__option">
                <Checkbox
                  id={`multiselect-${option.value}`}
                  label={option.label}
                  checked={tempSelection.includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                />
              </div>
            ))}
          </div>

          <div className="multiselect__actions">
            <button className="multiselect__button multiselect__button--ok" onClick={handleOk}>
              OK
            </button>
            <button
              className="multiselect__button multiselect__button--cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
