/**
 * SearchCondition 컴포넌트 타입 정의
 */

// ========================================
// 버튼 설정
// ========================================
export interface ButtonConfig {
  /** 버튼 텍스트 */
  text: string;
  /** 버튼 타입 */
  type?: 'default' | 'normal';
  /** 클릭 핸들러 */
  onClick: () => void;
}

// ========================================
// SearchCondition Props (Children 패턴)
// ========================================
export interface SearchConditionProps {
  /** 확인 버튼 클릭 핸들러 (기본 버튼 사용 시) */
  onSubmit?: () => void;

  /** 취소 버튼 클릭 핸들러 (기본 버튼 사용 시) */
  onCancel?: () => void;

  /** 버튼 텍스트 커스터마이징 (기본 버튼 사용 시) */
  submitText?: string;
  cancelText?: string;

  /** 커스텀 버튼 배열 (이 prop을 사용하면 기본 버튼 대신 사용됨) */
  buttons?: ButtonConfig[];

  /** 제목 텍스트 */
  title?: string;

  /** children을 사용한 완전 자유 구성 */
  children?: React.ReactNode;
}
