import React from 'react';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input 값 */
  value?: string;
  /** 기본값 */
  defaultValue?: string;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** Input 타입 */
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'search' | 'url';
  /** disabled 상태 */
  disabled?: boolean;
  /** readonly 상태 */
  readOnly?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** Input 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 전체 너비 사용 */
  fullWidth?: boolean;
  /** className */
  className?: string;
  /** 변경 이벤트 핸들러 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 포커스 이벤트 핸들러 */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** 블러 이벤트 핸들러 */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * NEXUS Input 컴포넌트
 *
 * 텍스트 입력을 위한 기본 Input 컴포넌트입니다.
 */
const Input: React.FC<InputProps> = ({
  value,
  defaultValue,
  placeholder,
  type = 'text',
  disabled = false,
  readOnly = false,
  error = false,
  size = 'medium',
  fullWidth = false,
  className = '',
  onChange,
  onFocus,
  onBlur,
  ...rest
}) => {
  const inputClassNames = [
    'nexus-input',
    `nexus-input--${size}`,
    disabled && 'nexus-input--disabled',
    readOnly && 'nexus-input--readonly',
    error && 'nexus-input--error',
    type === 'search' && 'nexus-input--search',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClassNames = [
    'nexus-input-wrapper',
    fullWidth && 'nexus-input-wrapper--full-width',
  ]
    .filter(Boolean)
    .join(' ');

  // Search 타입일 때는 wrapper로 감싸서 아이콘 표시
  if (type === 'search') {
    return (
      <div className={wrapperClassNames}>
        <input
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className={inputClassNames}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
        />
        <span className="input_sear"></span>
      </div>
    );
  }

  // 일반 타입
  return (
    <input
      type={type}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      className={inputClassNames}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      style={fullWidth ? { width: '100%' } : undefined}
      {...rest}
    />
  );
};

export default Input;
