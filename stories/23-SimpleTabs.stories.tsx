import type { Meta, StoryObj } from '@storybook/react';
import { SimpleTabs } from '../src/components/tabs';
import React, { useState } from 'react';

const meta: Meta<typeof SimpleTabs> = {
  title: 'Nexus Custom/SimpleTabs',
  component: SimpleTabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SimpleTabs>;

// Wrapper 컴포넌트들
const BasicTabsWrapper = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div>
      <SimpleTabs
        tabs={[
          { id: 'tab1', label: '첫 번째 탭' },
          { id: 'tab2', label: '두 번째 탭' },
          { id: 'tab3', label: '세 번째 탭' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e3e3', borderTop: 'none' }}>
        <h3>Active Tab: {activeTab}</h3>
        <p>탭을 클릭하여 전환해보세요.</p>
      </div>
    </div>
  );
};

const ManyTabsWrapper = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div>
      <SimpleTabs
        tabs={[
          { id: 'tab1', label: '대시보드' },
          { id: 'tab2', label: '통계' },
          { id: 'tab3', label: '설정' },
          { id: 'tab4', label: '사용자' },
          { id: 'tab5', label: '리포트' },
          { id: 'tab6', label: '도움말' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e3e3', borderTop: 'none' }}>
        <h3>현재 탭: {activeTab}</h3>
      </div>
    </div>
  );
};

const DisabledTabsWrapper = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div>
      <SimpleTabs
        tabs={[
          { id: 'tab1', label: '활성화됨' },
          { id: 'tab2', label: '비활성화됨', disabled: true },
          { id: 'tab3', label: '활성화됨' },
          { id: 'tab4', label: '비활성화됨', disabled: true },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e3e3', borderTop: 'none' }}>
        <p>비활성화된 탭은 클릭할 수 없습니다.</p>
      </div>
    </div>
  );
};

const WithContentWrapper = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h3>개요</h3>
            <p>이것은 개요 탭의 내용입니다.</p>
            <ul>
              <li>항목 1</li>
              <li>항목 2</li>
              <li>항목 3</li>
            </ul>
          </div>
        );
      case 'details':
        return (
          <div>
            <h3>상세 정보</h3>
            <p>상세 정보를 여기에 표시합니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>항목</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>값</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>이름</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>예시</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>상태</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>활성</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h3>설정</h3>
            <p>설정 옵션:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label>
                <input type="checkbox" /> 옵션 1
              </label>
              <label>
                <input type="checkbox" /> 옵션 2
              </label>
              <label>
                <input type="checkbox" /> 옵션 3
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <SimpleTabs
        tabs={[
          { id: 'overview', label: '개요' },
          { id: 'details', label: '상세 정보' },
          { id: 'settings', label: '설정' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e3e3', borderTop: 'none' }}>
        {renderContent()}
      </div>
    </div>
  );
};

const EnglishTabsWrapper = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div>
      <SimpleTabs
        tabs={[
          { id: 'home', label: 'Home' },
          { id: 'profile', label: 'Profile' },
          { id: 'messages', label: 'Messages' },
          { id: 'notifications', label: 'Notifications' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e3e3', borderTop: 'none' }}>
        <h3>Current Tab: {activeTab}</h3>
      </div>
    </div>
  );
};

const TwoTabsWrapper = () => {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div>
      <SimpleTabs
        tabs={[
          { id: 'list', label: '목록 보기' },
          { id: 'grid', label: '그리드 보기' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e3e3', borderTop: 'none' }}>
        {activeTab === 'list' ? (
          <div>
            <p>📋 목록 보기 모드</p>
            <ul>
              <li>항목 1</li>
              <li>항목 2</li>
              <li>항목 3</li>
            </ul>
          </div>
        ) : (
          <div>
            <p>🔲 그리드 보기 모드</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div style={{ border: '1px solid #ddd', padding: '20px' }}>항목 1</div>
              <div style={{ border: '1px solid #ddd', padding: '20px' }}>항목 2</div>
              <div style={{ border: '1px solid #ddd', padding: '20px' }}>항목 3</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CustomClassWrapper = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div>
      <SimpleTabs
        tabs={[
          { id: 'tab1', label: '탭 1' },
          { id: 'tab2', label: '탭 2' },
          { id: 'tab3', label: '탭 3' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="custom-tabs"
      />
      <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e3e3', borderTop: 'none' }}>
        <p>커스텀 클래스가 적용된 탭입니다.</p>
      </div>
    </div>
  );
};

// Stories
export const Basic: Story = {
  render: () => <BasicTabsWrapper />,
};

export const ManyTabs: Story = {
  render: () => <ManyTabsWrapper />,
};

export const WithDisabledTabs: Story = {
  render: () => <DisabledTabsWrapper />,
};

export const WithContent: Story = {
  render: () => <WithContentWrapper />,
};

export const EnglishLabels: Story = {
  render: () => <EnglishTabsWrapper />,
};

export const TwoTabs: Story = {
  render: () => <TwoTabsWrapper />,
};

export const CustomClass: Story = {
  render: () => <CustomClassWrapper />,
};
