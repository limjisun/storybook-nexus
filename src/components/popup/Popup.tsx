import React from 'react';
import { Popup as DxPopup } from 'devextreme-react/popup';
import type { PopupProps } from './types';
import Button from '../form/Button';
import './Popup.css';

export const Popup: React.FC<PopupProps> = ({
  visible,
  title,
  content,
  children,
  footer,
  width = 'auto',
  height = 'auto',
  maxWidth,
  maxHeight,
  dragEnabled = false,
  closeOnOutsideClick = false,
  showCloseButton = true,
  showTitle = true,
  shading = true,
  shadingColor = 'rgba(0,0,0,0.5)',
  buttons,
  onHiding,
  onShowing,
  className,
  container = 'body',
}) => {
  // 버튼 렌더링
  const renderButtons = () => {
    if (!buttons || buttons.length === 0) return null;

    return (
      <>
        {buttons.map((button, index) => (
          <Button
            key={index}
            text={button.text}
            type={button.type || 'default'}
            onClick={button.onClick}
          />
        ))}
      </>
    );
  };

  // 내용 렌더링 - 구조화된 레이아웃 사용
  const renderContent = () => {
    return (
      <div className="popup-wrap">
        <div className="pop-container">
          <div className="pop-conts">
            <div className="pop-conts-in">
              {/* 내용 영역 */}
              {children ? (
                children
              ) : typeof content === 'string' ? (
                <p>{content}</p>
              ) : (
                content
              )}
            </div>
          </div>

          {/* Footer 영역 */}
          {(footer || buttons) && (
            <div className="pop-footer">{footer || renderButtons()}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <DxPopup
      visible={visible}
      dragEnabled={dragEnabled}
      closeOnOutsideClick={closeOnOutsideClick}
      showCloseButton={showCloseButton}
      showTitle={showTitle}
      title={title}
      onHiding={onHiding}
      onShowing={onShowing}
      width={width}
      height={height}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      shading={shading}
      shadingColor={shadingColor}
      position="center"
      container={container}
      wrapperAttr={{ class: `custom-popup ${className || ''}` }}
    >
      {renderContent()}
    </DxPopup>
  );
};

export default Popup;
