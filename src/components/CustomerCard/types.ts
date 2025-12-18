/**
 * 고객 상세 정보 타입
 */
export interface CustomerInfo {
  phone?: string;
  mobile?: string;
  email?: string;
  address?: string;
  marketingConsent?: 'Y' | 'N';
  vipStatus?: 'Y' | 'N';
  referrer?: string;
  reservationDate?: string;
  revisitIntent?: 'Y' | 'N';
}

/**
 * 채널 타입
 */
export type ChannelType = 'chat' | 'incall' | 'outcall' | 'inmail' | 'outmail' | 'noncall';

/**
 * 채팅 채널 타입
 */
export type ChatChannel = 'kakao' | 'facebook' | 'instagram' | 'line' | 'telegram';
