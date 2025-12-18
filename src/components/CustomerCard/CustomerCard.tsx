import React, { useState, useMemo } from 'react';
import './CustomerCard.css';
import { formatTimeDisplay } from '../../utils/timeFormat';
import { CustomerInfoPanel } from './CustomerInfoPanel';
import type { CustomerInfo, ChannelType, ChatChannel } from './types';

export interface CustomerCardProps {
  /** 고객명 */
  name: string;
  /** 고객 ID */
  customerId: string;
  /** 고객 최근 대화 내용 */
  lastMessage: string;
  /** 대화 시간 (예: "지금", "30초전") - timestamp가 없을 때 사용 */
  time?: string;
  /** 대화 타임스탬프 - 자동으로 상대/절대 시간으로 포맷됨 */
  timestamp?: Date | string;
  /** 연락 채널 타입 (chat, incall, outcall, inmail, outmail, noncall) */
  channelType: ChannelType;
  /** 실시간 채팅 여부 */
  isRealTime?: boolean;
  /** 읽지 않은 채팅 수 */
  unreadCount?: number;
  /** 고객 프로필 이니셜 배경색 */
  profileColor?: string;
  /** 선택 여부 */
  isSelected?: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 고객 상세 정보 */
  customerInfo?: CustomerInfo;
  /** 신규 고객 여부 (입력 폼 표시) */
  isNewCustomer?: boolean;
  /** 채팅 채널 (chat일 때만 사용) */
  chatChannel?: ChatChannel;
}

/**
 * NEXUS CustomerCard 컴포넌트
 *
 * 고객 정보를 표시하는 카드 컴포넌트입니다.
 * 요약 정보와 상세 정보를 토글할 수 있습니다.
 */
export const CustomerCard: React.FC<CustomerCardProps> = ({
  name,
  customerId,
  lastMessage,
  time,
  timestamp,
  channelType,
  isRealTime = false,
  unreadCount,
  profileColor = '#8195FF',
  isSelected = false,
  onClick,
  customerInfo,
  isNewCustomer = false,
  chatChannel,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // timestamp가 있으면 자동 포맷, 없으면 time 사용
  const displayTime = useMemo(() => {
    if (timestamp) {
      return formatTimeDisplay(timestamp);
    }
    return time || '';
  }, [timestamp, time]);

  const handleClick = () => {
    console.log('Card clicked, current isExpanded:', isExpanded);
    setIsExpanded(!isExpanded);
    console.log('After toggle, isExpanded will be:', !isExpanded);
    onClick?.();
  };

  const getChannelIcon = () => {
    const iconMap = {
      chat: 'icon_chat',
      incall: 'icon_incall',
      outcall: 'icon_outcall',
      inmail: 'icon_inmail',
      outmail: 'icon_outmail',
      noncall: 'icon_noncall',
    };
    return iconMap[channelType];
  };



  return (
    <div className={`ct-moule ${isRealTime ? 'real-time' : ''} ${isSelected ? 'on' : ''}`}>
      <div className="customer_summary" onClick={handleClick}>
        <div className="customer_left">
          <div className={`customer_icon ${getChannelIcon()}`}>
            {unreadCount && unreadCount > 0 && (
              <span className="chat_num">{unreadCount}</span>
            )}
          </div>
          <div className="customer_profile">
            <div className="customer_name">
               {name}
              {channelType === 'chat' && chatChannel && (
                <span className={`customer_channel channel_${chatChannel}`}></span>
              )}
            </div>
            <div className="customer_talk">{lastMessage}</div>
          </div>
        </div>
        <div className="customer_state">
          <span className="customer_time">{displayTime}</span>
        </div>
      </div>

      {isExpanded && (
        <>
          {console.log('Rendering CustomerInfoPanel, isExpanded:', isExpanded)}
          <CustomerInfoPanel
            name={name}
            customerId={customerId}
            customerInfo={customerInfo}
            isNewCustomer={isNewCustomer}
            editable={true}
            onSave={(updatedInfo) => {
              console.log('Updated customer info:', updatedInfo);
              // TODO: 실제 저장 로직 구현
            }}
            onReset={() => {
              console.log('Reset customer info');
              // TODO: 실제 초기화 로직 구현
            }}
            onAddField={() => {
              console.log('Add field');
              // TODO: 실제 필드 추가 로직 구현
            }}
          />
        </>
      )}
    </div>
  );
};
