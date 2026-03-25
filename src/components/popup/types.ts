export type PopupType = 'default' | 'confirm' | 'alert' | 'warning' | 'error' | 'success';

export interface PopupButton {
  text: string;
  type?: 'default' | 'normal' | 'outlined';
  onClick: () => void;
}

export interface PopupProps {
  /** 팝업 표시 여부 */
  visible: boolean;

  /** 팝업 제목 */
  title?: string;

  /** 팝업 내용 (문자열 또는 React 노드) */
  content?: React.ReactNode;

  /** 팝업 body 영역 (content 대신 사용 가능) */
  children?: React.ReactNode;

  /** 팝업 footer 영역 (버튼 영역) */
  footer?: React.ReactNode;

  /** 팝업 타입 (기본: 'default') */
  type?: PopupType;

  /** 팝업 너비 (기본: 'auto') */
  width?: number | string;

  /** 팝업 높이 (기본: 'auto') */
  height?: number | string;

  /** 최대 너비 */
  maxWidth?: number | string;

  /** 최대 높이 */
  maxHeight?: number | string;

  /** 드래그 가능 여부 (기본: false) */
  dragEnabled?: boolean;

  /** 외부 클릭 시 닫기 (기본: false) */
  closeOnOutsideClick?: boolean;

  /** X 버튼 표시 여부 (기본: true) */
  showCloseButton?: boolean;

  /** 제목 표시 여부 (기본: true) */
  showTitle?: boolean;

  /** 배경 어둡게 처리 (기본: true) */
  shading?: boolean;

  /** 배경 색상 (기본: 'rgba(0,0,0,0.5)') */
  shadingColor?: string;

  /** 버튼 목록 */
  buttons?: PopupButton[];

  /** 팝업 닫힐 때 콜백 */
  onHiding?: () => void;

  /** 팝업 표시될 때 콜백 */
  onShowing?: () => void;

  /** CSS 클래스명 */
  className?: string;

  /** 컨테이너 선택자 (기본: body) */
  container?: string;
}
