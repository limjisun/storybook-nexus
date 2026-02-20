import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CustomerCard } from '../src/components/CustomerCard';
import type { CustomerCardProps } from '../src/components/CustomerCard';

/**
 * NEXUS CustomerCard 컴포넌트
 *
 * 고객 정보를 표시하는 카드 컴포넌트입니다.
 * 요약 정보를 클릭하면 상세 정보를 토글할 수 있습니다.
 *
 * ## Features
 * - ✅ 고객 요약 정보 표시 (이름, 최근 대화, 시간)
 * - ✅ 실시간 채팅 표시
 * - ✅ 읽지 않은 메시지 카운트
 * - ✅ 다양한 채널 타입 아이콘 (chat, incall, outcall, inmail, outmail, noncall)
 * - ✅ 채팅 채널 표시 (kakao, facebook, instagram, line, telegram)
 * - ✅ 상세 정보 토글
 * - ✅ 신규 고객 입력 폼 지원
 *
 * ## Usage
 * ```tsx
 * import { CustomerCard } from '@/components/CustomerCard';
 *
 * <CustomerCard
 *   name="홍길동"
 *   customerId="FDW5000024"
 *   lastMessage="해외로밍하려면 한국에서 뭔가를 해야 하나요?"
 *   time="지금"
 *   channelType="chat"
 *   chatChannel="kakao"
 *   isRealTime={true}
 *   unreadCount={1}
 *   customerInfo={{
 *     phone: "0214785474",
 *     mobile: "01014547874",
 *     email: "sujisuji4874@naver.com",
 *     address: "서울 영등포구 여의대로 108\n파크원 타워1 19층 기획디자인팀",
 *     marketingConsent: "Y",
 *     vipStatus: "N",
 *     referrer: "이민호",
 *     reservationDate: "2024-01-22",
 *     revisitIntent: "Y"
 *   }}
 * />
 * ```
 */
const meta = {
  title: 'NEXUS-CUSTOM/고객카드',
  component: CustomerCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    channelType: {
      control: 'select',
      options: ['chat', 'incall', 'outcall', 'inmail', 'outmail', 'noncall'],
      description: '채널 타입',
    },
    chatChannel: {
      control: 'select',
      options: ['kakao', 'facebook', 'instagram', 'line', 'telegram'],
      description: '채팅 채널 (chat일 때만 사용)',
    },
    profileColor: {
      control: 'color',
      description: '프로필 배경색',
    },
  },
} satisfies Meta<typeof CustomerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// Stories
// ========================================

/**
 * 기본 사용 예시
 *
 * 실시간 채팅 고객 카드입니다. (방금 접속)
 */
export const Default: Story = {
  args: {
    name: '홍길동',
    customerId: 'FDW5000024',
    lastMessage: '해외로밍하려면 한국에서 뭔가를 해야 하나요?',
    timestamp: new Date(Date.now() - 30000), // 30초 전
    channelType: 'chat',
    chatChannel: 'kakao',
    isRealTime: true,
    unreadCount: 1,
    profileColor: '#8195FF',
    customerInfo: {
      phone: '0214785474',
      mobile: '01014547874',
      email: 'sujisuji4874@naver.com',
      address: '서울 영등포구 여의대로 108\n파크원 타워1 19층 기획디자인팀',
      marketingConsent: 'Y',
      vipStatus: 'N',
      referrer: '이민호',
      reservationDate: '2024-01-22',
      revisitIntent: 'Y',
    },
  },
};

/**
 * 채팅 채널 - 카카오톡 (5분 전)
 *
 * 채팅 아이콘과 카카오톡 채널이 표시됩니다.
 */
export const ChatChannel: Story = {
  args: {
    name: '김철수',
    customerId: 'FDW5000025',
    lastMessage: '상담 감사합니다.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5분 전
    channelType: 'chat',
    chatChannel: 'kakao',
    isRealTime: false,
    profileColor: '#B4A197',
    customerInfo: {
      phone: '0212345678',
      mobile: '01012345678',
      email: 'kim@example.com',
      marketingConsent: 'Y',
      vipStatus: 'Y',
    },
  },
};

/**
 * 읽지 않은 메시지 - 페이스북 (방금)
 *
 * 읽지 않은 메시지 카운트와 페이스북 채널이 표시됩니다.
 */
export const UnreadMessages: Story = {
  args: {
    name: '최수지',
    customerId: 'FDW5000028',
    lastMessage: '빠른 답변 부탁드립니다.',
    timestamp: new Date(Date.now() - 10000), // 10초 전 (방금)
    channelType: 'chat',
    chatChannel: 'facebook',
    isRealTime: true,
    unreadCount: 5,
    profileColor: '#FF95A8',
    customerInfo: {
      mobile: '01045678901',
      email: 'choi@example.com',
      marketingConsent: 'Y',
      vipStatus: 'Y',
    },
  },
};


/**
 * 선택된 상태 - 라인
 *
 * 카드가 선택된 상태이며 라인 채널이 표시됩니다.
 */
export const SelectedCard: Story = {
  args: {
    name: '선택된 고객',
    customerId: 'FDW5000031',
    lastMessage: '문의사항이 있어요.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15분 전
    channelType: 'chat',
    chatChannel: 'line',
    isRealTime: false,
    isSelected: true,
    profileColor: '#8195FF',
    customerInfo: {
      mobile: '01067890123',
      email: 'selected@example.com',
      marketingConsent: 'N',
      vipStatus: 'N',
    },
  },
};

/**
 * 다양한 프로필 색상
 *
 * 다양한 프로필 색상 예시입니다.
 */
export const MultipleCards: Story = {
  render: () => (
    <div style={{ width: '360px', border: '1px solid #e0e0e0' }}>
      <CustomerCard
        name="홍길동"
        customerId="FDW5000024"
        lastMessage="해외로밍하려면 한국에서 뭔가를 해야 하나요?"
        timestamp={new Date(Date.now() - 5000)}
        channelType="inmail"
        isRealTime={true}
        unreadCount={1}
        profileColor="#8195FF"
        customerInfo={{
          phone: '0214785474',
          mobile: '01014547874',
          email: 'sujisuji4874@naver.com',
          address: '서울 영등포구 여의대로 108\n파크원 타워1 19층 기획디자인팀',
          marketingConsent: 'Y',
          vipStatus: 'N',
          referrer: '이민호',
          reservationDate: '2024-01-22',
          revisitIntent: 'Y',
        }}
      />
      <CustomerCard
        name="새로운 고객"
        customerId="FDW5000025"
        lastMessage="vip 요금제중에 20만원 아래로 쓰려면 어떻게 해야되나요?"
        timestamp={new Date(Date.now() - 30000)}
        channelType="chat"
        chatChannel="telegram"
        isRealTime={false}
        profileColor="#B4A197"
        isNewCustomer={true}
      />
      <CustomerCard
        name="김철수"
        customerId="FDW5000026"
        lastMessage="빠른 상담 부탁드립니다."
        timestamp={new Date(Date.now() - 60000)}
        channelType="chat"
        chatChannel="kakao"
        isRealTime={false}
        unreadCount={3}
        profileColor="#FF8195"
        customerInfo={{
          mobile: '01012345678',
          email: 'kim@example.com',
          marketingConsent: 'Y',
          vipStatus: 'N',
        }}
      />
      <CustomerCard
        name="이영희"
        customerId="FDW5000027"
        lastMessage="요금제 문의 vip 요금제 중에 20만원 아래로 쓰려면 어떻게 해야"
        timestamp={ new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)}
        channelType="incall"
        isRealTime={false}
        profileColor="#95FF81"
        customerInfo={{
          phone: '0223456789',
          mobile: '01023456789',
          email: 'lee@example.com',
          marketingConsent: 'N',
          vipStatus: 'Y',
        }}
      />
    </div>
  ),
};


