import React from 'react';
import './SimpleTabs.css';

export interface SimpleTab {
  /** 탭 ID */
  id: string;
  /** 탭 레이블 */
  label: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export interface SimpleTabsProps {
  /** 탭 목록 */
  tabs: SimpleTab[];
  /** 활성 탭 ID */
  activeTab: string;
  /** 탭 변경 핸들러 */
  onChange: (tabId: string) => void;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * SimpleTabs 컴포넌트
 *
 * 간단한 탭 네비게이션 컴포넌트
 *
 * @example
 * ```tsx
 * const [activeTab, setActiveTab] = useState('tab1');
 *
 * <SimpleTabs
 *   tabs={[
 *     { id: 'tab1', label: '탭 1' },
 *     { id: 'tab2', label: '탭 2' },
 *   ]}
 *   activeTab={activeTab}
 *   onChange={setActiveTab}
 * />
 * ```
 */
export const SimpleTabs: React.FC<SimpleTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`simple-tabs ${className}`}>
      <div className="simple-tabs__header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`simple-tabs__tab ${
              activeTab === tab.id ? 'simple-tabs__tab--active' : ''
            } ${tab.disabled ? 'simple-tabs__tab--disabled' : ''}`}
            onClick={() => !tab.disabled && onChange(tab.id)}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SimpleTabs;
